"use client";

import React, { useEffect, useState } from "react";
import Dashboard from "@/components/Section/Dashboard";
import DashboardMobile from "@/components/Section/DashboardMobile";
import Header from "@/components/Section/Header";

const Page = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // Set initial state
    window.addEventListener("resize", handleResize); // Update on resize

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      <Header />
      {isMobile ? <DashboardMobile /> : <Dashboard />}
    </div>
  );
};

export default Page;
