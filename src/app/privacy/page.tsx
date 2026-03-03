import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — utxo AG",
};

export default function PrivacyPage() {
  return (
    <main className="px-6 py-32">
      <div className="max-w-[640px] mx-auto">
        <h1 className="text-[36px] font-extrabold tracking-[-1.5px] leading-[1.1] mb-4">
          Privacy Policy
        </h1>
        <p className="text-[14px] text-[#999] mb-12">Last updated: January 30, 2026</p>

        <div className="text-[15px] text-[#555] leading-[1.75]">
          <section>
            <h2 className="text-[17px] font-bold text-[#111] mb-3">1. Controller</h2>
            <p>
              The controller responsible for data processing on this website and through our AI agent services is:
            </p>
            <p className="mt-2">
              <strong>utxo AG</strong><br />
              Dammstrasse 16, 6300 Zug, Switzerland<br />
              Handelsregister-Nummer CH-400.3.450.669-8<br />
              Email: business@utxo.ag
            </p>
          </section>

          <hr className="my-8 border-[#eee]" />

          <section>
            <h2 className="text-[17px] font-bold text-[#111] mb-3">2. Scope and Purpose</h2>
            <p>
              This privacy policy applies to all services provided by utxo AG, including but not limited to: this website, AI agents operated on behalf of clients, email-based agent interactions, and any related software services (collectively, the &ldquo;Services&rdquo;).
            </p>
            <p className="mt-3">
              We process personal data in compliance with the Swiss Federal Act on Data Protection (FADP/DSG), the EU General Data Protection Regulation (GDPR), and the EU Artificial Intelligence Act (EU AI Act) where applicable.
            </p>
          </section>

          <hr className="my-8 border-[#eee]" />

          <section>
            <h2 className="text-[17px] font-bold text-[#111] mb-3">3. Data We Collect</h2>

            <h3 className="text-[15px] font-semibold text-[#333] mt-4 mb-2">3.1 Website Data</h3>
            <p>When you visit our website, we may collect: IP address, browser type and version, operating system, referral URL, pages visited, date and time of access, and other technical metadata transmitted by your browser.</p>

            <h3 className="text-[15px] font-semibold text-[#333] mt-4 mb-2">3.2 AI Agent Interaction Data</h3>
            <p>When you interact with our AI agents (via email or other channels), we collect and process:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Email addresses, names, and contact information</li>
              <li>The full content of emails sent to and received from our AI agents, including attachments</li>
              <li>Data retrieved from connected third-party systems (CRM, ERP, databases, APIs) on your behalf or on behalf of your organization</li>
              <li>Metadata about agent interactions (timestamps, processing logs, performance metrics)</li>
              <li>Any files, documents, or data you provide to or through the agents</li>
            </ul>

            <h3 className="text-[15px] font-semibold text-[#333] mt-4 mb-2">3.3 Business Contact Data</h3>
            <p>When you contact us for business inquiries, we collect your name, email address, company name, and any information you voluntarily provide.</p>
          </section>

          <hr className="my-8 border-[#eee]" />

          <section>
            <h2 className="text-[17px] font-bold text-[#111] mb-3">4. Legal Basis for Processing</h2>
            <p>We process personal data on the following legal bases:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong>Contract performance</strong> (Art. 6(1)(b) GDPR): Processing necessary for the performance of our services as agreed with you or your organization.</li>
              <li><strong>Legitimate interest</strong> (Art. 6(1)(f) GDPR): Processing necessary for the operation, improvement, and security of our services, including AI agent training, quality assurance, debugging, and analytics.</li>
              <li><strong>Consent</strong> (Art. 6(1)(a) GDPR): Where you have given explicit consent, which you may withdraw at any time.</li>
              <li><strong>Legal obligation</strong> (Art. 6(1)(c) GDPR): Processing necessary for compliance with applicable laws.</li>
            </ul>
          </section>

          <hr className="my-8 border-[#eee]" />

          <section>
            <h2 className="text-[17px] font-bold text-[#111] mb-3">5. AI-Specific Data Processing</h2>
            <p>
              Our AI agents process data using large language models (LLMs) and other machine learning systems. By using our AI agent services, you acknowledge and accept the following:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>All data sent to or processed by our AI agents may be used for the purpose of delivering, maintaining, improving, and developing our AI services.</li>
              <li>Email content, attachments, and any connected system data may be processed by third-party AI infrastructure providers (including but not limited to cloud computing providers and LLM API providers) outside of Switzerland and the EEA.</li>
              <li>AI-generated outputs may be logged, stored, and analyzed for quality assurance, debugging, compliance monitoring, and service improvement.</li>
              <li>We may use anonymized or aggregated interaction data for research, benchmarking, and model improvement purposes.</li>
              <li>In accordance with the EU AI Act, we classify our AI agents as limited-risk AI systems and maintain transparency about their use of artificial intelligence. Users interacting with our agents will be informed that they are communicating with an AI system.</li>
            </ul>
          </section>

          <hr className="my-8 border-[#eee]" />

          <section>
            <h2 className="text-[17px] font-bold text-[#111] mb-3">6. Data Sharing and Transfers</h2>
            <p>We may share personal data with:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong>Cloud infrastructure providers</strong> for hosting and computing (servers may be located in the EU, US, or other jurisdictions)</li>
              <li><strong>AI/LLM providers</strong> for processing agent requests</li>
              <li><strong>Third-party systems</strong> your organization has authorized us to connect to (CRM, ERP, email servers, databases)</li>
              <li><strong>Professional advisors</strong> (legal, accounting) as necessary</li>
              <li><strong>Authorities</strong> when required by law</li>
            </ul>
            <p className="mt-3">
              Where data is transferred outside Switzerland or the EEA, we rely on adequacy decisions, Standard Contractual Clauses (SCCs), or other appropriate safeguards as required by applicable law.
            </p>
          </section>

          <hr className="my-8 border-[#eee]" />

          <section>
            <h2 className="text-[17px] font-bold text-[#111] mb-3">7. Data Retention</h2>
            <p>
              We retain personal data for as long as necessary to fulfill the purposes described in this policy, comply with legal obligations, resolve disputes, and enforce our agreements. AI agent interaction logs may be retained indefinitely for service improvement, compliance, and auditing purposes unless you request deletion and no legal retention obligation applies.
            </p>
          </section>

          <hr className="my-8 border-[#eee]" />

          <section>
            <h2 className="text-[17px] font-bold text-[#111] mb-3">8. Your Rights</h2>
            <p>Under applicable data protection law (FADP/GDPR), you have the right to:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Access the personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data (subject to legal retention requirements)</li>
              <li>Object to or restrict certain processing activities</li>
              <li>Request data portability</li>
              <li>Withdraw consent at any time (without affecting prior processing)</li>
              <li>Lodge a complaint with a supervisory authority (FDPIC in Switzerland, or your local EU data protection authority)</li>
            </ul>
            <p className="mt-3">
              To exercise any of these rights, contact us at <a href="mailto:business@utxo.ag" className="underline underline-offset-2 hover:text-[#111]">business@utxo.ag</a>. We may require identity verification before processing your request. We will respond within 30 days as required by law.
            </p>
          </section>

          <hr className="my-8 border-[#eee]" />

          <section>
            <h2 className="text-[17px] font-bold text-[#111] mb-3">9. Cookies and Tracking</h2>
            <p>
              This website may use essential cookies required for its operation. We do not use advertising or tracking cookies. Any analytics, if implemented, will use privacy-respecting tools in compliance with applicable law.
            </p>
          </section>

          <hr className="my-8 border-[#eee]" />

          <section>
            <h2 className="text-[17px] font-bold text-[#111] mb-3">10. Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect personal data against unauthorized access, alteration, disclosure, or destruction. However, no method of electronic transmission or storage is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <hr className="my-8 border-[#eee]" />

          <section>
            <h2 className="text-[17px] font-bold text-[#111] mb-3">11. Changes to This Policy</h2>
            <p>
              We reserve the right to modify this privacy policy at any time. Changes become effective upon publication on this website. Continued use of our services after changes constitutes acceptance of the updated policy.
            </p>
          </section>

          <hr className="my-8 border-[#eee]" />

          <section>
            <h2 className="text-[17px] font-bold text-[#111] mb-3">12. Contact</h2>
            <p>
              For questions about this privacy policy or our data processing practices, contact:<br />
              utxo AG, Dammstrasse 16, 6300 Zug, Switzerland<br />
              <a href="mailto:business@utxo.ag" className="underline underline-offset-2 hover:text-[#111]">business@utxo.ag</a>
            </p>
          </section>
        </div>

        <div className="mt-16 pt-8 border-t border-[#eee]">
          <a href="/" className="text-[13px] text-[#999] hover:text-[#111] transition-colors">
            &larr; Back to home
          </a>
        </div>
      </div>
    </main>
  );
}
