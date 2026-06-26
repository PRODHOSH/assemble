"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@/lib/supabase";
import { useModalStore } from "@/store/useModalStore";
import styles from "./modal.module.css";

const ease = [0.645, 0.045, 0.355, 1] as const;

export function AuthModal() {
  const { isAuthModalOpen, closeAuthModal, openOnboardingModal } = useModalStore();
  
  const [mode, setMode] = useState<"login" | "signup" | "verify">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const supabase = createClient();

  if (!isAuthModalOpen) return null;

  const handleOAuth = async (provider: "google" | "github") => {
    // DEMO MODE: Mock OAuth login
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem("demo_user", JSON.stringify({ id: "123", email: "demo@example.com" }));
      closeAuthModal();
      window.location.href = "/projects";
    }, 1000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // DEMO MODE: Mock email auth
    setTimeout(() => {
      if (mode === "signup") {
        if (password.length < 8) {
          setError("Password must be at least 8 characters.");
          setLoading(false);
          return;
        }
        setMode("verify");
      } else {
        localStorage.setItem("demo_user", JSON.stringify({ id: "123", email }));
        closeAuthModal();
        window.location.href = "/projects";
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className={styles.overlay}>
      <motion.div
        className={styles.modalCard}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.4, ease }}
      >
        <button className={styles.closeBtn} onClick={closeAuthModal} aria-label="Close">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className={styles.authLogo}>
          <span className={styles.logoBracket}>&lt;</span>
          <span className={styles.logoName}>Assemble</span>
          <span className={styles.logoBracket}>/&gt;</span>
        </div>

        <AnimatePresence mode="wait">
          {mode === "verify" ? (
            <motion.div
              key="verify"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4, ease }}
              style={{ textAlign: "center" }}
            >
              <h2 className={styles.title}>Check your email</h2>
              <p className={styles.subtitle} style={{ marginTop: 12 }}>
                We sent a verification link to <br/>
                <strong style={{ color: "var(--accent)" }}>{email}</strong>
              </p>
              <p className={styles.subtitle}>
                Click the link in that email to activate your account.
              </p>
              <div className={styles.authFooter}>
                Already verified? <button onClick={() => setMode("login")}>Sign in</button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h1 className={styles.title}>
                {mode === "login" ? "Welcome back" : "Create an account"}
              </h1>
              <p className={styles.subtitle}>
                {mode === "login"
                  ? "Sign in to your Assemble account"
                  : "Join Assemble — pitch ideas, recruit teammates."}
              </p>

              {error && <p className={styles.errorMsg}>{error}</p>}

              <div className={styles.oauthGroup}>
                <button className={styles.oauthBtn} onClick={() => handleOAuth("google")} type="button">
                  <svg className={styles.oauthIcon} viewBox="0 0 24 24" fill="none">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  {mode === "login" ? "Continue with Google" : "Sign up with Google"}
                </button>

                <button className={styles.oauthBtn} onClick={() => handleOAuth("github")} type="button">
                  <svg className={styles.oauthIcon} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                  </svg>
                  {mode === "login" ? "Continue with GitHub" : "Sign up with GitHub"}
                </button>
              </div>

              <div className={styles.divider}>
                <span className={styles.dividerLine} />
                <span className={styles.dividerText}>or {mode === "login" ? "sign in" : "sign up"} with email</span>
                <span className={styles.dividerLine} />
              </div>

              <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Email</label>
                  <input
                    type="email"
                    className={styles.formInput}
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Password {mode === "signup" && "(min 8 chars)"}</label>
                  <div className={styles.passwordWrap}>
                    <input
                      type={showPassword ? "text" : "password"}
                      className={styles.formInput}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className={styles.passwordToggle}
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/>
                          <line x1="1" y1="1" x2="23" y2="23"/>
                        </svg>
                      ) : (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                          <circle cx="12" cy="12" r="3"/>
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                <button type="submit" className={styles.submitBtn} disabled={loading}>
                  {loading ? <span className={styles.spinner} /> : null}
                  {loading ? (mode === "login" ? "Signing in…" : "Creating account…") : (mode === "login" ? "Sign In" : "Create Account")}
                </button>
              </form>

              <div className={styles.authFooter}>
                {mode === "login" ? (
                  <>
                    Don&apos;t have an account? <button onClick={() => setMode("signup")}>Create one</button>
                  </>
                ) : (
                  <>
                    Already have an account? <button onClick={() => setMode("login")}>Sign in</button>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
