"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase";
import { useModalStore } from "@/store/useModalStore";
import styles from "./modal.module.css";

const ease = [0.645, 0.045, 0.355, 1] as const;

export function OnboardingModal() {
  const { isOnboardingModalOpen, closeOnboardingModal } = useModalStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    full_name: "",
    avatar_url: "",
    github_url: "",
    linkedin_url: "",
    portfolio_url: "",
    about_me: "",
    other_links: "",
    skills: "", // comma separated
  });

  const supabase = createClient();

  if (!isOnboardingModalOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // DEMO MODE: Mock profile save
    setTimeout(() => {
      localStorage.setItem("demo_profile_completed", "true");
      closeOnboardingModal();
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
        <h1 className={styles.title}>Complete your profile</h1>
        <p className={styles.subtitle}>Introduce yourself to the Assemble community.</p>

        {error && <p className={styles.errorMsg}>{error}</p>}

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Full Name</label>
            <input type="text" name="full_name" className={styles.formInput} required onChange={handleChange} />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Profile Photo URL</label>
            <input type="url" name="avatar_url" className={styles.formInput} onChange={handleChange} />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>GitHub URL</label>
            <input type="url" name="github_url" className={styles.formInput} required onChange={handleChange} />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>LinkedIn URL</label>
            <input type="url" name="linkedin_url" className={styles.formInput} onChange={handleChange} />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Portfolio URL</label>
            <input type="url" name="portfolio_url" className={styles.formInput} onChange={handleChange} />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>About Me</label>
            <textarea name="about_me" className={`${styles.formInput} ${styles.formTextarea}`} required onChange={handleChange} />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Skills (comma separated)</label>
            <input type="text" name="skills" className={styles.formInput} placeholder="React, Node.js, Python" required onChange={handleChange} />
          </div>

          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? <span className={styles.spinner} /> : null}
            {loading ? "Saving..." : "Complete Profile"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
