"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";
import { useModalStore } from "@/store/useModalStore";
import { motion } from "framer-motion";

const ease = [0.645, 0.045, 0.355, 1] as const;

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();
  const { openOnboardingModal, openPitchModal } = useModalStore();

  useEffect(() => {
    async function checkProfileAndLoadProjects() {
      // DEMO MODE: Mock auth and project fetching
      const user = localStorage.getItem("demo_user");
      
      if (user) {
        const isCompleted = localStorage.getItem("demo_profile_completed") === "true";
        if (!isCompleted) {
          openOnboardingModal();
        }
      }

      // Hardcoded dummy projects
      setTimeout(() => {
        setProjects([
          {
            id: "1",
            title: "AI Research Platform",
            description: "A platform for researchers to collaborate on open-source machine learning models.",
            profiles: { full_name: "Alice Builder" },
            project_roles: [
              { id: "r1", title: "ML Engineer", is_filled: false },
              { id: "r2", title: "Backend Dev", is_filled: false },
              { id: "r3", title: "UI Designer", is_filled: true }
            ]
          },
          {
            id: "2",
            title: "Open-Source CLI Tool",
            description: "A blazingly fast CLI tool written in Rust for developers to scaffold Next.js apps.",
            profiles: { full_name: "Bob Coder" },
            project_roles: [
              { id: "r4", title: "Rust Developer", is_filled: false }
            ]
          }
        ]);
        setLoading(false);
      }, 600);
    }
    checkProfileAndLoadProjects();
  }, [openOnboardingModal]);

  return (
    <div style={{ padding: "100px 5%", maxWidth: 1300, margin: "0 auto", minHeight: "100vh" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 40 }}>
        <h1 style={{ fontFamily: "var(--font-heading)", fontSize: 36, color: "var(--text)" }}>Open Projects</h1>
        <button 
          onClick={openPitchModal}
          style={{ 
            background: "var(--accent)", color: "#fff", padding: "10px 20px", 
            borderRadius: "var(--radius-full)", fontFamily: "var(--font-bold)", 
            cursor: "pointer", border: "none" 
          }}>
          Pitch a Project
        </button>
      </div>

      {loading ? (
        <p style={{ color: "var(--secondary-text)" }}>Loading projects...</p>
      ) : projects.length === 0 ? (
        <p style={{ color: "var(--secondary-text)" }}>No projects found. Be the first to pitch one!</p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 24 }}>
          {projects.map((p, i) => (
            <motion.div 
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.4, ease }}
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-lg)",
                padding: 24,
                display: "flex",
                flexDirection: "column",
                gap: 16
              }}
            >
              <div>
                <h2 style={{ fontFamily: "var(--font-heading)", fontSize: 20, color: "var(--text)", marginBottom: 8 }}>{p.title}</h2>
                <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--secondary-text)", lineHeight: 1.6, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical" }}>
                  {p.description}
                </p>
              </div>

              <div style={{ borderTop: "1px solid var(--border)", paddingTop: 16 }}>
                <h3 style={{ fontFamily: "var(--font-medium)", fontSize: 12, textTransform: "uppercase", letterSpacing: 1, color: "var(--secondary-text)", marginBottom: 12 }}>Roles Required</h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {p.project_roles?.map((r: any) => (
                    <span key={r.id} style={{ 
                      fontFamily: "var(--font-medium)", fontSize: 12, 
                      padding: "4px 12px", borderRadius: "var(--radius-full)",
                      background: r.is_filled ? "rgba(16, 185, 129, 0.1)" : "var(--highlight)",
                      color: r.is_filled ? "#10B981" : "var(--accent-light)",
                      border: `1px solid ${r.is_filled ? "rgba(16, 185, 129, 0.25)" : "var(--accent)"}`
                    }}>
                      {r.title} {r.is_filled && "(Filled)"}
                    </span>
                  ))}
                  {(!p.project_roles || p.project_roles.length === 0) && <span style={{ color: "var(--secondary-text)", fontSize: 13 }}>No roles specified</span>}
                </div>
              </div>

              <div style={{ marginTop: "auto", display: "flex", justifyContent: "flex-end", paddingTop: 12 }}>
                <button style={{ 
                  background: "var(--surface-tint)", color: "var(--text)", 
                  padding: "8px 16px", borderRadius: "var(--radius-full)", 
                  fontFamily: "var(--font-medium)", fontSize: 13, border: "1px solid var(--border)",
                  cursor: "pointer"
                }}>
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
