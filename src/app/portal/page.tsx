import { PortalSection } from '@/components/sections/portal-section';

export default function PortalPage() {
    return (
        <div className="min-h-screen flex flex-col bg-[#030303]">
            <div className="flex-grow flex items-center justify-center">
                <div className="w-full">
                    <PortalSection />
                </div>
            </div>
            
            {/* ── Footer ── */}
            <footer className="relative z-10 border-t border-white/[0.04] py-8 text-center bg-[#030303]">
                <p className="text-white/20 text-xs">
                    &copy; {new Date().getFullYear()} BasaltHQ, Inc. &middot; Delaware C-Corp &middot; All rights reserved.
                </p>
            </footer>
        </div>
    );
}
