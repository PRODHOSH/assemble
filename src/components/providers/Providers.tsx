"use client";

import { ThemeProvider } from "next-themes";
import { useEffect, useState } from "react";
// We will import modals here later
import { AuthModal } from "@/components/modals/AuthModal";
import { OnboardingModal } from "@/components/modals/OnboardingModal";
import { PitchProjectModal } from "@/components/modals/PitchProjectModal";

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeProvider attribute="data-theme" defaultTheme="light" enableSystem={false}>
      {children}
      <AuthModal />
      <OnboardingModal />
      <PitchProjectModal />
    </ThemeProvider>
  );
}
