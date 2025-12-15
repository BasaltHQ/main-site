"use client";

import { useState } from "react";
import { Documentation } from "@/lib/cms/types";

interface DocsSidebarProps {
  docs: Documentation[];
  selectedDoc: Documentation | null;
  onSelectDoc: (doc: Documentation) => void;
}

export function DocsSidebar({ docs, selectedDoc, onSelectDoc }: DocsSidebarProps) {
  const [isCompact, setIsCompact] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Group docs by section
  const docsBySection = docs.reduce((acc, doc) => {
    if (!acc[doc.section]) {
      acc[doc.section] = [];
    }
    acc[doc.section].push(doc);
    return acc;
  }, {} as Record<string, Documentation[]>);

  // Sort docs within each section by order
  Object.keys(docsBySection).forEach(section => {
    docsBySection[section].sort((a, b) => a.order - b.order);
  });

  const formatSectionName = (section: string) => {
    return section.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden sticky top-0 z-20 bg-background/95 backdrop-blur-sm border-b border-border p-4">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-lg">Documentation</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsCompact(!isCompact)}
              className="px-3 py-1 text-xs rounded-lg bg-muted hover:bg-muted/80 transition-colors"
              title={isCompact ? "Standard view" : "Compact view"}
            >
              {isCompact ? "Standard" : "Compact"}
            </button>
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="px-3 py-1 text-sm rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              {isMobileOpen ? "Close" : "Menu"}
            </button>
          </div>
        </div>
        
        {/* Mobile Dropdown */}
        {isMobileOpen && (
          <div className="mt-4 max-h-96 overflow-y-auto border border-border rounded-lg bg-background p-2">
            {Object.entries(docsBySection).map(([section, sectionDocs]) => (
              <div key={section} className="mb-4 last:mb-0">
                <h3 className="text-sm font-bold px-2 py-1 text-muted-foreground uppercase tracking-wide">
                  {formatSectionName(section)}
                </h3>
                <div className="space-y-1 mt-1">
                  {sectionDocs.map((doc) => (
                    <button
                      key={doc.id}
                      onClick={() => {
                        onSelectDoc(doc);
                        setIsMobileOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        selectedDoc?.id === doc.id
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-muted"
                      } ${isCompact ? "py-1" : "py-2"}`}
                    >
                      {isCompact ? (
                        <span className="truncate block">{doc.title}</span>
                      ) : (
                        <>
                          <div className="font-medium">{doc.title}</div>
                          <div className="text-xs opacity-70 mt-0.5 line-clamp-1">{doc.description}</div>
                        </>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Desktop Sidebar */}
      <aside className={`hidden lg:block sticky top-4 h-[calc(100vh-2rem)] overflow-y-auto border-r border-border bg-background/50 backdrop-blur-sm transition-all duration-300 ${
        isCompact ? "w-64" : "w-80"
      }`}>
        <div className="p-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-bold text-lg">Documentation</h2>
            <button
              onClick={() => setIsCompact(!isCompact)}
              className="px-3 py-1 text-xs rounded-lg bg-muted hover:bg-muted/80 transition-colors"
              title={isCompact ? "Switch to standard view" : "Switch to compact view"}
            >
              {isCompact ? "⊟ Standard" : "⊞ Compact"}
            </button>
          </div>

          <div className="space-y-6">
            {Object.entries(docsBySection).map(([section, sectionDocs]) => (
              <div key={section}>
                <h3 className="text-xs font-bold px-2 py-1 text-muted-foreground uppercase tracking-wide mb-2">
                  {formatSectionName(section)}
                </h3>
                <div className="space-y-1">
                  {sectionDocs.map((doc) => (
                    <button
                      key={doc.id}
                      onClick={() => onSelectDoc(doc)}
                      className={`w-full text-left px-3 rounded-lg text-sm transition-colors ${
                        selectedDoc?.id === doc.id
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-muted"
                      } ${isCompact ? "py-1.5" : "py-2.5"}`}
                    >
                      {isCompact ? (
                        <span className="truncate block">{doc.title}</span>
                      ) : (
                        <>
                          <div className="font-medium mb-1">{doc.title}</div>
                          <div className="text-xs opacity-70 line-clamp-2">{doc.description}</div>
                        </>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
}
