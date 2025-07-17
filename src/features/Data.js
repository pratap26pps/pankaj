import { BatteryCharging, PlugZap, Wrench, PackageCheck } from "lucide-react";
import { GiScooter } from "react-icons/gi";
import { MdElectricRickshaw } from "react-icons/md";

// ✅ Import page components
import ElectricBike from "../features/Pages/ElectricBike";
import Erickshaw from "../features/Pages/Erickshaw";
import LithiumBatteries from "../features/Pages/LithiumBatteries";
import Chargers from "../features/Pages/Chargers";
import Accessories from "../features/Pages/Accessories";
import Others from "./Pages/Others";


export  const services = [
  {
    name: "Electric Bike",
    icon: <GiScooter className="h-10 w-10 text-green-700" />,
    description: "Repair & maintenance for e-bikes",
    Component: ElectricBike,
  },
  {
    name: "Erickshaw",
    icon: <MdElectricRickshaw className="h-10 w-10 text-green-700" />,
    description: "Services for electric 3-wheelers",
    Component: Erickshaw,
  },
  {
    name: "Lithium Batteries",
    icon: <BatteryCharging className="h-10 w-10 text-green-700" />,
    description: "Battery checkup & replacement",
    Component: LithiumBatteries,
  },
  {
    name: "Chargers",
    icon: <PlugZap className="h-10 w-10 text-green-700" />,
    description: "Fast charging solutions",
    Component: Chargers,
  },
  {
    name: "Accessories",
    icon: <Wrench className="h-10 w-10 text-green-700" />,
    description: "All EV-related add-ons",
    Component: Accessories,
  },
  {
    name: "Others",
    icon: <PackageCheck className="h-10 w-10 text-green-700" />,
    description: "Miscellaneous EV support",
    Component: Others,
  },
];



export const models = [
  {
    id: 1,
    name: "Mahindra",
    image: "/images/model/mahindra.png",
    submodels: [
      { name: "Treo Yaari", image: "/images/submodel/treo-yari.png" },
      { name: "Treo Plus", image: "/images/submodel/treo-plus.png" },
      { name: "E-Alfa Mini", image: "/images/submodel/e-alfa-super.png" }, // you don't have e-alfa-mini, replaced with available one
    ],
  },
  {
    id: 2,
    name: "Bazaz Auto",
    image: "/images/model/bazaz auto.png",
    submodels: [
      { name: "RE E-TEC 9.0", image: "/images/submodel/re-etech-09.png" },
    ],
  },
  {
    id: 3,
    name: "Piaago Auto",
    image: "/images/model/piaago auto.png",
    submodels: [
      { name: "Ape E-City", image: "/images/submodel/ape-ecity.png" },
      { name: "FX Max", image: "/images/submodel/fx-max.png" },
    ],
  },
  {
    id: 4,
    name: "Atul Auto",
    image: "/images/model/atul auto logo.png",
    submodels: [
      { name: "Elite Plus", image: "/images/submodel/elite-plus.png" },
    ],
  },
  {
    id: 5,
    name: "Lohia",
    image: "/images/model/Lohia.png",
    submodels: [
      { name: "Hasafar IAQ", image: "/images/submodel/hasafar-iaq.png" },
      { name: "Narain EX", image: "/images/submodel/narain-ex.png" },
      { name: "Comfort", image: "/images/submodel/comfort.png" },
    ],
  },
  {
    id: 6,
    name: "Mayuri",
    image: "/images/model/Mayuri.png",
    submodels: [
      { name: "Mayuri Deluxe", image: "/images/submodel/mayuri-delux.png" },
    ],
  },
  {
    id: 7,
    name: "YC Elctriuc",
    image: "/images/model/yc elctriuc.png",
    submodels: [
      { name: "Yatri Super", image: "/images/submodel/yatri-super.png" },
    ],
  },
  {
    id: 8,
    name: "Mini Metro",
    image: "/images/model/mini metro.png",
    submodels: [
      { name: "Butterfly", image: "/images/submodel/bttefly.png" },
    ],
  },
  {
    id: 9,
    name: "Saarthi",
    image: "/images/model/saarthi.png",
    submodels: [
      { name: "DLX", image: "/images/submodel/dlx.png" },
      { name: "Plus", image: "/images/submodel/plus.png" },
    ],
  },
  {
    id: 10,
    name: "Kinetic Green",
    image: "/images/model/kinetic green.png",
    submodels: [
      { name: "Safar Smart", image: "/images/submodel/safar smart.png" },
    ],
  },
  {
    id: 11,
    name: "Jezza",
    image: "/images/model/jezz.png",
    submodels: [
      { name: "Jezza", image: "/images/submodel/jezza.png" },
      { name: "Super", image: "/images/submodel/super.png" },
    ],
  },
  {
    id: 12,
    name: "Raft",
    image: "/images/model/raft.png",
    submodels: [
      { name: "Raft", image: "/images/submodel/raft.png" },
    ],
  },
];
export const bikemodels = [
  {
    id: 1,
    name: "Bajaj Auto",
    image: "/images/logobike/bazaz auto.png",
    submodels: [
      { name: "Chetak 35 Series", image: "/images/subbike/chetak3001.png" },
      { name: "Chetak 3001", image: "/images/subbike/chetak3001.png" },
    ],
  },
  {
    id: 2,
    name: "TVS Motor",
    image: "/images/logobike/tvs.png",
    submodels: [
      { name: "iQube 2.2", image: "/images/subbike/iqube.png" },
      { name: "iQube 3.5", image: "/images/subbike/iqube.png" },
      { name: "iQube ST", image: "/images/subbike/iqube.png" },
    ],
  },
  {
    id: 3,
    name: "Ather Energy",
    image: "/images/logobike/anther.png",
    submodels: [
      { name: "450X", image: "/images/subbike/450x.png" },
      { name: "450 Apex", image: "/images/subbike/450apex.png" },
      { name: "450S", image: "/images/subbike/450x.png" },
      { name: "Rizta / Rizta S", image: "/images/subbike/ritza.png" },
    ],
  },
  {
    id: 4,
    name: "Ola Electric",
    image: "/images/logobike/ola.png",
    submodels: [
      { name: "S1 (Pro / Air / X / Gig)", image: "/images/subbike/s1pro.png" },
      { name: "Roadster / Roadster X", image: "/images/subbike/roadstarx.png" },
    ],
  },
  {
    id: 5,
    name: "Hero MotoCorp (Vida)",
    image: "/images/logobike/vida.png",
    submodels: [
      { name: "Vida V2", image: "/images/subbike/vida-v2.png" },
      { name: "Vida VX2", image: "/images/subbike/vida-vx2.png" },
    ],
  },
  {
    id: 6,
    name: "Okinawa Autotech",
    image: "/images/logobike/okinawa.png",
    submodels: [
      { name: "Ridge+, iPraise+, Praise Pro", image: "/images/subbike/okinawalite.png" },
      { name: "Lite, R30, Okhi-90", image: "/images/subbike/okinawalite.png" },
    ],
  },
  {
    id: 7,
    name: "BGauss",
    image: "/images/logobike/bgauss.png",
    submodels: [
      { name: "C12 / Max C12", image: "/images/subbike/bgaussc12.png" },
    ],
  },
  {
    id: 8,
    name: "Honda",
    image: "/images/logobike/honda.png",
    submodels: [
      { name: "Activa e", image: "/images/subbike/hondaactivae.png" },
    ],
  },
  {
    id: 9,
    name: "Ultraviolette Automotive",
    image: "/images/logobike/ultra.png",
    submodels: [
      { name: "Tesseract", image: "/images/subbike/terracact.png" },
      { name: "F77 / F77 Recon / Space Ed.", image: "/images/subbike/f77.png" },
    ],
  },
  {
    id: 10,
    name: "Greta Electric",
    image: "/images/logobike/greta.png",
    submodels: [
      { name: "Harper ZX Series, Others", image: "/images/subbike/grteaa.png" },
    ],
  },
  {
    id: 11,
    name: "Revolt Motors",
    image: "/images/logobike/rovoalt.png",
    submodels: [
      { name: "RV400", image: "/images/subbike/rv400.png" },
    ],
  },
  {
    id: 12,
    name: "Simple Energy",
    image: "/images/logobike/simple.png",
    submodels: [
      { name: "Simple One / One S", image: "/images/subbike/simpleone.png" },
    ],
  },
  {
    id: 13,
    name: "Kinetic Green",
    image: "/images/logobike/kinetic.png",
    submodels: [
      { name: "E-Luna", image: "/images/subbike/eluna.png" },
    ],
  },
  {
    id: 14,
    name: "Okaya EV",
    image: "/images/logobike/okawa.png",
    submodels: [
      { name: "Faast F2F / Defy 22", image: "/images/subbike/f2f.png" },
    ],
  },
  {
    id: 15,
    name: "Tork Motors",
    image: "/images/logobike/tork.png",
    submodels: [
      { name: "Kratos", image: "/images/subbike/kratos.png" },
    ],
  },
  {
    id: 16,
    name: "Oben Electric",
    image: "/images/logobike/oben.png",
    submodels: [
      { name: "Rorr", image: "/images/subbike/rorr.png" },
    ],
  },
];

