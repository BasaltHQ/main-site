import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, X, Zap } from "lucide-react";
import Image from "next/image";

export const metadata: Metadata = {
    title: "Ledger1 vs Palantir – The Ontology for the 99%",
    description: "Palantir built the Ontology for Wall Street. We built the Main Street Ontology. AI-driven operating system for businesses that build the real world.",
    keywords: ["Palantir Alternative", "Main Street Ontology", "SMB ERP", "Business Operating System", "Anti-Wall Street"],
};

export default function PalantirAlternativePage() {
    return (
        <div className="min-h-screen bg-background text-foreground overflow-hidden">
            {/* Hero Section */}
            <section className="relative isolate px-6 pt-14 lg:px-8">
                <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
                    <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
                </div>

                <div className="mx-auto max-w-4xl py-32 sm:py-48 lg:py-56 text-center">
                    <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                        <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-muted-foreground ring-1 ring-border hover:ring-foreground/20">
                            The war for intelligence is over. <span className="font-semibold text-primary">Main Street won.</span>
                        </div>
                    </div>

                    <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
                        Palantir is the <span className="text-red-500">Wall Street Ontology</span>.
                        <br />
                        We are the <span className="text-primary">Main Street Ontology</span>.
                    </h1>

                    <p className="mt-6 text-lg leading-8 text-muted-foreground">
                        They built a digital twin for the Fortune 500 to extract value from the world.
                        We built a pre-packaged Intelligence Platform to help you build the world.
                    </p>

                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Link
                            href="/#products"
                            className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                        >
                            Get the Operating System
                        </Link>
                        <Link href="/" className="text-sm font-semibold leading-6 text-foreground flex items-center">
                            Explore the Suite <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Comparison Section */}
            <section className="py-24 sm:py-32 bg-card/50">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl sm:text-center">
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">The Tale of Two Ontologies</h2>
                        <p className="mt-6 text-lg leading-8 text-muted-foreground">
                            One was built for extraction. The other was built for creation. Choose your side.
                        </p>
                    </div>

                    <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-border sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
                        {/* Palantir Side */}
                        <div className="p-8 sm:p-10 lg:flex-auto lg:w-1/2">
                            <h3 className="text-2xl font-bold tracking-tight text-foreground">The Wall Street Ontology</h3>
                            <p className="mt-2 text-base leading-7 text-muted-foreground">Designed for massive corporations with unlimited budgets and armies of data engineers.</p>

                            <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-muted-foreground">
                                <li className="flex gap-x-3 text-red-400">
                                    <X className="h-6 w-5 flex-none" />
                                    Requires $10M+ setup fees
                                </li>
                                <li className="flex gap-x-3 text-red-400">
                                    <X className="h-6 w-5 flex-none" />
                                    Requires team of Forward Deployed Engineers
                                </li>
                                <li className="flex gap-x-3 text-red-400">
                                    <X className="h-6 w-5 flex-none" />
                                    6-12 month implementation timeline
                                </li>
                                <li className="flex gap-x-3 text-red-400">
                                    <X className="h-6 w-5 flex-none" />
                                    Built to optimize financial extraction
                                </li>
                            </ul>
                        </div>

                        {/* Ledger1 Side */}
                        <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
                            <div className="rounded-2xl bg-primary/5 py-10 text-center ring-1 ring-inset ring-primary/20 lg:flex lg:flex-col lg:justify-center lg:py-16">
                                <div className="mx-auto max-w-xs px-8">
                                    <p className="text-base font-semibold text-foreground">The Main Street Ontology</p>
                                    <p className="mt-6 flex items-baseline justify-center gap-x-2">
                                        <span className="text-5xl font-bold tracking-tight text-foreground">$499</span>
                                        <span className="text-sm font-semibold leading-6 tracking-wide text-muted-foreground">/mo</span>
                                    </p>
                                    <Link
                                        href="/#products"
                                        className="mt-10 block w-full rounded-md bg-primary px-3 py-2 text-center text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                                    >
                                        Deploy Intelligence
                                    </Link>
                                    <p className="mt-6 text-xs leading-5 text-muted-foreground">
                                        Includes ERP, CRM, VoiceHub & PortalPay
                                    </p>
                                </div>

                                <div className="mt-8 px-8 text-left">
                                    <ul role="list" className="space-y-3 text-sm leading-6 text-muted-foreground">
                                        <li className="flex gap-x-3 text-primary">
                                            <Check className="h-6 w-5 flex-none" />
                                            <span className="text-foreground">Pre-packaged Industry Ontologies</span>
                                        </li>
                                        <li className="flex gap-x-3 text-primary">
                                            <Check className="h-6 w-5 flex-none" />
                                            <span className="text-foreground">AI Module Builder (No engineers needed)</span>
                                        </li>
                                        <li className="flex gap-x-3 text-primary">
                                            <Check className="h-6 w-5 flex-none" />
                                            <span className="text-foreground">Instant Value, Day 1</span>
                                        </li>
                                        <li className="flex gap-x-3 text-primary">
                                            <Check className="h-6 w-5 flex-none" />
                                            <span className="text-foreground">Built for Growth & Creation</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative isolate mt-32 px-6 py-32 sm:mt-56 sm:px-8">
                <div className="absolute inset-0 -z-10 overflow-hidden">
                    <div className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]" aria-hidden="true">
                        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
                            <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
                        </div>
                    </div>
                </div>

                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                        Ready to reclaim your operational intelligence?
                    </h2>
                    <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
                        Don't let Wall Street have all the fun (and all the data). Deploy the Main Street Ontology today.
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Link
                            href="/#products"
                            className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                        >
                            Get Started
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
