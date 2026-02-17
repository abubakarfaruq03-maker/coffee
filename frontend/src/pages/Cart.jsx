import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import QuantityControl from './menu/selectedMenu/components/Quantitycontrol';
import toast from 'react-hot-toast';
import { useNavigate, useLocation } from 'react-router-dom';

// 1. Use environment variable for the API base
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


export default function Cart({ onCartChange }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
const location = useLocation();

  // Fetch initial data
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/cart`)
      .then(res => res.json())
      .then(data => {
        setItems(data);
        setLoading(false);
      })
      .catch(err => console.error("Error loading cart:", err));
  }, []);

  // DELETE: Remove item
  const handleDeleteItem = async (id) => {
    setItems(prev => prev.filter(item => (item.product_id || item.id) !== id));

    try {
      const res = await fetch(`${API_BASE_URL}/api/cart/${id}`, {
        method: 'DELETE',
      });

      if (res.ok && onCartChange) onCartChange();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  // PATCH: Update quantity
  const handleUpdateQuantity = async (id, newQty) => {
    setItems(prev =>
      prev.map(item => {
        const itemId = item.product_id || item.id;
        return itemId === id ? { ...item, quantity: newQty } : item;
      })
    );

    try {
      const res = await fetch(`${API_BASE_URL}/api/cart/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity: newQty })
      });

      if (res.ok && onCartChange) onCartChange();
    } catch (err) {
      console.error("Quantity update failed:", err);
    }
  };

  const calculateTotal = () => 
    items.reduce((acc, item) => acc + (Number(item.price) * item.quantity), 0).toFixed(2);

  if (loading) return <div className="pt-20 text-center font-oswald text-orange-950 uppercase tracking-widest">Loading Cart...</div>;
  // Function to clear cart from database
const clearCartOnServer = async () => {
  const token = localStorage.getItem('token');
  
  try {
    const res = await fetch(`${API_BASE_URL}/api/cart`, { 
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}` // Send the VIP pass
      }
    });
    
    if (res.ok) {
      setItems([]); 
      if (onCartChange) onCartChange(); 
    }
  } catch (err) {
    console.error("Failed to clear cart:", err);
  }
};
const handleCheckout = () => {
  // 1. Check if user is logged in
  const token = localStorage.getItem('token');

  if (!token) {
    // 2. If not logged in, show a toast and redirect
    toast.error("Please login to complete your order", {
        style: {
            borderRadius: '10px',
            background: '#fff',
            color: '#431407', // orange-950
        },
    });
    
    // We pass the current path ('/cart') in the state so Login knows where to return
    navigate('/login', { state: { from: location } });
    return;
  }

  // 3. If logged in, proceed with the existing checkout logic
  if (items.length === 0) return;

  toast.custom(
    (t) => (
      <div
        onClick={() => toast.remove(t.id)}
        className={`${
          t.visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
        } transition-all duration-300 ease-in-out max-w-sm w-full bg-white shadow-2xl rounded-xl pointer-events-auto flex cursor-pointer border border-orange-200 relative z-[9999]`}
      >
        <div className="flex-1 p-4">
          <div className="flex items-center gap-3">
            <div className="bg-green-100 p-2 rounded-full">
              <span className="text-green-600 text-lg">✓</span>
            </div>
            <div className="flex flex-col">
              <p className="text-sm font-black text-orange-950 uppercase tracking-tighter">
                Payment Successful
              </p>
              <p className="text-[11px] text-orange-900/70 font-medium">
                Wait for your order to be ready
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center pr-4 border-l border-orange-50 ml-2">
          <span className="text-orange-300 text-xs font-bold">✕</span>
        </div>
      </div>
    ),
    { position: 'top-center', duration: 4000 }
  );

  clearCartOnServer(); 
};

  return (
    <div className="pt-10 pb-20 min-h-screen bg-[#f2eccc] px-4 md:px-10 lg:px-20">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl md:text-5xl font-bold uppercase font-oswald text-orange-950">Your Order</h1>
          <Link to="/menu" className="hidden md:block text-orange-900 font-semibold hover:underline">
            ← Continue Shopping
          </Link>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl mb-6 font-oswald text-orange-900/60">Your cart is feeling a bit light.</p>
            <Link to="/menu" className="bg-orange-950 text-white px-8 py-3 rounded-full uppercase tracking-widest text-sm hover:bg-orange-900 transition-all">
              Start Ordering
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Table Header (PC only) */}
            <div className="hidden lg:grid grid-cols-4 pb-4 border-b border-orange-950/20 font-oswald uppercase text-gray-500 text-sm">
              <span className="col-span-2">Product</span>
              <span className="text-center">Quantity</span>
              <span className="text-right">Total</span>
            </div>

            {items.map(item => {
              const currentId = item.product_id || item.id;

              // --- IMAGE LOGIC START ---
              // 1. Check both possible DB keys (image_url or image)
              let path = item.image_url || item.image;

              // 2. Force .png extension if path exists
              if (path) {
                path = path.replace(/\.[^/.]+$/, "") + ".png";
              }

              // 3. Combine with Base URL and ensure slash exists
              const fullImageSrc = path 
                ? `${API_BASE_URL}${path.startsWith('/') ? '' : '/'}${path}`
                : '';
              // --- IMAGE LOGIC END ---

              return (
                <div key={currentId} className='bg-white/30 backdrop-blur-sm rounded-xl p-4 lg:p-0 lg:bg-transparent lg:rounded-none border-b border-black/10 flex flex-col lg:grid lg:grid-cols-4 lg:items-center gap-4'>

                  {/* Product Info */}
                  <div className='flex gap-4 items-center lg:col-span-2'>
                    <img
                      src={fullImageSrc}
                      alt={item.title}
                      className="w-24 h-24 lg:w-32 lg:h-32 object-contain rounded-lg  p-2"
                      onError={(e) => console.log("Failed to load PNG at:", e.target.src)}
                    />
                    <div className="flex flex-col">
                      <span className='uppercase font-bold text-lg lg:text-2xl font-oswald text-orange-950'>{item.title}</span>
                      <span className="text-orange-900/60 font-medium">${Number(item.price).toFixed(2)} each</span>
                      <button 
                        onClick={() => handleDeleteItem(currentId)}
                        className="lg:hidden text-left text-red-600 text-xs font-bold uppercase mt-2 active:scale-95"
                      >
                        Remove Item
                      </button>
                    </div>
                  </div>

                  {/* Quantity Control */}
                  <div className='flex justify-between items-center lg:justify-center bg-white/50 lg:bg-transparent p-3 lg:p-0 rounded-lg'>
                    <span className="lg:hidden font-bold uppercase text-xs text-gray-500">Quantity</span>
                    <QuantityControl
                      initialQty={item.quantity}
                      onQtyChange={(newQty) => handleUpdateQuantity(currentId, newQty)}
                    />
                  </div>

                  {/* Subtotal & Desktop Remove */}
                  <div className="flex justify-between lg:flex-col lg:justify-center items-center lg:items-end">
                    <span className="lg:hidden font-bold uppercase text-xs text-gray-500">Subtotal</span>
                    <div className="text-right">
                      <span className='font-oswald text-xl lg:text-2xl font-bold text-orange-950'>
                        ${(Number(item.price) * item.quantity).toFixed(2)}
                      </span>
                      <button 
                        onClick={() => handleDeleteItem(currentId)}
                        className="hidden lg:block text-red-600 hover:text-red-800 text-xs font-bold uppercase tracking-tighter mt-1 transition-colors"
                      >
                        Remove Item
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Total Section */}
            <div className="mt-10 border-t-2 border-orange-950 pt-8 flex flex-col items-end">
              <div className="w-full lg:w-1/3 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-oswald uppercase text-gray-600">Subtotal</span>
                  <span className="font-oswald text-xl font-bold">${calculateTotal()}</span>
                </div>
                <div className="flex justify-between items-center border-b border-black/10 pb-4">
                  <span className="font-oswald uppercase text-gray-600">Delivery</span>
                  <span className="font-oswald text-green-700 font-bold uppercase text-xs">Free</span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="font-oswald uppercase text-2xl font-black text-orange-950">Total</span>
                  <span className="font-oswald text-3xl font-black text-orange-950">${calculateTotal()}</span>
                </div>
                <button className="w-full bg-orange-950 text-white py-4 rounded-full
                 font-bold uppercase tracking-widest hover:bg-orange-900 transition-colors
                  shadow-lg active:scale-95" onClick={() =>handleCheckout()}>
                  Checkout Now
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}