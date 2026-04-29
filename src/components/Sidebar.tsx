"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const navItems = [
  {
    href: "/dashboard",
    label: "Generate",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 5v14M5 12h14"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    href: "/dashboard/history",
    label: "History",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

export default function Sidebar({ userEmail }: { userEmail: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/auth/login");
    router.refresh();
  }

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "240px",
          height: "100vh",
          background: "rgba(255,255,255,0.02)",
          borderRight: "1px solid var(--glass-border)",
          display: "flex",
          flexDirection: "column",
          padding: "28px 16px",
          zIndex: 50,
        }}
        className="desktop-sidebar"
      >
        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "40px",
            padding: "0 8px",
          }}
        >
          <div
            style={{
              width: "32px",
              height: "32px",
              background: "linear-gradient(135deg, #0071e3, #40a9ff)",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span
            style={{
              fontSize: "15px",
              fontWeight: 600,
              color: "var(--text-primary)",
            }}
          >
            SalesAI
          </span>
        </div>

        {/* Nav */}
        <nav
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "4px",
            flex: 1,
          }}
        >
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "10px 12px",
                  borderRadius: "10px",
                  fontSize: "14px",
                  fontWeight: isActive ? 500 : 400,
                  color: isActive
                    ? "var(--text-primary)"
                    : "var(--text-secondary)",
                  background: isActive
                    ? "rgba(255,255,255,0.07)"
                    : "transparent",
                  textDecoration: "none",
                  transition: "all 0.15s ease",
                  border: isActive
                    ? "1px solid var(--glass-border)"
                    : "1px solid transparent",
                }}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* User + Logout */}
        <div
          style={{
            borderTop: "1px solid var(--glass-border)",
            paddingTop: "16px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <p
            style={{
              fontSize: "12px",
              color: "var(--text-tertiary)",
              padding: "0 12px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {userEmail}
          </p>
          <button
            onClick={handleLogout}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "10px 12px",
              borderRadius: "10px",
              fontSize: "14px",
              color: "var(--danger)",
              background: "transparent",
              border: "1px solid transparent",
              cursor: "pointer",
              width: "100%",
              fontFamily: "inherit",
              transition: "all 0.15s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "rgba(255,69,58,0.08)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "transparent")
            }
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Sign out
          </button>
        </div>
      </aside>

      {/* Mobile Bottom Nav */}
      <nav
        style={{
          display: "none",
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          background: "rgba(0,0,0,0.8)",
          borderTop: "1px solid var(--glass-border)",
          backdropFilter: "blur(20px)",
          padding: "12px 24px",
          justifyContent: "space-around",
          alignItems: "center",
          zIndex: 50,
        }}
        className="mobile-nav"
      >
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "4px",
                color: isActive ? "var(--accent)" : "var(--text-secondary)",
                textDecoration: "none",
                fontSize: "11px",
              }}
            >
              {item.icon}
              {item.label}
            </Link>
          );
        })}
        <button
          onClick={handleLogout}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "4px",
            color: "var(--danger)",
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "11px",
            fontFamily: "inherit",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Sign out
        </button>
      </nav>

      <style>{`
        @media (max-width: 768px) {
          .desktop-sidebar { display: none !important; }
          .mobile-nav { display: flex !important; }
        }
      `}</style>
    </>
  );
}
