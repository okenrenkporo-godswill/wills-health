"use client";

import React, { useState, useEffect } from "react";
import Logo from "./Logo";
import Link from "next/link";
import { UserIcon, LogOut } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { isMobile } from "@/lib/mobile";

const Header = () => {
  const username = useAuthStore((state) => state.username);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const router = useRouter();
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    setMobile(isMobile());

    const handleResize = () => setMobile(isMobile());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", { method: "POST" });
      if (res.ok) {
        clearAuth();
        router.push("/");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <header
      className={`w-full bg-gradient-to-b from-blue-100 to-white border-b border-gray-200 shadow-sm ${
        mobile ? "p-0 m-0" : "py-5 px-4"
      }`}
    >
      <div
        className={`flex items-center justify-between gap-3 ${
          mobile ? "w-full p-2.5" : "max-w-7xl mx-auto"
        }`}
      >
        <Logo />

        <div className="flex items-center gap-2 text-sm font-semibold">
          {username ? (
            <button
              onClick={handleLogout}
              className="bg-white hover:bg-blue-100 text-blue-800 border border-blue-600 hover:border-blue-700 px-4 py-2 rounded-xl shadow transition duration-300 flex items-center gap-2"
            >
              <LogOut size={18} />
              Logout
            </button>
          ) : (
            <>
              <Link
                href="/login"
                className="bg-white hover:bg-blue-100 text-blue-800 border border-blue-600 hover:border-blue-700 px-4 py-2 rounded-xl shadow transition duration-300 flex items-center gap-2"
              >
                <UserIcon size={18} />
                Login
              </Link>
              <Link
                href="/register"
                className="bg-white hover:bg-blue-100 text-blue-800 border border-blue-600 hover:border-blue-700 px-4 py-2 rounded-xl shadow transition duration-300 flex items-center gap-2"
              >
                <UserIcon size={18} />
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
