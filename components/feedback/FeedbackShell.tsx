import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface FeedbackShellProps {
  children: React.ReactNode;
  backHref?: string;
  backLabel?: string;
}

export default function FeedbackShell({
  children,
  backHref = "/",
  backLabel = "Back to Home",
}: FeedbackShellProps) {
  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface">
      {/* Clean Header */}
      <header className="w-full border-b border-surface-variant/40 bg-surface/80 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 group transition-opacity hover:opacity-85"
          >
            <span className="font-serif font-bold text-lg sm:text-xl tracking-tight text-primary">
              Nisham PA
            </span>
            <span className="text-xs text-on-surface-variant/70 hidden sm:inline-block pl-2 border-l border-surface-variant">
              Clinical Psychologist & Executive Advisor
            </span>
          </Link>

          <Link
            href={backHref}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-on-surface-variant hover:text-primary transition-colors py-1.5 px-3 rounded-full hover:bg-surface-container"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{backLabel}</span>
          </Link>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-2xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        {children}
      </main>

      {/* Minimal Footer */}
      <footer className="w-full border-t border-surface-variant/30 py-6 text-center text-xs text-on-surface-variant/70">
        <div className="max-w-2xl mx-auto px-4">
          <p>© Nisham PA. All rights reserved.</p>
          <p className="mt-1">
            We deeply appreciate your candid thoughts and reflections.
          </p>
        </div>
      </footer>
    </div>
  );
}

