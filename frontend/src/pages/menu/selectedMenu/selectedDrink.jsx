import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react"; 
import toast from 'react-hot-toast';
import DrinkSizes from "./components/Drinksizes";
import InputOption from "./components/Inputoptions";
import QuantityControl from "./components/Quantitycontrol";
import { AiFillStar } from "react-icons/ai";

// Define the base URL once at the top
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function SelectedDrink({ onAddSuccess }) {
  const { id, drinkName } = useParams(); 
  const [item, setItem] = useState(null);
  const [selectedQty, setSelectedQty] = useState(1);
  const [selectedTopping, setSelectedTopping] = useState("");
  const [selectedMilk, setSelectedMilk] = useState("Whole Milk");

  const milkOptions = ["Whole Milk", "Oat Milk", "Almond Milk", "Skim Milk"];


  useEffect(() => {
    if (drinkName) {
      fetch(`${API_BASE_URL}/api/menu/featured`)
        .then(res => res.json())
        .then(data => {
          const found = data.find(d => 
            d.title.toLowerCase().startsWith(drinkName.toLowerCase())
          );
          if (found) {
            setItem(found);
            setSelectedTopping(found.toppings?.[0] || "");
          }
        });
    } else if (id) {
      fetch(`${API_BASE_URL}/api/menu/${id}`)
        .then(res => res.json())
        .then(data => {
          setItem(data);
          setSelectedTopping(data.toppings?.[0] || "");
        });
    }
  }, [id, drinkName]);

  // 2. Add to Cart Logic 
  const addToCart = async () => {
    if (!item) return;
    const loadingToast = toast.loading(`Adding ${item.title}...`);

    try {
      const response = await fetch(`${API_BASE_URL}/api/cart`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: item.id,
          title: item.title,
          price: item.price,
          image: item.image,
          quantity: selectedQty
        })
      });

      if (response.ok) {
        toast.dismiss(loadingToast);

        if (typeof onAddSuccess === 'function') {
          onAddSuccess();
        }

        toast.custom(
          (t) => (
            <div
              onClick={() => toast.remove(t.id)}
              className={`${
                t.visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
              } transition-all duration-300 ease-in-out max-w-xs w-full bg-orange-950 shadow-2xl rounded-lg pointer-events-auto flex cursor-pointer border border-orange-900/50 relative z-[9999]`}
            >
              <div className="flex-1 p-3">
                <div className="flex items-start">
                  <div className="ml-1">
                    <p className="text-xs font-bold text-white uppercase tracking-widest">
                      {item.title} Added ({selectedQty})
                    </p>
                    <p className="mt-0.5 text-[10px] text-orange-200/60">Tap to dismiss</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center pr-4">
                <span className="text-orange-500 text-xs font-bold">✕</span>
              </div>
            </div>
          ),
          { position: 'top-center', duration: 2000 }
        );
      } else {
        toast.error("Failed to add", { id: loadingToast });
      }
    } catch (err) {
      console.error("Fetch Error:", err);
      toast.error("Network Error", { id: loadingToast });
    }
  };

  if (!item) return <div className="p-20 text-center uppercase tracking-widest text-orange-900">Loading...</div>;

  return (
    <div className="overflow-x-hidden">
      <nav className="flex px-8 py-4 text-orange-900/60 text-sm uppercase tracking-widest">
        <Link to="/menu" className="hover:text-orange-950 transition-colors">Menu</Link>
        <span className="mx-2">/</span>
        <span className="text-orange-950 font-semibold underline decoration-orange-950">{item.title}</span>
      </nav>

      <div>
        <div className="flex flex-col gap-6 lg:gap-0 lg:flex-row justify-evenly items-center w-screen h-fit p-8">
          <div className="flex flex-col justify-center items-center gap-5">
            <div className="flex justify-center items-center rounded-[50%]">
              <img 
                src={`${API_BASE_URL}${item.image || item.image}`} 
                alt={item.title} 
                className="w-64 lg:w-80 object-contain p-2" 
              />
            </div>
            <div><DrinkSizes /></div>
            
            <div className="flex gap-2 flex-col">
              <p className="uppercase text-gray-600 text-center">Quantity</p>
              <div className="flex justify-center border p-2 border-gray-200 lg:border-gray-400 rounded-full">
                <QuantityControl
                  initialQty={1}
                  onQtyChange={(newQty) => setSelectedQty(newQty)}
                />
              </div>
            </div>
          </div>

          <div className="uppercase">
            <p className="font-bold text-4xl lg:text-6xl font-oswald text-orange-950">{item.title}</p>
          </div>
        </div>

        <div className="flex justify-evenly items-center flex-col lg:flex-row pb-20">
          <div className="ml-5 flex justify-center items-center flex-col w-full lg:w-1/2">
            <div className="w-fit p-4">
              <p className="text-2xl uppercase">Options</p>
              <hr className="w-full border-b-4 border-gray-300" />
            </div>
            <div className="w-full max-w-md px-4">
              <InputOption
                label="Toppings"
                options={item.toppings || []}
                value={selectedTopping}
                onChange={setSelectedTopping}
              />
              {item.hasMilk && (
                <InputOption
                  label="Milk Options"
                  options={milkOptions}
                  value={selectedMilk}
                  onChange={setSelectedMilk}
                />
              )}
            </div>
          </div>

          <div className="fixed bottom-6 right-6 z-50">
            <button 
                className="px-12 py-4 bg-orange-950 rounded-full text-white shadow-2xl cursor-pointer hover:bg-orange-800 transition-all duration-300 transform hover:scale-105 font-bold uppercase tracking-widest" 
                onClick={addToCart}
            >
              Add to Order - ${(item.price * selectedQty).toFixed(2)}
            </button>
          </div>
        </div>

        <div className="w-screen bg-[#ede8d0] lg:bg-amber-100 flex justify-start items-center p-6 lg:p-12">
           <div className="w-full lg:max-w-4xl">
             <div className="flex items-center justify-start mb-4">
               {[...Array(5)].map((_, i) => <AiFillStar key={i} size={24} color="#b8860b" />)}
             </div>
             <p className="text-lg lg:text-2xl text-orange-950 font-light leading-relaxed">
               {item.description}
             </p>
           </div>
        </div>
      </div>
    </div>
  );
}