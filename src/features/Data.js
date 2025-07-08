import { BatteryCharging, PlugZap, Wrench, PackageCheck } from "lucide-react";
import { GiScooter } from "react-icons/gi";
import { MdElectricRickshaw } from "react-icons/md";

// ✅ Import page components from /pages folder
import ElectricBike from "./Pages/ElectricBike";
import Erickshaw from "./Pages/Erickshaw";
import LithiumBatteries from "./Pages/LithiumBatteries";
import Chargers from "./Pages/Chargers";
import Accessories from "./Pages/Accessories";
import Others from "./Pages/Others";

// ✅ Full array
const services = [
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

export default services;
