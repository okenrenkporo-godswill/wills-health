"use client";

import Image from "next/image";
import Link from "next/link";
import { useAuthStore } from "@/store/useAuthStore";

const Logo = () => {
  const username = useAuthStore((state) => state.username);
  const href = username ? "/user/dashboard" : "/";

  return (
    <Link href={href}>
      <div className="flex items-center gap-5">
        <Image
          src="/logo.png"
          alt="logo"
          width={60}
          height={60}
          className="rounded-full border-primary border-4"
        />
        {/* Hide text on mobile, show on md+ */}
        <h2 className="hidden md:block text-2xl font-bold bg-gradient-to-r  text-primar bg-clip-text">
          WILLS HEALTH
        </h2>
      </div>
    </Link>
  );
};

export default Logo;
