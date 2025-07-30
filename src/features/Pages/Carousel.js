"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import Image from "next/image";

const MobileCarousel = () => {
  const [ads, setAds] = useState([]);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const res = await fetch("/api/ads");
        const data = await res.json();
        setAds(data.ads || []);
      } catch (error) {
        console.error("Failed to fetch ads:", error);
      }
    };

    fetchAds();
  }, []);

  return (
    <div className="block lg:hidden w-full">
      <Swiper
        pagination={{ clickable: true }}
        modules={[Pagination]}
        className="w-full h-60"
        loop
        autoplay={{ delay: 4000 }}
      >
        {ads.map((ad, index) =>
          ad.imageUrl.map((url, i) => (
            <SwiperSlide key={`${index}-${i}`}>
              <div className="relative w-full h-60">
                <Image
                  src={url}
                  alt={`Ad ${index + 1}`}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-md"
                />
              </div>
            </SwiperSlide>
          ))
        )}
      </Swiper>
    </div>
  );
};

export default MobileCarousel;
