import { useState } from "react";


const sizes = ["12 fl oz", "16 fl oz", "24 fl oz"];

export default function DrinkSizes() {
  const [activeSize, setActiveSize] = useState("16 fl oz");

  return (
    <div className="relative flex bg-gray-100 p-1 rounded-full w-fit">
      {/* Active background */}
      <div
        className="absolute top-1 bottom-1 rounded-full bg-black transition-all duration-300"
        style={{
          width: "110px",
          transform: `translateX(${sizes.indexOf(activeSize) * 110}px)`
        }}
      />

      {sizes.map((size) => (
        <button
          key={size}
          onClick={() => setActiveSize(size)}
          className={`relative z-10 px-6 py-2 w-[110px] text-sm font-medium transition-colors 
            ${
              activeSize === size ? "text-white" : "text-black"
            }`}
        >
          {size}
        </button>
      ))}
    </div>
  );
}