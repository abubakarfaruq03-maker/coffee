import { useState, useEffect } from 'react';
import axios from 'axios';  
import { Link, Links } from 'react-router-dom';
export default function SearchModal({ isOpen, onClose }) { 
  // 1. Initialize states (They were missing in your snippet)
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  // 2. Fetch results as the user types (Debouncing)
  useEffect(() => {
    // If the modal is closed, don't do anything
    if (!isOpen) return;

    const delayDebounceFn = setTimeout(async () => {
      if (query.trim().length > 1) {
        try {
          // Use your API endpoint
          const res = await axios.get(`http://localhost:3000/api/menu/search?title=${query}`);
          setResults(res.data);
        } catch (err) {
          console.error("Search error:", err);
          setResults([]);
        }
      } else {
        setResults([]);
      }
    }, 300); // 300ms delay to prevent API spamming

    return () => clearTimeout(delayDebounceFn);
  }, [query, isOpen]);

  // 3. Early return if modal is not open
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex justify-center p-10">
      <div className="bg-white w-full max-w-2xl h-fit max-h-[80vh] rounded-lg shadow-xl overflow-hidden flex flex-col">
        
        {/* Search Header */}
        <div className="p-4 border-b flex items-center gap-4">
          <input 
            autoFocus
            className="w-full text-lg outline-none text-orange-950" 
            placeholder="Search for a drink..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button 
            onClick={() => {
              setQuery(''); // Reset query on close
              onClose();
            }} 
            className="text-gray-500 hover:text-orange-900 transition-colors"
          >
            Close
          </button>
        </div>
        
        {/* Results List */}
        <div className="overflow-y-auto max-h-[60vh]">
          {results.length > 0 ? (
            results.map(item => (
              <div 
                key={item.id} 
                className="p-4 hover:bg-orange-50 cursor-pointer flex justify-between items-center border-b transition-colors group"
                onClick={() => {
                    window.location.href = `/menu/${item.id}/${item.title.toLowerCase().replace(/\s+/g, '-')}`;
                }}
          >
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-800">{item.title}</span>
                  <span className="text-xs text-gray-400 capitalize">{item.category}</span>
                </div>
                <span className="text-orange-900 font-bold group-hover:scale-110 transition-transform">
                  ${item.price}
                </span>
              </div>
            ))
          ) : query.length > 1 ? (
            <div className="p-10 text-center text-gray-400">No drinks found matching "{query}"</div>
          ) : (
            <div className="p-10 text-center text-gray-300">Start typing to search...</div>
          )}
        </div>
      </div>
    </div>
  );
}