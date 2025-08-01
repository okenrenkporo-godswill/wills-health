"use client";

import React, { useState, useEffect } from "react";
import { HeartPulse, CalendarCheck2, Pill, LucideIcon } from "lucide-react";
import Image from "next/image";

// Swiper Imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

// Darker Gradient Data
const cardDetails = {
  vitals: [
    {
      title: "Heart Rate",
      description: "Resting: 72 bpm",
      bg: "bg-gradient-to-r from-[#3b0764] to-[#6d28d9]",
      image: "/images/vitals.png",
    },
    {
      title: "Blood Pressure",
      description: "120/80 mmHg",
      bg: "bg-gradient-to-r from-[#1e3a8a] to-[#1e40af]",
    },
  ],
  appointments: [
    {
      title: "Dentist Visit",
      description: "Aug 5, 10:00 AM",
      bg: "bg-gradient-to-r from-[#0f172a] to-[#1e293b]",
    },
    {
      title: "General Check-up",
      description: "Aug 8, 3:00 PM",
      bg: "bg-gradient-to-r from-[#334155] to-[#0f172a]",
    },
  ],
  medication: [
    {
      title: "Morning Pill",
      description: "Taken at 9:00 AM",
      bg: "bg-gradient-to-r from-[#422006] to-[#713f12]",
    },
    {
      title: "Afternoon Pill",
      description: "Upcoming at 3:00 PM",
      bg: "bg-gradient-to-r from-[#4c0519] to-[#7f1d1d]",
    },
  ],
};

// Card Box Component
const CardBox = ({
  title,
  icon: Icon,
  items,
}: {
  title: string;
  icon: LucideIcon;
  items: { title: string; description: string; bg: string; image?: string }[];
}) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setIndex((prev) => (prev + 1) % items.length),
      10000
    );
    return () => clearInterval(interval);
  }, [items.length]);

  const current = items[index];

  return (
    <div
      className={`rounded-xl shadow-md p-4 h-52 md:h-48 w-full transition-all duration-500 text-white ${current.bg}`}
    >
      <div className="flex justify-between items-center mb-2">
        <div className="text-md font-semibold">{title}</div>
        <Icon className="w-6 h-6 text-white/70" />
      </div>
      <p className="text-sm">{current.description}</p>
      {current.image && (
        <div className="mt-3">
          <Image
            src={current.image}
            alt={current.title}
            width={50}
            height={50}
          />
        </div>
      )}
    </div>
  );
};

// Main Component
const VitalSlider = () => {
  const cards = [
    {
      title: "Vitals Overview",
      icon: HeartPulse,
      items: cardDetails.vitals,
    },
    {
      title: "Appointments",
      icon: CalendarCheck2,
      items: cardDetails.appointments,
    },
    {
      title: "Medication Reminder",
      icon: Pill,
      items: cardDetails.medication,
    },
  ];

  return (
    <div className="mb-6 px-2">
      {/* Desktop View (3 equal cards) */}
      <div className="hidden md:grid grid-cols-3 gap-4">
        {cards.map((card, i) => (
          <CardBox
            key={i}
            title={card.title}
            icon={card.icon}
            items={card.items}
          />
        ))}
      </div>

      {/* Mobile View - Swiper with Pagination below */}
      <div className="block md:hidden">
        <Swiper
          spaceBetween={16}
          slidesPerView={1}
          pagination={{ clickable: true, el: ".custom-pagination" }}
          modules={[Pagination]}
        >
          {cards.map((card, i) => (
            <SwiperSlide key={i}>
              <CardBox title={card.title} icon={card.icon} items={card.items} />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="custom-pagination mt-4 flex justify-center"></div>
      </div>
    </div>
  );
};

export default VitalSlider;
