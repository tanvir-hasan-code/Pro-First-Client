import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { FaSearch } from "react-icons/fa";
import data from "../../../assets/warehouses.json";

// Leaflet Default Marker Fix
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
});

// FlyTo Component
const FlyToLocation = ({ position }) => {
  const map = useMap();
  React.useEffect(() => {
    if (position) {
      map.flyTo(position, 12, { duration: 2 }); // smooth animation
    }
  }, [position, map]);
  return null;
};

const CoverageMap = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [flyPosition, setFlyPosition] = useState(null);

  // Filtered Data
  const filteredData = data.filter((item) =>
    item.district.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (e) => {
    e.preventDefault();
    if (filteredData.length > 0) {
      setFlyPosition([filteredData[0].latitude, filteredData[0].longitude]);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Top Title */}
      <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-6">
        We are available in 64 districts
      </h2>

      {/* Search Box */}
      <div className="flex justify-center mb-8">
        <form
          onSubmit={handleSearch} 
          className="flex items-center w-full max-w-md bg-gray-100 rounded-full shadow px-3 py-2"
        >
          <FaSearch className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search here"
            className="flex-1 bg-transparent outline-none text-gray-700"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            type="submit"
            className="bg-[#CAEB66] text-black font-semibold px-5 py-2 rounded-full hover:opacity-90 transition"
          >
            Search
          </button>
        </form>
      </div>

      <hr className="my-8" />

      {/* Sub Title */}
      <h3 className="text-lg md:text-xl font-semibold text-gray-700 mb-4">
        We deliver almost all over Bangladesh
      </h3>

      {/* Map Section */}
      <MapContainer
        center={[23.685, 90.3563]}
        zoom={8}
        style={{ height: "800px", width: "100%" }}
        className="rounded-xl shadow-lg z-1"
      >
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* Fly Animation */}
        <FlyToLocation position={flyPosition} />

        {filteredData.map((item, index) => (
          <Marker key={index} position={[item.latitude, item.longitude]}>
            <Popup>
              <h3 className="font-bold text-lg">{item.district}</h3>
              <p className="text-sm">City: {item.city}</p>
              <p className="text-sm">Covered: {item.covered_area.join(", ")}</p>
              <img
                src={item.flowchart}
                alt={item.district}
                className="w-40 h-24 mt-2 rounded"
              />
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default CoverageMap;
