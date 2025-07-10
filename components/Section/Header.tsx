"use client";

import React, { useState } from "react";
import Logo from "./Logo";
import Link from "next/link";
import { UserIcon, LogOut, Menu } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";

const Header = () => {
  const username = useAuthStore((state) => state.username);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

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
    <header className="w-full bg-white border-b border-gray-200 px-4 py-3 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Logo />
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-gray-800 hover:text-blue-700 focus:outline-none"
          >
            <Menu size={26} />
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4 text-sm font-semibold">
          {username ? (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition"
            >
              <LogOut size={18} />
              Logout
            </button>
          ) : (
            <>
              <Link
                href="/login"
                className="flex items-center gap-2 bg-primary hover:bg-blue-700 text-white px-4 py-2 rounded transition"
              >
                <UserIcon size={18} />
                Login
              </Link>
              <Link
                href="/register"
                className="flex items-center gap-2 bg-primary hover:bg-blue-700 text-white px-4 py-2 rounded transition"
              >
                <UserIcon size={18} />
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Navigation */}
        {mobileOpen && (
          <div className="w-full md:hidden flex flex-col gap-2 text-sm font-semibold mt-2">
            {username ? (
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition"
              >
                <LogOut size={18} />
                Logout
              </button>
            ) : (
              <>
                <Link
                  href="/login"
                  className="flex items-center gap-2 bg-primary hover:bg-blue-700 text-white px-4 py-2 rounded transition"
                >
                  <UserIcon size={18} />
                  Login
                </Link>
                <Link
                  href="/register"
                  className="flex items-center gap-2 bg-primary hover:bg-blue-700 text-white px-4 py-2 rounded transition"
                >
                  <UserIcon size={18} />
                  Register
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
