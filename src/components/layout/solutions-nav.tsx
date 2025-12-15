"use client";

import Link from "next/link";
import { INDUSTRIES, FEATURES, ROLES } from "@/lib/seo-taxonomy";
import { ChevronDown } from "lucide-react";

export function SolutionsNav() {
    return (
        <div className="hidden md:flex items-center gap-6">

            {/* Industries Dropdown */}
            <div className="group relative">
                <button className="flex items-center gap-1 text-sm font-medium text-slate-300 hover:text-white transition-colors py-4">
                    Industries <ChevronDown className="w-3 h-3 opacity-50" />
                </button>
                <div className="absolute top-full left-0 w-64 p-2 bg-[#0a1120] border border-white/10 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform translate-y-2 group-hover:translate-y-0 z-50">
                    {INDUSTRIES.map(ind => (
                        <Link
                            key={ind.slug}
                            href={`/solutions/${ind.slug}`}
                            className="block px-4 py-3 rounded-lg hover:bg-white/5 text-sm text-slate-300 hover:text-white transition-colors"
                        >
                            {ind.name}
                        </Link>
                    ))}
                </div>
            </div>

        </div>
    );
}
