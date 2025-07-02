import Image from "next/image";
import SearchBar from "@/features/searchbar";
import Dashboard from "./user/Dashboard";
export const metadata = {
  title: "EV Services - Home",
  description: "Book EV Repairs, Services, & Batteries.",
};

export default function Home() {
  return (
    <>
      <div className="relative min-h-screen flex items-center justify-center px-4 py-10 bg-black/70 text-white">
        {/* Blurred Overlay */}
        <div
          className="absolute inset-0 bg-[url('https://focus.hidubai.com/content/images/2024/08/ev--3-.jpg')] bg-cover bg-center bg-fixed"
          style={{ zIndex: -2 }}
        />

        <main className="max-w-6xl w-full mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-8 leading-tight drop-shadow-lg">
            Book EV Repairs, Services, & Batteries.
            <br />
            <span className="text-orange-400">
              Discover trusted service partners near you!
            </span>
          </h1>

          <SearchBar />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-center">
            <Card
              title="EV REPAIR"
              desc="From nearby authorized centers"
              offer="UP TO 20% OFF"
              img="https://content.jdmagicbox.com/comp/def_content_category/car-repair-and-services-nissan/car-repair-and-services-15-car-repair-and-services-nissan-1-x0ejq.jpg"
            />
            <Card
              title="BATTERY REPLACEMENT"
              desc="Instant delivery and installation"
              offer="UP TO ₹2000 OFF"
              img="https://natnavi.com/wp-content/uploads/2024/01/battery-pack-assembly-for-2015-chevrolet-spark-ev-electric-car-at-gms-brownstown-michigan-plant_100466967_h-987723330-scaled.jpeg"
            />
            <Card
              title="EMERGENCY SUPPORT"
              desc="24x7 breakdown assistance"
              offer="QUICK RESPONSE"
              img="https://www.wise-it.com.hk/it-services/wp-content/uploads/2021/01/emergency.jpg"
            />
          </div>
        </main>
      </div>
    </>
  );
}

function Card({ title, desc, offer, img }) {
  return (
    <div className="bg-white/10 backdrop-blur-xs border border-white/20 p-6 rounded-2xl shadow-lg text-white hover:scale-105 hover:shadow-xl transition-all duration-300 transform group">
      <h2 className="text-2xl font-semibold mb-2 group-hover:text-orange-400 transition-colors duration-200">
        {title}
      </h2>
      <p className="text-gray-300 text-sm mb-2">{desc}</p>
      <div className="text-orange-400 font-bold mb-4">{offer}</div>
      <Image
        src={img}
        alt={title}
        width={120}
        height={120}
        className="mx-auto rounded-lg shadow-md"
      />
    </div>
  );
}
