"use client";
import Image from "next/image";
import Navbar from "@/app/components/navbar";
import useLemon from "@/app/hooks/useLemon";
import LogoSwapGuard from "@/app/assets/logoswapguard.png";
import { Swap } from "@/app/components/swap";

export default function Home() {
	const { wallet, isLoading: isLoadingLemon, isError, isSuccess } = useLemon();
	if (isLoadingLemon) {
		return (
			<div className='flex flex-col items-center justify-center min-h-screen'>
				<Image src={LogoSwapGuard} alt='Swap Guard Logo' className='w-24 h-24 mb-4 animate-spin-slow' width={64} height={65} />
				<span className='loading loading-spinner loading-xl'></span>
				<p className='text-lg font-medium text-center'>Loading...</p>
			</div>
		);
	}

	if (isError) {
		return (
			<div className='flex flex-col items-center justify-center min-h-screen'>
				<Image src={LogoSwapGuard} alt='Swap Guard Logo' className='w-24 h-24 mb-4' width={64} height={65} />
				<p className='text-lg font-medium text-center text-red-500'>Error loading Lemon Cash wallet. Please try again.</p>
			</div>
		);
	}

	if (isSuccess)
		return (
			<>
				<Navbar />
				<main className='relative flex min-h-screen flex-col items-center justify-center p-24'>
					<div className='absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#9fe88d6d_1px,transparent_1px),linear-gradient(to_bottom,#9fe88d6d_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#9fe88d_10%,transparent_110%)]'></div>
					<div className='absolute top-0 -z-10 h-full w-full '>
						<div className='absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[50%] translate-y-[50%] rounded-full bg-[#9fe88d] opacity-10 blur-[80px]'></div>
					</div>

					{wallet ? (
						<>
							<Swap />
						</>
					) : (
						<div className='flex flex-col items-center justify-center'>
							<img src={LogoSwapGuard.src} alt='Swap Guard Logo' className='size-48 mb-4 animate-spin-slow' />
							<h1 className='text-2xl font-bold text-center text-white'>Swap Guard - Please open in Lemon Cash app</h1>
						</div>
					)}
				</main>
			</>
		);
}
