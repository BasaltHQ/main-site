import type { Metadata } from "next";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Privacy Policy – Ledger1",
  description: "How Ledger1 collects, uses, and protects your information. Learn about data rights, retention, security, and contact details.",
  alternates: { canonical: "https://ledger1.ai/privacy" },
};

export default function PrivacyPage() {
  const updated = new Date().toISOString().slice(0, 10);
  return (
    <div className="min-h-screen">
      <section className="relative py-20 bg-gradient-to-b from-background to-muted/20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Privacy Policy</h1>
          <p className="text-sm text-muted-foreground">Last updated: {updated}</p>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 prose prose-invert">
          <p>
            Ledger1 ("we", "us", "our") provides an AI‑assisted ERP platform. This Privacy Policy explains how we
            collect, use, share, and protect information in connection with our websites, products, and services (collectively, the "Services").
          </p>

          <h2>Information We Collect</h2>
          <ul>
            <li>
              <strong>Account & Contact Data</strong>: name, email address, company, role, and authentication identifiers.
            </li>
            <li>
              <strong>Operational Data</strong>: content and metadata you provide to the platform (e.g., inventory, orders, schedules),
              integrations, audit logs, and configuration.
            </li>
            <li>
              <strong>Usage Data</strong>: device and browser information, IP address, pages viewed, product interactions, diagnostics, and crash data.
            </li>
            <li>
              <strong>Cookies & Similar</strong>: we use cookies and local storage to remember preferences, maintain sessions, and analyze usage.
            </li>
          </ul>

          <h2>How We Use Information</h2>
          <ul>
            <li>Provide, operate, secure, and improve the Services.</li>
            <li>Personalize experiences, including AI‑assisted recommendations and automations.</li>
            <li>Communicate with you about product updates, support, and security notices.</li>
            <li>Analyze performance and develop new features.</li>
            <li>Comply with legal obligations and enforce terms and policies.</li>
          </ul>

          <h2>Sharing of Information</h2>
          <ul>
            <li>
              <strong>Processors</strong>: trusted vendors who process data on our behalf (e.g., hosting, analytics, email) under written agreements.
            </li>
            <li>
              <strong>Integrations</strong>: at your direction, we exchange data with third‑party systems (e.g., POS/ERP/HRIS).
            </li>
            <li>
              <strong>Legal</strong>: to comply with law, respond to lawful requests, or protect rights, safety, and security.
            </li>
            <li>
              <strong>Corporate Events</strong>: in connection with mergers, acquisitions, financing, or asset transfers.
            </li>
          </ul>

          <h2>International Transfers</h2>
          <p>
            We may transfer and process information in countries other than where you live. Where required, we use appropriate
            safeguards such as Standard Contractual Clauses.
          </p>

          <h2>Data Retention</h2>
          <p>
            We retain information for as long as necessary to provide the Services, comply with legal obligations, resolve disputes,
            and enforce agreements. Retention periods vary by data type and customer configuration.
          </p>

          <h2>Security</h2>
          <p>
            We apply industry‑standard safeguards including encryption in transit, role‑based access controls, audit logging, secure development
            practices, and regular backups. No method of transmission or storage is 100% secure.
          </p>

          <h2>Your Rights</h2>
          <p>
            Depending on your location, you may have rights to access, correct, delete, or restrict processing of your personal data.
            You can exercise these rights by contacting us using the information below. Where we process data on behalf of a customer,
            we may refer your request to that customer.
          </p>

          <h2>Children</h2>
          <p>Our Services are not directed to children under 13 (or the age required by local law). We do not knowingly collect such data.</p>

          <h2>Do Not Track</h2>
          <p>We do not respond to Do Not Track signals. You can manage cookies through your browser settings.</p>

          <h2>Changes to This Policy</h2>
          <p>We may update this Policy from time to time. We will post the updated version and update the “Last updated” date.</p>

          <h2>Contact</h2>
          <p>
            Ledger1 · Santa Fe, New Mexico · Email: <a href="mailto:info@theutilitycompany.co">info@theutilitycompany.co</a>
          </p>
        </div>
      </section>
      <Footer />
    </div>
  );
}
