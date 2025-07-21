// Hero.tsx
"use client";

import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative w-full h-screen bg-black text-white flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <Image
        src="/herosec.jpg" // replace with your uploaded image path
        alt="Hero Background"
        fill
        className="object-cover opacity-40"
        priority
      />

      {/* Overlay content */}
      <div className="relative z-10 text-center px-4">
        <h1 className="text-4xl md:text-5xl font-semibold mb-6">
          Transforming your care
        </h1>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/innovation"
            className="text-sm border border-white px-5 py-2 rounded-full hover:bg-white hover:text-black transition"
          >
            Learn how we drive innovation
          </Link>
          <Link
            href="/appointment"
            className="text-sm border border-white px-5 py-2 rounded-full bg-white text-black hover:bg-transparent hover:text-white transition"
          >
            Request appointment
          </Link>
        </div>
      </div>
    </section>
  );
}
