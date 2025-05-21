"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Navigation, MapPin } from "lucide-react";
import { poiData } from "../../lib/poiDB";

export default function Page() {
  const router = useRouter();
  const [pois, setPois] = useState([]);
  const [filter, setFilter] = useState("all");
  const [searchRadius, setSearchRadius] = useState(5); // in km
  const [userLocation, setUserLocation] = useState({ lat: 38.736946, lng: -9.142685 }); // Default location (Lisbon)
  const [showModal, setShowModal] = useState(false);
  const [selectedPoi, setSelectedPoi] = useState(null);

  useEffect(() => {
    // Simulate getting user location
    // In a real app, you would use navigator.geolocation.getCurrentPosition
    const fetchUserLocation = () => {
      // Simulating location fetch with a slight delay
      setTimeout(() => {
        setUserLocation({ lat: 38.736946, lng: -9.142685 });
        filterPOIs("all");
      }, 500);
    };

    fetchUserLocation();
  }, []);

  const filterPOIs = (category) => {
    setFilter(category);
    
    let filteredPOIs = poiData;
    
    // Filter by category if not "all"
    if (category !== "all") {
      filteredPOIs = poiData.filter(poi => poi.category === category);
    }
    
    // Filter by distance from user
    filteredPOIs = filteredPOIs.filter(poi => {
      const distance = calculateDistance(
        userLocation.lat, 
        userLocation.lng, 
        poi.lat, 
        poi.lng
      );
      return distance <= searchRadius;
    });
    
    // Sort by distance from user
    filteredPOIs.sort((a, b) => {
      const distA = calculateDistance(userLocation.lat, userLocation.lng, a.lat, a.lng);
      const distB = calculateDistance(userLocation.lat, userLocation.lng, b.lat, b.lng);
      return distA - distB;
    });
    
    setPois(filteredPOIs);
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    // Simple distance calculation (Haversine formula)
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2); 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    const distance = R * c; // Distance in km
    return distance;
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI/180);
  };

  const handleRadiusChange = (e) => {
    const newRadius = parseInt(e.target.value);
    setSearchRadius(newRadius);
    filterPOIs(filter);
  };

  const getCategoryIcon = (category) => {
    switch(category) {
      case "restaurant": return "🍽️";
      case "gas_station": return "⛽";
      case "supermarket": return "🛒";
      case "hotel": return "🏨";
      case "hospital": return "🏥";
      case "pharmacy": return "💊";
      case "parking": return "🅿️";
      default: return "📍";
    }
  };

  const handlePoiClick = (poi) => {
    setSelectedPoi(poi);
    setShowModal(true);
  };

  const handleDefineRoute = () => {
    // Redirect to route page with the POI as destination
    router.push(`/route?from=Current%20Location&to=${encodeURIComponent(selectedPoi.address)}`);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPoi(null);
  };

  return (
    <div className="max-w-md shadow-lg text-black space-y-6 flex flex-col justify-items-center items-center p-8 rounded-xl text-center gap-8 bg-white w-fit mx-auto">
      <button
        onClick={() => router.push("/")}
        className="flex items-center cursor-pointer text-black-600 self-start mb-1"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
      </button>
      <h1 className="text-2xl font-bold text-gray-800">
        Find Points of Interest
      </h1>

      <section className="w-full">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Navigation className="w-5 h-5 text-blue-500" />
          <p className="text-sm font-medium">
            Searching around your current location
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <label className="text-sm font-medium text-gray-700">
            Search Radius (km)
          </label>
          <input
            type="range"
            min="1"
            max="20"
            value={searchRadius}
            onChange={handleRadiusChange}
            className="w-full"
          />
          <span className="text-sm text-gray-600">{searchRadius} km</span>

          <label className="text-sm font-medium text-gray-700">
            Filter by Category
          </label>
          <select
            value={filter}
            onChange={(e) => filterPOIs(e.target.value)}
            className="input"
          >
            <option value="all">All Categories</option>
            <option value="restaurant">Restaurants</option>
            <option value="gas_station">Gas Stations</option>
            <option value="supermarket">Supermarkets</option>
            <option value="hotel">Hotels</option>
            <option value="hospital">Hospitals</option>
            <option value="pharmacy">Pharmacies</option>
            <option value="parking">Parking</option>
          </select>

          <button
            className="btn w-full bg-black cursor-pointer text-white"
            onClick={() => filterPOIs(filter)}
          >
            Find POIs
          </button>
        </div>
      </section>

      <section className="w-full mt-4">
        <h2 className="text-lg font-semibold text-gray-700">
          {pois.length > 0 
            ? `Nearby Points of Interest (${pois.length})` 
            : "No points of interest found"}
        </h2>
        
        <ul className="mt-4 space-y-4 max-h-96 overflow-y-auto">
          {pois.map((poi, index) => {
            const distance = calculateDistance(
              userLocation.lat, 
              userLocation.lng, 
              poi.lat, 
              poi.lng
            ).toFixed(1);
            
            return (
              <li 
                key={index} 
                className="flex border border-gray-200 rounded-lg p-3 hover:bg-gray-50 cursor-pointer"
                onClick={() => handlePoiClick(poi)}
              >
                <div className="flex-shrink-0 mr-3 text-2xl">
                  {getCategoryIcon(poi.category)}
                </div>
                <div className="flex-grow text-left">
                  <h3 className="text-md font-medium">{poi.name}</h3>
                  <p className="text-sm text-gray-600">{poi.address}</p>
                  <div className="flex items-center mt-2 text-sm text-gray-500">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{distance} km away</span>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Modal for confirming route */}
      {showModal && selectedPoi && (
  <div className="fixed inset-0 flex items-center justify-center z-50">
    <div className="bg-white p-4 rounded-lg shadow-xl max-w-xs w-11/12 mx-auto">
      <h2 className="text-lg font-semibold mb-2">Define Route</h2>
      <p className="mb-4 text-sm">
        Would you like to navigate to {selectedPoi.name}?
      </p>
      <div className="flex justify-end gap-2">
        <button 
          onClick={handleCloseModal}
          className="px-3 py-1.5 border border-gray-300 rounded-md text-gray-700 text-sm hover:bg-gray-50"
        >
          Cancel
        </button>
        <button 
          onClick={handleDefineRoute}
          className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
        >
          Navigate
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
}