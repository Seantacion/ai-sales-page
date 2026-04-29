"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const toneOptions = [
  "Professional",
  "Casual",
  "Persuasive",
  "Urgent",
  "Luxury",
];

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    productName: "",
    description: "",
    features: "",
    targetAudience: "",
    price: "",
    usp: "",
    tone: "Professional",
  });

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const [error, setError] = useState("");

  async function handleGenerate() {
    if (!form.productName || !form.description) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.status === 503) {
        setError(
          "AI is currently experiencing high demand. Please try again in a moment.",
        );
        return;
      }
      if (data.id) router.push(`/dashboard/preview/${data.id}`);
    } catch (e) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: "720px" }}>
      {/* Header */}
      <div style={{ marginBottom: "40px" }}>
        <h1
          style={{
            fontSize: "clamp(24px, 3vw, 32px)",
            fontWeight: 700,
            color: "var(--text-primary)",
            letterSpacing: "-0.5px",
          }}
        >
          Generate Sales Page
        </h1>
        <p
          style={{
            color: "var(--text-secondary)",
            marginTop: "8px",
            fontSize: "15px",
          }}
        >
          Fill in your product details and let AI do the rest.
        </p>
      </div>

      {/* Form */}
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        {/* Row 1 */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "16px",
          }}
        >
          <div>
            <label style={labelStyle}>Product / Service Name *</label>
            <input
              className="input-base"
              name="productName"
              value={form.productName}
              onChange={handleChange}
              placeholder="e.g. ProFlow CRM"
            />
          </div>
          <div>
            <label style={labelStyle}>Price</label>
            <input
              className="input-base"
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="e.g. $49/month or Free"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label style={labelStyle}>Product Description *</label>
          <textarea
            className="input-base"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="What does your product do? What problem does it solve?"
            rows={4}
            style={{ resize: "vertical" }}
          />
        </div>

        {/* Features */}
        <div>
          <label style={labelStyle}>Key Features</label>
          <textarea
            className="input-base"
            name="features"
            value={form.features}
            onChange={handleChange}
            placeholder="List features separated by commas. e.g. Real-time analytics, Team collaboration, API access"
            rows={3}
            style={{ resize: "vertical" }}
          />
        </div>

        {/* Row 2 */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "16px",
          }}
        >
          <div>
            <label style={labelStyle}>Target Audience</label>
            <input
              className="input-base"
              name="targetAudience"
              value={form.targetAudience}
              onChange={handleChange}
              placeholder="e.g. Small business owners"
            />
          </div>
          <div>
            <label style={labelStyle}>Tone</label>
            <select
              className="input-base select-base"
              name="tone"
              value={form.tone}
              onChange={handleChange}
              title="tone"
            >
              {toneOptions.map((t) => (
                <option key={t} value={t} style={{ background: "#1a1a1a" }}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* USP */}
        <div>
          <label style={labelStyle}>Unique Selling Points</label>
          <input
            className="input-base"
            name="usp"
            value={form.usp}
            onChange={handleChange}
            placeholder="What makes you different from competitors?"
          />
        </div>

        {/* Submit */}
        <button
          className="btn-primary"
          onClick={handleGenerate}
          disabled={loading || !form.productName || !form.description}
          style={{ marginTop: "8px" }}
        >
          {loading ? (
            <span
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
              }}
            >
              <span
                style={{
                  width: "16px",
                  height: "16px",
                  border: "2px solid rgba(255,255,255,0.3)",
                  borderTopColor: "white",
                  borderRadius: "50%",
                  animation: "spin 0.8s linear infinite",
                  display: "inline-block",
                }}
              />
              Generating your sales page...
            </span>
          ) : (
            "✦ Generate Sales Page"
          )}
        </button>
        {error && (
          <div
            style={{
              marginTop: "12px",
              padding: "12px 16px",
              background: "rgba(255,69,58,0.1)",
              border: "1px solid rgba(255,69,58,0.2)",
              borderRadius: "var(--radius-sm)",
              color: "var(--danger)",
              fontSize: "14px",
            }}
          >
            ⚠ {error}
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 640px) {
          div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "12px",
  fontWeight: 600,
  color: "var(--text-secondary)",
  marginBottom: "8px",
  letterSpacing: "0.06em",
  textTransform: "uppercase",
};
