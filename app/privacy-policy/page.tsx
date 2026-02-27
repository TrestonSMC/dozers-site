"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function SmsPrivacyPolicyPage() {
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
      <div className="pt-40 md:pt-44 pb-24 px-6 md:px-20">
        <div className="max-w-4xl mx-auto">
          {/* Subtle edge glow container (RED) */}
          <div className="bg-[#111827]/70 border border-red-500/25 rounded-3xl p-6 md:p-10 backdrop-blur-md shadow-[0_0_25px_-12px_rgba(239,68,68,0.28)]">
            <h1 className="text-4xl md:text-5xl font-[Playfair_Display] font-bold mb-4 text-white drop-shadow-[0_0_25px_rgba(245,158,11,0.35)]">
              SMS Text Messaging Privacy Policy
            </h1>

            <p className="text-gray-400 mb-10">
              Effective Date: February 1, 2026
            </p>

            <div className="space-y-10 text-gray-300 leading-relaxed">
              {/* 1 */}
              <section>
                <h2 className="text-2xl font-semibold text-[#29C3FF] mb-3">
                  1. Overview
                </h2>
                <p className="mb-4">
                  This SMS Text Messaging Privacy Policy explains how Dozers Grill
                  (“we,” “us,” or “our”) collects, uses, and protects personal
                  information when guests and members opt in to receive text
                  messages related to:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Waitlist notifications</li>
                  <li>Table availability alerts</li>
                  <li>Reservation updates</li>
                  <li>Membership updates</li>
                  <li>Special events</li>
                  <li>Promotions and exclusive offers</li>
                </ul>
                <p className="mt-4">
                  By opting in to receive SMS messages from Dozers Grill, you agree
                  to the practices described in this policy.
                </p>
              </section>

              {/* 2 */}
              <section>
                <h2 className="text-2xl font-semibold text-[#29C3FF] mb-3">
                  2. Information We Collect
                </h2>
                <p className="mb-3">
                  When you opt in to receive SMS messages, we may collect:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Your mobile phone number</li>
                  <li>Your name (if provided)</li>
                  <li>Waitlist details (party size, time requested)</li>
                  <li>Membership status and related account information</li>
                  <li>Messaging interaction data (responses, opt-outs)</li>
                </ul>
                <p className="mt-3">
                  We collect only the information necessary to provide the requested
                  service.
                </p>
              </section>

              {/* 3 */}
              <section>
                <h2 className="text-2xl font-semibold text-[#29C3FF] mb-3">
                  3. How We Use Your Information
                </h2>

                <p className="mb-3">
                  We use SMS information for the following purposes:
                </p>

                <div className="ml-4 space-y-4">
                  <div>
                    <h3 className="text-[#F59E0B] font-semibold">
                      A. Waitlist Notifications
                    </h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Confirming your spot on the waitlist</li>
                      <li>Notifying you when your table is ready</li>
                      <li>Providing estimated wait times</li>
                      <li>Sending reminders if you have not arrived</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-[#F59E0B] font-semibold">
                      B. Membership Messaging
                    </h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Account updates</li>
                      <li>Event invitations</li>
                      <li>Exclusive member offers</li>
                      <li>Membership renewal reminders</li>
                      <li>Important operational announcements</li>
                    </ul>
                  </div>
                </div>

                <p className="mt-4">
                  We do not sell, rent, or share your mobile number with third
                  parties for their marketing purposes.
                </p>
              </section>

              {/* 4 */}
              <section>
                <h2 className="text-2xl font-semibold text-[#29C3FF] mb-3">
                  4. Consent to Receive Messages
                </h2>
                <p className="mb-3">
                  By providing your phone number and opting in, you expressly
                  consent to receive recurring automated marketing and non-marketing
                  text messages from Dozers Grill.
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Consent is not a condition of purchase.</li>
                  <li>Message frequency varies.</li>
                  <li>
                    Standard message and data rates may apply depending on your
                    carrier.
                  </li>
                </ul>
              </section>

              {/* 5 */}
              <section>
                <h2 className="text-2xl font-semibold text-[#29C3FF] mb-3">
                  5. Opting Out
                </h2>
                <p className="mb-3">You may opt out at any time by replying:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>STOP</strong> – to cancel
                  </li>
                  <li>
                    <strong>HELP</strong> – for assistance
                  </li>
                </ul>
                <p className="mt-3">
                  After you send STOP, you will receive a confirmation message and
                  will no longer receive SMS communications unless you opt in again.
                </p>
              </section>

              {/* 6 */}
              <section>
                <h2 className="text-2xl font-semibold text-[#29C3FF] mb-3">
                  6. Data Protection
                </h2>
                <p className="mb-3">
                  We implement reasonable administrative, technical, and physical
                  safeguards to protect your personal information.
                </p>
                <p>
                  Access to SMS-related data is limited to authorized personnel who
                  require it for operational purposes.
                </p>
              </section>

              {/* 7 */}
              <section>
                <h2 className="text-2xl font-semibold text-[#29C3FF] mb-3">
                  7. Data Retention
                </h2>
                <p className="mb-3">
                  We retain SMS data only as long as necessary to:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Fulfill operational needs</li>
                  <li>Maintain membership records</li>
                  <li>Comply with legal requirements</li>
                </ul>
              </section>

              {/* 8 */}
              <section>
                <h2 className="text-2xl font-semibold text-[#29C3FF] mb-3">
                  8. Third-Party Service Providers
                </h2>
                <p>
                  We may use trusted third-party SMS platforms to deliver messages.
                  These providers are contractually obligated to safeguard your
                  information and use it only for the purposes of delivering our
                  communications.
                </p>
              </section>

              {/* 9 */}
              <section>
                <h2 className="text-2xl font-semibold text-[#29C3FF] mb-3">
                  9. Children’s Privacy
                </h2>
                <p>
                  Our SMS services are not directed to individuals under the age of
                  18. We do not knowingly collect information from minors.
                </p>
              </section>

              {/* 10 */}
              <section>
                <h2 className="text-2xl font-semibold text-[#29C3FF] mb-3">
                  10. Changes to This Policy
                </h2>
                <p>
                  We may update this SMS Privacy Policy periodically. Updates will
                  be posted on our website with a revised effective date.
                </p>
              </section>

              {/* 11 */}
              <section>
                <h2 className="text-2xl font-semibold text-[#29C3FF] mb-3">
                  11. Contact Information
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