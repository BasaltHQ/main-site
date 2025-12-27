"use client";

import { useState, useEffect, useMemo } from "react";
import { Footer } from "@/components/layout/footer";
import { HelpArticle } from "@/lib/cms/types";
import { faqs } from "@/lib/cms/data";
import { Video, BookOpen, Wrench, Lightbulb, Search, X, ChevronDown, Mail, Info } from "lucide-react";
import { HelpArticleViewer } from "@/components/help/HelpArticleViewer";
import { VideoPlayer } from "@/components/help/VideoPlayer";

type SortOption = 'relevance' | 'newest' | 'oldest' | 'alphabetical';

export default function HelpPage() {
  const [articles, setArticles] = useState<HelpArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'videos' | 'guides' | 'troubleshooting' | 'faq'>('videos');
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<SortOption>('relevance');
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<HelpArticle | null>(null);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await fetch('/api/cms/help?published=true');
      const data = await response.json();
      setArticles(data);
    } catch (error) {
      console.error('Error fetching help articles:', error);
    } finally {
      setLoading(false);
    }
  };

  // Organize and filter articles
  const videoArticles = useMemo(() => 
    articles.filter(a => ['Getting Started', 'Integrations', 'Operations'].includes(a.category)),
    [articles]
  );
  
  const guideArticles = useMemo(() => 
    articles.filter(a => a.category === 'Guides'),
    [articles]
  );
  
  const troubleshootingArticles = useMemo(() => 
    articles.filter(a => a.category === 'Troubleshooting'),
    [articles]
  );

  // Get current articles based on active tab
  const currentArticles = useMemo(() => {
    switch (activeTab) {
      case 'videos': return videoArticles;
      case 'guides': return guideArticles;
      case 'troubleshooting': return troubleshootingArticles;
      default: return [];
    }
  }, [activeTab, videoArticles, guideArticles, troubleshootingArticles]);

  // Get unique categories
  const categories = useMemo(() => 
    ['all', ...Array.from(new Set(currentArticles.map(a => a.category)))],
    [currentArticles]
  );

  // Filter and sort logic
  const filteredAndSortedArticles = useMemo(() => {
    let filtered = currentArticles;

    // Apply category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(a => a.category === selectedCategory);
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(a => 
        a.title.toLowerCase().includes(query) ||
        a.description.toLowerCase().includes(query) ||
        a.content.toLowerCase().includes(query) ||
        a.tags?.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Apply sorting
    const sorted = [...filtered];
    switch (sortBy) {
      case 'newest':
        sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'oldest':
        sorted.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      case 'alphabetical':
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default: // relevance
        // Already in relevance order from CMS
        break;
    }

    return sorted;
  }, [currentArticles, selectedCategory, searchQuery, sortBy]);

  // Filter FAQs
  const filteredFaqs = useMemo(() => {
    if (!searchQuery.trim()) return faqs;
    const query = searchQuery.toLowerCase();
    return faqs.filter(f => 
      f.question.toLowerCase().includes(query) ||
      f.answer.toLowerCase().includes(query) ||
      f.category.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const handleClearSearch = () => {
    setSearchQuery("");
    setSelectedCategory("all");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background via-background to-muted/10">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary/5 via-primary/10 to-background border-b border-border">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 backdrop-blur-sm">
              <Info className="w-4 h-4 mr-2" />
              Help & Support
            </div>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              How can we help you?
            </h1>
            <p className="text-xl text-muted-foreground mb-10">
              Search our knowledge base for answers, guides, and tutorials
            </p>

            {/* Premium Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-muted-foreground" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for articles, guides, or topics..."
                className="w-full pl-12 pr-12 py-4 text-lg rounded-2xl border-2 border-border bg-background/80 backdrop-blur-xl focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-200 shadow-lg hover:shadow-xl"
              />
              {searchQuery && (
                <button
                  onClick={handleClearSearch}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>

            {/* Quick Stats */}
            <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Videos', count: videoArticles.length, Icon: Video },
                { label: 'Guides', count: guideArticles.length, Icon: BookOpen },
                { label: 'Troubleshooting', count: troubleshootingArticles.length, Icon: Wrench },
                { label: 'FAQs', count: faqs.length, Icon: Lightbulb },
              ].map((stat) => (
                <div key={stat.label} className="glass-pane rounded-xl p-4 text-center hover:scale-105 transition-transform">
                  <stat.Icon className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <div className="text-2xl font-bold text-primary">{stat.count}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <div className="border-b border-border bg-background/95 backdrop-blur-xl sticky top-0 z-20 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex gap-1 overflow-x-auto">
            {[
              { id: 'videos', label: 'Videos', Icon: Video, count: videoArticles.length },
              { id: 'guides', label: 'Guides', Icon: BookOpen, count: guideArticles.length },
              { id: 'troubleshooting', label: 'Troubleshooting', Icon: Wrench, count: troubleshootingArticles.length },
              { id: 'faq', label: 'FAQ', Icon: Lightbulb, count: faqs.length },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  setSelectedCategory('all');
                }}
                className={`flex items-center gap-2 px-6 py-4 font-medium border-b-2 transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-primary text-primary bg-primary/5'
                    : 'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                <tab.Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                <span className="px-2 py-0.5 text-xs rounded-full bg-muted">{tab.count}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Filters and Sort (for content tabs) */}
      {activeTab !== 'faq' && (
        <div className="border-b border-border bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-wrap gap-4 items-center justify-between">
              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedCategory === category
                        ? 'bg-primary text-primary-foreground shadow-lg scale-105'
                        : 'bg-background hover:bg-muted border border-border'
                    }`}
                  >
                    {category === 'all' ? 'All Categories' : category}
                  </button>
                ))}
              </div>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="px-4 py-2 rounded-lg border border-border bg-background text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
                >
                  <option value="relevance">Relevance</option>
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="alphabetical">A-Z</option>
                </select>
              </div>
            </div>

            {/* Results count */}
            {searchQuery && (
              <div className="mt-4 text-sm text-muted-foreground">
                Found <span className="font-semibold text-foreground">{filteredAndSortedArticles.length}</span> results for "{searchQuery}"
              </div>
            )}
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
              <p className="text-muted-foreground">Loading amazing content...</p>
            </div>
          ) : (
            <>
              {/* Videos Tab */}
              {activeTab === 'videos' && (
                <div>
                  {filteredAndSortedArticles.length === 0 ? (
                    <div className="text-center py-20">
                      <Search className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                      <h3 className="text-2xl font-bold mb-2">No videos found</h3>
                      <p className="text-muted-foreground mb-6">Try adjusting your search or filters</p>
                      <button
                        onClick={handleClearSearch}
                        className="px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                      >
                        Clear Filters
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {filteredAndSortedArticles.map((article) => (
                        <div
                          key={article.id}
                          onMouseEnter={() => setHoveredCard(article.id)}
                          onMouseLeave={() => setHoveredCard(null)}
                          className={`group glass-pane rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer ${
                            hoveredCard === article.id ? 'scale-105 shadow-2xl' : 'hover:shadow-xl'
                          }`}
                          onClick={() => setSelectedVideo(article)}
                        >
                          {/* Video Thumbnail */}
                          {article.videoUrl && (
                            <div className="relative aspect-video bg-gradient-to-br from-primary/20 to-primary/5 overflow-hidden">
                              {/* Thumbnail or Preview */}
                              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/20">
                                <div className="relative z-10">
                                  <div className="w-20 h-20 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center group-hover:bg-black/60 transition-all group-hover:scale-110">
                                    <Video className="w-10 h-10 text-white" fill="currentColor" />
                                  </div>
                                </div>
                                {/* Decorative background pattern */}
                                <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
                              </div>
                              <div className="absolute top-4 right-4 z-20">
                                <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white text-xs font-medium">
                                  Watch Video
                                </span>
                              </div>
                            </div>
                          )}

                          {/* Content */}
                          <div className="p-6">
                            <div className="inline-flex items-center gap-2 text-xs bg-primary/10 text-primary px-3 py-1 rounded-full mb-3 font-medium">
                              {article.category}
                            </div>
                            <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                              {article.title}
                            </h3>
                            <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                              {article.description}
                            </p>
                            
                            {/* Tags */}
                            {article.tags && article.tags.length > 0 && (
                              <div className="flex flex-wrap gap-2 mb-4">
                                {article.tags.slice(0, 3).map((tag) => (
                                  <span key={tag} className="text-xs px-2 py-1 rounded bg-muted">
                                    #{tag}
                                  </span>
                                ))}
                              </div>
                            )}

                            <div className="flex items-center gap-2 text-sm font-medium text-primary">
                              <span>Click to play</span>
                              <ChevronDown className="w-4 h-4 -rotate-90" />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Guides Tab */}
              {activeTab === 'guides' && (
                <HelpArticleViewer
                  articles={guideArticles}
                  title="Guides"
                  description="Comprehensive guides for using BasaltHQ"
                />
              )}

              {/* Troubleshooting Tab */}
              {activeTab === 'troubleshooting' && (
                <HelpArticleViewer
                  articles={troubleshootingArticles}
                  title="Troubleshooting"
                  description="Solutions for common issues"
                />
              )}

              {/* FAQ Tab */}
              {activeTab === 'faq' && (
                <div className="max-w-4xl mx-auto">
                  <div className="text-center mb-12">
                    <Lightbulb className="w-16 h-16 mx-auto mb-4 text-primary" />
                    <h2 className="text-3xl font-bold mb-3">Frequently Asked Questions</h2>
                    <p className="text-lg text-muted-foreground">
                      Quick answers to common questions
                    </p>
                  </div>

                  {filteredFaqs.length === 0 ? (
                    <div className="text-center py-12">
                      <Search className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                      <h3 className="text-2xl font-bold mb-2">No FAQs found</h3>
                      <p className="text-muted-foreground mb-6">Try a different search term</p>
                      <button
                        onClick={handleClearSearch}
                        className="px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                      >
                        Clear Search
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {filteredFaqs.map((faq, index) => (
                        <div
                          key={faq.id}
                          className={`glass-pane rounded-2xl overflow-hidden transition-all duration-300 ${
                            expandedFaq === faq.id ? 'shadow-xl' : 'hover:shadow-lg'
                          }`}
                          style={{ animationDelay: `${index * 50}ms` }}
                        >
                          <button
                            onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                            className="w-full px-6 py-5 text-left flex items-start gap-4 hover:bg-muted/30 transition-colors"
                          >
                            <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold">
                              {index + 1}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
                                {faq.question}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                <span className="px-2 py-1 rounded bg-muted">{faq.category}</span>
                              </div>
                            </div>
                            <ChevronDown className={`flex-shrink-0 w-6 h-6 text-muted-foreground transition-transform duration-300 ${
                              expandedFaq === faq.id ? 'rotate-180' : ''
                            }`} />
                          </button>
                          
                          {expandedFaq === faq.id && (
                            <div className="px-6 pb-6 animate-in fade-in slide-in-from-top-2 duration-300">
                              <div className="pl-12 pt-4 border-t border-border text-muted-foreground leading-relaxed">
                                {faq.answer}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Contact CTA */}
                  <div className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 text-center">
                    <h3 className="text-2xl font-bold mb-3">Still need help?</h3>
                    <p className="text-muted-foreground mb-6">
                      Our support team is here to assist you
                    </p>
                    <a
                      href="/contact"
                      className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all font-medium shadow-lg hover:shadow-xl"
                    >
                      <Mail className="w-5 h-5" />
                      Contact Support
                    </a>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      {/* Video Player Modal */}
      <VideoPlayer 
        video={selectedVideo} 
        onClose={() => setSelectedVideo(null)} 
      />

      <Footer />
    </div>
  );
}
