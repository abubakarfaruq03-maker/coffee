import { useState, useEffect } from "react";

export default function QuantityControl({ initialQty = 1, onQtyChange }) {
  const [qty, setQty] = useState(initialQty);

  useEffect(() => {
    setQty(initialQty);
  }, [initialQty]);

  const updateQty = (newQty) => {
    setQty(newQty);
    if (onQtyChange) onQtyChange(newQty); 
  };

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={() => qty > 1 && updateQty(qty - 1)}
        disabled={qty === 1}
        className={`px-4 py-2 rounded-full text-lg transition
          ${qty === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-orange-950 text-white hover:scale-105"}
        `}
      >
        −
      </button>

      <span className="text-xl font-semibold">{qty}</span>

      <button
        onClick={() => updateQty(qty + 1)}
        className="px-4 py-2 rounded-full text-lg bg-orange-950 text-white hover:scale-105 transition"
      >
        +
      </button>
    </div>
  );
}