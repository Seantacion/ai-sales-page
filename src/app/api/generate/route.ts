import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

async function generateWithRetry(model: any, prompt: string, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const result = await model.generateContent(prompt);
      return result;
    } catch (error: any) {
      if (error?.status === 503 && i < maxRetries - 1) {
        await new Promise((res) => setTimeout(res, 3000 * (i + 1)));
        continue;
      }
      throw error;
    }
  }
}

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const {
      productName,
      description,
      features,
      targetAudience,
      price,
      usp,
      tone,
    } = body;

    const prompt = `
You are an expert copywriter. Generate a complete, high-converting sales page for the following product.

Product Name: ${productName}
Description: ${description}
Key Features: ${features || "Not specified"}
Target Audience: ${targetAudience || "General audience"}
Price: ${price || "Not specified"}
Unique Selling Points: ${usp || "Not specified"}
Tone: ${tone}

Return ONLY a valid JSON object with this exact structure (no markdown, no backticks):
{
  "headline": "Main compelling headline",
  "subheadline": "Supporting subheadline that expands on the headline",
  "heroDescription": "2-3 sentence hero section description",
  "benefits": [
    { "title": "Benefit title", "description": "Benefit description" },
    { "title": "Benefit title", "description": "Benefit description" },
    { "title": "Benefit title", "description": "Benefit description" }
  ],
  "features": [
    { "name": "Feature name", "detail": "Feature detail" },
    { "name": "Feature name", "detail": "Feature detail" },
    { "name": "Feature name", "detail": "Feature detail" }
  ],
  "socialProof": [
    { "quote": "Testimonial quote", "author": "Author Name", "role": "Their role" },
    { "quote": "Testimonial quote", "author": "Author Name", "role": "Their role" }
  ],
  "pricing": {
    "price": "${price || "Contact us"}",
    "description": "What's included in this price",
    "cta": "Call to action button text"
  },
  "faq": [
    { "question": "FAQ question", "answer": "FAQ answer" },
    { "question": "FAQ question", "answer": "FAQ answer" }
  ],
  "finalCta": {
    "headline": "Final CTA headline",
    "button": "Button text"
  }
}`;

    const model = genAI.getGenerativeModel({
      model: "gemini-3.1-flash-lite-preview",
    });

    const result = await generateWithRetry(model, prompt);
    const text = result.response.text();

    const clean = text.replace(/```json|```/g, "").trim();
    const output = JSON.parse(clean);

    const page = await prisma.generatedPage.create({
      data: {
        user_id: user.id,
        title: productName,
        input_data: body,
        output_data: output,
      },
    });

    return NextResponse.json({ id: page.id });
  } catch (error: any) {
    console.error("Generate error:", error);
    if (error?.status === 503) {
      return NextResponse.json({ error: "high_demand" }, { status: 503 });
    }
    return NextResponse.json({ error: "Generation failed" }, { status: 500 });
  }
}
