import { useEffect } from "react";
import Footer from "../components/layout/Footer";

const SECTIONS = [
  {
    num: "01",
    title: "Information We Collect",
    body: "When you use ARL Car Rental's platform, we collect information you provide directly, such as your full name, email address, phone number, government-issued ID details, driver's license number, home address, and payment information. We also collect information automatically, including your IP address, browser type, device identifiers, and usage data when you interact with our website or mobile application.",
  },
  {
    num: "02",
    title: "How We Use Your Information",
    list: [
      { label: "Booking & reservations", value: "Process and confirm rentals" },
      { label: "Identity verification", value: "Validate your government ID" },
      { label: "Communication", value: "Send booking confirmations & updates" },
      { label: "Payment processing", value: "Securely handle transactions" },
      { label: "Legal compliance", value: "Meet regulatory obligations" },
      { label: "Service improvement", value: "Analyze and enhance the platform" },
    ],
  },
  {
    num: "03",
    title: "Data Sharing & Disclosure",
    body: "ARL Car Rental does not sell, trade, or rent your personal information to third parties for marketing purposes. We may share your data with trusted service providers who assist in operating our platform (such as payment processors and SMS/email providers), law enforcement or regulatory authorities when required by law, and insurance partners strictly for the purpose of processing accident or damage claims.",
  },
  {
    num: "04",
    title: "Data Retention",
    body: "We retain your personal data for as long as your account is active or as needed to provide services. Booking records and associated identification data are kept for a minimum of five (5) years to comply with applicable Philippine laws and regulations. You may request deletion of your account and data at any time, subject to legal retention obligations.",
  },
  {
    num: "05",
    title: "Cookies & Tracking Technologies",
    highlight: "We use cookies to improve your experience",
    body: "Our website uses cookies and similar tracking technologies to remember your preferences, maintain your session, and analyze site traffic. You may disable cookies through your browser settings, but doing so may affect certain features of our platform. We do not use third-party advertising cookies or cross-site tracking.",
  },
  {
    num: "06",
    title: "Data Security",
    body: "We implement industry-standard security measures to protect your personal information, including HTTPS encryption for all data in transit, secure storage with access controls, and regular security audits. However, no method of transmission over the internet is 100% secure. In the event of a data breach that affects your rights and freedoms, we will notify you as required by the National Privacy Commission (NPC) of the Philippines.",
  },
  {
    num: "07",
    title: "Your Rights Under the Data Privacy Act",
    body: "Under Republic Act 10173 (Data Privacy Act of 2012), you have the right to be informed about how your data is used, to access a copy of your personal data we hold, to correct inaccurate or incomplete data, to object to the processing of your data under certain circumstances, and to request erasure of your data when no longer necessary. To exercise any of these rights, please contact us through our official channels.",
  },
  {
    num: "08",
    title: "Third-Party Links",
    body: "Our website may contain links to external sites such as Facebook or payment gateways. ARL Car Rental is not responsible for the privacy practices of those third-party websites. We encourage you to read their privacy policies before providing any personal information.",
  },
  {
    num: "09",
    title: "Children's Privacy",
    body: "ARL Car Rental's services are intended for individuals aged 21 and above (self-drive rentals) or 18 and above for other services. We do not knowingly collect personal information from children under the age of 18. If we become aware that a minor has submitted personal data, we will promptly delete it from our records.",
  },
  {
    num: "10",
    title: "Changes to This Privacy Policy",
    body: "We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. The most current version will always be available on our website. We will notify registered users of material changes via email or an in-platform notification at least 15 days before the changes take effect.",
  },
  {
    num: "11",
    title: "Contact & Data Protection Officer",
    highlight: "manalastas.arlene299@gmail.com · (044)-3228335",
    body: "If you have questions, concerns, or requests related to this Privacy Policy or the handling of your personal data, please contact ARL Car Rental at Villa Roma V, Lias, Marilao, Bulacan, or reach us through our official Facebook page. We are committed to addressing your concerns promptly and transparently.",
  },
];

export default function PrivacyPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="bg-arl-light min-h-screen">

      {/* Hero banner */}
      <div className="bg-arl-primary relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(circle at 70% 50%, #4FC3F7 0%, transparent 60%)" }}
        />
        <div className="relative max-w-4xl mx-auto px-6 py-16">
          <p className="text-xs font-bold tracking-[0.25em] text-arl-secondary uppercase mb-3">ARL Car Rental</p>
          <h1 className="font-display text-4xl md:text-5xl text-white font-black leading-tight mb-3">
            Privacy Policy
          </h1>
          <p className="text-sm text-white/50">Effective January 1, 2026 · Governed by RA 10173 (Data Privacy Act)</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-14">
        <div className="flex flex-col gap-8">

          {/* Intro note */}
          <div
            className="bg-white rounded-3xl shadow-soft p-6 border-l-4"
            style={{ borderLeftColor: "#4FC3F7" }}
          >
            <p className="text-sm text-gray-600 leading-relaxed">
              ARL Car Rental ("we," "us," or "our") is committed to protecting your personal information. This Privacy Policy explains how we collect, use, store, and safeguard the data you provide when using our services, in accordance with the{" "}
              <strong className="text-arl-primary">Republic Act 10173 — Data Privacy Act of 2012</strong> of the Philippines.
            </p>
          </div>

          {SECTIONS.map((s) => (
            <div key={s.num} className="bg-white rounded-3xl shadow-soft p-8 flex gap-6">

              {/* Number badge */}
              <div className="flex-shrink-0">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center"
                  style={{ backgroundColor: "rgba(26,95,122,0.08)" }}
                >
                  <span className="text-sm font-black text-arl-primary">{s.num}</span>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h2 className="text-lg font-bold text-arl-primary mb-3">{s.title}</h2>

                {s.highlight && (
                  <div
                    className="inline-flex items-center gap-2 mb-3 px-4 py-1.5 rounded-full text-sm font-bold text-arl-primary"
                    style={{ backgroundColor: "rgba(79,195,247,0.12)" }}
                  >
                    <span className="w-2 h-2 rounded-full bg-arl-secondary inline-block flex-shrink-0" />
                    {s.highlight}
                  </div>
                )}

                {s.body && (
                  <p className="text-sm text-gray-600 leading-relaxed mb-3">{s.body}</p>
                )}

                {s.list && (
                  <div className="flex flex-col gap-2 my-3">
                    {s.list.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between bg-arl-light rounded-xl px-4 py-2.5"
                      >
                        <span className="text-sm text-gray-500">{item.label}</span>
                        <span className="text-sm font-bold text-arl-primary">{item.value}</span>
                      </div>
                    ))}
                  </div>
                )}

                {s.footer && (
                  <p className="text-sm text-gray-500 leading-relaxed mt-2">{s.footer}</p>
                )}
              </div>

            </div>
          ))}

          {/* Closing acknowledgment */}
          <div className="bg-arl-primary rounded-3xl p-8 text-center">
            <p className="text-white/70 text-sm leading-relaxed max-w-xl mx-auto">
              By using ARL Car Rental's services, you acknowledge that you have read and understood this Privacy Policy and consent to the collection and use of your information as described herein.
            </p>
            <p className="text-white/40 text-xs mt-4">© 2026 ARL Car Rental. All rights reserved.</p>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
}
