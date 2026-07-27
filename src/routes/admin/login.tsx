import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import {
  Eye, EyeOff, AlertCircle, Lock, Mail, Shield, ArrowRight,
  CheckCircle, Cpu, Globe, BarChart3, Users,
} from "lucide-react";
import { ADMIN_CREDENTIALS } from "../../components/admin/adminData";

export const Route = createFileRoute("/admin/login")({
  component: AdminLogin,
});

/* ─── animated orbs ─── */
function Orbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        style={{
          position: "absolute", top: "-10%", left: "-10%",
          width: "55%", height: "55%",
          background: "radial-gradient(circle, rgba(99,102,241,0.35) 0%, transparent 70%)",
          borderRadius: "50%",
          animation: "orbFloat1 12s ease-in-out infinite",
        }}
      />
      <div
        style={{
          position: "absolute", bottom: "-15%", right: "-5%",
          width: "60%", height: "60%",
          background: "radial-gradient(circle, rgba(168,85,247,0.25) 0%, transparent 70%)",
          borderRadius: "50%",
          animation: "orbFloat2 15s ease-in-out infinite",
        }}
      />
      <div
        style={{
          position: "absolute", top: "40%", left: "30%",
          width: "35%", height: "35%",
          background: "radial-gradient(circle, rgba(59,130,246,0.2) 0%, transparent 70%)",
          borderRadius: "50%",
          animation: "orbFloat3 10s ease-in-out infinite",
        }}
      />
    </div>
  );
}

/* ─── floating stat pill ─── */
function StatPill({ icon: Icon, label, value, delay }: { icon: React.ElementType; label: string; value: string; delay: string }) {
  return (
    <div
      style={{
        display: "flex", alignItems: "center", gap: "10px",
        background: "rgba(255,255,255,0.07)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: "14px",
        padding: "12px 18px",
        animation: `fadeSlideUp 0.7s cubic-bezier(0.22,1,0.36,1) ${delay} both`,
      }}
    >
      <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(99,102,241,0.3)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <Icon size={18} color="#a5b4fc" />
      </div>
      <div>
        <div style={{ fontSize: 18, fontWeight: 700, color: "#fff", lineHeight: 1 }}>{value}</div>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginTop: 2 }}>{label}</div>
      </div>
    </div>
  );
}

function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [focusField, setFocusField] = useState<"email" | "password" | null>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (localStorage.getItem("rkgit_admin_auth")) {
      navigate({ to: "/admin/dashboard" });
    }
    // auto-focus
    setTimeout(() => emailRef.current?.focus(), 400);
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));

    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      setSuccess(true);
      localStorage.setItem("rkgit_admin_auth", JSON.stringify({ email, loginAt: new Date().toISOString() }));
      await new Promise((r) => setTimeout(r, 700));
      navigate({ to: "/admin/dashboard" });
    } else {
      setError("Invalid credentials. Please check your email and password.");
    }
    setLoading(false);
  };

  return (
    <>
      {/* ─── keyframes injected globally ─── */}
      <style>{`
        @keyframes orbFloat1 {
          0%, 100% { transform: translate(0,0) scale(1); }
          33% { transform: translate(3%,4%) scale(1.05); }
          66% { transform: translate(-2%,2%) scale(0.97); }
        }
        @keyframes orbFloat2 {
          0%, 100% { transform: translate(0,0) scale(1); }
          40% { transform: translate(-4%,-3%) scale(1.08); }
          70% { transform: translate(2%,-1%) scale(0.95); }
        }
        @keyframes orbFloat3 {
          0%, 100% { transform: translate(0,0) scale(1); }
          50% { transform: translate(3%,5%) scale(1.1); }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes pulse-ring {
          0% { transform: scale(0.9); opacity: 0.8; }
          70% { transform: scale(1.15); opacity: 0; }
          100% { transform: scale(0.9); opacity: 0; }
        }
        @keyframes successPop {
          0% { transform: scale(0.7); opacity: 0; }
          70% { transform: scale(1.1); }
          100% { transform: scale(1); opacity: 1; }
        }
        .admin-input {
          width: 100%;
          background: rgba(255,255,255,0.06);
          border: 1.5px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          padding: 13px 44px 13px 44px;
          color: #fff;
          font-size: 14px;
          font-family: inherit;
          transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
          outline: none;
        }
        .admin-input::placeholder { color: rgba(255,255,255,0.3); }
        .admin-input:focus {
          border-color: rgba(99,102,241,0.8);
          background: rgba(99,102,241,0.08);
          box-shadow: 0 0 0 3px rgba(99,102,241,0.15);
        }
        .admin-input.input-error {
          border-color: rgba(239,68,68,0.7);
          background: rgba(239,68,68,0.05);
        }
        .login-btn {
          width: 100%;
          padding: 14px;
          border: none;
          border-radius: 12px;
          font-size: 15px;
          font-weight: 600;
          font-family: inherit;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s;
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #6366f1 100%);
          background-size: 200% auto;
          color: #fff;
          box-shadow: 0 8px 28px rgba(99,102,241,0.45);
          animation: shimmer 3s linear infinite;
        }
        .login-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 12px 36px rgba(99,102,241,0.55);
          opacity: 0.95;
        }
        .login-btn:active:not(:disabled) { transform: translateY(0); }
        .login-btn:disabled { opacity: 0.6; cursor: not-allowed; }
      `}</style>

      <div style={{
        minHeight: "100vh",
        display: "flex",
        background: "linear-gradient(135deg, #0a0f1e 0%, #0d1330 40%, #110d2a 100%)",
        fontFamily: "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif",
        position: "relative",
        overflow: "hidden",
      }}>
        <Orbs />

        {/* ─── LEFT PANEL ─── */}
        <div style={{
          flex: 1,
          display: "none",
          flexDirection: "column",
          justifyContent: "center",
          padding: "60px 64px",
          position: "relative",
        }}
          className="lg-panel"
        >
          <style>{`
            @media (min-width: 1024px) { .lg-panel { display: flex !important; } }
          `}</style>

          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 64, animation: "fadeSlideUp 0.6s ease both" }}>
            <div style={{
              width: 48, height: 48, borderRadius: 14,
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 8px 24px rgba(99,102,241,0.4)",
            }}>
              <Shield size={24} color="#fff" />
            </div>
            <div>
              <div style={{ fontSize: 17, fontWeight: 700, color: "#fff", letterSpacing: "-0.02em" }}>RKGIT Admin</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 1 }}>Content Management System</div>
            </div>
          </div>

          {/* Hero text */}
          <div style={{ animation: "fadeSlideUp 0.7s 0.1s ease both" }}>
            <h1 style={{
              fontSize: "clamp(2rem, 3vw, 3rem)", fontWeight: 800,
              color: "#fff", lineHeight: 1.15, marginBottom: 18,
              letterSpacing: "-0.03em",
            }}>
              Manage your<br />
              <span style={{
                background: "linear-gradient(90deg, #a5b4fc, #c084fc, #a5b4fc)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                animation: "shimmer 4s linear infinite",
              }}>
                institute website
              </span>
            </h1>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.45)", lineHeight: 1.7, maxWidth: 380 }}>
              A powerful portal to update content, manage departments, faculty, placements, and more — all in one place.
            </p>
          </div>

          {/* Stats grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 48 }}>
            <StatPill icon={Users} label="Faculty Members" value="156+" delay="0.3s" />
            <StatPill icon={BarChart3} label="Courses Offered" value="22+" delay="0.4s" />
            <StatPill icon={Globe} label="Website Visitors" value="48K+" delay="0.5s" />
            <StatPill icon={Cpu} label="Placement Partners" value="87+" delay="0.6s" />
          </div>

          {/* Divider text */}
          <p style={{ marginTop: 48, fontSize: 12, color: "rgba(255,255,255,0.2)", animation: "fadeSlideUp 0.7s 0.8s ease both" }}>
            © 2025 Raj Kumar Goel Institute of Technology · Authorized Access Only
          </p>
        </div>

        {/* ─── RIGHT PANEL ─── */}
        <div style={{
          width: "100%",
          maxWidth: 500,
          margin: "auto",
          padding: "40px 24px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          position: "relative",
          zIndex: 10,
        }}
          className="right-panel"
        >
          <style>{`
            @media (min-width: 1024px) {
              .right-panel {
                min-height: 100vh;
                border-left: 1px solid rgba(255,255,255,0.06);
                background: rgba(10,12,26,0.65);
                backdrop-filter: blur(20px);
                padding: 60px 56px !important;
              }
            }
          `}</style>

          {/* Mobile logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 40 }}
            className="mobile-logo">
            <style>{`@media (min-width: 1024px) { .mobile-logo { display: none !important; } }`}</style>
            <div style={{
              width: 40, height: 40, borderRadius: 12,
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Shield size={20} color="#fff" />
            </div>
            <div style={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>RKGIT Admin Portal</div>
          </div>

          <div style={{ animation: "fadeSlideUp 0.6s 0.1s ease both" }}>
            <div style={{ marginBottom: 32 }}>
              <h2 style={{ fontSize: 26, fontWeight: 800, color: "#fff", letterSpacing: "-0.02em", marginBottom: 6 }}>
                Welcome back 👋
              </h2>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.4)" }}>
                Sign in to access the admin dashboard
              </p>
            </div>

            {/* Success state */}
            {success && (
              <div style={{
                display: "flex", alignItems: "center", gap: 12,
                padding: "14px 18px",
                background: "rgba(34,197,94,0.12)",
                border: "1px solid rgba(34,197,94,0.3)",
                borderRadius: 12, marginBottom: 24, color: "#4ade80", fontSize: 14,
                animation: "successPop 0.4s ease both",
              }}>
                <CheckCircle size={18} />
                Login successful! Redirecting...
              </div>
            )}

            {/* Error */}
            {error && !success && (
              <div style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "13px 16px",
                background: "rgba(239,68,68,0.1)",
                border: "1px solid rgba(239,68,68,0.3)",
                borderRadius: 12, marginBottom: 24, color: "#f87171", fontSize: 13,
                animation: "fadeSlideUp 0.3s ease both",
              }}>
                <AlertCircle size={16} style={{ flexShrink: 0 }} />
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {/* Email */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  Email Address
                </label>
                <div style={{ position: "relative" }}>
                  <Mail size={16} color={focusField === "email" ? "#a5b4fc" : "rgba(255,255,255,0.3)"}
                    style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", transition: "color 0.2s", pointerEvents: "none" }} />
                  <input
                    ref={emailRef}
                    id="admin-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocusField("email")}
                    onBlur={() => setFocusField(null)}
                    required
                    placeholder="admin@rkgit.edu.in"
                    className={`admin-input${error ? " input-error" : ""}`}
                    autoComplete="email"
                  />
                </div>
              </div>

              {/* Password */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  Password
                </label>
                <div style={{ position: "relative" }}>
                  <Lock size={16} color={focusField === "password" ? "#a5b4fc" : "rgba(255,255,255,0.3)"}
                    style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", transition: "color 0.2s", pointerEvents: "none" }} />
                  <input
                    id="admin-password"
                    type={showPw ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocusField("password")}
                    onBlur={() => setFocusField(null)}
                    required
                    placeholder="Enter your password"
                    className={`admin-input${error ? " input-error" : ""}`}
                    autoComplete="current-password"
                    style={{ paddingRight: 44 }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw((s) => !s)}
                    style={{
                      position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)",
                      background: "none", border: "none", cursor: "pointer",
                      color: "rgba(255,255,255,0.3)", display: "flex", alignItems: "center",
                      transition: "color 0.2s", padding: 0,
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.3)")}
                  >
                    {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Remember me */}
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <input
                  id="remember-me"
                  type="checkbox"
                  style={{
                    width: 16, height: 16, borderRadius: 4, accentColor: "#6366f1", cursor: "pointer",
                  }}
                />
                <label htmlFor="remember-me" style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", cursor: "pointer", userSelect: "none" }}>
                  Remember me on this device
                </label>
              </div>

              {/* Submit */}
              <button type="submit" disabled={loading || success} className="login-btn" style={{ marginTop: 4 }}>
                {loading ? (
                  <>
                    <div style={{
                      width: 18, height: 18, borderRadius: "50%",
                      border: "2px solid rgba(255,255,255,0.3)",
                      borderTopColor: "#fff",
                      animation: "spin 0.7s linear infinite",
                    }} />
                    Authenticating...
                  </>
                ) : success ? (
                  <>
                    <CheckCircle size={18} />
                    Redirecting...
                  </>
                ) : (
                  <>
                    Sign In to Dashboard
                    <ArrowRight size={17} />
                  </>
                )}
              </button>
            </form>

            {/* Demo credentials card */}
            <div style={{
              marginTop: 28,
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 14,
              padding: "16px 18px",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 6px #4ade80" }} />
                <span style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  Demo Access Credentials
                </span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <div style={{ display: "flex", gap: 8, alignItems: "center", fontSize: 13 }}>
                  <span style={{ color: "rgba(255,255,255,0.3)", minWidth: 64 }}>Email</span>
                  <code style={{
                    background: "rgba(99,102,241,0.15)", padding: "2px 10px", borderRadius: 6,
                    color: "#a5b4fc", fontSize: 12, fontFamily: "monospace",
                  }}>rkgit@rkgit.edu.in</code>
                </div>
                <div style={{ display: "flex", gap: 8, alignItems: "center", fontSize: 13 }}>
                  <span style={{ color: "rgba(255,255,255,0.3)", minWidth: 64 }}>Password</span>
                  <code style={{
                    background: "rgba(99,102,241,0.15)", padding: "2px 10px", borderRadius: 6,
                    color: "#a5b4fc", fontSize: 12, fontFamily: "monospace",
                  }}>admin123</code>
                </div>
              </div>
            </div>

            {/* Back link */}
            <div style={{ marginTop: 24, textAlign: "center" }}>
              <a href="/" style={{
                fontSize: 13, color: "rgba(255,255,255,0.3)",
                textDecoration: "none", transition: "color 0.2s",
                display: "inline-flex", alignItems: "center", gap: 4,
              }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.3)")}
              >
                ← Back to RKGIT Website
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
