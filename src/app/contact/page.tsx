import type { Metadata } from "next";
import { Suspense } from "react";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact | Content Casa",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-20 sm:px-8">
      <p className="font-script text-3xl text-maroon">Ready to work with us?</p>
      <h1 className="mt-2 font-display text-4xl font-bold sm:text-5xl">Start your enquiry</h1>
      <p className="mt-4 text-charcoal/70">
        A few essentials help us direct your enquiry to the right person.
      </p>

      <div className="mt-10 rounded-2xl border border-charcoal/10 p-6 sm:p-10">
        <Suspense fallback={null}>
          <ContactForm />
        </Suspense>
      </div>
    </div>
  );
}
