"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase";
import { useModalStore } from "@/store/useModalStore";
import styles from "./modal.module.css";

const ease = [0.645, 0.045, 0.355, 1] as const;

export function PitchProjectModal() {
  const { isPitchModalOpen, closePitchModal } = useModalStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [roles, setRoles] = useState([{ title: "", description: "" }]);

  const supabase = createClient();

  if (!isPitchModalOpen) return null;

  const handleAddRole = () => {
    setRoles([...roles, { title: "", description: "" }]);
  };

  const handleRoleChange = (index: number, field: "title" | "description", value: string) => {
    const newRoles = [...roles];
    newRoles[index][field] = value;
    setRoles(newRoles);
  };

  const handleRemoveRole = (index: number) => {
    const newRoles = roles.filter((_, i) => i !== index);
    setRoles(newRoles);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // DEMO MODE: Mock project pitch
    setTimeout(() => {
      closePitchModal();
      window.location.href = "/projects";
    }, 1000);
  };

  return (
    <div className={styles.overlay}>
      <motion.div
        className={`${styles.modalCard} ${styles.modalCardLarge}`}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.4, ease }}
      >
        <button className={styles.closeBtn} onClick={closePitchModal} aria-label="Close" type="button">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <h1 className={styles.title}>Pitch a Project</h1>
        <p className={styles.subtitle}>Define your idea and recruit your team.</p>

        {error && <p className={styles.errorMsg}>{error}</p>}

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Project Name</label>
            <input type="text" className={styles.formInput} value={title} onChange={e => setTitle(e.target.value)} required />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Description (Markdown supported)</label>
            <textarea className={`${styles.formInput} ${styles.formTextarea}`} value={description} onChange={e => setDescription(e.target.value)} required />
          </div>

          <div className={styles.divider}>
            <span className={styles.dividerLine} />
            <span className={styles.dividerText}>Team Roles Required</span>
            <span className={styles.dividerLine} />
          </div>

          {roles.map((role, i) => (
            <div key={i} style={{ padding: "16px", border: "1px solid var(--border)", borderRadius: "var(--radius-md)", marginBottom: "12px", position: "relative" }}>
              {roles.length > 1 && (
                <button type="button" onClick={() => handleRemoveRole(i)} style={{ position: "absolute", top: 8, right: 8, color: "#EF4444", background: "none", border: "none", cursor: "pointer" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
              )}
              <div className={styles.formGroup} style={{ marginBottom: "12px" }}>
                <label className={styles.formLabel}>Role Title</label>
                <input type="text" className={styles.formInput} value={role.title} onChange={e => handleRoleChange(i, "title", e.target.value)} placeholder="e.g. ML Engineer" required />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Role Description</label>
                <textarea className={styles.formInput} value={role.description} onChange={e => handleRoleChange(i, "description", e.target.value)} placeholder="Responsibilities, skills needed..." style={{ minHeight: "80px", resize: "vertical" }} required />
              </div>
            </div>
          ))}

          <button type="button" onClick={handleAddRole} style={{ color: "var(--accent)", background: "none", border: "none", cursor: "pointer", fontFamily: "var(--font-medium)", textAlign: "left", marginBottom: "8px" }}>
            + Add another role
          </button>

          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? <span className={styles.spinner} /> : null}
            {loading ? "Publishing..." : "Publish Project"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
