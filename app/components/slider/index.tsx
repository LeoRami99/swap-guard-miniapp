"use client";
import { useState, useCallback } from "react";
import { PERCENTAGE_SLIDER } from "@/app/const";

interface SliderProps {
	className?: string;
	showExample?: boolean;
}

const useSlider = () => {
	const [percentage, setPercentage] = useState(PERCENTAGE_SLIDER.min);

	const handlePercentageChange = useCallback((value: number) => {
		const clampedValue = Math.max(PERCENTAGE_SLIDER.min, Math.min(PERCENTAGE_SLIDER.max, value));
		setPercentage(clampedValue);
	}, []);

	const SliderComponent = ({ className = "", showExample = true }: SliderProps) => {
		return (
			<div className={`space-y-4 ${className}`}>
				<label htmlFor='percentage-slider' className='sr-only'>
					ETH percentage to convert
				</label>
				<input
					id='percentage-slider'
					type='range'
					min={PERCENTAGE_SLIDER.min}
					max={PERCENTAGE_SLIDER.max}
					value={percentage}
					onChange={(e) => handlePercentageChange(Number(e.target.value))}
					className='range range-success w-full'
					aria-label={`Select ${percentage}% of ETH to convert`}
				/>
				<div className='text-center'>
					<h2 className='text-lg'>
						Selected percentage: <span className='font-bold'>{percentage}%</span>
					</h2>
				</div>
				{showExample && (
					<small className='block text-justify text-primary'>
						Select what percentage of your ETH balance you want to convert.
						<br />
						<b>Example: 10% of 1 ETH = 0.1 ETH → USDC (depending on current price).</b>
					</small>
				)}
			</div>
		);
	};

	return {
		percentage,
		setPercentage: handlePercentageChange,
		SliderComponent,
	};
};

export default useSlider;
