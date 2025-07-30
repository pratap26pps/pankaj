"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
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
    <div className="block lg:hidden w-full px-2">
      <Swiper
        modules={[Autoplay, Pagination]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        className="w-full"
        allowTouchMove={true}
        speed={600}
      >
        {ads.flatMap((ad, index) =>
          (ad.imageUrl || []).map((url, i) => (
            <SwiperSlide key={`${index}-${i}`}>
              <div className="w-full  h-[300px] relative overflow-hidden ">
                <Image
                  src={url}
                  alt={`Ad ${index + 1}`}
                  fill
                  className="object-cover "
                  sizes="100vw"
                  priority={index === 0 && i === 0}
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
