"use client";
import React, { useState } from "react";

// Define the CounterProps interface to accept an optional onChange prop
interface CounterProps {
  onChange?: (value: number) => void;
}

export function Counter({ onChange }: CounterProps) {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount((prevCount) => {
      const newCount = prevCount + 1;
      onChange?.(newCount); // Call onChange with the new count
      return newCount;
    });
  };

  const handleDecrement = () => {
    setCount((prevCount) => {
      const newCount = Math.max(0, prevCount - 1);
      onChange?.(newCount); // Call onChange with the new count
      return newCount;
    });
  };

  return (
    <div className="w-[170px] h-[52px] bg-gray-200 text-black font-medium rounded-full text-lg flex justify-center items-center">
      <button
        onClick={handleDecrement}
        className="w-8 h-8 flex justify-center items-center text-black text-lg rounded-full">
        -
      </button>
      <span className="mx-4 text-lg">{count}</span>
      <button
        onClick={handleIncrement}
        className="w-8 h-8 flex justify-center items-center text-black text-lg rounded-full">
        +
      </button>
    </div>
  );
}
