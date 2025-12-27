'use client';


import { useEffect, useState, useMemo } from 'react';
import { Footer } from "@/components/layout/footer";
import { MarkdownRenderer } from "@/components/docs/MarkdownRenderer";
import { Career } from '@/lib/cms/types';



export default function CareersPage() {
  const [careers, setCareers] = useState<Career[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCareers = async () => {
      try {
        const res = await fetch('/api/cms/careers?published=true', { cache: 'no-store' });
        const data = await res.json();
        setCareers(Array.isArray(data) ? data : (data ? [data] : []));
      } catch (e) {
        console.error('Failed to load careers', e);
      } finally {
        setLoading(false);
      }
    };
    fetchCareers();
  }, []);

  const publishedCareers = useMemo(() => careers.filter((c) => c.published), [careers]);

  return (
    <div className="min-h-screen">
      <section className="relative py-20 bg-gradient-to-b from-background to-muted/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Join Our Team
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Help us build the future of business operations. We're looking for talented individuals
              who are passionate about solving complex problems and creating exceptional user experiences.
            </p>
          </div>

          {loading ? (
            <div className="text-center py-16 text-muted-foreground">Loading open roles...</div>
          ) : publishedCareers.length === 0 ? (
            <div className="text-center py-16">
              <h2 className="text-2xl font-semibold mb-4">No Open Positions</h2>
              <p className="text-muted-foreground mb-6">
                We don't have any open positions at the moment, but we're always looking for exceptional talent.
              </p>
              <p className="text-muted-foreground">
                Send your resume to{" "}
                <a
                  href="mailto:careers@basalthq.com"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  careers@basalthq.com
                </a>{" "}
                and tell us why you'd be a great fit.
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {publishedCareers.map((career) => (
                <div
                  key={career.id}
                  className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-8 hover:shadow-lg transition-shadow"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold mb-2">{career.title}</h2>
                      <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mb-3">
                        <span className="flex items-center">
                          <svg
                            className="w-4 h-4 mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                          </svg>
                          {career.department}
                        </span>
                        <span className="flex items-center">
                          <svg
                            className="w-4 h-4 mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          {career.location}
                        </span>
                        <span className="flex items-center">
                          <svg
                            className="w-4 h-4 mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          {career.type}
                        </span>
                        {career.salaryRange && (
                          <span className="flex items-center">
                            <svg
                              className="w-4 h-4 mr-1"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            {career.salaryRange}
                          </span>
                        )}
                      </div>
                      <p className="text-muted-foreground mb-4">{career.description}</p>
                    </div>
                  </div>

                  <div className="prose dark:prose-invert max-w-none mb-6">
                    <MarkdownRenderer content={career.responsibilities} />
                  </div>

                  <div className="prose dark:prose-invert max-w-none mb-6">
                    <MarkdownRenderer content={career.qualifications} />
                  </div>

                  {career.benefits && (
                    <div className="prose dark:prose-invert max-w-none mb-6">
                      <MarkdownRenderer content={career.benefits} />
                    </div>
                  )}

                  {career.tags && career.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {career.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-sm rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex gap-4">
                    {career.applyUrl ? (
                      <a
                        href={career.applyUrl}
                        className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                      >
                        Apply for this position
                        <svg
                          className="w-4 h-4 ml-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          />
                        </svg>
                      </a>
                    ) : (
                      <a
                        href={`mailto:careers@basalthq.com?subject=${encodeURIComponent(career.title + " Application")}`}
                        className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                      >
                        Apply for this position
                        <svg
                          className="w-4 h-4 ml-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-16 bg-blue-50 dark:bg-blue-900/10 rounded-lg p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Don't see a perfect fit?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              We're always interested in meeting talented people. Send us your resume and tell us about yourself.
            </p>
            <a
              href="mailto:careers@basalthq.com"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Get in touch
            </a>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
