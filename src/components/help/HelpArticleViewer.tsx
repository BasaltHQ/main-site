"use client";

import { useState } from "react";
import { HelpArticle } from "@/lib/cms/types";
import { MarkdownRenderer } from "@/components/docs/MarkdownRenderer";
import { ChevronRight } from "lucide-react";

interface HelpArticleViewerProps {
  articles: HelpArticle[];
  title: string;
  description: string;
}

export function HelpArticleViewer({ articles, title, description }: HelpArticleViewerProps) {
  const [selectedArticle, setSelectedArticle] = useState<HelpArticle | null>(
    articles.length > 0 ? articles[0] : null
  );
  const [isCompact, setIsCompact] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  if (articles.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-muted-foreground">No articles available in this section.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-0 -mx-4 sm:-mx-6 lg:-mx-8">
      {/* Mobile Header */}
      <div className="lg:hidden sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border px-4 py-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-bold text-lg">{title}</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsCompact(!isCompact)}
              className="px-3 py-1 text-xs rounded-lg bg-muted hover:bg-muted/80 transition-colors"
            >
              {isCompact ? "Standard" : "Compact"}
            </button>
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="px-3 py-1 text-sm rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {isMobileOpen ? "Close" : "Menu"}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {isMobileOpen && (
          <div className="mt-4 max-h-96 overflow-y-auto border border-border rounded-lg bg-background p-2">
            <div className="space-y-1">
              {articles.map((article) => (
                <button
                  key={article.id}
                  onClick={() => {
                    setSelectedArticle(article);
                    setIsMobileOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    selectedArticle?.id === article.id
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  }`}
                >
                  {isCompact ? (
                    <span className="truncate block">{article.title}</span>
                  ) : (
                    <>
                      <div className="font-medium">{article.title}</div>
                      <div className="text-xs opacity-70 mt-0.5 line-clamp-1">{article.description}</div>
                    </>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Desktop Sidebar */}
      <aside className={`hidden lg:block sticky top-4 h-[calc(100vh-2rem)] overflow-y-auto border-r border-border bg-background/50 backdrop-blur-sm transition-all duration-300 ${
        isCompact ? "w-64" : "w-80"
      }`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-bold text-lg mb-1">{title}</h2>
              <p className="text-xs text-muted-foreground">{articles.length} articles</p>
            </div>
            <button
              onClick={() => setIsCompact(!isCompact)}
              className="px-3 py-1 text-xs rounded-lg bg-muted hover:bg-muted/80 transition-colors"
              title={isCompact ? "Switch to standard view" : "Switch to compact view"}
            >
              {isCompact ? "⊟" : "⊞"}
            </button>
          </div>

          <div className="space-y-2">
            {articles.map((article) => (
              <button
                key={article.id}
                onClick={() => setSelectedArticle(article)}
                className={`w-full text-left px-4 rounded-xl text-sm transition-all ${
                  selectedArticle?.id === article.id
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "hover:bg-muted/50"
                } ${isCompact ? "py-2" : "py-3"}`}
              >
                {isCompact ? (
                  <div className="font-medium truncate">{article.title}</div>
                ) : (
                  <>
                    <div className="font-medium mb-1.5">{article.title}</div>
                    <div className="text-xs opacity-80 line-clamp-2">{article.description}</div>
                  </>
                )}
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* Content Area */}
      <main className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8">
        {selectedArticle ? (
          <article className="max-w-4xl mx-auto py-8 lg:py-12">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
              <a href="/help" className="hover:text-foreground transition-colors">
                Help Center
              </a>
              <ChevronRight className="w-4 h-4" />
              <span>{title}</span>
              <ChevronRight className="w-4 h-4" />
              <span className="text-foreground">{selectedArticle.title}</span>
            </div>

            {/* Title & Meta */}
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-full mb-4 font-medium">
                {selectedArticle.category}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                {selectedArticle.title}
              </h1>
              <p className="text-lg text-muted-foreground mb-4">
                {selectedArticle.description}
              </p>

              {/* Tags */}
              {selectedArticle.tags && selectedArticle.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {selectedArticle.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 rounded-full bg-muted font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Video (if available) */}
            {selectedArticle.videoUrl && (
              <div className="mb-8 rounded-xl overflow-hidden aspect-video border border-border shadow-lg">
                <iframe
                  src={selectedArticle.videoUrl}
                  title={selectedArticle.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}

            {/* Content with Markdown */}
            <div className="border-t border-border pt-8">
              <MarkdownRenderer content={selectedArticle.content} />
            </div>

            {/* Navigation Footer */}
            <div className="mt-12 pt-8 border-t border-border">
              <div className="flex justify-between items-center">
                <div>
                  {articles.indexOf(selectedArticle) > 0 && (
                    <button
                      onClick={() => setSelectedArticle(articles[articles.indexOf(selectedArticle) - 1])}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                    >
                      <ChevronRight className="w-4 h-4 rotate-180" />
                      <div className="text-left">
                        <div className="text-xs mb-0.5">Previous</div>
                        <div className="font-medium">{articles[articles.indexOf(selectedArticle) - 1].title}</div>
                      </div>
                    </button>
                  )}
                </div>
                <div>
                  {articles.indexOf(selectedArticle) < articles.length - 1 && (
                    <button
                      onClick={() => setSelectedArticle(articles[articles.indexOf(selectedArticle) + 1])}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                    >
                      <div className="text-right">
                        <div className="text-xs mb-0.5">Next</div>
                        <div className="font-medium">{articles[articles.indexOf(selectedArticle) + 1].title}</div>
                      </div>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Help Section */}
            <div className="mt-12 p-6 rounded-xl bg-muted/50 border border-border">
              <h3 className="font-bold mb-2">Was this helpful?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Let us know if you need more information or have suggestions for improving this article.
              </p>
              <div className="flex gap-3">
                <a
                  href="/contact"
                  className="text-sm px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  Contact Support
                </a>
                <button className="text-sm px-4 py-2 rounded-lg bg-background hover:bg-muted transition-colors border border-border">
                  Suggest Edit
                </button>
              </div>
            </div>
          </article>
        ) : (
          <div className="flex items-center justify-center py-20">
            <p className="text-muted-foreground">Select an article from the sidebar</p>
          </div>
        )}
      </main>
    </div>
  );
}
