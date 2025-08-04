"use client";

import React, { useState, useEffect } from "react";
import { Star, UploadCloud, UserCircle, LogOut, X } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Props {
  onLogout?: () => void;
}

const AccountDetailsCard: React.FC<Props> = ({ onLogout }) => {
  const { username, clearAuth, photo, setPhoto } = useAuthStore();
  const router = useRouter();

  const [isMobile, setIsMobile] = useState(false);
  const [showCard, setShowCard] = useState(true);

  // Load profile image from localStorage on mount
  useEffect(() => {
    const storedPhoto = localStorage.getItem("profile-photo");
    if (storedPhoto) {
      setPhoto(storedPhoto);
    }
  }, [setPhoto]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageUrl = reader.result as string;
        setPhoto(imageUrl);
        localStorage.setItem("profile-photo", imageUrl);
        toast.success("Profile photo uploaded successfully", {
          position: "bottom-center",
        });
        if (isMobile) {
          setTimeout(() => setShowCard(false), 1000);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", { method: "POST" });
      if (res.ok) {
        clearAuth();
        router.push("/");
        if (onLogout) onLogout();
      } else {
        console.error("Logout failed");
      }
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const handleRemovePhoto = () => {
    setPhoto("");
    localStorage.removeItem("profile-photo");
    toast.success("Profile photo removed", {
      position: "bottom-center",
    });
  };

  if (!showCard) return null;

  return (
    <motion.div
      className="p-4 rounded-xl shadow-lg bg-white border w-full relative"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {isMobile && (
        <button
          onClick={() => setShowCard(false)}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          <X size={18} />
        </button>
      )}

      <div className="flex items-center gap-4">
        {photo ? (
          <div className="relative">
            <Image
              src={photo}
              alt="Profile"
              width={60}
              height={60}
              className="rounded-full border object-cover"
            />
            <button
              onClick={handleRemovePhoto}
              className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-[1px] hover:bg-red-600"
            >
              <X size={12} />
            </button>
          </div>
        ) : (
          <UserCircle className="w-14 h-14 text-gray-400" />
        )}
        <div>
          <label
            htmlFor="photo-upload"
            className="flex items-center gap-1 text-sm text-blue-600 cursor-pointer"
          >
            <UploadCloud size={14} />
            Upload Photo
          </label>
          <input
            id="photo-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handlePhotoUpload}
          />
        </div>
      </div>

      <div className="mt-3 space-y-1 text-sm text-gray-700">
        <p className="font-semibold">{username || "Unknown User"}</p>
        <p className="text-gray-500">Consultant Cardiologist</p>
        <p className="text-gray-500">Lagos General Hospital</p>
        <p className="text-green-600 font-medium">Status: Active</p>
      </div>

      <div className="mt-3 flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
        ))}
        <span className="ml-2 text-xs text-gray-400">(4.9 rating)</span>
      </div>

      <button
        onClick={handleLogout}
        className="mt-4 w-full flex items-center justify-center gap-2 bg-red-100 text-red-600 px-4 py-2 rounded-xl hover:bg-red-200 transition text-sm font-medium"
      >
        <LogOut size={16} />
        Logout
      </button>
    </motion.div>
  );
};

export default AccountDetailsCard;
