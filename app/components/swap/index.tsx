"use client";

import useSlider from "../slider";
import { ISwapGuardSubscription } from "@/app/types/swap.types";
import { Input } from "../input";
import { TOKENS } from "@/app/const/token";
import Image from "next/image";
import { useGetPriceETH } from "@/app/hooks/useGetPriceETH";
import LogoSwapGuard from "@/app/assets/logoswapguard.png";
import useLemon from "@/app/hooks/useLemon";

import { useForm } from "react-hook-form";
import { ModalSwapConfirmation, ModalSwapPreview } from "../modal-swap";

export const Swap = () => {
	const { data: ethPrice, isLoading, isError } = useGetPriceETH();
	const { wallet } = useLemon();
	const { percentage, SliderComponent } = useSlider();

	const {
		register,
		formState: { errors },
	} = useForm<ISwapGuardSubscription>({
		mode: "all",
		defaultValues: {
			address: wallet || "",
			tokenFrom: TOKENS.ETH.address,
			tokenTo: TOKENS.USDC.address,
			hourToSendNotification: 0,
			amountToSubscribe: 0,
			chatIdTelegram: "",
			percentageOfSwap: percentage,
		},
	});

	const openModal = (id: string) => {
		const modal = document.getElementById(id) as HTMLDialogElement | null;
		modal?.showModal();
	};

	const closeModal = (id: string) => {
		const modal = document.getElementById(id) as HTMLDialogElement | null;
		modal?.close();
	};

	const handleSimulateConfirmation = () => {
		closeModal("modal-swap-preview");
		openModal("modal-swap-confirmation");
	};

	const handleBackToPreview = () => {
		closeModal("modal-swap-confirmation");
		openModal("modal-swap-preview");
	};

	const handleCloseConfirmation = () => {
		closeModal("modal-swap-confirmation");
	};

	return (
		<>
			<div className='card bg-base-100 w-96 shadow-lg border border-primary/80'>
				<div className='card-body'>
					<Image src={LogoSwapGuard} alt='Swap Guard Logo' className='w-16 h-16 mx-auto mb-2' />
					<h1 className='font-bold text-center text-2xl'>Swap Guard</h1>
					<h2 className='text-center'>Secure your crypto subscriptions with automated swaps!</h2>

					<div className='flex flex-col gap-1'>
						<label>Amount to Subscribe:</label>
						<Input
							className='input input-bordered rounded-2xl w-full'
							type='number'
							placeholder='Enter amount to subscribe'
							{...register("amountToSubscribe", { valueAsNumber: true, min: 1000, max: 10000000000, required: true })}
						/>
						{errors.amountToSubscribe && (
							<p className='text-sm text-error'>
								{errors.amountToSubscribe.type === "required"
									? "This field is required"
									: "Amount must be between 1,000 and 10,000,000,000"}
							</p>
						)}
						<div />
					</div>
					<div className='flex flex-col gap-1'>
						<label>Number of hours for send notification:</label>
						<Input
							className='input input-bordered rounded-2xl w-full'
							type='number'
							placeholder='Enter number of hours'
							{...register("hourToSendNotification", { valueAsNumber: true, min: 1, max: 23, required: true })}
						/>
						{errors.hourToSendNotification && (
							<p className='text-sm text-error'>
								{errors.hourToSendNotification.type === "required"
									? "This field is required"
									: "Number of hours must be between 1 and 23"}
							</p>
						)}
						<div />
					</div>
					<div>
						<SliderComponent />
					</div>
					<div className='border border-primary/40 p-5 rounded-2xl bg-base-100 shadow-sm'>
						<p className='text-center italic text-sm text-base-content/70 mb-3'>
							Swap Guard is only available for subscriptions of these tokens
						</p>

						{isLoading && <p className='text-sm text-center text-primary'>Loading current prices of ETH...</p>}
						{isError && <p className='text-sm text-center text-error'>Error loading current prices of ETH.</p>}
						{ethPrice && (
							<p className='mt-2 text-sm text-center'>
								<span className='opacity-70'>Current ETH Price:</span>{" "}
								<span className='font-semibold'>
									$
									{ethPrice.coins["coingecko:ethereum"].price.toLocaleString(undefined, {
										minimumFractionDigits: 2,
										maximumFractionDigits: 2,
									})}
								</span>
							</p>
						)}

						<div className='mt-4 flex items-center justify-center gap-6'>
							{/* Token From */}
							<div className='flex flex-col items-center gap-2 bg-base-200 px-5 py-3 rounded-2xl shadow-sm'>
								<img src={TOKENS.ETH.logo} alt='ETH' className='w-8 h-8 rounded-full' />
								<span className='font-semibold text-sm text-center'>
									{TOKENS.ETH.name}
									<span className='block text-xs opacity-70'>({TOKENS.ETH.symbol})</span>
								</span>
							</div>

							{/* Arrow */}
							<div className='text-base-content/60 font-medium text-sm'>→</div>

							{/* Token To */}
							<div className='flex flex-col items-center gap-2 bg-base-200 px-5 py-3 rounded-2xl shadow-sm'>
								<img src={TOKENS.USDC.logo} alt='USDC' className='w-8 h-8 rounded-full' />
								<span className='font-semibold text-sm text-center'>
									{TOKENS.USDC.name}
									<span className='block text-xs opacity-70'>({TOKENS.USDC.symbol})</span>
								</span>
							</div>
						</div>
					</div>

					<div className='card-actions'>
						<button className='btn btn-primary w-full rounded-2xl' onClick={() => openModal("modal-swap-preview")}>
							Preview mock swap
						</button>
					</div>
				</div>
			</div>
			<ModalSwapPreview wallet={wallet} onSimulateConfirmation={handleSimulateConfirmation} />
			<ModalSwapConfirmation wallet={wallet} onBackToPreview={handleBackToPreview} onClose={handleCloseConfirmation} />
		</>
	);
};

export default Swap;
