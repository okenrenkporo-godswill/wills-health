"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <motion.footer
      className="bg-white px-6 py-12 mt-12 border-t border-gray-200"
      initial={{ opacity: 0, rotateX: -90 }}
      animate={{ opacity: 1, rotateX: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* About Us */}
        <motion.div
          className="p-4 rounded-lg shadow-md border"
          initial={{ opacity: 0, rotateY: -10 }}
          animate={{ opacity: 1, rotateY: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-lg font-semibold text-primary mb-2">
            Wills Health
          </h2>
          <p className="text-sm text-gray-600">
            Empowering your health journey with AI-powered insights and care.
          </p>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          className="p-4 rounded-lg shadow-md border"
          initial={{ opacity: 0, rotateY: -10 }}
          animate={{ opacity: 1, rotateY: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-lg font-semibold text-primary mb-2">
            Quick Links
          </h2>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>
              <Link href="/" className="hover:text-blue-600">
                Home
              </Link>
            </li>
            <li>
              <Link href="/login" className="hover:text-blue-600">
                Login
              </Link>
            </li>
            <li>
              <Link href="/register" className="hover:text-blue-600">
                Register
              </Link>
            </li>
            <li>
              <Link href="/dashboard" className="hover:text-blue-600">
                Dashboard
              </Link>
            </li>
          </ul>
        </motion.div>

        {/* Contact */}
        <motion.div
          className="p-4 rounded-lg shadow-md border"
          initial={{ opacity: 0, rotateY: -10 }}
          animate={{ opacity: 1, rotateY: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-lg font-semibold text-primary mb-2">Contact</h2>
          <p className="text-sm text-gray-600">
            Email: support@willshealth.com
          </p>
          <p className="text-sm text-gray-600">Phone: +234 800 123 4567</p>
          <p className="text-sm text-gray-600">Location: Lagos, Nigeria</p>
        </motion.div>

        {/* Social Media */}
        <motion.div
          className="p-4 rounded-lg shadow-md border"
          initial={{ opacity: 0, rotateY: -10 }}
          animate={{ opacity: 1, rotateY: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h2 className="text-lg font-semibold text-primary mb-2">Follow Us</h2>
          <div className="flex gap-4 text-gray-600">
            <Facebook className="hover:text-blue-600 cursor-pointer" />
            <Twitter className="hover:text-blue-400 cursor-pointer" />
            <Instagram className="hover:text-pink-600 cursor-pointer" />
            <Linkedin className="hover:text-blue-700 cursor-pointer" />
          </div>
        </motion.div>
      </div>

      <motion.div
        className="mt-8 text-center text-xs text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.7 }}
      >
        &copy; {new Date().getFullYear()} Wills Health. All rights reserved.
      </motion.div>
    </motion.footer>
  );
};

export default Footer;
