"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { useModalStore } from "@/store/useModalStore";
import styles from "./page.module.css";

/* ─── EASE (same as masterPortfolio cubic-bezier) ─── */
const ease = [0.645, 0.045, 0.355, 1] as const;

/* ─── SCROLL FADE HOOK ─── */
function useFade(once = true) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-80px" });
  return { ref, isInView };
}

/* ================================================================
   NAVBAR
================================================================ */
function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      className={`${styles.header} ${scrolled ? styles.headerScrolled : ""}`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease }}
    >
      <a href="/" className={styles.logo}>
        <span className={styles.logoBracket}>&lt;</span>
        <span className={styles.logoName}>Assemble</span>
        <span className={styles.logoBracket}>/&gt;</span>
      </a>

      {/* Desktop nav */}
      <nav className={styles.desktopNav}>
        <a href="#features" className={styles.navLink}>How It Works</a>
        <a href="#showcase" className={styles.navLink}>Features</a>
        <a href="#faq" className={styles.navLink}>FAQ</a>
        <button onClick={() => useModalStore.getState().openAuthModal()} className={styles.navCta}>Sign In</button>
        <button onClick={() => useModalStore.getState().openPitchModal()} className={styles.navCtaPrimary}>Pitch a Project</button>
      </nav>

      {/* Mobile hamburger */}
      <button
        className={styles.menuIcon}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span className={`${styles.navicon} ${menuOpen ? styles.naviconOpen : ""}`} />
      </button>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2, ease }}
          >
            <a href="#features" className={styles.mobileNavLink} onClick={() => setMenuOpen(false)}>How It Works</a>
            <a href="#showcase" className={styles.mobileNavLink} onClick={() => setMenuOpen(false)}>Features</a>
            <a href="#faq" className={styles.mobileNavLink} onClick={() => setMenuOpen(false)}>FAQ</a>
            <button className={styles.mobileNavLink} onClick={() => { setMenuOpen(false); useModalStore.getState().openAuthModal(); }}>Sign In</button>
            <button className={styles.navCtaPrimary} onClick={() => { setMenuOpen(false); useModalStore.getState().openPitchModal(); }}>Pitch a Project</button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

/* ================================================================
   HERO
================================================================ */
function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <motion.p
          className={styles.greetingNickname}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease, delay: 0.1 }}
        >
          Remote-first · builder-focused
        </motion.p>

        <motion.h1
          className={styles.greetingHeading}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.2 }}
        >
          Turn Ideas into<br />
          <span className={styles.greetingAccent}>Execution-Ready</span><br />
          Teams.
        </motion.h1>

        <motion.p
          className={styles.greetingBody}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.35 }}
        >
          Stop hunting through Discord servers, Reddit posts, and LinkedIn DMs.
          Pitch your project, recruit the right people, and launch with a
          fully provisioned workspace — all in one place.
        </motion.p>

        <motion.div
          className={styles.buttonGreetingDiv}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease, delay: 0.5 }}
        >
          <button onClick={() => useModalStore.getState().openPitchModal()} className={styles.btnPrimary} id="hero-pitch-cta">
            Pitch a Project
          </button>
          <a href="#showcase" className={styles.btnSecondary} id="hero-explore-cta">
            See How It Works
          </a>
        </motion.div>
      </div>

      <motion.div
        className={styles.heroVisual}
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease, delay: 0.3 }}
        aria-hidden="true"
      >
        <HeroMockup />
      </motion.div>
    </section>
  );
}

/* ── Hero right-side mockup card ── */
function HeroMockup() {
  return (
    <div className={styles.heroMockupWrap}>
      <div className={styles.heroMockupCard}>
        <div className={styles.mockupCardHeader}>
          <div className={styles.mockupDots}>
            <span /><span /><span />
          </div>
          <span className={styles.mockupCardTitle}>assemble.dev/projects</span>
        </div>

        <div className={styles.mockupProjectItem}>
          <div className={styles.mockupProjectMeta}>
            <span className={styles.mockupBadge} style={{ background: "#10B981" }}>Open</span>
            <span className={styles.mockupProjectName}>AI Research Platform</span>
          </div>
          <div className={styles.mockupTagRow}>
            <span className={styles.mockupTag}>Python</span>
            <span className={styles.mockupTag}>PyTorch</span>
            <span className={styles.mockupTag}>FastAPI</span>
          </div>
          <div className={styles.mockupRoles}>
            <div className={styles.mockupRole}><span className={styles.roleDot} style={{ background: "#7C3AED" }} />ML Engineer</div>
            <div className={styles.mockupRole}><span className={styles.roleDot} style={{ background: "#7C3AED" }} />Backend Dev</div>
            <div className={styles.mockupRole}><span className={styles.roleDot} style={{ background: "#2E2A45" }} />UI Designer — Filled</div>
          </div>
        </div>

        <div className={styles.mockupDivider} />

        <div className={styles.mockupProjectItem}>
          <div className={styles.mockupProjectMeta}>
            <span className={styles.mockupBadge} style={{ background: "#F59E0B" }}>2 spots left</span>
            <span className={styles.mockupProjectName}>Open-Source CLI Tool</span>
          </div>
          <div className={styles.mockupTagRow}>
            <span className={styles.mockupTag}>Rust</span>
            <span className={styles.mockupTag}>CLI</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   FEATURE SHOWCASES — alternating left/right
================================================================ */
const showcases = [
  {
    label: "Pitch",
    heading: "Post your project in minutes.",
    body: "Define your idea, required roles, tech stack, and commitment level. Every pitch goes through a quick review to keep quality high — only real projects reach contributors.",
    link: { text: "Start a pitch", href: "/signup" },
    visual: <PitchMockup />,
    reverse: false,
  },
  {
    label: "Recruit",
    heading: "Review applications your way.",
    body: "Every applicant brings a structured profile — GitHub, portfolio, resume, and answers to your custom questions. An internal matching score helps you surface the strongest candidates instantly.",
    link: { text: "See how it works", href: "#how-it-works" },
    visual: <ReviewMockup />,
    reverse: true,
  },
  {
    label: "Launch",
    heading: "Your workspace, ready before day one.",
    body: "The moment your last required role is filled, Assemble provisions a GitHub organisation with the right team permissions and a Discord server with role-specific channels. Everyone gets their invite automatically.",
    link: { text: "Get started", href: "/signup" },
    visual: <WorkspaceMockup />,
    reverse: false,
  },
];

function PitchMockup() {
  return (
    <div className={styles.showcaseMockup}>
      <div className={styles.mockupCardHeader}>
        <div className={styles.mockupDots}><span /><span /><span /></div>
        <span className={styles.mockupCardTitle}>New Project</span>
      </div>
      <div className={styles.pitchForm}>
        <div className={styles.pitchField}>
          <span className={styles.pitchLabel}>Project Title</span>
          <div className={styles.pitchInput}>AI Research Platform</div>
        </div>
        <div className={styles.pitchField}>
          <span className={styles.pitchLabel}>Category</span>
          <div className={styles.pitchInputRow}>
            <span className={styles.mockupTag} style={{ borderColor: "#7C3AED", color: "#A78BFA" }}>AI / ML</span>
            <span className={styles.mockupTag}>Web</span>
            <span className={styles.mockupTag}>Open Source</span>
          </div>
        </div>
        <div className={styles.pitchField}>
          <span className={styles.pitchLabel}>Required Roles</span>
          <div className={styles.pitchRoleRow}>
            <span className={styles.pitchRoleChip}>ML Engineer</span>
            <span className={styles.pitchRoleChip}>Backend Dev</span>
            <span className={styles.pitchAddRole}>+ Add role</span>
          </div>
        </div>
        <div className={styles.pitchField}>
          <span className={styles.pitchLabel}>Commitment</span>
          <div className={styles.pitchInputRow}>
            <span className={styles.mockupTag} style={{ borderColor: "#7C3AED", color: "#A78BFA" }}>Part-time</span>
            <span className={styles.mockupTag}>Full-time</span>
          </div>
        </div>
        <div className={styles.pitchSubmit}>Submit for Review</div>
      </div>
    </div>
  );
}

function ReviewMockup() {
  const applicants = [
    { name: "Marcus C.", role: "ML Engineer", score: 94, status: "Shortlisted" },
    { name: "Priya S.", role: "ML Engineer", score: 88, status: "New" },
    { name: "Alex K.", role: "Backend Dev", score: 79, status: "New" },
  ];
  return (
    <div className={styles.showcaseMockup}>
      <div className={styles.mockupCardHeader}>
        <div className={styles.mockupDots}><span /><span /><span /></div>
        <span className={styles.mockupCardTitle}>Applications — 12 total</span>
      </div>
      <div className={styles.applicantList}>
        {applicants.map((a, i) => (
          <div key={i} className={styles.applicantRow}>
            <div className={styles.applicantAvatar}>{a.name.charAt(0)}</div>
            <div className={styles.applicantInfo}>
              <p className={styles.applicantName}>{a.name}</p>
              <p className={styles.applicantRole}>{a.role}</p>
            </div>
            <div className={styles.applicantRight}>
              <div className={styles.scoreBar}>
                <div className={styles.scoreFill} style={{ width: `${a.score}%` }} />
              </div>
              <span className={styles.scoreNum}>{a.score}</span>
              <span className={`${styles.applicantStatus} ${a.status === "Shortlisted" ? styles.statusShortlisted : styles.statusNew}`}>
                {a.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function WorkspaceMockup() {
  return (
    <div className={styles.showcaseMockup}>
      <div className={styles.mockupCardHeader}>
        <div className={styles.mockupDots}><span /><span /><span /></div>
        <span className={styles.mockupCardTitle}>Workspace Provisioned</span>
      </div>
      <div className={styles.workspaceItems}>
        <div className={styles.workspaceItem}>
          <div className={styles.workspaceIcon}>
            <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" width="18" height="18">
              <path d="M10 0C4.477 0 0 4.477 0 10c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.604-3.369-1.341-3.369-1.341-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C17.137 18.163 20 14.418 20 10c0-5.523-4.477-10-10-10z" fill="#A78BFA"/>
            </svg>
          </div>
          <div className={styles.workspaceInfo}>
            <p className={styles.workspaceName}>GitHub Org created</p>
            <p className={styles.workspaceDetail}>PRODHOSH/ai-research-platform</p>
          </div>
          <div className={styles.workspaceCheck}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8l3.5 3.5L13 4.5" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        <div className={styles.workspaceItem}>
          <div className={styles.workspaceIcon}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" fill="#A78BFA"/>
            </svg>
          </div>
          <div className={styles.workspaceInfo}>
            <p className={styles.workspaceName}>Discord Server created</p>
            <p className={styles.workspaceDetail}>8 channels · 5 members invited</p>
          </div>
          <div className={styles.workspaceCheck}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8l3.5 3.5L13 4.5" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        <div className={styles.workspaceReadyBadge}>
          Team Complete — Ready to Build
        </div>
      </div>
    </div>
  );
}

function FeatureShowcases() {
  return (
    <section className={styles.showcaseSection} id="showcase">
      {showcases.map((s, i) => {
        const { ref, isInView } = useFadeSection();
        return (
          <div
            key={i}
            className={`${styles.showcaseRow} ${s.reverse ? styles.showcaseReverse : ""}`}
            ref={ref}
          >
            <motion.div
              className={styles.showcaseVisual}
              initial={{ opacity: 0, x: s.reverse ? 40 : -40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, ease }}
            >
              {s.visual}
            </motion.div>

            <motion.div
              className={styles.showcaseContent}
              initial={{ opacity: 0, x: s.reverse ? -40 : 40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, ease, delay: 0.12 }}
            >
              <p className={styles.sectionLabel}>{s.label}</p>
              <h2 className={styles.showcaseHeading}>{s.heading}</h2>
              <p className={styles.showcaseBody}>{s.body}</p>
              <a href={s.link.href} className={styles.showcaseLink}>
                {s.link.text}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ marginLeft: 6 }}>
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </motion.div>
          </div>
        );
      })}
    </section>
  );
}

/* helper — can't call hooks in a .map callback directly */
function useFadeSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return { ref, isInView };
}

/* ================================================================
   HOW IT WORKS
================================================================ */
const steps = [
  {
    num: "01",
    title: "Create Your Profile",
    body: "Add your skills, GitHub, portfolio, timezone, and availability. Your profile is your application — keep it sharp.",
  },
  {
    num: "02",
    title: "Pitch or Discover",
    body: "Post a project and recruit, or browse approved projects and apply to the ones that match your skills and interests.",
  },
  {
    num: "03",
    title: "Review & Discuss",
    body: "Project admins review ranked applications, shortlist candidates, and schedule discussions via Cal.com.",
  },
  {
    num: "04",
    title: "Build Together",
    body: "Once all roles are filled, your GitHub org and Discord server are auto-provisioned. The team is ready.",
  },
];

function HowItWorks() {
  const { ref, isInView } = useFade();

  return (
    <section className={styles.howSection} id="how-it-works">
      <div className={styles.sectionInner}>
        <motion.div
          ref={ref}
          className={styles.sectionHeader}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease }}
        >
          <p className={styles.sectionLabel}>How It Works</p>
          <h2 className={styles.sectionHeading}>From idea to team in four steps.</h2>
        </motion.div>

        <div className={styles.stepsGrid}>
          {steps.map((step, i) => (
            <StepCard key={i} step={step} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StepCard({ step, delay }: { step: typeof steps[0]; delay: number }) {
  const { ref, isInView } = useFade();
  return (
    <motion.div
      ref={ref}
      className={styles.stepCard}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease, delay }}
    >
      <span className={styles.stepNum}>{step.num}</span>
      <h3 className={styles.stepTitle}>{step.title}</h3>
      <p className={styles.stepBody}>{step.body}</p>
    </motion.div>
  );
}

/* ================================================================
   TESTIMONIALS — infinite marquee (auto-loop, two rows)
================================================================ */
const testimonials = [
  {
    name: "Marcus Chen",
    role: "CS Student · IIT Delhi",
    quote: "Found my co-founder for our AI startup through Assemble in less than a week. The structured applications actually filtered out the noise.",
    initials: "MC",
  },
  {
    name: "Priya Sharma",
    role: "Indie Developer",
    quote: "I had a side project sitting in my head for two years. Posted it on Assemble and had three qualified applicants within 48 hours.",
    initials: "PS",
  },
  {
    name: "Alex Kim",
    role: "Open-Source Maintainer",
    quote: "The auto-provisioned Discord server was genuinely surprising. We had channels and permissions set up before our first meeting.",
    initials: "AK",
  },
  {
    name: "Ananya Rao",
    role: "Hackathon Participant",
    quote: "Used Assemble to build our hackathon team. The skill-match scoring is what got me — it surfaces people who actually fit the roles.",
    initials: "AR",
  },
  {
    name: "David Park",
    role: "Startup Founder",
    quote: "Replaced my usual LinkedIn post cycle entirely. The quality of applicants on Assemble is significantly higher.",
    initials: "DP",
  },
  {
    name: "Shreya Nair",
    role: "UI/UX Designer",
    quote: "I can finally discover projects looking for designers specifically, not just engineers who also need a logo.",
    initials: "SN",
  },
  {
    name: "Ravi Patel",
    role: "ML Engineer",
    quote: "The custom application questions let me show actual depth instead of just sending a resume into a void.",
    initials: "RP",
  },
  {
    name: "Zoe Williams",
    role: "Hardware Builder",
    quote: "Finally a platform where I can find someone who understands both firmware and product design. Niche but real.",
    initials: "ZW",
  },
];

/* duplicated for seamless loop */
const rowA = [...testimonials, ...testimonials];
const rowB = [...testimonials.slice(4), ...testimonials.slice(0, 4), ...testimonials.slice(4), ...testimonials.slice(0, 4)];

function Testimonials() {
  const { ref, isInView } = useFade();

  return (
    <section className={styles.testimonialSection}>
      <div className={styles.sectionInner}>
        <motion.div
          ref={ref}
          className={styles.sectionHeader}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease }}
        >
          <p className={styles.sectionLabel}>Testimonials</p>
          <h2 className={styles.sectionHeading}>Builders already assembling.</h2>
        </motion.div>
      </div>

      {/* Row 1 — scrolls left */}
      <div className={styles.marqueeOuter}>
        <div className={styles.marqueeTrack}>
          {rowA.map((t, i) => (
            <TestimonialCard key={`a-${i}`} t={t} />
          ))}
        </div>
      </div>

      {/* Row 2 — scrolls right */}
      <div className={styles.marqueeOuter} style={{ marginTop: 20 }}>
        <div className={`${styles.marqueeTrack} ${styles.marqueeReverse}`}>
          {rowB.map((t, i) => (
            <TestimonialCard key={`b-${i}`} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ t }: { t: typeof testimonials[0] }) {
  return (
    <div className={styles.testimonialCard}>
      <p className={styles.testimonialQuote}>&ldquo;{t.quote}&rdquo;</p>
      <div className={styles.testimonialAuthor}>
        <div className={styles.testimonialAvatar}>{t.initials}</div>
        <div>
          <p className={styles.testimonialName}>{t.name}</p>
          <p className={styles.testimonialRole}>{t.role}</p>
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   FAQ
================================================================ */
const faqs = [
  {
    q: "How does project approval work?",
    a: "Every project submitted goes through a review by our platform team before going live. We check that it has a clear scope, realistic required roles, and is a genuine builder project. This keeps the quality high for contributors.",
  },
  {
    q: "How many projects can I apply to at once?",
    a: "Each contributor can actively apply to a maximum of three projects at the same time. This encourages thoughtful, quality applications rather than mass applying.",
  },
  {
    q: "What happens when all required roles are filled?",
    a: "Once every required role has been filled and confirmed by the project admin, Assemble automatically provisions a GitHub organisation with the right repository and team permissions, and a Discord server with role-specific channels. Every member receives an invitation.",
  },
  {
    q: "Is Assemble free to use?",
    a: "The core experience — discovering projects, building teams, and receiving a workspace — is completely free. Future premium features like verified profiles, featured listings, and advanced insights will be optional add-ons.",
  },
  {
    q: "Can I use Assemble for hackathon teams?",
    a: "Absolutely. Hackathon team-building is one of the primary use cases. You can filter projects by commitment level, team size, and deadline to find teams that match your schedule.",
  },
  {
    q: "What do I need to apply for a project?",
    a: "A GitHub account is required. Applications also include your portfolio and resume. Project admins can define additional custom questions specific to their project.",
  },
  {
    q: "How does the matching score work?",
    a: "We rank applications internally based on skill alignment with the required role, profile completeness, availability match, and responses to custom questions. It's a directional signal to help admins prioritise — not a hard filter.",
  },
  {
    q: "Can project admins schedule interviews?",
    a: "Yes. Shortlisted candidates can be scheduled for a discussion directly through Cal.com integration. The scheduling link is available within the application review dashboard.",
  },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  const { ref, isInView } = useFade();

  return (
    <section className={styles.faqSection} id="faq">
      <div className={styles.sectionInner}>
        <motion.div
          ref={ref}
          className={styles.sectionHeader}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease }}
        >
          <p className={styles.sectionLabel}>FAQ</p>
          <h2 className={styles.sectionHeading}>Common questions.</h2>
        </motion.div>

        <div className={styles.faqList}>
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              faq={faq}
              index={i}
              isOpen={open === i}
              onToggle={() => setOpen(open === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQItem({
  faq,
  index,
  isOpen,
  onToggle,
}: {
  faq: { q: string; a: string };
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const { ref, isInView } = useFade();
  return (
    <motion.div
      ref={ref}
      className={`${styles.faqItem} ${isOpen ? styles.faqItemOpen : ""}`}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, ease, delay: index * 0.05 }}
    >
      <button className={styles.faqQuestion} onClick={onToggle} id={`faq-${index}`}>
        <span>{faq.q}</span>
        <motion.span
          className={styles.faqChevron}
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25, ease }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M4.5 6.75L9 11.25l4.5-4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            className={styles.faqAnswer}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease }}
          >
            <p>{faq.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ================================================================
   CTA BANNER
================================================================ */
function CTA() {
  const { ref, isInView } = useFade();
  return (
    <section className={styles.ctaSection}>
      <motion.div
        ref={ref}
        className={styles.ctaInner}
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65, ease }}
      >
        <h2 className={styles.ctaHeading}>Your next project is waiting for its team.</h2>
        <p className={styles.ctaBody}>
          Pitch an idea or find a project worth contributing to.
          Assemble handles the rest.
        </p>
        <div className={styles.ctaButtons}>
          <a href="/signup" className={styles.btnPrimary} id="cta-signup">
            Get Started — it&apos;s free
          </a>
          <a href="/explore" className={styles.btnSecondaryLight} id="cta-explore">
            Explore Projects
          </a>
        </div>
      </motion.div>
    </section>
  );
}

/* ================================================================
   FOOTER
================================================================ */
function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <a href="/" className={styles.footerLogo}>
          <span className={styles.logoBracket}>&lt;</span>
          <span className={styles.logoName}>Assemble</span>
          <span className={styles.logoBracket}>/&gt;</span>
        </a>
        <p className={styles.footerTagline}>Find teammates. Build together. Ship faster.</p>
        <div className={styles.footerLinks}>
          <a href="/explore">Explore</a>
          <a href="/signup">Pitch a Project</a>
          <a href="#faq">FAQ</a>
          <a href="https://github.com/PRODHOSH" target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
        <p className={styles.footerCopy}>
          © {new Date().getFullYear()} Assemble · Built by Prodhosh V.S.
        </p>
      </div>
    </footer>
  );
}

/* ================================================================
   PAGE ROOT
================================================================ */
export default function Home() {
  return (
    <div className={styles.page}>
      <Navbar />
      <Hero />
      <FeatureShowcases />
      <Testimonials />
      <HowItWorks />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
}
