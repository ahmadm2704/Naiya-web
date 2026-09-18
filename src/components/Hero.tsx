"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-charcoal text-white">
      <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-maroon/70 to-navy" />
      <div className="relative mx-auto flex max-w-6xl flex-col items-center px-6 py-28 text-center sm:px-8 sm:py-36">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-script text-4xl text-yellow sm:text-5xl"
        >
          The home for creative visuals
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-6 max-w-3xl font-display text-4xl font-bold leading-tight sm:text-6xl"
        >
          We create visuals that make brands impossible to ignore.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 max-w-xl text-lg text-white/80"
        >
          You run your business. We&rsquo;ll create the content.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-10 flex flex-col gap-4 sm:flex-row"
        >
          <Link
            href="/contact"
            className="rounded-full bg-yellow px-8 py-3.5 text-sm font-semibold uppercase tracking-wide text-charcoal transition-transform hover:scale-105"
          >
            Start your enquiry
          </Link>
          <Link
            href="/services"
            className="rounded-full border border-white/30 px-8 py-3.5 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-white/10"
          >
            See our services
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
