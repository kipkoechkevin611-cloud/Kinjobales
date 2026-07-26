export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-primary mb-8">Terms of Service</h1>
        <p className="text-gray-600 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-primary mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-600 mb-4">
              By accessing or using the Kinjo Bales Wholesalers website, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-primary mb-4">2. Products and Services</h2>
            <p className="text-gray-600 mb-4">
              We reserve the right to modify, discontinue, or change any products or services at any time without notice. We strive to provide accurate product descriptions and images, but we do not warrant that descriptions are error-free.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-primary mb-4">3. Orders and Payment</h2>
            <p className="text-gray-600 mb-4">
              All orders are subject to availability. We reserve the right to limit quantities or refuse orders. Payment is arranged through WhatsApp as specified in our order process. Prices are subject to change without notice.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-primary mb-4">4. Delivery</h2>
            <p className="text-gray-600 mb-4">
              Delivery times are estimates and not guaranteed. We are not responsible for delays caused by circumstances beyond our control. Risk of loss transfers to you upon delivery.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-primary mb-4">5. Returns and Refunds</h2>
            <p className="text-gray-600 mb-4">
              Returns are accepted within 7 days for defective products. Products must be in original condition. Refunds will be processed within 14 days of approval. Shipping costs are non-refundable.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-primary mb-4">6. User Accounts</h2>
            <p className="text-gray-600 mb-4">
              You are responsible for maintaining the confidentiality of your account information. You agree to notify us immediately of any unauthorized use. We reserve the right to terminate accounts for violation of these terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-primary mb-4">7. Intellectual Property</h2>
            <p className="text-gray-600 mb-4">
              All content on this website, including text, images, logos, and designs, is our property or the property of our licensors and is protected by copyright laws.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-primary mb-4">8. Limitation of Liability</h2>
            <p className="text-gray-600 mb-4">
              To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of our website or products.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-primary mb-4">9. Governing Law</h2>
            <p className="text-gray-600 mb-4">
              These terms shall be governed by and construed in accordance with the laws of Kenya. Any disputes shall be resolved in the courts of Kenya.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-primary mb-4">10. Changes to Terms</h2>
            <p className="text-gray-600 mb-4">
              We may modify these terms at any time. Continued use of the website after changes constitutes acceptance of the new terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-primary mb-4">11. Contact Information</h2>
            <p className="text-gray-600 mb-4">
              For questions about these Terms of Service, please contact us at:
            </p>
            <ul className="list-none text-gray-600 space-y-2">
              <li>Email: info@kinjobales.co.ke</li>
              <li>Phone: +254 700 000 000</li>
              <li>Address: Keringet Centre, Nakuru, Kenya</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}
