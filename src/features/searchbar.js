import { FaMapMarkerAlt, FaMicrophone, FaSearch } from "react-icons/fa";

export default function SearchBar() {
  return (
    <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-12">
      {/* Location Input */}
      <div className="flex items-center bg-white text-black border border-gray-300 rounded-md w-72 px-3 py-2 shadow-sm">
        <FaMapMarkerAlt className="text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Enter Location"
          className="flex-1 outline-none bg-transparent text-sm"
        />
      </div>

      {/* Search Bar */}
      <div className="flex items-center bg-white text-black border border-gray-300 rounded-md w-full sm:w-[480px] px-3 py-2 shadow-sm">
        <input
          type="text"
          placeholder="Search for services, issues, etc."
          className="flex-1 outline-none bg-transparent text-sm placeholder-gray-400"
        />
        <FaMicrophone className="text-orange-500 text-lg mx-3 cursor-pointer" />
        <button className="bg-orange-500 p-2 rounded-md text-white hover:bg-orange-600 transition-colors duration-200">
          <FaSearch />
        </button>
      </div>
    </div>
  );
}
