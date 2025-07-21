"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import { motion } from "framer-motion";

const Footers = () => {
  return (
    <footer className="bg-gradient-to-b from-blue-100 to-white text-primary px-6 py-16 mt-20 rounded-2xl">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-10">
        {/* Logo & CTA */}
        <div className="col-span-1 md:col-span-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Image
              src="/logo.png" // ✅ Replace with your actual logo path
              alt="Wills Health Logo"
              width={100}
              height={50}
              className="mb-4 rounded-full"
            />
            <p className="text-sm leading-relaxed mb-4">
              Fuel groundbreaking medical research! <br />
              Your donation powers the future of medicine and helps save lives.
            </p>
            <button className="bg-white text-primary font-semibold px-4 py-2 rounded hover:bg-gray-200 transition duration-300">
              Give Today
            </button>
          </motion.div>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
          <ul className="space-y-2 text-sm text-primary">
            <li>
              <Link href="#">Find a Doctor</Link>
            </li>
            <li>
              <Link href="#">Explore Careers</Link>
            </li>
            <li>
              <Link href="#">Free Newsletters</Link>
            </li>
            <li>
              <Link href="#">About Mayo Clinic</Link>
            </li>
            <li>
              <Link href="#">Contact Us</Link>
            </li>
            <li>
              <Link href="#">Locations</Link>
            </li>
            <li>
              <Link href="#">Health Info Policy</Link>
            </li>
            <li>
              <Link href="#">Media Requests</Link>
            </li>
          </ul>
        </div>

        {/* Medical Professionals */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Medical Professionals</h2>
          <ul className="space-y-2 text-sm text-primary">
            <li>
              <Link href="#">AskMayoExpert</Link>
            </li>
            <li>
              <Link href="#">Clinical Trials</Link>
            </li>
            <li>
              <Link href="#">Mayo Alumni</Link>
            </li>
            <li>
              <Link href="#">Refer a Patient</Link>
            </li>
            <li>
              <Link href="#">Executive Health</Link>
            </li>
            <li>
              <Link href="#">Business Collaborations</Link>
            </li>
            <li>
              <Link href="#">Supplier Info</Link>
            </li>
          </ul>
        </div>

        {/* Students */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Students</h2>
          <ul className="space-y-2 text-sm text-primary">
            <li>
              <Link href="#">Admissions Requirements</Link>
            </li>
            <li>
              <Link href="#">Degree Programs</Link>
            </li>
            <li>
              <Link href="#">Student & Faculty Portal</Link>
            </li>
            <li>
              <Link href="#">Research Faculty</Link>
            </li>
            <li>
              <Link href="#">Laboratories</Link>
            </li>
          </ul>
        </div>

        {/* Financial & Global */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Global & Financial</h2>
          <ul className="space-y-2 text-sm text-primary">
            <li>
              <Link href="#">International Appointments</Link>
            </li>
            <li>
              <Link href="#">Financial Services</Link>
            </li>
            <li>
              <Link href="#">Charitable Care</Link>
            </li>
            <li>
              <Link href="#">Health Needs Assessment</Link>
            </li>
            <li>
              <Link href="#">Financial Docs – Arizona</Link>
            </li>
            <li>
              <Link href="#">Docs – Florida</Link>
            </li>
            <li>
              <Link href="#">Docs – Minnesota</Link>
            </li>
            <li>
              <Link href="#">Medicare ACO</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-16 border-t border-white/20 pt-6 flex flex-col md:flex-row items-center justify-between">
        <p className="text-sm text-white/70 text-center md:text-left">
          © {new Date().getFullYear()} Wills Health. All rights reserved.
        </p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <Link href="https://web.facebook.com/login/?_rdc=1&_rdr#">
            <Facebook className="w-5 h-5 hover:text-blue-600" />
          </Link>
          <Link href="instagram.com">
            <Instagram className="w-5 h-5 hover:text-blue-600" />
          </Link>
          <Link href="linkedin.com">
            <Linkedin className="w-5 h-5 hover:text-blue-600" />
          </Link>
          <Link href="youtube.com">
            <Youtube className="w-5 h-5 hover:text-blue-600" />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footers;
