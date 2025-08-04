"use client";
import { useState, useEffect } from "react";

// First set of messages
const messages1 = [
  "Welcome to Wills Health Center! 💙",
  "AI-powered analysis now available 🚀",
  "Stay hydrated and healthy 💧",
  "Your health is our priority ❤️",
];

// Second set of messages
const messages2 = [
  "Book your next appointment online 📅",
  "We offer 24/7 emergency support 🚑",
  "Lab results available in record time ⏱️",
  "Your smile is our mission 😄",
];

export default function TextSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFirstSlider, setIsFirstSlider] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isFirstSlider) {
        // Moving through first slider messages
        if (currentIndex < messages1.length - 1) {
          setCurrentIndex((prev) => prev + 1);
        } else {
          // Switch to second slider
          setIsFirstSlider(false);
          setCurrentIndex(0);
        }
      } else {
        // Moving through second slider messages
        if (currentIndex < messages2.length - 1) {
          setCurrentIndex((prev) => prev + 1);
        } else {
          // Switch back to first slider
          setIsFirstSlider(true);
          setCurrentIndex(0);
        }
      }
    }, 3000); // 3s per message

    return () => clearInterval(interval);
  }, [currentIndex, isFirstSlider]);

  return (
    <div className="mt-3 space-y-3">
      {/* Slider display */}
      <div className="bg-blue-900 text-white py-3 rounded-xl text-center shadow-md">
        <p className="text-[14px] font-medium transition-opacity duration-500">
          {isFirstSlider ? messages1[currentIndex] : messages2[currentIndex]}
        </p>
      </div>
    </div>
  );
}
