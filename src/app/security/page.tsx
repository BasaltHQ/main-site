import type { Metadata } from "next";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Security – Ledger1",
  description: "Our approach to security: encryption, access control, SSO, audit logs, data retention, incident response, and vulnerability disclosure.",
  alternates: { canonical: "https://ledger1.ai/security" },
};

export default function SecurityPage() {
  return (
    <div className="min-h-screen">
      <section className="relative py-20 bg-gradient-to-b from-background to-muted/20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Security</h1>
          <p className="text-lg text-muted-foreground">Enterprise‑grade safeguards to protect your data and operations.</p>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 prose prose-invert">
          <h2>Platform Security</h2>
          <ul>
            <li><strong>Encryption</strong>: TLS 1.2+ in transit; encryption at rest for databases and backups.</li>
            <li><strong>Access Control</strong>: role‑based permissions, least‑privilege, MFA/2FA support, and SSO (SAML/OIDC) on enterprise plans.</li>
            <li><strong>Auditability</strong>: structured audit logs for access and changes across modules.</li>
            <li><strong>Secure Development</strong>: code review, dependency scanning, and separation of environments.</li>
            <li><strong>Backups</strong>: regular encrypted backups with periodic restore testing.</li>
          </ul>

          <h2>Data Governance</h2>
          <ul>
            <li>Configurable data retention aligned to your compliance needs.</li>
            <li>Customer ownership of data; export options and private GraphQL access on enterprise plans.</li>
            <li>Data residency options available upon request.</li>
          </ul>

          <h2>Incident Response</h2>
          <p>We monitor for anomalies and operate a documented incident response plan, including triage, containment, remediation, and customer notification where required.</p>

          <h2>Vulnerability Disclosure</h2>
          <p>If you believe you’ve found a security issue, please contact <a href="mailto:info@theutilitycompany.co">info@theutilitycompany.co</a> with details. We appreciate responsible disclosure and will work with you to remediate.</p>

          <h2>Compliance</h2>
          <p>We follow industry best practices and can support vendor questionnaires. Formal certifications will be noted here as they become available.</p>
        </div>
      </section>
      <Footer />
    </div>
  );
}


