import type { Metadata } from "next";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Terms of Service – Ledger1",
  description: "The legal terms governing your use of Ledger1, including subscriptions, acceptable use, data, warranties, and liability.",
  alternates: { canonical: "https://ledger1.ai/terms" },
};

export default function TermsPage() {
  const updated = new Date().toISOString().slice(0, 10);
  return (
    <div className="min-h-screen">
      <section className="relative py-20 bg-gradient-to-b from-background to-muted/20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Terms of Service</h1>
          <p className="text-sm text-muted-foreground">Last updated: {updated}</p>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 prose prose-invert">
          <p>These Terms of Service ("Terms") govern your access to and use of the Ledger1 platform and services (the "Services"). By using the Services, you agree to these Terms.</p>

          <h2>Accounts & Access</h2>
          <ul>
            <li>You must provide accurate account information and keep credentials secure.</li>
            <li>You are responsible for activities that occur under your accounts.</li>
            <li>Use is subject to organizational roles and permissions configured by your administrator.</li>
          </ul>

          <h2>Subscriptions & Fees</h2>
          <ul>
            <li>Paid plans are billed per the order form or plan page. Fees are non‑refundable except as required by law.</li>
            <li>We may modify pricing with advance notice for the next term; changes do not affect a current committed term.</li>
          </ul>

          <h2>Acceptable Use</h2>
          <ul>
            <li>No unlawful, infringing, or harmful content or activity.</li>
            <li>No interference with the operation or security of the Services.</li>
            <li>No reverse engineering or circumvention of technical protections, except where permitted by law.</li>
          </ul>

          <h2>Customer Data</h2>
          <p>"Customer Data" means information you submit to the Services. You retain ownership of Customer Data. You grant us a license to process Customer Data to provide and improve the Services in accordance with the Privacy Policy and any applicable Data Processing Addendum.</p>

          <h2>Integrations & Third‑Party Services</h2>
          <p>By enabling an integration, you instruct us to exchange data with that service. We are not responsible for third‑party services and disclaim liability for their acts or omissions.</p>

          <h2>Confidentiality</h2>
          <p>Each party may receive confidential information from the other. The receiving party will protect such information using at least reasonable care and use it only as permitted by these Terms.</p>

          <h2>Security</h2>
          <p>We maintain administrative, technical, and physical safeguards to protect the Services as described in our Security Statement.</p>

          <h2>Warranties & Disclaimers</h2>
          <ul>
            <li>The Services are provided "as is". We disclaim all warranties, express or implied, to the maximum extent permitted by law.</li>
            <li>We do not warrant that the Services will be uninterrupted, error‑free, or meet your requirements.</li>
          </ul>

          <h2>Limitation of Liability</h2>
          <p>To the fullest extent permitted by law, neither party will be liable for indirect, incidental, special, consequential, or punitive damages, or for lost profits or revenues. Except for payment obligations, data misuse, or willful misconduct, each party's aggregate liability is limited to the amounts paid in the 12 months before the event giving rise to liability.</p>

          <h2>Indemnification</h2>
          <p>You will indemnify and hold us harmless from claims arising from your use of the Services in violation of these Terms or applicable law. We will indemnify you for third‑party claims alleging that the Services infringe intellectual property rights, subject to limitations.</p>

          <h2>Termination</h2>
          <p>Either party may terminate for material breach not cured within 30 days after written notice. Upon termination, your access will cease, and we may delete or return Customer Data per our retention policies and your instructions.</p>

          <h2>Governing Law</h2>
          <p>These Terms are governed by the laws of the State of New Mexico, excluding conflicts of law rules. Venue lies in state or federal courts located in Santa Fe County, New Mexico.</p>

          <h2>Changes</h2>
          <p>We may update these Terms. We will post the updated version with an updated “Last updated” date. Your continued use constitutes acceptance.</p>

          <h2>Contact</h2>
          <p>Questions? Email <a href="mailto:info@theutilitycompany.co">info@theutilitycompany.co</a>.</p>
        </div>
      </section>
      <Footer />
    </div>
  );
}


