"use client";

import { useState, useEffect } from "react";
import { Footer } from "@/components/layout/footer";
import { Documentation } from "@/lib/cms/types";
import { DocsSidebar } from "@/components/docs/DocsSidebar";
import { MarkdownRenderer } from "@/components/docs/MarkdownRenderer";

export default function DocsPage() {
  const [docs, setDocs] = useState<Documentation[]>([]);
  const [selectedDoc, setSelectedDoc] = useState<Documentation | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDocs();
  }, []);

  const fetchDocs = async () => {
    try {
      const response = await fetch('/api/cms/documentation?published=true');
      const data = await response.json();
      setDocs(data);
      
      // Select first doc by default
      if (data.length > 0 && !selectedDoc) {
        setSelectedDoc(data[0]);
      }
    } catch (error) {
      console.error('Error fetching documentation:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <section className="relative py-12 lg:py-16 bg-gradient-to-b from-background to-muted/20 border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm text-primary mb-4">
            Documentation
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-3">
            Product Documentation
          </h1>
          <p className="text-base lg:text-lg text-muted-foreground max-w-3xl">
            Complete guides, API references, and technical documentation for Ledger1
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="flex-1 flex">
        {loading ? (
          <div className="flex-1 flex items-center justify-center py-20">
            <div className="text-center text-muted-foreground">Loading documentation...</div>
          </div>
        ) : docs.length === 0 ? (
          <div className="flex-1 flex items-center justify-center py-20">
            <div className="text-center">
              <div className="text-muted-foreground mb-4">No documentation available yet.</div>
              <a href="/cms/login" className="text-primary hover:underline text-sm">
                Login to CMS to add documentation
              </a>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex">
            {/* Sidebar */}
            <DocsSidebar
              docs={docs}
              selectedDoc={selectedDoc}
              onSelectDoc={setSelectedDoc}
            />

            {/* Content Area */}
            <main className="flex-1 overflow-y-auto">
              {selectedDoc ? (
                <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
                  {/* Breadcrumb */}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                    <a href="/docs" className="hover:text-foreground transition-colors">
                      Documentation
                    </a>
                    <span>→</span>
                    <span className="capitalize">
                      {selectedDoc.section.replace(/-/g, ' ')}
                    </span>
                  </div>

                  {/* Title & Meta */}
                  <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">
                      {selectedDoc.title}
                    </h1>
                    <p className="text-lg text-muted-foreground mb-4">
                      {selectedDoc.description}
                    </p>
                    
                    {/* Tags */}
                    {selectedDoc.tags && selectedDoc.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {selectedDoc.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="border-t border-border pt-8">
                    <MarkdownRenderer content={selectedDoc.content} />
                  </div>

                  {/* Footer Navigation */}
                  <div className="mt-12 pt-8 border-t border-border">
                    <div className="flex justify-between items-center">
                      <div>
                        {docs.indexOf(selectedDoc) > 0 && (
                          <button
                            onClick={() => setSelectedDoc(docs[docs.indexOf(selectedDoc) - 1])}
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                          >
                            ← Previous: {docs[docs.indexOf(selectedDoc) - 1].title}
                          </button>
                        )}
                      </div>
                      <div>
                        {docs.indexOf(selectedDoc) < docs.length - 1 && (
                          <button
                            onClick={() => setSelectedDoc(docs[docs.indexOf(selectedDoc) + 1])}
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                          >
                            Next: {docs[docs.indexOf(selectedDoc) + 1].title} →
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Help Section */}
                  <div className="mt-12 p-6 rounded-xl bg-muted/50 border border-border">
                    <h3 className="font-bold mb-2">Need help?</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Can't find what you're looking for? Check out our help center or contact support.
                    </p>
                    <div className="flex gap-3">
                      <a
                        href="/help"
                        className="text-sm px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                      >
                        Visit Help Center
                      </a>
                      <a
                        href="/contact"
                        className="text-sm px-4 py-2 rounded-lg bg-background hover:bg-muted transition-colors"
                      >
                        Contact Support
                      </a>
                    </div>
                  </div>
                </article>
              ) : (
                <div className="flex items-center justify-center py-20">
                  <div className="text-center text-muted-foreground">
                    Select a document from the sidebar
                  </div>
                </div>
              )}
            </main>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
