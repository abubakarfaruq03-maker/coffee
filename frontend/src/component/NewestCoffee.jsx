import { useContext } from "react";
import { MenuContext } from "../contexts/MenuContext";
import { useNavigate } from "react-router-dom";

export default function NewestCoffee() {
  const { menu } = useContext(MenuContext);
  const navigate = useNavigate();

  // Find the Espresso item from your context
  const espresso = menu.find((item) => item.title.toUpperCase() === "ESPRESSO");

  const handleBuyNow = () => {
    if (espresso) {
      // Navigates to the dynamic route: /menu/id/espresso
      navigate(`/menu/${espresso.id}/${espresso.title.toLowerCase()}`);
    }
  };

  return (
    <>
      {/* SECTION 1: NEWEST COFFEE */}
      <div className="flex flex-col mt-6 justify-center pb-8 pt-8 items-center w-full bg-[#ede8d0] lg:bg-white px-4 lg:px-0 lg:gap-12">
        
        {/* Header Title */}
        <div className="text-center mb-6">
          <p className="text-3xl lg:text-6xl leading-loose font-oswald text-orange-950 uppercase">
            GET A TASTE OF OUR NEWEST COFFEE
          </p>
        </div>

        <div className="lg:flex w-full gap-12">
          {/* IMAGE SIDE */}
          <div className="w-full lg:w-1/2 h-72 lg:h-[500px] flex justify-center items-center">
            <img 
              src={espresso?.menu_image || "images/espresso.JPG"} 
              alt={espresso?.title || "Espresso"} 
              className="w-[90%] lg:w-full h-[90%] lg:h-full object-cover rounded-xl" 
            />
          </div>

          {/* TEXT SIDE */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center items-start px-4 lg:px-0 mt-5 lg:mt-0">
            <p className="text-3xl lg:text-5xl font-bold lg:font-normal text-orange-950 uppercase">
              {espresso?.title || "ESPRESSO"}
            </p>
            
            <div className="mt-4 lg:mt-8">
              <p className="text-[16px] lg:text-lg font-light leading-8 text-orange-950 max-w-lg">
                {espresso?.description || "Your premium espresso description will appear here once loaded."}
              </p>
            </div>

            <button 
              onClick={handleBuyNow}
              className="mt-8 px-8 py-2 bg-orange-950 text-white rounded-full font-light
                         hover:bg-white hover:text-orange-950 border-2 border-orange-950 
                         transition-all duration-300 text-xl active:scale-95"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* SECTION 2: BRAND FEATURES */}
      <div className="bg-white lg:bg-[#f5f1eb] mt-8 p-8 pb-12 flex flex-col lg:flex-row gap-12 lg:gap-24 justify-center lg:items-start items-center">
        
        {/* Feature 1 */}
        <div className="flex flex-col items-center text-center lg:w-1/3">
          <div className="h-24 flex items-center justify-center mb-2">
            <img src="/images/homemade.png" alt="homemade" className="w-24" />
          </div>
          <p className="text-2xl font-bold mb-2 uppercase text-orange-950">FRESHLY BREWED</p>
          <p className="text-lg font-normal text-gray-600">Home-brewed coffee daily</p>
        </div>

        {/* Feature 2 */}
        <div className="flex flex-col items-center text-center lg:w-1/3">
          <div className="h-24 flex items-center justify-center mb-2">
            <img src="/images/coffeebean.WEBP" alt="beans" className="w-12" />
          </div>
          <p className="text-2xl font-bold mb-2 uppercase text-orange-950">PURE BEANS</p>
          <p className="text-lg font-normal text-gray-600 max-w-xs">
            Bringing a taste of freshly crafted coffee to every cup
          </p>
        </div>
        
      </div>

      <hr className="w-full border-b border-gray-300" />
    </>
  );
}