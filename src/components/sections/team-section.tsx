"use client";

import { Twitter, Linkedin } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export function TeamSection() {
  const teamMembers = [
    {
      name: "Krishna Patel",
      role: "Chairman & CTO",
      description: "Technical visionary and chairman overseeing technology strategy and innovation across the enterprise.",
      image: "/team/member1.png",
      twitter: "https://twitter.com/",
      linkedin: "https://linkedin.com/in/"
    },
    {
      name: "Patrick Gorrell",
      role: "Chief Executive Officer",
      description: "Executive leader driving company vision, strategy, and growth for Main Street businesses.",
      image: "/team/member2.png",
      twitter: "https://twitter.com/",
      linkedin: "https://linkedin.com/in/"
    },
    {
      name: "Michael Milton",
      role: "Chief Marketing Officer",
      description: "Marketing leader building brand awareness and driving customer engagement strategies.",
      image: "/team/member3.png",
      twitter: "https://twitter.com/",
      linkedin: "https://linkedin.com/in/"
    },
    {
      name: "Shahir Monjour",
      role: "Senior VP, Engineering",
      description: "Senior engineering executive leading teams to build scalable, robust enterprise systems.",
      image: "/team/member4.png",
      twitter: "https://twitter.com/",
      linkedin: "https://linkedin.com/in/"
    },
    {
      name: "John Garcia",
      role: "Senior VP, AI Research",
      description: "Senior research executive advancing AI innovation and machine learning capabilities.",
      image: "/team/member5.png",
      twitter: "https://twitter.com/",
      linkedin: "https://linkedin.com/in/"
    }
  ];

  return (
    <section className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm text-primary mb-4">
          Our Team
        </div>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Meet the Team</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          A passionate group of innovators dedicated to empowering Main Street businesses with enterprise-grade technology.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {teamMembers.map((member, index) => (
          <TeamMemberCard key={index} member={member} />
        ))}
      </div>
    </section>
  );
}

function TeamMemberCard({ member }: { member: typeof teamMembers[0] }) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="glass-pane rounded-2xl ring-1 ring-border/60 p-6 text-center hover:ring-2 hover:ring-primary transition-all duration-300 hover:scale-105">
      {/* Profile Image */}
      <div className="relative w-32 h-32 mx-auto mb-4">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full"></div>
        <div className="relative w-full h-full rounded-full overflow-hidden ring-4 ring-background">
          {!imageError ? (
            <Image
              src={member.image}
              alt={member.name}
              fill
              className="object-cover"
              sizes="128px"
              onError={() => setImageError(true)}
            />
          ) : (
            /* Fallback gradient when image is not available */
            <div className="absolute inset-0 bg-gradient-to-br from-primary via-cyan-600 to-primary/80 flex items-center justify-center">
              <span className="text-4xl font-bold text-white">
                {member.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Member Info */}
      <h3 className="text-xl font-bold mb-1">{member.name}</h3>
      <p className="text-sm text-primary font-medium mb-3">{member.role}</p>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed min-h-[4.5rem]">
        {member.description}
      </p>

      {/* Social Links */}
      <div className="flex items-center justify-center gap-3">
        <a
          href={member.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-lg bg-muted hover:bg-primary/10 hover:text-primary transition-colors"
          aria-label={`${member.name} on Twitter`}
        >
          <Twitter className="h-5 w-5" />
        </a>
        <a
          href={member.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-lg bg-muted hover:bg-primary/10 hover:text-primary transition-colors"
          aria-label={`${member.name} on LinkedIn`}
        >
          <Linkedin className="h-5 w-5" />
        </a>
      </div>
    </div>
  );
}

const teamMembers = [
  {
    name: "Team Member 1",
    role: "Co-Founder & CEO",
    description: "Visionary leader driving innovation in enterprise software and AI technology.",
    image: "/team/member1.png",
    twitter: "https://twitter.com/",
    linkedin: "https://linkedin.com/in/"
  },
  {
    name: "Team Member 2",
    role: "Co-Founder & CTO",
    description: "Technology architect building scalable solutions for Main Street businesses.",
    image: "/team/member2.png",
    twitter: "https://twitter.com/",
    linkedin: "https://linkedin.com/in/"
  },
  {
    name: "Team Member 3",
    role: "Head of Product",
    description: "Product strategist focused on delivering exceptional user experiences.",
    image: "/team/member3.png",
    twitter: "https://twitter.com/",
    linkedin: "https://linkedin.com/in/"
  },
  {
    name: "Team Member 4",
    role: "VP of Engineering",
    description: "Engineering leader building robust, reliable enterprise systems.",
    image: "/team/member4.png",
    twitter: "https://twitter.com/",
    linkedin: "https://linkedin.com/in/"
  },
  {
    name: "Team Member 5",
    role: "Head of AI",
    description: "AI researcher pushing the boundaries of what's possible with machine learning.",
    image: "/team/member5.png",
    twitter: "https://twitter.com/",
    linkedin: "https://linkedin.com/in/"
  }
];
