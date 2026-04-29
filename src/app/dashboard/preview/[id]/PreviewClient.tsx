"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface SalesPageData {
  headline: string;
  subheadline: string;
  heroDescription: string;
  benefits: { title: string; description: string }[];
  features: { name: string; detail: string }[];
  socialProof: { quote: string; author: string; role: string }[];
  pricing: { price: string; description: string; cta: string };
  faq: { question: string; answer: string }[];
  finalCta: { headline: string; button: string };
}

export default function PreviewClient({ page }: { page: any }) {
  const router = useRouter();
  const data = page.output_data as SalesPageData;
  const [regenerating, setRegenerating] = useState(false);

  function handleExport() {
    const blob = new Blob([generateScript(data, page.title)], {
      type: "text/plain",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${page.title}-sales-page.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  async function handleRegenerate() {
    setRegenerating(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(page.input_data),
      });

      if (!res.ok) throw new Error("Failed");

      const { id } = await res.json();
      router.push(`/dashboard/preview/${id}`);
    } catch {
      alert("Regeneration failed. Please try again.");
    } finally {
      setRegenerating(false);
    }
  }

  return (
    <div>
      {/* Toolbar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "32px",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <button
            onClick={() => router.back()}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "8px 14px",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid var(--glass-border)",
              borderRadius: "8px",
              color: "var(--text-secondary)",
              fontSize: "13px",
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            ← Back
          </button>
          <h1
            style={{
              fontSize: "18px",
              fontWeight: 600,
              color: "var(--text-primary)",
              letterSpacing: "-0.3px",
            }}
          >
            {page.title}
          </h1>
        </div>

        {/* Action buttons */}
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <button
            onClick={handleRegenerate}
            disabled={regenerating}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "8px 16px",
              background: regenerating
                ? "rgba(255,255,255,0.04)"
                : "rgba(255,255,255,0.08)",
              border: "1px solid var(--glass-border)",
              borderRadius: "8px",
              color: regenerating
                ? "var(--text-tertiary)"
                : "var(--text-primary)",
              fontSize: "13px",
              fontWeight: 500,
              cursor: regenerating ? "not-allowed" : "pointer",
              fontFamily: "inherit",
              transition: "all 0.15s ease",
            }}
          >
            {regenerating ? (
              <>
                <span
                  style={{
                    display: "inline-block",
                    width: "12px",
                    height: "12px",
                    border: "2px solid var(--text-tertiary)",
                    borderTopColor: "transparent",
                    borderRadius: "50%",
                    animation: "spin 0.7s linear infinite",
                  }}
                />
                Regenerating...
              </>
            ) : (
              "↺ Regenerate"
            )}
          </button>

          <button
            onClick={handleExport}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "8px 16px",
              background: "var(--accent)",
              border: "none",
              borderRadius: "8px",
              color: "white",
              fontSize: "13px",
              fontWeight: 500,
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            ↓ Export as .txt
          </button>
        </div>
      </div>

      {/* Spinner keyframe — injected once */}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

      {/* Sales Page Preview */}
      <div
        style={{
          background: "#ffffff",
          borderRadius: "16px",
          overflow: "hidden",
          color: "#1a1a1a",
          opacity: regenerating ? 0.5 : 1,
          transition: "opacity 0.2s ease",
          pointerEvents: regenerating ? "none" : "auto",
        }}
      >
        {/* Hero */}
        <section
          style={{
            padding: "clamp(60px, 8vw, 100px) clamp(24px, 6vw, 80px)",
            background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)",
            textAlign: "center",
            color: "white",
          }}
        >
          <div
            style={{
              display: "inline-block",
              padding: "6px 14px",
              background: "rgba(0,113,227,0.2)",
              border: "1px solid rgba(0,113,227,0.3)",
              borderRadius: "100px",
              fontSize: "12px",
              color: "#40a9ff",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              marginBottom: "24px",
            }}
          >
            {page.title}
          </div>
          <h1
            style={{
              fontSize: "clamp(32px, 5vw, 64px)",
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              marginBottom: "20px",
              maxWidth: "800px",
              margin: "0 auto 20px",
            }}
          >
            {data.headline}
          </h1>
          <p
            style={{
              fontSize: "clamp(16px, 2vw, 22px)",
              color: "rgba(255,255,255,0.7)",
              marginBottom: "16px",
              maxWidth: "600px",
              margin: "0 auto 16px",
            }}
          >
            {data.subheadline}
          </p>
          <p
            style={{
              fontSize: "16px",
              color: "rgba(255,255,255,0.5)",
              maxWidth: "560px",
              margin: "0 auto 40px",
              lineHeight: 1.7,
            }}
          >
            {data.heroDescription}
          </p>
          <button
            style={{
              padding: "16px 40px",
              background: "#0071e3",
              border: "none",
              borderRadius: "100px",
              color: "white",
              fontSize: "16px",
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            {data.pricing.cta}
          </button>
        </section>

        {/* Benefits */}
        <section
          style={{
            padding: "clamp(48px, 6vw, 80px) clamp(24px, 6vw, 80px)",
            background: "#f9f9f9",
          }}
        >
          <h2 style={sectionTitleStyle}>Why Choose Us</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "24px",
              marginTop: "40px",
            }}
          >
            {data.benefits?.map((b, i) => (
              <div
                key={i}
                style={{
                  padding: "28px",
                  background: "white",
                  borderRadius: "16px",
                  border: "1px solid #eee",
                }}
              >
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    background: "linear-gradient(135deg, #0071e3, #40a9ff)",
                    borderRadius: "10px",
                    marginBottom: "16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontWeight: 700,
                    fontSize: "16px",
                  }}
                >
                  {i + 1}
                </div>
                <h3
                  style={{
                    fontSize: "17px",
                    fontWeight: 700,
                    marginBottom: "8px",
                    color: "#1a1a1a",
                  }}
                >
                  {b.title}
                </h3>
                <p style={{ fontSize: "14px", color: "#666", lineHeight: 1.6 }}>
                  {b.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section
          style={{ padding: "clamp(48px, 6vw, 80px) clamp(24px, 6vw, 80px)" }}
        >
          <h2 style={sectionTitleStyle}>Features</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "16px",
              marginTop: "40px",
            }}
          >
            {data.features?.map((f, i) => (
              <div
                key={i}
                style={{
                  padding: "20px 24px",
                  background: "#f5f5f7",
                  borderRadius: "12px",
                  display: "flex",
                  gap: "14px",
                  alignItems: "flex-start",
                }}
              >
                <span
                  style={{
                    color: "#0071e3",
                    fontSize: "18px",
                    marginTop: "2px",
                  }}
                >
                  ✦
                </span>
                <div>
                  <p
                    style={{
                      fontWeight: 600,
                      fontSize: "15px",
                      marginBottom: "4px",
                      color: "#1a1a1a",
                    }}
                  >
                    {f.name}
                  </p>
                  <p
                    style={{ fontSize: "13px", color: "#666", lineHeight: 1.5 }}
                  >
                    {f.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Social Proof */}
        <section
          style={{
            padding: "clamp(48px, 6vw, 80px) clamp(24px, 6vw, 80px)",
            background: "#f9f9f9",
          }}
        >
          <h2 style={sectionTitleStyle}>What People Say</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "20px",
              marginTop: "40px",
            }}
          >
            {data.socialProof?.map((s, i) => (
              <div
                key={i}
                style={{
                  padding: "28px",
                  background: "white",
                  borderRadius: "16px",
                  border: "1px solid #eee",
                }}
              >
                <p
                  style={{
                    fontSize: "15px",
                    color: "#333",
                    lineHeight: 1.7,
                    marginBottom: "20px",
                  }}
                >
                  "{s.quote}"
                </p>
                <div>
                  <p
                    style={{
                      fontWeight: 700,
                      fontSize: "14px",
                      color: "#1a1a1a",
                    }}
                  >
                    {s.author}
                  </p>
                  <p style={{ fontSize: "12px", color: "#999" }}>{s.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section
          style={{
            padding: "clamp(48px, 6vw, 80px) clamp(24px, 6vw, 80px)",
            textAlign: "center",
          }}
        >
          <h2 style={sectionTitleStyle}>Simple Pricing</h2>
          <div
            style={{
              maxWidth: "400px",
              margin: "40px auto 0",
              padding: "40px",
              background: "#f5f5f7",
              borderRadius: "24px",
              border: "2px solid #0071e3",
            }}
          >
            <p
              style={{
                fontSize: "clamp(36px, 5vw, 52px)",
                fontWeight: 800,
                color: "#1a1a1a",
                letterSpacing: "-0.02em",
              }}
            >
              {data.pricing.price}
            </p>
            <p
              style={{
                fontSize: "15px",
                color: "#666",
                margin: "12px 0 28px",
                lineHeight: 1.6,
              }}
            >
              {data.pricing.description}
            </p>
            <button
              style={{
                width: "100%",
                padding: "14px",
                background: "#0071e3",
                border: "none",
                borderRadius: "100px",
                color: "white",
                fontSize: "15px",
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              {data.pricing.cta}
            </button>
          </div>
        </section>

        {/* FAQ */}
        <section
          style={{
            padding: "clamp(48px, 6vw, 80px) clamp(24px, 6vw, 80px)",
            background: "#f9f9f9",
          }}
        >
          <h2 style={sectionTitleStyle}>Frequently Asked Questions</h2>
          <div
            style={{
              maxWidth: "640px",
              margin: "40px auto 0",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            {data.faq?.map((f, i) => (
              <div
                key={i}
                style={{
                  padding: "24px",
                  background: "white",
                  borderRadius: "12px",
                  border: "1px solid #eee",
                }}
              >
                <p
                  style={{
                    fontWeight: 700,
                    fontSize: "15px",
                    marginBottom: "8px",
                    color: "#1a1a1a",
                  }}
                >
                  {f.question}
                </p>
                <p style={{ fontSize: "14px", color: "#666", lineHeight: 1.6 }}>
                  {f.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section
          style={{
            padding: "clamp(60px, 8vw, 100px) clamp(24px, 6vw, 80px)",
            background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)",
            textAlign: "center",
            color: "white",
          }}
        >
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 48px)",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              marginBottom: "32px",
            }}
          >
            {data.finalCta.headline}
          </h2>
          <button
            style={{
              padding: "16px 48px",
              background: "#0071e3",
              border: "none",
              borderRadius: "100px",
              color: "white",
              fontSize: "16px",
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            {data.finalCta.button}
          </button>
        </section>
      </div>
    </div>
  );
}

const sectionTitleStyle: React.CSSProperties = {
  fontSize: "clamp(22px, 3vw, 32px)",
  fontWeight: 800,
  color: "#1a1a1a",
  textAlign: "center",
  letterSpacing: "-0.02em",
};

function generateScript(data: SalesPageData, title: string): string {
  return `SALES PAGE: ${title}
${"=".repeat(50)}

HEADLINE
${data.headline}

SUBHEADLINE
${data.subheadline}

HERO DESCRIPTION
${data.heroDescription}

BENEFITS
${data.benefits?.map((b, i) => `${i + 1}. ${b.title}\n   ${b.description}`).join("\n")}

FEATURES
${data.features?.map((f) => `• ${f.name}: ${f.detail}`).join("\n")}

SOCIAL PROOF
${data.socialProof?.map((s) => `"${s.quote}"\n— ${s.author}, ${s.role}`).join("\n\n")}

PRICING
Price: ${data.pricing.price}
${data.pricing.description}
CTA: ${data.pricing.cta}

FAQ
${data.faq?.map((f) => `Q: ${f.question}\nA: ${f.answer}`).join("\n\n")}

FINAL CTA
${data.finalCta.headline}
Button: ${data.finalCta.button}
`;
}
