import { BatteryCharging, PlugZap, Wrench, PackageCheck } from "lucide-react";
import { GiScooter } from "react-icons/gi";
import { MdElectricRickshaw } from "react-icons/md";

// ✅ Import page components
import ElectricBike from "../features/Pages/ElectricBike";
import Erickshaw from "../features/Pages/Erickshaw";
import LithiumBatteries from "../features/Pages/LithiumBatteries";
import Chargers from "../features/Pages/Chargers";
import Accessories from "../features/Pages/Accessories";
import Others from "../features/Pages/Others";


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
    image: "/images/mahindra.png",
    submodels: [
      { name: "Treo Yaari", image: "/images/submodels/treo-yaari.png" },
      { name: "Treo Plus", image: "/images/submodels/treo-plus.png" },
      { name: "E-Alfa Mini", image: "/images/submodels/e-alfa-mini.png" },
      { name: "E-Alfa Super", image: "/images/submodels/e-alfa-super.png" },
    ],
  },
  {
    id: 2,
    name: "Bajaj Auto",
    image: "/images/bajaj-auto.png",
    submodels: [
      { name: "RE E-TEC 9.0", image: "/images/submodels/re-etec-9.0.png" },
    ],
  },
  {
    id: 3,
    name: "Piaggio",
    image: "/images/piaggio.png",
    submodels: [
      { name: "Ape E-City", image: "/images/submodels/ape-ecity.png" },
      { name: "FX Max", image: "/images/submodels/fx-max.png" },
    ],
  },
  {
    id: 4,
    name: "Atul Auto",
    image: "/images/atul-auto.png",
    submodels: [
      { name: "Elite Plus", image: "/images/submodels/elite-plus.png" },
    ],
  },
  {
    id: 5,
    name: "Lohia",
    image: "/images/lohia.png",
    submodels: [
      { name: "Humsafar IAQ", image: "/images/submodels/humsafar-iaq.png" },
      { name: "Narain DX", image: "/images/submodels/narain-dx.png" },
      { name: "Comfort F2F", image: "/images/submodels/comfort-f2f.png" },
    ],
  },
  {
    id: 6,
    name: "Mayuri",
    image: "/images/mayuri.png",
    submodels: [
      { name: "Deluxe", image: "/images/submodels/deluxe.png" },
    ],
  },
  {
    id: 7,
    name: "YC Electric",
    image: "/images/yc-electric.png",
    submodels: [
      { name: "Yatri Super", image: "/images/submodels/yatri-super.png" },
    ],
  },
  {
    id: 8,
    name: "Mini Metro",
    image: "/images/mini-metro.png",
    submodels: [
      { name: "Butterfly XV850", image: "/images/submodels/butterfly-xv850.png" },
    ],
  },
  {
    id: 9,
    name: "Saarthi",
    image: "/images/saarthi.png",
    submodels: [
      { name: "DLX", image: "/images/submodels/dlx.png" },
      { name: "Plus", image: "/images/submodels/plus.png" },
    ],
  },
  {
    id: 10,
    name: "Kinetic Green",
    image: "/images/kinetic-green.png",
    submodels: [
      { name: "Safar Smart", image: "/images/submodels/safar-smart.png" },
    ],
  },
  {
    id: 11,
    name: "Jezza",
    image: "/images/jezza.png",
    submodels: [
      { name: "J1000", image: "/images/submodels/j1000.png" },
      { name: "Super J1000", image: "/images/submodels/super-j1000.png" },
    ],
  },
  {
    id: 12,
    name: "Raft",
    image: "/images/raft.png",
    submodels: [
      { name: "Raft E-Rickshaw", image: "/images/submodels/raft-e-rickshaw.png" },
    ],
  },
];
