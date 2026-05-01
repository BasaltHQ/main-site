'use client';

import { useState, useEffect } from 'react';
import { client } from '@/lib/thirdweb';
import { ConnectEmbed, darkTheme, useActiveAccount, useProfiles, ThirdwebProvider } from 'thirdweb/react';
import { inAppWallet, createWallet } from 'thirdweb/wallets';
import { base } from 'thirdweb/chains';
import Image from 'next/image';
import { LogOut, ChevronRight, ArrowRight, Check, X } from 'lucide-react';

// ─── App Registry (normie-friendly) ──────────────────────────────────────────

interface AppCard {
    id: string;
    name: string;
    headline: string;
    description: string;
    icon: string;
    url: string;
    accent: string;
    accentRGB: string;
    status: 'live' | 'coming_soon';
    badge?: string;
    replaces: string[];
    keyFeatures: string[];
}

const APPS: AppCard[] = [
    {
        id: 'crm',
        name: 'BasaltCRM',
        headline: 'Close more deals with AI',
        description: 'Your AI sales assistant that finds leads, writes emails, and manages your pipeline — so you can focus on selling.',
        icon: '/BasaltCRM.png',
        url: 'https://crm.basalthq.com',
        accent: 'hsl(24, 100%, 50%)',
        accentRGB: '255, 106, 0',
        status: 'live',
        badge: 'Free',
        replaces: ['Salesforce', 'HubSpot', 'Apollo.io'],
        keyFeatures: ['AI lead scoring', 'Auto-outreach', 'Pipeline tracking'],
    },
    {
        id: 'vigil',
        name: 'BasaltVigil',
        headline: 'Your AI legal team',
        description: 'Draft contracts, manage compliance, and handle corporate governance — all powered by multi-agent AI.',
        icon: '/BasaltVigil.png',
        url: 'https://vigil.basalthq.com',
        accent: 'hsl(220, 70%, 55%)',
        accentRGB: '66, 120, 220',
        status: 'live',
        badge: 'Free',
        replaces: ['LegalZoom', 'DocuSign', 'Outside counsel'],
        keyFeatures: ['Contract drafting', 'Compliance', 'Corp governance'],
    },
    {
        id: 'forms',
        name: 'Form Builder',
        headline: 'Capture leads effortlessly',
        description: 'Build beautiful lead-gen forms in minutes. Drag, drop, publish — connected directly to your CRM.',
        icon: '/BasaltCRM.png',
        url: 'https://crm.basalthq.com/messages/forms',
        accent: 'hsl(24, 100%, 50%)',
        accentRGB: '255, 106, 0',
        status: 'live',
        badge: 'Free',
        replaces: ['Typeform', 'JotForm', 'Google Forms'],
        keyFeatures: ['Drag & drop', 'CRM sync', 'Smart templates'],
    },
    {
        id: 'signature',
        name: 'Signature Builder',
        headline: 'Look professional instantly',
        description: 'Design a polished email signature in seconds. Every email becomes a branding opportunity.',
        icon: '/BasaltCRM.png',
        url: 'https://crm.basalthq.com/profile?tab=signature',
        accent: 'hsl(24, 100%, 50%)',
        accentRGB: '255, 106, 0',
        status: 'live',
        badge: 'Free',
        replaces: ['WiseStamp', 'Exclaimer', 'Manual HTML'],
        keyFeatures: ['Live preview', 'One-click copy', 'Brand consistent'],
    },
    {
        id: 'surge',
        name: 'BasaltSurge',
        headline: 'Accept payments anywhere',
        description: 'Modern payment processing with crypto support. Lower fees, instant settlement, no middlemen.',
        icon: '/BasaltSurge.png',
        url: 'https://surge.basalthq.com',
        accent: 'hsl(160, 80%, 45%)',
        accentRGB: '23, 184, 130',
        status: 'live',
        replaces: ['Stripe', 'Square', 'PayPal'],
        keyFeatures: ['Instant payouts', 'Multi-currency', 'Smart splits'],
    },
    {
        id: 'echo',
        name: 'BasaltEcho',
        headline: 'AI that answers your phone',
        description: 'Deploy a voice AI agent that handles calls, takes orders, and never sleeps. Your 24/7 receptionist.',
        icon: '/BasaltEcho.png',
        url: 'https://echo.basalthq.com',
        accent: 'hsl(280, 70%, 55%)',
        accentRGB: '156, 66, 220',
        status: 'live',
        replaces: ['Call centers', 'Dialpad AI', 'Bland.ai'],
        keyFeatures: ['24/7 coverage', 'Natural voice', 'Order taking'],
    },
    {
        id: 'erp',
        name: 'BasaltERP',
        headline: 'Run your whole business',
        description: 'Inventory, HR, finance, and procurement — unified in one platform built for growing companies.',
        icon: '/BasaltERP.png',
        url: 'https://erp.basalthq.com',
        accent: 'hsl(45, 90%, 50%)',
        accentRGB: '230, 186, 15',
        status: 'live',
        replaces: ['SAP', 'Oracle NetSuite', 'Odoo'],
        keyFeatures: ['Inventory', 'HR & Payroll', 'Financials'],
    },
    {
        id: 'cms',
        name: 'BasaltCMS',
        headline: 'Your content command center',
        description: 'Manage your website, media, docs, and forms from one dashboard. Publish everywhere, control everything.',
        icon: '/BasaltCMS.png',
        url: 'https://cms.basalthq.com',
        accent: 'hsl(180, 50%, 50%)',
        accentRGB: '100, 200, 200',
        status: 'coming_soon',
        replaces: ['WordPress', 'Contentful', 'Webflow'],
        keyFeatures: ['Multi-channel', 'Media library', 'AI copywriting'],
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
        <section id="portal" className="relative text-white overflow-hidden">
            {/* ── Hero ── */}
            <div className="relative z-10 max-w-5xl mx-auto px-6 pt-32 pb-8 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] text-xs text-white/50 mb-6">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    7 tools live — all free to start
                </div>

                <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.1]">
                    Your whole company,
                    <br />
                    <span style={{ color: 'hsl(171, 65%, 58%)' }}>one login.</span>
                </h1>

                <p className="mt-5 text-white/40 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
                    CRM, legal, payments, voice AI, ERP — seven tools that actually
                    <br className="hidden sm:block" />
                    talk to each other. Free to start. Unfair to compete against.
                </p>

                {/* CTA / User State */}
                <div className="mt-8 flex justify-center">
                    {isLoggedIn && account ? (
                        <div className="flex items-center gap-4 bg-white/[0.03] border border-white/[0.06] p-3 pr-5 rounded-2xl">
                            <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
                                {(userDisplayName || '?')[0].toUpperCase()}
                            </div>
                            <div className="text-left hidden sm:block">
                                <p className="text-sm font-medium text-white/90">{userDisplayName}</p>
                                {userEmail && <p className="text-xs text-white/40">{userEmail}</p>}
                            </div>
                            <button onClick={handleLogout} className="ml-2 p-2 rounded-lg hover:bg-white/[0.05] text-white/30 hover:text-white/70 transition-all" title="Sign out">
                                <LogOut size={16} />
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => setShowLogin(true)}
                            className="group px-8 py-4 rounded-2xl text-base font-bold transition-all flex items-center gap-3 bg-gradient-to-r from-[hsl(171,65%,58%)] to-[hsl(171,65%,45%)] text-black hover:shadow-[0_0_40px_rgba(76,206,181,0.3)] hover:scale-[1.02]"
                        >
                            Get Started Free
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    )}
                </div>
            </div>

            {/* ── Comparison Bar ── */}
            <div className="relative z-10 max-w-4xl mx-auto px-6 py-8">
                <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-white/25">
                    {['Salesforce', 'HubSpot', 'LegalZoom', 'Stripe', 'SAP', 'Typeform', 'Dialpad'].map(name => (
                        <span key={name} className="flex items-center gap-1.5 line-through decoration-white/15">
                            {name}
                        </span>
                    ))}
                </div>
            </div>

            {/* ── App Cards ── */}
            <div className="relative z-10 max-w-6xl mx-auto px-6 pb-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {APPS.map((app, i) => (
                        <AppCard
                            key={app.id}
                            app={app}
                            index={i}
                            isLoggedIn={isLoggedIn}
                            onLoginRequired={() => setShowLogin(true)}
                        />
                    ))}
                </div>
            </div>

            {/* ── Login Modal ── */}
            {showLogin && (
                <LoginModal
                    baseUrl={baseUrl}
                    onClose={() => setShowLogin(false)}
                    onLogin={() => { setIsLoggedIn(true); setShowLogin(false); }}
                    onLogout={() => setIsLoggedIn(false)}
                />
            )}
        </section>
    );
}

// ─── App Card ────────────────────────────────────────────────────────────────

function AppCard({ app, index, isLoggedIn, onLoginRequired }: {
    app: AppCard;
    index: number;
    isLoggedIn: boolean;
    onLoginRequired: () => void;
}) {
    const isComingSoon = app.status === 'coming_soon';

    const handleClick = () => {
        if (isComingSoon) return;
        if (!isLoggedIn && app.id !== 'erp') { onLoginRequired(); return; }
        let targetUrl = app.url;
        if (isLoggedIn && app.id === 'vigil') targetUrl = 'https://vigil.basalthq.com/chat';
        window.open(targetUrl, '_blank');
    };

    return (
        <button
            onClick={handleClick}
            disabled={isComingSoon}
            className={`group relative text-left rounded-3xl border transition-all duration-300 overflow-hidden ${
                isComingSoon
                    ? 'border-white/[0.04] bg-white/[0.01] cursor-not-allowed opacity-50'
                    : 'border-white/[0.08] bg-white/[0.02] hover:border-white/[0.15] hover:bg-white/[0.04] hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.6)] cursor-pointer'
            }`}
        >
            {/* Accent glow on hover */}
            {!isComingSoon && (
                <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: `radial-gradient(400px circle at 30% 20%, rgba(${app.accentRGB}, 0.08), transparent 60%)` }}
                />
            )}

            <div className="relative z-10 p-8">
                {/* Top: Icon + Name + Badge */}
                <div className="flex items-start justify-between mb-5">
                    <div className="flex items-center gap-4">
                        <div
                            className="w-14 h-14 rounded-2xl flex items-center justify-center border p-2"
                            style={{ backgroundColor: `rgba(${app.accentRGB}, 0.1)`, borderColor: `rgba(${app.accentRGB}, 0.2)` }}
                        >
                            <Image src={app.icon} alt={app.name} width={40} height={40} className="object-contain" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-white">{app.name}</h3>
                            <p className="text-sm font-medium" style={{ color: app.accent }}>{app.headline}</p>
                        </div>
                    </div>
                    {app.badge && !isComingSoon && (
                        <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full border"
                            style={{ color: app.accent, backgroundColor: `rgba(${app.accentRGB}, 0.08)`, borderColor: `rgba(${app.accentRGB}, 0.15)` }}>
                            {app.badge}
                        </span>
                    )}
                </div>

                {/* Description */}
                <p className="text-sm text-white/40 leading-relaxed mb-6">{app.description}</p>

                {/* Key features */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {app.keyFeatures.map(f => (
                        <span key={f} className="flex items-center gap-1.5 text-xs text-white/50 bg-white/[0.04] px-3 py-1.5 rounded-lg border border-white/[0.06]">
                            <Check size={12} className="text-emerald-400" />
                            {f}
                        </span>
                    ))}
                </div>

                {/* Replaces annotation — the Odoo-style "what it kills" */}
                <div className="flex items-center gap-3 pt-4 border-t border-white/[0.05]">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/20 shrink-0">Replaces</span>
                    <div className="flex items-center gap-1.5 flex-wrap">
                        {app.replaces.map((r, i) => (
                            <span key={r} className="flex items-center gap-1">
                                <span className="text-xs text-white/30 line-through decoration-red-500/40">{r}</span>
                                {i < app.replaces.length - 1 && <span className="text-white/10 text-xs">·</span>}
                            </span>
                        ))}
                    </div>
                    {!isComingSoon && (
                        <span className="ml-auto flex items-center gap-1 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 shrink-0"
                            style={{ color: app.accent }}>
                            Launch <ChevronRight size={14} />
                        </span>
                    )}
                </div>
            </div>
        </button>
    );
}

// ─── Login Modal ─────────────────────────────────────────────────────────────

function LoginModal({ baseUrl, onClose, onLogin, onLogout }: {
    baseUrl: string;
    onClose: () => void;
    onLogin: () => void;
    onLogout: () => void;
}) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm" onClick={onClose}>
            <div className="relative max-w-md w-full mx-4" onClick={e => e.stopPropagation()}>
                <div className="rounded-2xl border border-white/[0.08] bg-[#0a0a0a]/95 backdrop-blur-xl shadow-2xl overflow-hidden">
                    <div className="text-center pt-8 pb-4 px-6 border-b border-white/[0.05]">
                        <Image src="/BasaltHQShield.png" alt="BasaltHQ" width={48} height={48} className="rounded-xl mx-auto mb-3" />
                        <h3 className="text-lg font-bold text-white">Sign in to BasaltHQ</h3>
                        <p className="text-xs text-white/30 mt-1">One account for the entire ecosystem</p>
                    </div>
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
                                    onLogin();
                                },
                                getLoginPayload: async ({ address }) => {
                                    const res = await fetch(`/api/auth/thirdweb/payload?address=${address}&chainId=${base.id}`);
                                    return await res.json();
                                },
                                doLogout: async () => {
                                    await fetch('/api/auth/thirdweb/logout', { method: 'POST' });
                                    onLogout();
                                },
                            }}
                            appMetadata={{ name: 'BasaltHQ Portal', url: baseUrl, logoUrl: `${baseUrl}/BasaltHQShield.png` }}
                            privacyPolicyUrl="https://basalthq.com/privacy"
                            termsOfServiceUrl="https://basalthq.com/terms"
                            showThirdwebBranding={false}
                            modalSize="compact"
                            theme={darkTheme({
                                colors: {
                                    accentText: 'hsl(171, 65%, 58%)',
                                    accentButtonBg: 'hsl(171, 65%, 58%)',
                                    primaryButtonBg: 'hsl(171, 65%, 58%)',
                                    primaryButtonText: '#000000',
                                    separatorLine: 'hsl(0, 0%, 12%)',
                                    secondaryText: 'hsl(0, 0%, 50%)',
                                    primaryText: 'hsl(0, 0%, 93%)',
                                    connectedButtonBg: 'hsl(0, 0%, 10%)',
                                    connectedButtonBgHover: 'hsl(0, 0%, 15%)',
                                    inputAutofillBg: 'hsl(0, 0%, 6%)',
                                    selectedTextBg: 'hsl(171, 65%, 58%)',
                                    selectedTextColor: '#000000',
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
    );
}
