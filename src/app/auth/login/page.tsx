"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  async function handleLogin() {
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
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
      {/* LEFT - Branding */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "clamp(32px, 5vw, 60px)",
          background:
            "radial-gradient(ellipse at 30% 50%, rgba(0,113,227,0.15) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(0,113,227,0.08) 0%, transparent 50%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Ambient orbs */}
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
        <div
          style={{
            position: "absolute",
            bottom: "10%",
            right: "5%",
            width: "300px",
            height: "300px",
            background:
              "radial-gradient(circle, rgba(0,113,227,0.07) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {/* Logo */}
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

        {/* Big copy */}
        <div style={{ position: "relative", zIndex: 1 }}>
          <p
            style={{
              fontSize: "clamp(13px, 1.2vw, 15px)",
              color: "var(--text-secondary)",
              marginBottom: "16px",
              fontStyle: "italic",
              letterSpacing: "0.02em",
            }}
          >
            Sign in
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
            WELCOME
            <br />
            BACK.
          </h1>
          <p
            style={{
              fontSize: "clamp(14px, 1.2vw, 16px)",
              color: "var(--text-secondary)",
              maxWidth: "320px",
              lineHeight: 1.6,
            }}
          >
            Generate stunning sales pages with AI. Sign in to access your
            dashboard.
          </p>
        </div>

        {/* Bottom tag */}
        <div style={{ position: "relative", zIndex: 1 }}>
          <p style={{ fontSize: "13px", color: "var(--text-tertiary)" }}>
            © 2026 by Sena
          </p>
        </div>
      </div>

      {/* RIGHT - Form */}
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
          Your Account
        </h2>
        <p
          style={{
            fontSize: "14px",
            color: "var(--text-secondary)",
            marginBottom: "40px",
          }}
        >
          Enter your credentials to continue
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
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
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
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            />
          </div>

          <button
            className="btn-primary"
            onClick={handleLogin}
            disabled={loading}
            style={{ marginTop: "8px" }}
          >
            {loading ? "Signing in..." : "Log in"}
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
            Don't have an account?
          </span>
          <Link
            href="/auth/register"
            style={{
              fontSize: "13px",
              fontWeight: 600,
              color: "var(--text-primary)",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            Sign up ↗
          </Link>
        </div>
      </div>

      {/* Mobile fallback - hide left on small screens */}
      <style>{`
        @media (max-width: 768px) {
          div[style*="flex-direction: row"] {
            flex-direction: column !important;
          }
          div[style*="flex: 1"] {
            min-height: 240px !important;
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
