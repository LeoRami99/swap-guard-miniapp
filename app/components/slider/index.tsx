"use client";
import { useState } from "react";
import { PERCENTAGE_SLIDER } from "@/app/const";

const useSLider = () => {
  const [percentage, setPercentage] = useState(0);
  const SliderComponent = () => {
    return (
      <div>
        <input
          type="range"
          min={PERCENTAGE_SLIDER.min}
          max={PERCENTAGE_SLIDER.max}
          value={percentage}
          onChange={(e) => setPercentage(Number(e.target.value))}
          className="range range-success"
        />
        <h2>
          Selected percentage: <span className="font-bold">{percentage}%</span>
        </h2>
      </div>
    );
  };

  return { percentage, SliderComponent, setPercentage };
};

export default useSLider;
