"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  async function handleRegister() {
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }
    router.push("/dashboard");
    router.refresh();
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "row",
        background: "#000",
      }}
    >
      {/* LEFT */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "clamp(32px, 5vw, 60px)",
          background:
            "radial-gradient(ellipse at 30% 50%, rgba(0,113,227,0.15) 0%, transparent 60%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "20%",
            left: "10%",
            width: "400px",
            height: "400px",
            background:
              "radial-gradient(circle, rgba(0,113,227,0.12) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div style={{ position: "relative", zIndex: 1 }}>
          <div
            style={{
              width: "40px",
              height: "40px",
              background: "linear-gradient(135deg, #0071e3, #40a9ff)",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 8px 32px rgba(0,113,227,0.3)",
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        <div style={{ position: "relative", zIndex: 1 }}>
          <p
            style={{
              fontSize: "clamp(13px, 1.2vw, 15px)",
              color: "var(--text-secondary)",
              marginBottom: "16px",
              fontStyle: "italic",
            }}
          >
            Get started
          </p>
          <h1
            style={{
              fontSize: "clamp(48px, 6vw, 96px)",
              fontWeight: 700,
              lineHeight: 0.95,
              letterSpacing: "-0.03em",
              color: "var(--text-primary)",
              marginBottom: "24px",
            }}
          >
            CREATE
            <br />
            ACCOUNT.
          </h1>
          <p
            style={{
              fontSize: "clamp(14px, 1.2vw, 16px)",
              color: "var(--text-secondary)",
              maxWidth: "320px",
              lineHeight: 1.6,
            }}
          >
            Join and start generating high-converting sales pages in seconds.
          </p>
        </div>

        <p
          style={{
            position: "relative",
            zIndex: 1,
            fontSize: "13px",
            color: "var(--text-tertiary)",
          }}
        >
          © 2025 SalesAI
        </p>
      </div>

      {/* RIGHT */}
      <div
        style={{
          width: "clamp(340px, 40vw, 520px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "clamp(32px, 5vw, 60px)",
          background: "rgba(255,255,255,0.03)",
          borderLeft: "1px solid rgba(255,255,255,0.06)",
          backdropFilter: "blur(20px)",
        }}
      >
        <h2
          style={{
            fontSize: "clamp(22px, 2.5vw, 28px)",
            fontWeight: 600,
            color: "var(--text-primary)",
            letterSpacing: "-0.5px",
            marginBottom: "8px",
          }}
        >
          Create Account
        </h2>
        <p
          style={{
            fontSize: "14px",
            color: "var(--text-secondary)",
            marginBottom: "40px",
          }}
        >
          Fill in your details to get started
        </p>

        {error && (
          <div
            style={{
              marginBottom: "20px",
              padding: "12px 16px",
              background: "rgba(255,69,58,0.1)",
              border: "1px solid rgba(255,69,58,0.2)",
              borderRadius: "var(--radius-sm)",
              color: "var(--danger)",
              fontSize: "14px",
            }}
          >
            {error}
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div>
            <label
              style={{
                display: "block",
                fontSize: "12px",
                fontWeight: 600,
                color: "var(--text-secondary)",
                marginBottom: "10px",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              Email
            </label>
            <input
              className="input-base"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              onKeyDown={(e) => e.key === "Enter" && handleRegister()}
            />
          </div>

          <div>
            <label
              style={{
                display: "block",
                fontSize: "12px",
                fontWeight: 600,
                color: "var(--text-secondary)",
                marginBottom: "10px",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              Password
            </label>
            <input
              className="input-base"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              onKeyDown={(e) => e.key === "Enter" && handleRegister()}
            />
          </div>

          <button
            className="btn-primary"
            onClick={handleRegister}
            disabled={loading}
            style={{ marginTop: "8px" }}
          >
            {loading ? "Creating account..." : "Create account"}
          </button>
        </div>

        <div
          style={{
            marginTop: "40px",
            paddingTop: "32px",
            borderTop: "1px solid var(--glass-border)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: "13px", color: "var(--text-secondary)" }}>
            Already have an account?
          </span>
          <Link
            href="/auth/login"
            style={{
              fontSize: "13px",
              fontWeight: 600,
              color: "var(--text-primary)",
              textDecoration: "none",
            }}
          >
            Sign in ↗
          </Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          div[style*="flex-direction: row"] {
            flex-direction: column !important;
          }
          div[style*="flex: 1"] {
            min-height: 220px !important;
            flex: none !important;
          }
          div[style*="width: clamp(340px"] {
            width: 100% !important;
          }
        }
      `}</style>
    </div>
  );
}
