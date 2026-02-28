import { Link } from "react-router-dom";
import mallmarkLogo from "@/assets/mallmark-logo.png";

const Privacy = () => (
  <div className="min-h-screen bg-mallmark-light">
    <header className="bg-card border-b sticky top-0 z-10">
      <div className="max-w-3xl mx-auto px-6 py-4 flex items-center gap-3">
        <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <img src={mallmarkLogo} alt="MallMark" className="w-8 h-8 rounded-lg" />
          <span className="font-display text-lg font-bold text-mallmark-dark">MallMark</span>
        </Link>
      </div>
    </header>

    <main className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="font-display text-3xl md:text-4xl font-bold text-mallmark-main mb-2">MallMark Privacy Policy</h1>
      <p className="text-muted-foreground mb-10">Last Updated: February 23, 2026</p>

      <div className="space-y-6 text-mallmark-dark leading-relaxed text-[15px]">
        <p>At MallMark Inc. ("we," "us," or "our"), we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your personal information when you use our mobile application ("App"), website, and related services (collectively, the "Service"). The Service enables users to shop from local supermarkets, malls, and stores with immediate delivery facilitated by third-party providers.</p>
        <p>By using the Service, you consent to the practices described in this Privacy Policy. If you do not agree, please do not use the Service. This Policy complies with applicable data protection laws, including the Nigeria Data Protection Regulation (NDPR).</p>

        <Section n="1" title="Information We Collect">
          <p className="mb-3">We collect information to provide and improve the Service. This includes:</p>
          <h4 className="font-semibold mt-4 mb-2">a. Personal Information You Provide</h4>
          <ul className="list-disc pl-6 space-y-1">
            <li>Account details: Name, email address, phone number, and password when you create an account.</li>
            <li>Delivery information: Shipping address, location data (e.g., GPS coordinates for accurate delivery), and contact details.</li>
            <li>Payment information: Credit/debit card details, bank account information, or other payment methods (processed securely via third-party gateways; we do not store full payment details).</li>
            <li>Order details: Products selected, quantities, preferences, and any notes provided during ordering.</li>
            <li>Communications: Feedback, support requests, or other interactions with us.</li>
          </ul>
          <h4 className="font-semibold mt-4 mb-2">b. Automatically Collected Information</h4>
          <ul className="list-disc pl-6 space-y-1">
            <li>Device and usage data: IP address, device type, operating system, browser type, app version, unique device identifiers, and usage patterns.</li>
            <li>Location data: Precise or approximate location to suggest nearby stores, facilitate deliveries, and optimize services (collected with your consent via device settings).</li>
            <li>Log data: Access times, error reports, and performance metrics.</li>
            <li>Cookies and similar technologies: We use cookies, pixels, and local storage to enhance functionality, remember preferences, and analyze usage.</li>
          </ul>
          <h4 className="font-semibold mt-4 mb-2">c. Information from Third Parties</h4>
          <ul className="list-disc pl-6 space-y-1">
            <li>From stores and delivery partners: Order status updates, delivery confirmations, or feedback.</li>
            <li>From payment processors: Transaction confirmations.</li>
            <li>From analytics providers: Aggregated usage insights (e.g., via Google Analytics).</li>
          </ul>
          <p className="mt-3">We do not collect sensitive personal data (e.g., race, religion, health) unless necessary for specific features and with your explicit consent.</p>
        </Section>

        <Section n="2" title="How We Use Your Information">
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>To provide the Service:</strong> Process orders, facilitate deliveries via third-party providers, manage accounts, and communicate updates.</li>
            <li><strong>To improve and personalize:</strong> Analyze usage to enhance features, recommend products, and tailor content based on your preferences and location.</li>
            <li><strong>For payments and transactions:</strong> Authorize and process payments securely.</li>
            <li><strong>For customer support:</strong> Respond to inquiries, resolve issues, and provide assistance.</li>
            <li><strong>For marketing:</strong> Send promotional offers, newsletters, or updates (with opt-out options).</li>
            <li><strong>For security and compliance:</strong> Detect fraud, prevent abuse, comply with legal obligations, and enforce our Terms of Service.</li>
            <li><strong>For analytics:</strong> Generate aggregated, anonymized reports to understand trends and improve operations.</li>
          </ul>
          <p className="mt-3">We may use automated decision-making (e.g., for fraud detection) but provide human review where it significantly affects you.</p>
        </Section>

        <Section n="3" title="Sharing Your Information">
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>With stores:</strong> Order details to fulfill purchases.</li>
            <li><strong>With third-party delivery providers:</strong> Delivery address, contact info, and order specifics to complete deliveries.</li>
            <li><strong>With service providers:</strong> Payment processors, hosting services, analytics tools, and marketing partners who assist us (bound by confidentiality).</li>
            <li><strong>For legal reasons:</strong> To comply with laws, respond to subpoenas, protect rights, or in mergers/acquisitions.</li>
            <li><strong>With your consent:</strong> For any other purpose you approve.</li>
          </ul>
          <p className="mt-3">We do not sell your personal information to third parties.</p>
        </Section>

        <Section n="4" title="Data Security">
          <p>We implement reasonable technical, administrative, and physical safeguards to protect your information, such as encryption, access controls, and regular audits. However, no system is completely secure, and we cannot guarantee absolute protection. Notify us immediately of any suspected breaches.</p>
        </Section>

        <Section n="5" title="Data Retention">
          <ul className="list-disc pl-6 space-y-2">
            <li>Account data: Until you delete your account or after inactivity (typically 2 years).</li>
            <li>Order history: For 7 years for tax and accounting purposes.</li>
            <li>Anonymized data: Indefinitely for analytics.</li>
          </ul>
          <p className="mt-3">Upon request, we will delete or anonymize your data where possible.</p>
        </Section>

        <Section n="6" title="Your Rights and Choices">
          <p className="mb-3">Under applicable laws (e.g., NDPR), you may have rights to:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Access, correct, or delete your personal information.</li>
            <li>Object to processing, restrict use, or withdraw consent.</li>
            <li>Port your data to another service.</li>
            <li>Opt out of marketing communications or location tracking.</li>
          </ul>
          <p className="mt-3">To exercise these rights, contact us at <a href="mailto:mallmarkapp@gmail.com" className="text-mallmark-main underline">mallmarkapp@gmail.com</a>. We will respond within 30 days. You may also complain to the Nigeria Data Protection Commission.</p>
        </Section>

        <Section n="7" title="Children's Privacy">
          <p>The Service is not intended for children under 13 (or equivalent age under local law). We do not knowingly collect data from children. If we learn of such collection, we will delete it. Parents/guardians should contact us if concerned.</p>
        </Section>

        <Section n="8" title="International Transfers">
          <p>Your data may be processed in Nigeria or other countries with adequate data protection. We ensure transfers comply with legal requirements, using safeguards like standard contractual clauses.</p>
        </Section>

        <Section n="9" title="Changes to This Privacy Policy">
          <p>We may update this Policy to reflect changes in practices or laws. We will notify you via email or in-app notice for significant changes. Continued use constitutes acceptance.</p>
        </Section>

        <Section n="10" title="Contact Us">
          <p>For questions or concerns, email <a href="mailto:mallmarkapp@gmail.com" className="text-mallmark-main underline">mallmarkapp@gmail.com</a> or write to: MallMark Ltd., Abuja, FCT, Nigeria.</p>
        </Section>

        <p className="pt-4 font-medium">By using the Service, you acknowledge that you have read and understood this Privacy Policy.</p>
      </div>
    </main>
  </div>
);

const Section = ({ n, title, children }: { n: string; title: string; children: React.ReactNode }) => (
  <div>
    <h2 className="font-display text-xl font-bold text-mallmark-main mt-8 mb-3">{n}. {title}</h2>
    {children}
  </div>
);

export default Privacy;
