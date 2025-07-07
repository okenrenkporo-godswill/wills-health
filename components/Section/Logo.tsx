import Image from "next/image";
import Link from "next/link";
import { useAuthStore } from "@/store/useAuthStore";

const Logo = () => {
  const username = useAuthStore((state) => state.username);
  const href = username ? "/user/dashboard" : "/";

  return (
    <Link href={href}>
      <div className="flex gap-5 text-center text-primary font-bold items-center  w-full  p-2">
        <Image
          src={"/logo.png"}
          alt="logo"
          width={70}
          height={70}
          className="rounded-full border-primary border-4"
        />
        <div className="text-2xl">
          <h2>WILLS HEALTH</h2>
        </div>
      </div>
    </Link>
  );
};

export default Logo;
