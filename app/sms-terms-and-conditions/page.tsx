"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function SmsTermsPage() {
  return (
    <main className="min-h-screen bg-[#0d1117] text-gray-100">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full flex justify-between items-center px-8 py-5 z-50 backdrop-blur-md bg-[#0d1117]/80 border-b border-[#29C3FF]/20">
        <Link href="/" className="inline-flex items-center">
          <Image
            src="/images/dozers-logo.png"
            alt="Dozers Grill Logo"
            width={140}
            height={60}
            className="drop-shadow-[0_0_20px_rgba(41,195,255,0.4)] cursor-pointer"
            priority
          />
        </Link>

        <Link href="/">
          <Button className="border-0 text-white bg-gradient-to-r from-[#29C3FF] to-[#F59E0B] px-6 py-3 rounded-full hover:scale-105 transition-transform">
            Back to Home
          </Button>
        </Link>
      </header>

      {/* Content */}
      {/* Extra padding so header never overlaps */}
      <div className="pt-40 md:pt-44 pb-24 px-6 md:px-20">
        <div className="max-w-4xl mx-auto">
          {/* Subtle edge glow container (RED) */}
          <div className="bg-[#111827]/70 border border-red-500/25 rounded-3xl p-6 md:p-10 backdrop-blur-md shadow-[0_0_25px_-12px_rgba(239,68,68,0.28)]">
            <h1 className="text-4xl md:text-5xl font-[Playfair_Display] font-bold mb-4 text-white drop-shadow-[0_0_25px_rgba(245,158,11,0.35)]">
              SMS Terms & Conditions
            </h1>

            <p className="text-gray-400 mb-10">Effective Date: February 1, 2026</p>

            <div className="space-y-10 text-gray-300 leading-relaxed">
              <p>
                These SMS Terms & Conditions (“Terms”) govern participation in
                the SMS text messaging programs offered by Dozers Grill (“Dozers
                Grill,” “we,” “us,” or “our”). By opting in to receive SMS
                messages from Dozers Grill, you agree to these Terms.
              </p>

              {/* 1 */}
              <section>
                <h2 className="text-2xl font-semibold text-[#29C3FF] mb-3">
                  1. Program Description
                </h2>

                <p className="mb-3">
                  Dozers Grill offers SMS messaging for the following programs:
                </p>

                <div className="ml-4 space-y-4">
                  <div>
                    <h3 className="text-[#F59E0B] font-semibold">
                      A. Waitlist & Reservation Messaging
                    </h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Waitlist confirmations</li>
                      <li>Table-ready alerts</li>
                      <li>Estimated wait time updates</li>
                      <li>Reservation confirmations and reminders</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-[#F59E0B] font-semibold">
                      B. Membership Messaging
                    </h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Membership updates</li>
                      <li>Renewal reminders</li>
                      <li>Event invitations</li>
                      <li>Exclusive offers and promotions</li>
                      <li>Important operational announcements</li>
                    </ul>
                  </div>
                </div>

                <p className="mt-3">
                  Message frequency varies based on your interaction with our
                  services and membership activity.
                </p>
              </section>

              {/* 2 */}
              <section>
                <h2 className="text-2xl font-semibold text-[#29C3FF] mb-3">
                  2. User Opt-In
                </h2>
                <p>
                  By providing your mobile phone number and affirmatively opting
                  in (via website form, in-store sign-up, digital kiosk, QR
                  code, or written consent), you consent to receive recurring
                  automated and non-automated text messages from Dozers Grill.
                </p>
                <p className="mt-2">Consent is not a condition of purchase.</p>
              </section>

              {/* 3 */}
              <section>
                <h2 className="text-2xl font-semibold text-[#29C3FF] mb-3">
                  3. Message & Data Rates
                </h2>
                <p>
                  Message and data rates may apply depending on your wireless
                  carrier and mobile plan. Dozers Grill is not responsible for
                  any carrier charges.
                </p>
              </section>

              {/* 4 */}
              <section>
                <h2 className="text-2xl font-semibold text-[#29C3FF] mb-3">
                  4. Opt-Out Instructions
                </h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>STOP</strong> – to cancel
                  </li>
                  <li>
                    <strong>HELP</strong> – for assistance
                  </li>
                </ul>
                <p className="mt-3">
                  After you send STOP, you will receive a confirmation message
                  and will no longer receive SMS communications from that
                  program unless you opt in again.
                </p>
              </section>

              {/* 5 */}
              <section>
                <h2 className="text-2xl font-semibold text-[#29C3FF] mb-3">
                  5. Supported Carriers
                </h2>
                <p>
                  Our SMS services are supported by most major U.S. carriers;
                  however, delivery is not guaranteed and may be subject to
                  effective transmission by your mobile carrier. Dozers Grill is
                  not liable for delayed or undelivered messages.
                </p>
              </section>

              {/* 6 */}
              <section>
                <h2 className="text-2xl font-semibold text-[#29C3FF] mb-3">
                  6. Eligibility
                </h2>
                <p>
                  You must be at least 18 years old to participate in our
                  membership messaging program.
                </p>
                <p className="mt-2">By opting in, you represent that:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>
                    You are the account holder for the mobile number provided,
                    or
                  </li>
                  <li>
                    You have authorization from the account holder to enroll the
                    number.
                  </li>
                </ul>
              </section>

              {/* 7 */}
              <section>
                <h2 className="text-2xl font-semibold text-[#29C3FF] mb-3">
                  7. Privacy
                </h2>
                <p>
                  Your participation in our SMS programs is also governed by our
                  SMS Privacy Policy, which explains how we collect, use, and
                  protect your information.
                </p>
                <p className="mt-2">
                  We do not sell or share your mobile information with third
                  parties for their marketing purposes.
                </p>
              </section>

              {/* 8 */}
              <section>
                <h2 className="text-2xl font-semibold text-[#29C3FF] mb-3">
                  8. Program Modifications
                </h2>
                <p>
                  We reserve the right to modify, suspend, or terminate the SMS
                  program at any time without notice.
                </p>
                <p className="mt-2">
                  We may also update these Terms periodically. Continued
                  participation constitutes acceptance of any changes.
                </p>
              </section>

              {/* 9 */}
              <section>
                <h2 className="text-2xl font-semibold text-[#29C3FF] mb-3">
                  9. Limitation of Liability
                </h2>
                <p className="mb-2">
                  To the fullest extent permitted by law, Dozers Grill shall not
                  be liable for:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Delayed, misdirected, or undelivered messages</li>
                  <li>Errors in transmission</li>
                  <li>Any damages arising from participation in the SMS program</li>
                </ul>
              </section>

              {/* 10 */}
              <section>
                <h2 className="text-2xl font-semibold text-[#29C3FF] mb-3">
                  10. Contact Information
                </h2>
                <p>Dozers Grill</p>
                <p>7012 E Hampton Ave, Ste 104, Mesa, AZ 85209</p>
                <p>602-694-5551</p>
                <p>games@dozersgrill.com</p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}