"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Page {
  id: string;
  title: string;
  created_at: Date;
  input_data: any;
}

export default function HistoryClient({ pages }: { pages: Page[] }) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [deleting, setDeleting] = useState<string | null>(null);

  const filtered = pages.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase()),
  );

  async function handleDelete(id: string) {
    setDeleting(id);
    try {
      await fetch(`/api/pages/${id}`, { method: "DELETE" });
      router.refresh();
    } finally {
      setDeleting(null);
    }
  }

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: "32px" }}>
        <h1
          style={{
            fontSize: "clamp(24px, 3vw, 32px)",
            fontWeight: 700,
            color: "var(--text-primary)",
            letterSpacing: "-0.5px",
          }}
        >
          History
        </h1>
        <p
          style={{
            color: "var(--text-secondary)",
            marginTop: "8px",
            fontSize: "15px",
          }}
        >
          {pages.length} sales page{pages.length !== 1 ? "s" : ""} generated
        </p>
      </div>

      {/* Search */}
      {pages.length > 0 && (
        <div style={{ marginBottom: "24px", maxWidth: "400px" }}>
          <input
            className="input-base"
            placeholder="Search by product name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      )}

      {/* Empty state */}
      {pages.length === 0 && (
        <div
          style={{
            textAlign: "center",
            padding: "80px 24px",
            border: "1px dashed var(--glass-border)",
            borderRadius: "16px",
          }}
        >
          <p style={{ fontSize: "32px", marginBottom: "16px" }}>✦</p>
          <p
            style={{
              color: "var(--text-primary)",
              fontWeight: 600,
              marginBottom: "8px",
            }}
          >
            No pages yet
          </p>
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "14px",
              marginBottom: "24px",
            }}
          >
            Generate your first sales page to see it here
          </p>
          <button
            onClick={() => router.push("/dashboard")}
            className="btn-primary"
            style={{ width: "auto", padding: "10px 24px" }}
          >
            Generate now
          </button>
        </div>
      )}

      {/* List */}
      {filtered.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {filtered.map((page) => (
            <div
              key={page.id}
              className="glass"
              style={{
                borderRadius: "14px",
                padding: "20px 24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "16px",
                flexWrap: "wrap",
                transition: "all 0.15s ease",
              }}
            >
              <div style={{ flex: 1, minWidth: "200px" }}>
                <p
                  style={{
                    fontWeight: 600,
                    fontSize: "15px",
                    color: "var(--text-primary)",
                    marginBottom: "6px",
                  }}
                >
                  {page.title}
                </p>
                <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                  <span
                    style={{ fontSize: "12px", color: "var(--text-tertiary)" }}
                  >
                    {new Date(page.created_at).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                  {(page.input_data as any)?.tone && (
                    <span
                      style={{
                        fontSize: "11px",
                        padding: "2px 8px",
                        background: "rgba(0,113,227,0.1)",
                        border: "1px solid rgba(0,113,227,0.2)",
                        borderRadius: "100px",
                        color: "#40a9ff",
                        fontWeight: 500,
                      }}
                    >
                      {(page.input_data as any).tone}
                    </span>
                  )}
                </div>
              </div>

              <div style={{ display: "flex", gap: "8px" }}>
                <button
                  onClick={() => router.push(`/dashboard/preview/${page.id}`)}
                  style={{
                    padding: "8px 16px",
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid var(--glass-border)",
                    borderRadius: "8px",
                    color: "var(--text-primary)",
                    fontSize: "13px",
                    fontWeight: 500,
                    cursor: "pointer",
                    fontFamily: "inherit",
                    transition: "all 0.15s ease",
                  }}
                >
                  View
                </button>
                <button
                  onClick={() => handleDelete(page.id)}
                  disabled={deleting === page.id}
                  style={{
                    padding: "8px 16px",
                    background: "rgba(255,69,58,0.08)",
                    border: "1px solid rgba(255,69,58,0.2)",
                    borderRadius: "8px",
                    color: "var(--danger)",
                    fontSize: "13px",
                    fontWeight: 500,
                    cursor: "pointer",
                    fontFamily: "inherit",
                    opacity: deleting === page.id ? 0.5 : 1,
                    transition: "all 0.15s ease",
                  }}
                >
                  {deleting === page.id ? "..." : "Delete"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* No search results */}
      {pages.length > 0 && filtered.length === 0 && (
        <p
          style={{
            color: "var(--text-secondary)",
            textAlign: "center",
            padding: "40px",
          }}
        >
          No results for "{search}"
        </p>
      )}
    </div>
  );
}
