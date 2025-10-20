export default function TermsPage() {
  return (
    <main className="min-h-screen text-white">
      {/* keep video/overlay background visible if your layout handles it globally */}
      <section className="max-w-3xl mx-auto px-6 md:px-10 py-24 bg-black/40 backdrop-blur-md border border-white/20 rounded-2xl mt-28">
        <h1 className="text-4xl font-[Playfair_Display] mb-6">Terms of Service</h1>
        <p className="text-gray-300 mb-4">
          Welcome to Dozers Grill. By accessing or using our website and services, you agree to the following terms.
        </p>
        <h2 className="text-2xl mt-8 mb-3">Use of Services</h2>
        <p className="text-gray-300 mb-4">
          Our site and content are provided for informational purposes. Misuse, scraping, or unauthorized commercial use is prohibited.
        </p>
        <h2 className="text-2xl mt-8 mb-3">Reservations & Events</h2>
        <p className="text-gray-300 mb-4">
          Event details and availability are subject to change. We reserve the right to modify or cancel events at any time.
        </p>
        <h2 className="text-2xl mt-8 mb-3">Intellectual Property</h2>
        <p className="text-gray-300 mb-4">
          All trademarks, logos, photos, and content are the property of Dozers Grill and may not be used without permission.
        </p>
        <h2 className="text-2xl mt-8 mb-3">Contact</h2>
        <p className="text-gray-300">
          Questions? Contact us at (480) 463-3367 or visit us at 7012 E Hampton Ave, Mesa, AZ 85209.
        </p>
      </section>
    </main>
  );
}
