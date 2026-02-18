import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const handleRegister = async (e) => {
    e.preventDefault();
    
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      const data = await res.json();
      
      if (res.ok) {
        // Success Coffee Toast
        toast.custom((t) => (
          <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-md w-full bg-white shadow-2xl rounded-2xl pointer-events-auto flex border border-orange-100 overflow-hidden`}>
            <div className="flex-1 w-0 p-4 flex items-center">
              <div className="text-2xl">☕</div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-bold text-orange-950 font-oswald uppercase tracking-wider">
                  Welcome, {data.username || formData.username}!
                </p>
                <p className="text-xs text-orange-900/60 font-medium lowercase">
                  Start Your Day with a Perfect Cup of Coffee!
                </p>
              </div>
            </div>
            <button onClick={() => toast.dismiss(t.id)} className="px-4 border-l border-orange-50 text-orange-300 hover:text-orange-900 font-bold uppercase text-[10px]">Close</button>
          </div>
        ));
        navigate('/login');
      } else {
        // Handle "Already Registered" specific message
        if (data.error && (data.error.includes("exists") || data.error.includes("unique"))) {
          toast.error("Already registered. Try logging in instead!", {
            style: { border: '1px solid #431407', color: '#431407', fontFamily: 'Oswald' }
          });
        } else {
          toast.error(data.error || "Registration failed");
        }
      }
    } catch (err) {
      // Handles the net::ERR_CONNECTION_REFUSED
      toast.error("Server is offline. Check your internet or backend terminal.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f2eccc] px-4 font-sans">
      <form onSubmit={handleRegister} className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-sm border border-orange-100">
        <h2 className="font-oswald text-3xl mb-6 text-orange-950 uppercase font-bold text-center">Join Us</h2>
        
        <div className="space-y-4">
          <input 
            required
            type="text" 
            placeholder="Username" 
            className="w-full p-3 rounded-xl border border-orange-100 focus:outline-none focus:ring-2 focus:ring-orange-900/20 transition-all"
            onChange={(e) => setFormData({...formData, username: e.target.value})}
          />
          <input 
            required
            type="email" 
            placeholder="Email Address" 
            className="w-full p-3 rounded-xl border border-orange-100 focus:outline-none focus:ring-2 focus:ring-orange-900/20 transition-all"
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
          <input 
            required
            type="password" 
            placeholder="Create Password" 
            className="w-full p-3 rounded-xl border border-orange-100 focus:outline-none focus:ring-2 focus:ring-orange-900/20 transition-all"
            onChange={(e) => setFormData({...formData, password: e.target.value})}
          />
          <button className="w-full bg-orange-950 text-white py-4 rounded-full uppercase text-sm font-bold tracking-widest hover:bg-orange-900 transition-all shadow-lg active:scale-95">
            Create Account
          </button>
        </div>

        <div className="mt-8 text-center border-t border-orange-50 pt-6">
          <p className="text-orange-900/60 text-sm">Already have an account?</p>
          <Link to="/login" className="text-orange-950 font-bold uppercase text-xs tracking-tighter hover:underline mt-1 block">
            Login Instead
          </Link>
        </div>
      </form>
    </div>
  );
}