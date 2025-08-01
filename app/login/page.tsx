"use client";

import Login from "@/components/Section/Login";
import Header from "@/components/Section/Header";
import Footers from "@/components/Section/Footers";
import { motion } from "framer-motion";
import Image from "next/image";

const LoginPage = () => {
  return (
    <div className="relative min-h-screen flex flex-col sm:bg-gradient-to-r sm:from-white sm:to-blue-200 overflow-hidden">
      {/* 📱 Mobile background image */}
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

      {/* Header (desktop only) */}

      <Header />

      {/* Centered Login Content */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center py-10 px-4 text-black sm:text-black">
        <h2 className="text-xl font-semibold mb-4  sm:hidden">WILLS HEALTH</h2>

        {/* Animated Login Card: no bouncing, just fade/slide */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
          }}
        >
          <Login />
        </motion.div>
      </div>

      {/* Footer (desktop only) */}
      <div className="hidden sm:block z-10">
        <Footers />
      </div>
    </div>
  );
};

export default LoginPage;
