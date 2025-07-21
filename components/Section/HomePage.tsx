"use client";
import React, { useEffect, useState } from "react";
import Header from "./Header";

import { isMobile } from "@/lib/mobile";
import OverviewSection from "./OverviewSection";
import Hero from "./Hero";
import Footers from "./Footers";
import DiseaseBrowser from "./DiseaseBrowser";

const HomePage = () => {
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    setMobile(isMobile());

    const handleResize = () => setMobile(isMobile());
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={`${
        mobile ? "w-full " : "w-full"
      } flex min-h-screen flex-col bg-gray-100`}
    >
      <Header />
      <Hero />

      {/* Main content with padding */}
      <div className="px-4 md:px-8 lg:px-16 py-6 space-y-8">
        <DiseaseBrowser />
        <OverviewSection />
        <Footers />
      </div>
    </div>
  );
};

export default HomePage;
