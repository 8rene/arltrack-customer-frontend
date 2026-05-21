import { useEffect } from "react";
import Footer from "../components/layout/Footer";

const SECTIONS = [
  {
    num: "01",
    title: "Introduction",
    body: "ARL Car Rental ('we', 'us', or 'our') is committed to protecting the privacy and personal data of our customers. This Privacy Policy explains how we collect, use, store, and protect your information when you use our website, mobile application, or rental services. By using our services, you consent to the data practices described in this policy.",
  },
  {
    num: "02",
    title: "Information We Collect",
    body: "We collect personal information that you voluntarily provide when creating an account, making a booking, or contacting us. This includes:",
    list: [
      { label: "Identity Information", value: "Full name, date of birth, profile photo" },
      { label: "Contact Information", value: "Email address, phone number, home address" },
      { label: "Government ID", value: "Driver's license, valid government-issued ID" },
      { label: "Payment Information", value: "Bank transfer details, GCash or Maya reference numbers" },
      { label: "Location Data", value: "Pickup and drop-off locations you provide" },
      { label: "Usage Data", value: "Booking history, app interactions, session logs" },
    ],
  },
  {
    num: "03",
    title: "How We Use Your Information",
    body: "We use the personal data we collect for the following purposes:",
    list: [
      { label: "Booking Management", value: "To process and confirm your reservations" },
      { label: "Identity Verification", value: "To verify your identity and driver eligibility" },
      { label: "Customer Support", value: "To respond to inquiries and resolve disputes" },
      { label: "Payments", value: "To facilitate transactions and issue refunds" },
      { label: "Security", value: "To detect fraud, misuse, or violations" },
      { label: "Legal Compliance", value: "To comply with Philippine laws and regulations" },
      { label: "Communications", value: "To send booking confirmations, OTPs, and updates" },
    ],
  },
  {
    num: "04",
    title: "Legal Basis for Processing",
    body: "ARL Car Rental processes your personal data in accordance with Republic Act No. 10173, known as the Data Privacy Act of 2012 of the Philippines, and its Implementing Rules and Regulations. We process your data on the following grounds: your explicit consent, the performance of our rental contract with you, compliance with legal obligations, and the pursuit of our legitimate business interests where these do not override your rights.",
  },
  {
    num: "05",
    title: "Data Sharing & Disclosure",
    body: "We do not sell, trade, or rent your personal information to third parties for marketing purposes. We may share your data only in the following circumstances:",
    list: [
      { label: "Service Providers", value: "Firebase (cloud infrastructure), payment processors" },
      { label: "Legal Authorities", value: "PNP or courts when required by law or court order" },
      { label: "Incident Reporting", value: "Third parties involved in accidents with your consent" },
      { label: "Business Transfers", value: "In the event of a merger or acquisition" },
    ],
    footer: "All third-party service providers are required to protect your data in accordance with applicable privacy laws.",
  },
  {
    num: "06",
    title: "Data Retention",
    body: "We retain your personal data only for as long as necessary to fulfil the purposes outlined in this policy, unless a longer retention period is required by law. Booking records are retained for a minimum of five (5) years for legal and audit purposes. Account data is kept for the duration of your active relationship with ARL Car Rental. You may request deletion of your account and associated data at any time, subject to legal retention requirements.",
  },
  {
    num: "07",
    title: "Cookies & Tracking Technologies",
    body: "Our web platform may use cookies and similar tracking technologies to enhance your browsing experience, remember your preferences, and analyze usage patterns. You may control cookie settings through your browser preferences. Disabling cookies may affect the functionality of certain features on our platform.",
  },
  {
    num: "08",
    title: "Data Security",
    body: "We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, accidental loss, destruction, or disclosure. These measures include:",
    list: [
      { label: "Encryption", value: "Data transmitted via HTTPS/TLS protocols" },
      { label: "Access Controls", value: "Role-based access for internal staff" },
      { label: "Authentication", value: "OTP verification and JWT token security" },
      { label: "Cloud Security", value: "Firebase security rules and Firestore access policies" },
    ],
    footer: "While we strive to protect your data, no method of transmission over the Internet is 100% secure. We encourage you to use strong passwords and keep your account credentials confidential.",
  },
  {
    num: "09",
    title: "Your Rights Under the Data Privacy Act",
    body: "As a data subject under RA 10173, you have the following rights with respect to your personal data:",
    list: [
      { label: "Right to Access", value: "Request a copy of the data we hold about you" },
      { label: "Right to Rectification", value: "Request correction of inaccurate or incomplete data" },
      { label: "Right to Erasure", value: "Request deletion of your data, subject to legal limits" },
      { label: "Right to Object", value: "Object to processing based on legitimate interest" },
      { label: "Right to Portability", value: "Receive your data in a structured, readable format" },
      { label: "Right to Complain", value: "Lodge a complaint with the National Privacy Commission" },
    ],
    footer: "To exercise any of these rights, please contact us using the details provided in the Contact section below.",
  },
  {
    num: "10",
    title: "Children's Privacy",
    body: "ARL Car Rental's services are not directed to individuals under the age of 18. We do not knowingly collect personal information from minors. If you believe that a child under 18 has provided us with personal data, please contact us immediately and we will take steps to delete such information from our records.",
  },
  {
    num: "11",
    title: "Changes to This Privacy Policy",
    body: "We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. We will notify you of material changes by posting the updated policy on our platform and updating the effective date. Your continued use of our services after any changes constitutes your acceptance of the revised policy.",
  },
  {
    num: "12",
    title: "Contact Us",
    highlight: "manalastas.arlene299@gmail.com · 09665303323",
    body: "If you have any questions, concerns, or requests regarding this Privacy Policy or the handling of your personal data, please contact us through any of the following channels:",
    list: [
      { label: "Email", value: "manalastas.arlene299@gmail.com" },
      { label: "Phone", value: "09665303323 | (044)-3228335" },
      { label: "Address", value: "Villa Roma V, Lias, Marilao, Bulacan" },
      { label: "Facebook", value: "ARL Car Rental (Official Page)" },
    ],
    footer: "We aim to respond to all privacy-related inquiries within five (5) business days.",
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
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(circle at 70% 50%, #4FC3F7 0%, transparent 60%)" }} />
        <div className="relative max-w-4xl mx-auto px-6 py-16">
          <p className="text-xs font-bold tracking-[0.25em] text-arl-secondary uppercase mb-3">ARL Car Rental</p>
          <h1 className="font-display text-4xl md:text-5xl text-white font-black leading-tight mb-3">
            Privacy Policy
          </h1>
          <p className="text-sm text-white/50">In accordance with the Data Privacy Act of 2012 (RA 10173)</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-14">
        <div className="flex flex-col gap-8">
          {SECTIONS.map((s) => (
            <div key={s.num} className="bg-white rounded-3xl shadow-soft p-8 flex gap-6">

              {/* Number badge */}
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
                  style={{ backgroundColor: "rgba(26,95,122,0.08)" }}>
                  <span className="text-sm font-black text-arl-primary">{s.num}</span>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h2 className="text-lg font-bold text-arl-primary mb-3">{s.title}</h2>

                {s.highlight && (
                  <div className="inline-flex items-center gap-2 mb-3 px-4 py-1.5 rounded-full text-sm font-bold text-arl-primary"
                    style={{ backgroundColor: "rgba(79,195,247,0.12)" }}>
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
                      <div key={i} className="flex items-center justify-between bg-arl-light rounded-xl px-4 py-2.5">
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

          {/* Acknowledgment */}
          <div className="bg-arl-primary rounded-3xl p-8 text-center">
            <p className="text-white/70 text-sm leading-relaxed max-w-xl mx-auto">
              By using ARL Car Rental&apos;s services, you acknowledge that you have read and understood this Privacy Policy and consent to the collection and use of your personal data as described herein.
            </p>
            <p className="text-white/40 text-xs mt-4">© 2026 ARL Car Rental. All rights reserved.</p>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
}

