'use client';

import { useState, useEffect } from 'react';
import { client } from '@/lib/thirdweb';
import { ConnectEmbed, darkTheme, useActiveAccount, useProfiles, ThirdwebProvider } from 'thirdweb/react';
import { inAppWallet, createWallet } from 'thirdweb/wallets';
import { base } from 'thirdweb/chains';
import Image from 'next/image';
import { ExternalLink, LogOut, Shield, Sparkles, Zap, BarChart3, Scale, Radio, ChevronRight, LayoutTemplate, PenTool } from 'lucide-react';

// ─── App Registry ────────────────────────────────────────────────────────────

interface AppCard {
    id: string;
    name: string;
    tagline: string;
    description: string;
    icon: string;       // filename in /public
    url: string;
    accent: string;     // HSL accent
    accentRGB: string;  // for glow
    status: 'live' | 'coming_soon';
    badge?: string;
    lucideIcon: React.ReactNode;
}

const APPS: AppCard[] = [
    {
        id: 'crm',
        name: 'BasaltCRM',
        tagline: 'AI Sales Intelligence',
        description: 'Autonomous lead generation, outreach campaigns, and pipeline management powered by agentic AI.',
        icon: '/BasaltCRM.png',
        url: 'https://crm.basalthq.com',
        accent: 'hsl(24, 100%, 50%)',
        accentRGB: '255, 106, 0',
        status: 'live',
        badge: 'Free Tier',
        lucideIcon: <BarChart3 size={20} />,
    },
    {
        id: 'vigil',
        name: 'BasaltVigil',
        tagline: 'AI Legal Operations',
        description: 'Multi-agent legal intelligence platform for contract drafting, corporate governance, and compliance.',
        icon: '/BasaltVigil.png',
        url: 'https://vigil.basalthq.com',
        accent: 'hsl(220, 70%, 55%)',
        accentRGB: '66, 120, 220',
        status: 'live',
        badge: 'Free Tier',
        lucideIcon: <Scale size={20} />,
    },
    {
        id: 'forms',
        name: 'Form Builder',
        tagline: 'LeadGen Forms',
        description: 'Drag-and-drop lead generation form builder with AI-suggested fields and professional templates.',
        icon: '/BasaltCRM.png',
        url: 'https://crm.basalthq.com/messages/forms',
        accent: 'hsl(24, 100%, 50%)',
        accentRGB: '255, 106, 0',
        status: 'live',
        badge: 'Free Tier',
        lucideIcon: <LayoutTemplate size={20} />,
    },
    {
        id: 'signature',
        name: 'Signature Builder',
        tagline: 'Professional Identity',
        description: 'Design and customize your professional email signature with live previews and CRM synchronization.',
        icon: '/BasaltCRM.png',
        url: 'https://crm.basalthq.com/profile?tab=signature',
        accent: 'hsl(24, 100%, 50%)',
        accentRGB: '255, 106, 0',
        status: 'live',
        badge: 'Free Tier',
        lucideIcon: <PenTool size={20} />,
    },
    {
        id: 'surge',
        name: 'BasaltSurge',
        tagline: 'Decentralized Payments',
        description: 'Accept crypto payments, manage merchant splits, and deploy programmable payment infrastructure.',
        icon: '/BasaltSurge.png',
        url: 'https://surge.basalthq.com',
        accent: 'hsl(160, 80%, 45%)',
        accentRGB: '23, 184, 130',
        status: 'live',
        lucideIcon: <Zap size={20} />,
    },
    {
        id: 'echo',
        name: 'BasaltEcho',
        tagline: 'Voice AI Agents',
        description: 'Deploy real-time voice AI agents for customer service, order-taking, and conversational commerce.',
        icon: '/BasaltEcho.png',
        url: 'https://echo.basalthq.com',
        accent: 'hsl(280, 70%, 55%)',
        accentRGB: '156, 66, 220',
        status: 'live',
        lucideIcon: <Radio size={20} />,
    },
    {
        id: 'erp',
        name: 'BasaltERP',
        tagline: 'Enterprise Resource Planning',
        description: 'Unified inventory, procurement, HR, and financial operations for scaling businesses.',
        icon: '/BasaltERP.png',
        url: 'https://erp.basalthq.com',
        accent: 'hsl(45, 90%, 50%)',
        accentRGB: '230, 186, 15',
        status: 'live',
        lucideIcon: <Sparkles size={20} />,
    },
    {
        id: 'cms',
        name: 'BasaltCMS',
        tagline: 'Content Command Center',
        description: 'Manage media, docs, forms, website from one dashboard.',
        icon: '/BasaltCMS.png',
        url: 'https://cms.basalthq.com',
        accent: 'hsl(180, 50%, 50%)',
        accentRGB: '100, 200, 200',
        status: 'coming_soon',
        lucideIcon: <Shield size={20} />,
    },
    {
        id: 'onyx',
        name: 'BasaltOnyx',
        tagline: 'Content Management',
        description: 'Headless CMS with AI-powered content workflows, multi-channel publishing, and brand asset management.',
        icon: '/BasaltOnyx.png',
        url: 'https://onyx.basalthq.com',
        accent: 'hsl(0, 0%, 60%)',
        accentRGB: '153, 153, 153',
        status: 'coming_soon',
        lucideIcon: <Shield size={20} />,
    },
];

// ─── Wallet Config ───────────────────────────────────────────────────────────

const wallets = [
    inAppWallet({
        auth: {
            options: [
                "google", "apple", "discord", "telegram", "farcaster",
                "email", "x", "passkey", "phone", "twitch", "steam",
                "github", "line", "epic", "tiktok", "facebook", "coinbase",
            ],
        },
        executionMode: {
            mode: "EIP4337",
            smartAccount: { chain: base, sponsorGas: true },
        },
    }),
    createWallet("io.metamask"),
    createWallet("com.coinbase.wallet"),
    createWallet("me.rainbow"),
    createWallet("io.rabby"),
];

export function PortalSection() {
    return (
        <ThirdwebProvider>
            <PortalSectionInner />
        </ThirdwebProvider>
    );
}

function PortalSectionInner() {
    const account = useActiveAccount();
    const { data: profiles } = useProfiles({ client });
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userDisplayName, setUserDisplayName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [showLogin, setShowLogin] = useState(false);

    // Extract user identity from Thirdweb profiles
    useEffect(() => {
        if (!account || !isLoggedIn) return;

        if (profiles && profiles.length > 0) {
            const emailProfile =
                profiles.find((p: any) => p.details?.email && p.details?.name) ||
                profiles.find((p: any) => p.details?.email);

            if (emailProfile?.details) {
                const d = emailProfile.details as any;
                setUserEmail(d.email || '');
                setUserDisplayName(d.name || d.givenName || d.email || '');
            }
        }

        if (!userDisplayName && account.address) {
            setUserDisplayName(`${account.address.slice(0, 6)}...${account.address.slice(-4)}`);
        }
    }, [account, profiles, isLoggedIn, userDisplayName]);

    // Remove Thirdweb branding
    useEffect(() => {
        const removeBranding = () => {
            const links = document.querySelectorAll('a[href*="thirdweb.com/connect"]');
            links.forEach(link => {
                if (link.parentElement) link.parentElement.style.display = 'none';
            });
            document.querySelectorAll('span').forEach(span => {
                if (span.textContent === 'Powered by' && span.nextElementSibling?.tagName.toLowerCase() === 'svg') {
                    const c = span.closest('div[style*="padding-top"]');
                    if (c) (c as HTMLElement).style.display = 'none';
                }
            });
        };
        const ob = new MutationObserver(() => removeBranding());
        ob.observe(document.body, { childList: true, subtree: true });
        setTimeout(removeBranding, 50);
        setTimeout(removeBranding, 500);
        return () => ob.disconnect();
    }, []);

    const handleLogout = async () => {
        await fetch('/api/auth/thirdweb/logout', { method: 'POST' });
        setIsLoggedIn(false);
        setUserDisplayName('');
        setUserEmail('');
        window.location.reload();
    };

    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://basalthq.com';

    return (
        <section id="portal" className="relative py-24 text-white overflow-hidden">
            {/* Ambient background glow */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-20%] left-[20%] w-[600px] h-[600px] rounded-full blur-[120px]" style={{ backgroundColor: 'var(--glow-color)' }} />
                <div className="absolute bottom-[-10%] right-[10%] w-[500px] h-[500px] rounded-full blur-[100px]" style={{ backgroundColor: 'var(--glow-color)' }} />
            </div>

            {/* ── Header ── */}
            <div className="relative z-10 max-w-6xl mx-auto px-6 pb-12 text-center">
                <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">
                    Your <span style={{ color: 'hsl(var(--primary))' }}>Business Operating System</span>
                </h2>
                <p className="mt-4 text-white/40 text-lg max-w-2xl mx-auto leading-relaxed mb-8">
                    One login. Every tool. Access the full BasaltHQ suite — from AI-driven sales and legal ops to decentralized payments and enterprise resource planning.
                </p>

                {/* Login State */}
                <div className="flex justify-center items-center">
                    {isLoggedIn && account ? (
                        <div className="flex items-center gap-4 bg-white/[0.02] border border-white/[0.05] p-3 pr-4 rounded-2xl">
                            <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border" style={{ color: 'hsl(var(--primary))', backgroundColor: 'var(--glow-color)', borderColor: 'var(--glow-color)', boxShadow: '0 0 15px var(--glow-color)' }}>
                                {(userDisplayName || '?')[0].toUpperCase()}
                            </div>
                            <div className="text-left hidden sm:block mr-2">
                                <p className="text-sm font-medium text-white/90 leading-tight">{userDisplayName}</p>
                                {userEmail && <p className="text-xs text-white/40 mt-0.5">{userEmail}</p>}
                            </div>
                            <div className="w-px h-8 bg-white/[0.08] mx-2 hidden sm:block"></div>
                            <button
                                onClick={handleLogout}
                                className="flex items-center justify-center w-10 h-10 rounded-xl hover:bg-white/[0.05] text-white/40 hover:text-white/80 transition-all"
                                title="Sign out"
                            >
                                <LogOut size={18} />
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => setShowLogin(true)}
                            className="px-8 py-3.5 rounded-xl border text-base font-semibold transition-all flex items-center gap-2"
                            style={{ color: 'hsl(var(--primary))', backgroundColor: 'var(--glow-color)', borderColor: 'var(--glow-color)', boxShadow: '0 0 20px var(--glow-color)' }}
                        >
                            Sign In to Portal <ChevronRight size={18} />
                        </button>
                    )}
                </div>
            </div>

            {/* ── App Grid ── */}
            <div className="relative z-10 max-w-6xl mx-auto px-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {APPS.map(app => (
                        <AppTile
                            key={app.id}
                            app={app}
                            isLoggedIn={isLoggedIn}
                            onLoginRequired={() => setShowLogin(true)}
                        />
                    ))}
                </div>
            </div>

            {/* ── Login Modal ── */}
            {showLogin && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm" onClick={() => setShowLogin(false)}>
                    <div className="relative max-w-md w-full mx-4" onClick={e => e.stopPropagation()}>
                        {/* Glass card */}
                        <div className="rounded-2xl border border-white/[0.08] bg-[#0a0a0a]/95 backdrop-blur-xl shadow-2xl overflow-hidden">
                            {/* Modal header */}
                            <div className="text-center pt-8 pb-4 px-6 border-b border-white/[0.05]">
                                <Image src="/BasaltHQShield.png" alt="BasaltHQ" width={48} height={48} className="rounded-xl mx-auto mb-3" />
                                <h3 className="text-lg font-bold text-white">Sign in to BasaltHQ</h3>
                                <p className="text-xs text-white/30 mt-1">One account for the entire ecosystem</p>
                            </div>

                            {/* Thirdweb ConnectEmbed */}
                            <div className="p-4 flex justify-center">
                                <ConnectEmbed
                                    client={client}
                                    wallets={wallets}
                                    chain={base}
                                    auth={{
                                        isLoggedIn: async () => {
                                            const res = await fetch('/api/auth/thirdweb/is-logged-in');
                                            return await res.json();
                                        },
                                        doLogin: async (params) => {
                                            await fetch('/api/auth/thirdweb/login', {
                                                method: 'POST',
                                                headers: { 'Content-Type': 'application/json' },
                                                body: JSON.stringify(params),
                                            });
                                            setIsLoggedIn(true);
                                            setShowLogin(false);
                                        },
                                        getLoginPayload: async ({ address }) => {
                                            const res = await fetch(
                                                `/api/auth/thirdweb/payload?address=${address}&chainId=${base.id}`
                                            );
                                            return await res.json();
                                        },
                                        doLogout: async () => {
                                            await fetch('/api/auth/thirdweb/logout', { method: 'POST' });
                                            setIsLoggedIn(false);
                                        },
                                    }}
                                    appMetadata={{
                                        name: 'BasaltHQ Portal',
                                        url: baseUrl,
                                        logoUrl: `${baseUrl}/BasaltHQShield.png`,
                                    }}
                                    privacyPolicyUrl="https://basalthq.com/privacy"
                                    termsOfServiceUrl="https://basalthq.com/terms"
                                    showThirdwebBranding={false}
                                    modalSize="compact"
                                    theme={darkTheme({
                                        colors: {
                                            accentText: 'hsl(var(--primary))',
                                            accentButtonBg: 'hsl(var(--primary))',
                                            primaryButtonBg: 'hsl(var(--primary))',
                                            primaryButtonText: '#ffffff',
                                            separatorLine: 'hsl(0, 0%, 12%)',
                                            secondaryText: 'hsl(0, 0%, 50%)',
                                            primaryText: 'hsl(0, 0%, 93%)',
                                            connectedButtonBg: 'hsl(0, 0%, 10%)',
                                            connectedButtonBgHover: 'hsl(0, 0%, 15%)',
                                            inputAutofillBg: 'hsl(0, 0%, 6%)',
                                            selectedTextBg: 'hsl(var(--primary))',
                                            selectedTextColor: '#ffffff',
                                            secondaryButtonBg: 'hsl(0, 0%, 10%)',
                                            secondaryButtonHoverBg: 'hsl(0, 0%, 15%)',
                                            secondaryButtonText: 'hsl(0, 0%, 80%)',
                                            skeletonBg: 'hsl(0, 0%, 10%)',
                                            tertiaryBg: 'hsl(0, 0%, 6%)',
                                            tooltipBg: 'hsl(0, 0%, 12%)',
                                            tooltipText: 'hsl(0, 0%, 88%)',
                                            danger: 'hsl(0, 80%, 50%)',
                                            success: 'hsl(142, 71%, 45%)',
                                        },
                                    })}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ── Inline Styles ── */}
            <style jsx>{`
                @keyframes tileGlow {
                    0%, 100% { opacity: 0; }
                    50% { opacity: 1; }
                }
            `}</style>
        </section>
    );
}

// ─── App Tile Component ──────────────────────────────────────────────────────

function AppTile({ app, isLoggedIn, onLoginRequired }: {
    app: AppCard;
    isLoggedIn: boolean;
    onLoginRequired: () => void;
}) {
    const isComingSoon = app.status === 'coming_soon';

    const handleClick = () => {
        if (isComingSoon) return;
        
        // ERP does not use unified Thirdweb login as each instance is isolated
        if (!isLoggedIn && app.id !== 'erp') {
            onLoginRequired();
            return;
        }
        window.open(app.url, '_blank');
    };

    return (
        <button
            onClick={handleClick}
            disabled={isComingSoon}
            className={`group relative text-left rounded-2xl border backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] transition-all duration-500 overflow-hidden ${isComingSoon
                    ? 'border-white/[0.03] bg-white/[0.01] cursor-not-allowed opacity-60'
                    : 'border-white/[0.08] bg-black/40 hover:border-white/[0.2] hover:bg-white/[0.04] hover:shadow-[0_16px_48px_rgba(0,0,0,0.8)] hover:-translate-y-1 cursor-pointer'
                }`}
            style={{ minHeight: '220px' }}
        >
            {/* Hover glow */}
            {!isComingSoon && (
                <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                        background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 30%), rgba(${app.accentRGB}, 0.06), transparent 40%)`,
                    }}
                />
            )}

            <div className="relative z-10 p-6 flex flex-col h-full">
                {/* Header row */}
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div
                            className="w-12 h-12 rounded-xl flex items-center justify-center border p-1.5"
                            style={{
                                backgroundColor: `rgba(${app.accentRGB}, 0.08)`,
                                borderColor: `rgba(${app.accentRGB}, 0.15)`,
                            }}
                        >
                            <Image src={app.icon} alt={app.name} width={36} height={36} className="object-contain" />
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-white/90">{app.name}</h3>
                            <p className="text-[11px] text-white/30 font-medium">{app.tagline}</p>
                        </div>
                    </div>

                    {isComingSoon ? (
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border text-white/20 bg-white/[0.04] border-white/[0.06]">
                            Soon
                        </span>
                    ) : app.badge ? (
                        <span
                            className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border"
                            style={{
                                color: app.accent,
                                backgroundColor: `rgba(${app.accentRGB}, 0.08)`,
                                borderColor: `rgba(${app.accentRGB}, 0.15)`,
                            }}
                        >
                            {app.badge}
                        </span>
                    ) : null}
                </div>

                {/* Description */}
                <p className="text-xs text-white/25 leading-relaxed flex-1">{app.description}</p>

                {/* Footer */}
                {!isComingSoon && (
                    <div className="mt-4 flex items-center justify-between">
                        <span
                            className="flex items-center gap-1 text-[11px] font-semibold"
                            style={{ color: app.accent }}
                        >
                            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: app.accent }} />
                            Online
                        </span>
                        <span
                            className="flex items-center gap-1 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            style={{ color: app.accent }}
                        >
                            Launch <ChevronRight size={14} />
                        </span>
                    </div>
                )}
            </div>
        </button>
    );
}
