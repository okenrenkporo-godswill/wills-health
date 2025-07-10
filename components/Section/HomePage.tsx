"use client";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import Image from "next/image";
import Link from "next/link";
import Footer from "./Footer";
import { isMobile } from "@/lib/mobile";

const HomePage = () => {
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    setMobile(isMobile());

    const handleResize = () => setMobile(isMobile());
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-gray-100">
      <Header />

      {mobile ? (
        // 👉 MOBILE VIEW
        <div className="flex flex-col items-center text-center p-4 space-y-4">
          <Image
            src="/backs.webp"
            alt="bg"
            width={300}
            height={300}
            className="rounded-lg border shadow"
          />
          <h1 className="text-primary font-bold text-xl">
            Welcome to Wills Health
          </h1>
          <p className="text-gray-600 text-sm px-2">
            Your Health, Powered by Care and Intelligence. Our AI-driven
            services help you make smart decisions and stay healthy—anytime,
            anywhere.
          </p>
          <Link
            href="/login"
            className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-800 transition"
          >
            Start Now
          </Link>
        </div>
      ) : (
        // 👉 DESKTOP VIEW
        <div className="flex flex-1 px-4 items-center py-2 gap-6 flex-wrap justify-center">
          <Image
            src="/backs.webp"
            alt="bg"
            width={600}
            height={750}
            className="rounded-md border shadow-lg"
          />
          <div className="font-bold text-2xl max-w-xl">
            <p>
              <span className="text-primary text-3xl">
                Welcome to Wills Health – Your Health, Powered by Care and
                Intelligence.
              </span>{" "}
              <span className="text-gray-500 italic">
                Our AI-driven services help you make informed decisions, track
                your wellness, and access support anytime—so you&rsquo;re never
                alone on your health journey.
              </span>
            </p>
            <Link
              href="/login"
              className="inline-block mt-4 rounded-sm border p-2 text-sm bg-primary text-white hover:text-gray-300"
            >
              Start Now
            </Link>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default HomePage;
