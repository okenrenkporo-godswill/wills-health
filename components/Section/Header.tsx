"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { UserIcon } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { isMobile } from "@/lib/mobile";

import Logo from "./Logo";
import AccountDetailsCard from "./AccountDetailCard";
import TextSlider from "./TextSlider";
import HeaderSlider from "./HeaderSlider";

const Header = () => {
  const { username, clearAuth, photo } = useAuthStore();
  const [mobile, setMobile] = useState(false);
  const [showAccount, setShowAccount] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const updateMobile = () => setMobile(isMobile());
    updateMobile();
    window.addEventListener("resize", updateMobile);
    return () => window.removeEventListener("resize", updateMobile);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowAccount(false);
      }
    };
    if (showAccount) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showAccount]);

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", { method: "POST" });
      if (res.ok) {
        clearAuth();
        setShowAccount(false); // close dropdown
        router.push("/"); // redirect to home
      }
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <header
      className={`w-full bg-gradient-to-b from-blue-100 to-white border-b border-gray-200 shadow-sm ${
        mobile ? "p-3" : "py-5 px-4"
      }`}
    >
      <div
        className={`flex items-center justify-between ${
          mobile ? "w-full" : "max-w-7xl mx-auto"
        }`}
      >
        {mobile ? (
          username ? (
            <h1 className="text-lg font-bold text-blue-800">
              <HeaderSlider />
            </h1>
          ) : (
            <Logo />
          )
        ) : (
          <Logo />
        )}

        {username ? (
          <div className="relative flex items-center" ref={dropdownRef}>
            {mobile ? (
              <>
                <button
                  onClick={() => setShowAccount((prev) => !prev)}
                  className="w-10 h-10 rounded-full overflow-hidden border border-blue-400"
                >
                  {photo ? (
                    <Image
                      src={photo}
                      alt="User"
                      width={40}
                      height={40}
                      className="object-cover w-full h-full rounded-full"
                    />
                  ) : (
                    <UserIcon className="w-10 h-10 text-blue-700 p-1" />
                  )}
                </button>
                {showAccount && (
                  <div className="absolute right-0 top-full mt-2 z-50 w-[90vw] max-w-sm">
                    <AccountDetailsCard onLogout={handleLogout} />
                  </div>
                )}
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="bg-white hover:bg-blue-100 text-blue-800 border border-blue-600 hover:border-blue-700 px-4 py-2 rounded-xl shadow transition duration-300 flex items-center gap-2 text-sm"
              >
                <UserIcon size={18} />
                Logout
              </button>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-2 text-sm font-semibold">
            <Link
              href="/login"
              className="bg-white hover:bg-blue-100 text-blue-800 border border-blue-600 px-4 py-2 rounded-xl shadow transition flex items-center gap-2"
            >
              <UserIcon size={18} />
              Login
            </Link>
            <Link
              href="/register"
              className="bg-white hover:bg-blue-100 text-blue-800 border border-blue-600 px-4 py-2 rounded-xl shadow transition flex items-center gap-2"
            >
              <UserIcon size={18} />
              Register
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
