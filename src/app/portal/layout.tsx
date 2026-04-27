import ThirdWebProviderWrapper from "@/components/nexus/ThirdWebProvider";

export const metadata = {
    title: "BasaltHQ Portal — Your Apps",
    description: "Access all BasaltHQ applications from a single, unified portal.",
};

export default function PortalLayout({ children }: { children: React.ReactNode }) {
    return <ThirdWebProviderWrapper>{children}</ThirdWebProviderWrapper>;
}
