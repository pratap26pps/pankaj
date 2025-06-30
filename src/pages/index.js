import Head from 'next/head';
import Image from 'next/image';

export default function Home() {
  return (
  <div
  className="min-h-screen px-4 py-35 bg-cover bg-center"
  style={{
    backgroundImage:
      "url('https://efuel.like-themes.com/wp-content/uploads/2018/08/slider-car-full.jpg')",
     backgroundPosition: '0% ',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed',
      backgroundColor: '#f0f0f0',
      backgroundBlendMode: 'overlay',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      color: '#fff',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      height: '100vh',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      transition: 'background-color 0.3s ease',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      borderRadius: '10px',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      overflow: 'hidden',
      position: 'relative',
  }}
>


      <Head>
        <title>EV Services - Home</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <main className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
          Book EV Repairs, Services, & Batteries.
          <br />
          Discover trusted service partners near you!
        </h1>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-12">
          <select className="px-4 py-7 rounded-md w-72 text-black">
            <option selected disabled>Enter Location</option>
            <option>Ballabhgarh</option>
            <option>Faridabad</option>
            <option>Delhi</option>
          </select>
          <input
            type="text"
            placeholder="Search service or EV issue..."
            className="px-4 py-3 border-2  rounded-md w-72 text-black"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-center">
          <Card
            title="EV REPAIR"
            desc="From nearby authorized centers"
            offer="UP TO 50% OFF"
            img="https://cdn-icons-png.flaticon.com/512/744/744466.png"
          />
          <Card
            title="BATTERY REPLACEMENT"
            desc="Instant delivery and installation"
            offer="UP TO ₹2000 OFF"
            img="https://cdn-icons-png.flaticon.com/512/105/105789.png"
          />
          <Card
            title="EMERGENCY SUPPORT"
            desc="24x7 breakdown assistance"
            offer="QUICK RESPONSE"
            img="https://cdn-icons-png.flaticon.com/512/1206/1206336.png"
          />
        </div>
      </main>
    </div>
  );
}

function Card({ title, desc, offer, img }) {
  return (
    <div className="bg-white text-black p-6 rounded-2xl shadow-md text-center hover:scale-105 transition-transform duration-200">
      <h2 className="text-xl font-semibold mb-1">{title}</h2>
      <p className="text-gray-600 text-sm mb-2">{desc}</p>
      <div className="text-orange-500 font-bold mb-4">{offer}</div>
      {/* <Image src={img} alt={title} width={100} height={100} className="mx-auto" /> */}
    </div>
  );
}
