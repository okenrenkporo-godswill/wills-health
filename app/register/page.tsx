import Header from "@/components/Section/Header";
import Register from "@/components/Section/Register";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="min-h-screen flex-1 flex-col">
      <Header />
      <div className="w-full  items-center flex flex-col  gap-1 p-5">
        <p>
          REGISTER TO{" "}
          <Link href={"/"} className="text-primary font-bold italic underline">
            WILL HEALTH
          </Link>
        </p>
        <Register />
      </div>
    </div>
  );
};

export default page;
