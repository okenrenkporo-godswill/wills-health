"use client";

import Register from "@/components/Section/Register";
import Header from "@/components/Section/Header";
import { motion } from "framer-motion";
import Image from "next/image";

export default function RegisterPage() {
  return (
    <div className="relative min-h-screen flex flex-col sm:bg-gradient-to-r sm:from-white sm:to-blue-200 overflow-hidden">
      {/* Mobile Background */}

      <div className="absolute inset-0 sm:hidden z-0">
        <Image
          src="/B.avif"
          alt="Mobile background"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <Header />

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center py-10 px-4 text-black sm:text-black">
        <h2 className="text-xl font-semibold mb-4 sm:hidden"></h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Register />
        </motion.div>
      </div>
    </div>
  );
}
