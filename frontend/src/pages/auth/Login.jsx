import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); 
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }), // Send both email and password
      });
      
      const data = await res.json();
      
      if (res.ok && data.token) {
        toast.custom((t) => (
    <div
      className={`${
        t.visible ? 'animate-enter' : 'animate-leave'
      } max-w-md w-full bg-white shadow-2xl rounded-2xl pointer-events-auto flex border border-orange-100 overflow-hidden`}
    >
      <div className="flex-1 w-0 p-4">
        <div className="flex items-center">
          <div className="flex-shrink-0 text-2xl">☕</div>
          <div className="ml-3 flex-1">
            <p className="text-sm font-bold text-orange-950 font-oswald uppercase tracking-wider">
              Welcome back, {data.username}!
            </p>
            <p className="text-xs text-orange-900/60 font-medium lowercase">
              Time for your daily dose of caffeine.
            </p>
          </div>
        </div>
      </div>
      <button
        onClick={() => toast.dismiss(t.id)}
        className="px-4 border-l border-orange-50 text-orange-300 hover:text-orange-900 font-bold uppercase text-[10px]"
      >
        Close
      </button>
    </div>
  ));
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', data.username); 
        toast.success(`Welcome back, ${data.username}!`);
        
        // Redirect back to where they came from (e.g., the Cart)
        navigate(from, { replace: true });
      } else {
        toast.error(data.error || "Login failed");
      }
    } catch (err) {
      toast.error("Network error. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f2eccc] px-4">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-sm border border-orange-100">
        <h2 className="font-oswald text-3xl mb-6 text-orange-950 uppercase font-bold text-center">Login</h2>
        
        <div className="space-y-4">
          <input 
            required
            type="email" 
            placeholder="Email Address" 
            className="w-full p-3 rounded-xl border border-orange-100 focus:outline-none focus:ring-2 focus:ring-orange-900/20 transition-all"
            onChange={(e) => setEmail(e.target.value)}
          />
          
          <input 
            required
            type="password" 
            placeholder="Password" 
            className="w-full p-3 rounded-xl border border-orange-100 focus:outline-none focus:ring-2 focus:ring-orange-900/20 transition-all"
            onChange={(e) => setPassword(e.target.value)}
          />
          
          <button className="w-full bg-orange-950 text-white py-4 rounded-full uppercase text-sm font-bold tracking-widest hover:bg-orange-900 transition-all shadow-lg active:scale-95">
            Sign In
          </button>
        </div>

        <div className="mt-8 text-center border-t border-orange-50 pt-6">
          <p className="text-orange-900/60 text-sm">Don't have an account?</p>
          <Link 
            to="/register" 
            className="text-orange-950 font-bold uppercase text-xs tracking-tighter hover:underline mt-1 block"
          >
            Create New Account
          </Link>
        </div>
      </form>
    </div>
  );
}