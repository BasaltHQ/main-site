"use client";

import React, { createContext, useCallback, useContext, useMemo, useState } from "react";

type DemoVideoContextValue = {
  open: (src?: string) => void;
  close: () => void;
};

const DemoVideoContext = createContext<DemoVideoContextValue | null>(null);

export function useDemoVideo() {
  const ctx = useContext(DemoVideoContext);
  if (!ctx) throw new Error("useDemoVideo must be used within DemoVideoProvider");
  return ctx;
}

export function DemoVideoProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);

  const open = useCallback((src?: string) => {
    setVideoSrc(src || "https://engram1.blob.core.windows.net/varuni/Ledger1.ai%201080p.mp4");
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setVideoSrc(null);
  }, []);

  const value = useMemo(() => ({ open, close }), [open, close]);

  return (
    <DemoVideoContext.Provider value={value}>
      {children}
      {/* Event bridge so non-hook callers can open the modal */}
      <DemoVideoEventBridge onOpen={() => open()} />
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm supports-[backdrop-filter]:backdrop-blur-md" onClick={close} />
          <div className="relative glass-pane rounded-2xl ring-1 ring-border/60 p-3 md:p-4 w-full max-w-5xl shadow-2xl">
            <div className="flex items-center justify-between px-2 pb-2">
              <div className="micro-kicker text-[hsl(171_65%_40%)]">Watch Demo</div>
              <button
                onClick={close}
                className="inline-flex items-center justify-center rounded-lg px-3 py-1.5 text-sm bg-primary/10 text-foreground hover:bg-primary/15"
                aria-label="Close"
              >
                Close
              </button>
            </div>
            <div className="aspect-video w-full overflow-hidden rounded-xl ring-1 ring-border/60 bg-black/60">
              {videoSrc && (videoSrc.includes('.mp4') ? (
                <video
                  className="h-full w-full"
                  src={videoSrc}
                  controls
                  autoPlay
                  playsInline
                  preload="metadata"
                />
              ) : (
                <iframe
                  className="h-full w-full"
                  src={videoSrc}
                  title="Product Demo"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </DemoVideoContext.Provider>
  );
}

function DemoVideoEventBridge({ onOpen }: { onOpen: () => void }) {
  React.useEffect(() => {
    const handler = () => onOpen();
    window.addEventListener("open-demo-video", handler as EventListener);
    return () => window.removeEventListener("open-demo-video", handler as EventListener);
  }, [onOpen]);
  return null;
}


