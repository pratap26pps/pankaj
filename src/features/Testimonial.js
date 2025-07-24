"use client";
import { useEffect, useState, useRef } from "react";
import { Quote } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export default function ModernTestimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const autoplayRef = useRef(
    Autoplay({ delay: 2000, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  useEffect(() => {
    async function fetchReviews() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch("/api/reviews");
        const data = await res.json();
        if (data.success) {
          setTestimonials(data.reviews);
        } else {
          setError(data.message || "Failed to load testimonials");
        }
      } catch (err) {
        setError("Failed to load testimonials");
      }
      setLoading(false);
    }
    fetchReviews();
  }, []);

  return (
    <section className="py-16 bg-green-50 text-gray-800 playfair-style">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Row */}
        <div className="flex flex-col lg:flex-row justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
               Our Testimonials
            </h2>
          </div>
          <div className="flex items-center gap-8 mt-6 lg:mt-0 text-gray-600 text-sm">
            <div className="text-center">
              <div className="text-xl font-bold text-black">1M+</div>
              Happy People
            </div>
            <div className="text-center flex gap-1">
              <div className="text-xl font-bold text-black">4.88</div>
            
              <div className="text-yellow-500 text-lg">★★★★★</div>
      
            </div>
          </div>
        </div>

        {/* Testimonial Carousel */}
        <Carousel
          opts={{ align: "start", loop: true, slidesToScroll: 1 }}
          plugins={[autoplayRef.current]}
          className="relative"
        >
          <CarouselContent className="-ml-4">
            {loading ? (
              <div className="col-span-full text-center text-gray-500 py-10 w-full">Loading testimonials...</div>
            ) : error ? (
              <div className="col-span-full text-center text-red-500 py-10 w-full">{error}</div>
            ) : testimonials.length === 0 ? (
              <div className="col-span-full text-center text-gray-400 py-10 w-full">No testimonials yet.</div>
            ) : (
              testimonials.map((t, idx) => (
              <CarouselItem
  key={t._id || idx}
  className="basis-full md:basis-1/2 lg:basis-1/3 px-4"
>
  <div className="bg-white border border-emerald-100 rounded-3xl p-6    cursor-pointer transition-all duration-300 h-full flex flex-col hover:-translate-y-1 hover:scale-[1.01]">
    {/* Header Section */}
    <div className="flex items-center gap-4 mb-4">
      <img
        src={t.image}
        alt={t.name}
        className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-md"
      />
      <div>
        <h4 className="text-lg font-bold text-emerald-700 flex items-center gap-2">
          {t.name}
          <Quote className="w-4 h-4 text-emerald-400" />
        </h4>
        <p className="text-sm text-gray-500">{t.position}</p>
      </div>
    </div>

    {/* Quote Text */}
    <div className="text-sm text-gray-700 leading-relaxed mt-2 italic flex-1">
      “{t.description}”
    </div>

    {/* Accent Border Line (optional) */}
    <div className="h-1 w-20 mt-6 bg-gradient-to-r from-emerald-400 to-green-400 rounded-full" />
  </div>
</CarouselItem>

              ))
            )}
          </CarouselContent>
      
        </Carousel>
      </div>
    </section>
  );
}
