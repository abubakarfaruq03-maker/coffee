import { useEffect, useState } from "react"; // Added useEffect and useState
import { useNavigate } from "react-router-dom";

export default function FeaturedCoffee() {
  const [featuredItems, setFeaturedItems] = useState([]);
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/menu/featured`)
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then(data => {
        // Double check that 'data' is actually an array
        if (Array.isArray(data)) {
          setFeaturedItems(data);
        }
      })
      .catch(err => console.error(err));
  }, []);

  // Safeguard: If it's not an array yet, don't run .find
  if (!Array.isArray(featuredItems) || featuredItems.length === 0) {
    return <div className="text-center p-10">Loading Specials...</div>;
  }

  const almond = featuredItems.find(item => item.title.includes("Almond"));
  const hazelnut = featuredItems.find(item => item.title.includes("Hazelnut"));

const handleExplore = (item) => {
  if (item) {
    // Generate a clean slug (e.g., "almond-latte" becomes "almond") 
    // or just use the title slugified
    const slug = item.title.split(' ')[0].toLowerCase(); 
    
    // This will navigate to /menu/featured/almond
    navigate(`/menu/featured/${slug}`);
  }
};

  // If data hasn't loaded yet, we can show a simple placeholder or return null
  if (featuredItems.length === 0) return <div className="p-10 text-center">Loading Specials...</div>;

  return (
    <div className="overflow-x-hidden">
      {/* FIRST SECTION: Dark Background (Almond) */}
      <div className="mt-8 bg-orange-950 text-white w-screen min-h-fit flex flex-col lg:flex-row items-center">
        <div className="h-64 lg:h-[500px] w-full lg:w-1/2">
          {/* Using image from backend */}
          <img src={almond?.menu_image} alt="almond" className="w-full h-full object-cover" />
        </div>
        
        <div className="flex justify-center items-center text-center p-8 lg:p-16 flex-col gap-6 w-full lg:w-1/2">
          <p className="font-bold text-2xl lg:text-4xl">Hi, {almond?.title || "almond nut"}</p>
          <p className="max-w-md lg:text-lg">
            {almond?.description || "Loading description..."}
          </p>
          <button 
            onClick={() => handleExplore(almond)}
            className="bg-stone-100 text-orange-950 py-2 px-6 font-medium rounded-full hover:bg-[#a18a83] transition-all duration-500 ease-in-out hover:scale-105"
          >
            Explore almond
          </button>
        </div>
      </div>

      {/* SECOND SECTION: Light Background (Hazelnut) */}
      <div className="mt-5 lg:mt-12 bg-[#f5f1eb] text-orange-950 w-screen min-h-fit flex flex-col lg:flex-row-reverse items-center">
        <div className="h-64 lg:h-[500px] w-full lg:w-1/2">
          {/* Using image from backend */}
          <img src={hazelnut?.menu_image} alt="hazelnut" className="w-full h-full object-cover" />
        </div>

        <div className="flex justify-center items-center text-center p-8 lg:p-16 flex-col gap-6 w-full lg:w-1/2">
          <p className="font-bold text-2xl lg:text-4xl">Hi, {hazelnut?.title || "hazelnut"}</p>
          <p className="max-w-md lg:text-lg">
            {hazelnut?.description || "Loading description..."}
          </p>
          <button 
            onClick={() => handleExplore(hazelnut)}
            className="border border-orange-950 py-2 px-6 font-medium rounded-full hover:bg-[#a18a83] hover:scale-105 transition-all duration-500 ease-in-out"
          >
            Explore hazelnut
          </button>
        </div>
      </div>
    </div>
  );
}