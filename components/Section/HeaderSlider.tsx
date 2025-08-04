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

export default function HeaderTextSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFirstSlider, setIsFirstSlider] = useState(true);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // fade out
      setTimeout(() => {
        if (isFirstSlider) {
          if (currentIndex < messages1.length - 1) {
            setCurrentIndex((prev) => prev + 1);
          } else {
            setIsFirstSlider(false);
            setCurrentIndex(0);
          }
        } else {
          if (currentIndex < messages2.length - 1) {
            setCurrentIndex((prev) => prev + 1);
          } else {
            setIsFirstSlider(true);
            setCurrentIndex(0);
          }
        }
        setFade(true); // fade in
      }, 500);
    }, 3000); // 3 seconds per message

    return () => clearInterval(interval);
  }, [currentIndex, isFirstSlider]);

  return (
    <div className="mt-3 text-center">
      <p
        className={`text-sm font-bold uppercase  italic transition-opacity duration-500 ${
          fade ? "opacity-100" : "opacity-0"
        }`}
      >
        {isFirstSlider ? messages1[currentIndex] : messages2[currentIndex]}
      </p>
    </div>
  );
}
