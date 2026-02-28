import { Link } from "react-router-dom";
import mallmarkLogo from "@/assets/mallmark-logo.png";

const Terms = () => (
  <div className="min-h-screen bg-mallmark-light">
    {/* Header */}
    <header className="bg-card border-b sticky top-0 z-10">
      <div className="max-w-3xl mx-auto px-6 py-4 flex items-center gap-3">
        <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <img src={mallmarkLogo} alt="MallMark" className="w-8 h-8 rounded-lg" />
          <span className="font-display text-lg font-bold text-mallmark-dark">MallMark</span>
        </Link>
      </div>
    </header>

    <main className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="font-display text-3xl md:text-4xl font-bold text-mallmark-main mb-2">MallMark Terms of Service</h1>
      <p className="text-muted-foreground mb-10">Last Updated: February 23, 2026</p>

      <div className="prose-mallmark space-y-6 text-mallmark-dark leading-relaxed text-[15px]">
        <p>Welcome to MallMark! These Terms of Service ("Terms") govern your access to and use of the MallMark mobile application ("App"), website, and related services (collectively, the "Service"). The Service is operated by MallMark Inc. (referred to as "we," "us," or "our"). By downloading, installing, or using the App, or by placing an order through the Service, you agree to be bound by these Terms. If you do not agree, please do not use the Service.</p>

        <Section n="1" title="Description of Service">
          <p>MallMark is an online platform that connects users with local supermarkets, malls, and stores in their city for convenient shopping with immediate delivery. Users can browse products, place orders, and have items delivered promptly. We partner with third-party delivery providers, such as Bolt or similar services available in your city, to facilitate deliveries. Delivery options and availability may vary by location.</p>
        </Section>

        <Section n="2" title="Eligibility">
          <p>You must be at least 18 years old or the age of majority in your jurisdiction to use the Service. By using the Service, you represent that you meet these requirements and that you are not barred from using the Service under applicable laws.</p>
        </Section>

        <Section n="3" title="User Accounts">
          <p>To use certain features, you may need to create an account. You agree to provide accurate, current, and complete information during registration and to keep it updated. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. Notify us immediately of any unauthorized use.</p>
        </Section>

        <Section n="4" title="Ordering and Payment">
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Placing Orders:</strong> When you place an order, it is an offer to purchase products from the selected store. The store may accept or reject your order. Once accepted, the order is binding.</li>
            <li><strong>Pricing and Availability:</strong> Prices and product availability are set by the stores and may change without notice. We strive for accuracy but are not liable for errors.</li>
            <li><strong>Payment:</strong> Payments are processed through secure third-party gateways. You authorize us to charge your selected payment method for the total order amount, including taxes, fees, and delivery charges.</li>
            <li><strong>Taxes and Fees:</strong> You are responsible for all applicable taxes, duties, and fees.</li>
          </ul>
        </Section>

        <Section n="5" title="Delivery">
          <ul className="list-disc pl-6 space-y-2">
            <li>Deliveries are handled by third-party providers (e.g., Bolt) based on availability in your city. Estimated delivery times are approximate and not guaranteed.</li>
            <li>You must provide accurate delivery information. We are not responsible for delays or failures due to incorrect addresses or unavailability at the delivery location.</li>
            <li>Risk of loss transfers to you upon delivery. Inspect items upon receipt; issues with product quality should be addressed directly with the store.</li>
          </ul>
        </Section>

        <Section n="6" title="Cancellations and Refunds">
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Cancellations:</strong> You may cancel an order before it is accepted by the store. After acceptance and while the order is being packaged, cancellations are not permitted.</li>
            <li><strong>Refunds:</strong> No refunds are available once the package has been accepted by the store and is being packaged or in transit. If you cancel an order after placement but before acceptance, we will process a refund minus any applicable processing fees, transaction costs, or other deductions (e.g., payment gateway fees). Refunds may take 5-10 business days to process, depending on your payment method.</li>
            <li>All refund decisions are at our sole discretion and subject to verification.</li>
          </ul>
        </Section>

        <Section n="7" title="User Conduct">
          <p>You agree not to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Use the Service for any illegal or unauthorized purpose.</li>
            <li>Interfere with the Service or others' use of it.</li>
            <li>Transmit harmful code, spam, or unsolicited communications.</li>
            <li>Misrepresent your identity or affiliations.</li>
          </ul>
          <p>We reserve the right to suspend or terminate your account for violations.</p>
        </Section>

        <Section n="8" title="Intellectual Property">
          <p>All content on the Service, including logos, text, and software, is owned by us or our licensors. You are granted a limited, non-exclusive license to use the Service for personal purposes. Do not reproduce, modify, or distribute our content without permission.</p>
        </Section>

        <Section n="9" title="Disclaimers and Limitations of Liability">
          <ul className="list-disc pl-6 space-y-2">
            <li>The Service is provided "as is" without warranties of any kind. We do not guarantee uninterrupted access, accuracy, or security.</li>
            <li>To the fullest extent permitted by law, we are not liable for indirect, incidental, consequential, or punitive damages arising from your use of the Service, even if advised of the possibility. Our total liability shall not exceed the amount you paid for the relevant order.</li>
            <li>We are not responsible for third-party actions, including stores, delivery providers, or payment processors.</li>
          </ul>
        </Section>

        <Section n="10" title="Indemnification">
          <p>You agree to indemnify and hold us harmless from any claims, losses, or damages arising from your use of the Service, violation of these Terms, or infringement of third-party rights.</p>
        </Section>

        <Section n="11" title="Governing Law and Dispute Resolution">
          <p>These Terms are governed by the laws of Nigeria (given your location in Abuja). Any disputes shall be resolved exclusively in the courts of Abuja, Nigeria. We encourage informal resolution first; contact us at <a href="mailto:mallmarkapp@gmail.com" className="text-mallmark-main underline">mallmarkapp@gmail.com</a>.</p>
        </Section>

        <Section n="12" title="Changes to Terms">
          <p>We may update these Terms at any time. Continued use after changes constitutes acceptance. Check this page periodically.</p>
        </Section>

        <Section n="13" title="Contact Us">
          <p>For questions, email <a href="mailto:mallmarkapp@gmail.com" className="text-mallmark-main underline">mallmarkapp@gmail.com</a> or visit our help center in the App.</p>
        </Section>

        <p className="pt-4 font-medium">By using MallMark, you acknowledge that you have read, understood, and agree to these Terms.</p>
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

export default Terms;
