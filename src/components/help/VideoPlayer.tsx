"use client";

import { useState, useEffect } from "react";
import { X, Play, Clock, Tag, Calendar } from "lucide-react";
import { HelpArticle } from "@/lib/cms/types";

interface VideoPlayerProps {
  video: HelpArticle | null;
  onClose: () => void;
}

export function VideoPlayer({ video, onClose }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (video) {
      setIsPlaying(true);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [video]);

  if (!video) return null;

  // Extract video ID from various URL formats (YouTube, Vimeo, etc.)
  const getEmbedUrl = (url: string) => {
    // YouTube
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      const videoId = url.includes('youtu.be') 
        ? url.split('youtu.be/')[1]?.split('?')[0]
        : url.split('v=')[1]?.split('&')[0];
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
    }
    // Vimeo
    if (url.includes('vimeo.com')) {
      const videoId = url.split('vimeo.com/')[1]?.split('?')[0];
      return `https://player.vimeo.com/video/${videoId}?autoplay=1`;
    }
    // Already an embed URL
    return url;
  };

  const embedUrl = video.videoUrl ? getEmbedUrl(video.videoUrl) : '';

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-6xl mx-4 animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all hover:scale-110"
          aria-label="Close video player"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Video Container */}
        <div className="bg-background rounded-2xl overflow-hidden shadow-2xl">
          {/* Video Player */}
          <div className="relative aspect-video bg-black">
            {isPlaying && video.videoUrl ? (
              <iframe
                src={embedUrl}
                title={video.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  onClick={() => setIsPlaying(true)}
                  className="group"
                >
                  <div className="w-24 h-24 rounded-full bg-primary/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-primary/30 transition-all group-hover:scale-110">
                    <Play className="w-12 h-12 text-white ml-2" fill="currentColor" />
                  </div>
                </button>
              </div>
            )}
          </div>

          {/* Video Information */}
          <div className="p-6 space-y-4">
            {/* Title and Category */}
            <div>
              <div className="flex items-start justify-between gap-4 mb-2">
                <h2 className="text-2xl font-bold">{video.title}</h2>
                <span className="flex-shrink-0 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  {video.category}
                </span>
              </div>
              <p className="text-muted-foreground">{video.description}</p>
            </div>

            {/* Metadata */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date(video.createdAt).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
              {video.tags && video.tags.length > 0 && (
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  <div className="flex flex-wrap gap-2">
                    {video.tags.map((tag) => (
                      <span 
                        key={tag} 
                        className="px-2 py-0.5 rounded bg-muted text-xs"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Transcript/Content */}
            {video.content && (
              <details className="group/details">
                <summary className="cursor-pointer font-medium text-primary hover:underline flex items-center gap-2 py-2">
                  <span>View Transcript</span>
                  <span className="text-xs text-muted-foreground">(Click to expand)</span>
                </summary>
                <div className="mt-4 pt-4 border-t border-border prose prose-sm dark:prose-invert max-w-none">
                  <div className="whitespace-pre-wrap">{video.content}</div>
                </div>
              </details>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
