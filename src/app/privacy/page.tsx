export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-primary mb-8">Privacy Policy</h1>
        <p className="text-gray-600 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-primary mb-4">1. Introduction</h2>
            <p className="text-gray-600 mb-4">
              Kinjo Bales Wholesalers (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or place an order.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-primary mb-4">2. Information We Collect</h2>
            <p className="text-gray-600 mb-4">We collect information you provide directly to us, including:</p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Name and contact information (email, phone number, address)</li>
              <li>Order information (products, quantities, delivery preferences)</li>
              <li>Account information (if you create an account)</li>
              <li>Communication preferences</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-primary mb-4">3. How We Use Your Information</h2>
            <p className="text-gray-600 mb-4">We use the information we collect to:</p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Process and fulfill your orders</li>
              <li>Communicate with you about your orders</li>
              <li>Provide customer support</li>
              <li>Send promotional communications (with your consent)</li>
              <li>Improve our website and services</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-primary mb-4">4. Information Sharing</h2>
            <p className="text-gray-600 mb-4">
              We do not sell your personal information. We may share your information with:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Service providers who assist in order fulfillment and delivery</li>
              <li>Payment processors (when applicable)</li>
              <li>Law enforcement or government authorities when required by law</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-primary mb-4">5. Data Security</h2>
            <p className="text-gray-600 mb-4">
              We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is completely secure.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-primary mb-4">6. Your Rights</h2>
            <p className="text-gray-600 mb-4">You have the right to:</p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your personal information</li>
              <li>Opt-out of marketing communications</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-primary mb-4">7. Cookies</h2>
            <p className="text-gray-600 mb-4">
              We use cookies and similar technologies to improve your browsing experience, analyze site traffic, and personalize content. You can control cookie settings through your browser preferences.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-primary mb-4">8. Changes to This Policy</h2>
            <p className="text-gray-600 mb-4">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-primary mb-4">9. Contact Us</h2>
            <p className="text-gray-600 mb-4">
              If you have questions about this Privacy Policy, please contact us at:
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
