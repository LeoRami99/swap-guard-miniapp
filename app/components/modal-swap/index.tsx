'use client';

import Modal from "@/app/components/modal";
import { TOKENS } from "@/app/const/token";
import { ISwapGuardSubscription } from "@/app/types/swap.types";

const mockSwapSubscription: ISwapGuardSubscription = {
	address: "0x3A9cF15B29d42Af4985c7407d9b7C0418d32F18C",
	tokenFrom: TOKENS.ETH.address,
	tokenTo: TOKENS.USDC.address,
	hourToSendNotification: 6,
	amountToSubscribe: 1500,
	chatIdTelegram: "@swapguard_preview_bot",
	percentageOfSwap: 35,
};

const mockSwapMetrics = {
	ethAmount: 0.42,
	usdcAmount: 1353.6,
	conversionRate: 3223.9,
	estimatedGasUSD: 3.12,
	nextExecution: "Today at 18:00 UTC",
};

const mockSwapExecution = {
	txHash: "0x9f45cc2e0bae7f26e93e0d6945f3b76cd957cd3b7ff16dea8d1c5f5e3545a7ab",
	executedAt: "Today at 18:02 UTC",
	status: "Simulated success",
	slippage: "0.15%",
	settlementVenue: "Swap Guard router",
};

const tokenFrom = Object.values(TOKENS).find((token) => token.address === mockSwapSubscription.tokenFrom) ?? TOKENS.ETH;
const tokenTo = Object.values(TOKENS).find((token) => token.address === mockSwapSubscription.tokenTo) ?? TOKENS.USDC;

type ModalSwapPreviewProps = {
	wallet?: string | null;
	onSimulateConfirmation: () => void;
};

type ModalSwapConfirmationProps = {
	wallet?: string | null;
	onBackToPreview: () => void;
	onClose: () => void;
};

export const ModalSwapPreview = ({ wallet, onSimulateConfirmation }: ModalSwapPreviewProps) => {
	const walletAddress = wallet || mockSwapSubscription.address;
	return (
		<Modal id='modal-swap-preview'>
			<div className='mb-4 text-center'>
				<p className='text-xs uppercase tracking-wide text-primary/70'>Mock data</p>
				<h3 className='text-2xl font-bold text-base-content'>Swap preview</h3>
				<p className='text-sm text-base-content/70'>This modal displays a mocked subscription to visualize the flow.</p>
			</div>

			<div className='rounded-2xl bg-base-200/60 p-4'>
				<p className='text-sm text-base-content/60'>Wallet</p>
				<p className='font-mono text-sm truncate'>{walletAddress}</p>
			</div>

			<div className='mt-4 grid gap-4 rounded-2xl border border-primary/30 p-4 md:grid-cols-2'>
				<div className='flex flex-col gap-2 rounded-2xl bg-base-100 p-3 shadow-sm'>
					<span className='text-xs uppercase tracking-wide text-base-content/60'>From</span>
					<div className='flex items-center gap-3'>
						<img src={tokenFrom.logo} alt={tokenFrom.symbol} className='h-10 w-10 rounded-full' />
						<div>
							<p className='text-sm font-semibold'>{tokenFrom.name}</p>
							<p className='text-xs text-base-content/60'>{tokenFrom.symbol}</p>
						</div>
						<div className='ml-auto text-right'>
							<p className='text-xl font-bold'>{mockSwapMetrics.ethAmount} ETH</p>
							<p className='text-xs text-base-content/60'>35% of balance</p>
						</div>
					</div>
				</div>
				<div className='flex flex-col gap-2 rounded-2xl bg-base-100 p-3 shadow-sm'>
					<span className='text-xs uppercase tracking-wide text-base-content/60'>To</span>
					<div className='flex items-center gap-3'>
						<img src={tokenTo.logo} alt={tokenTo.symbol} className='h-10 w-10 rounded-full' />
						<div>
							<p className='text-sm font-semibold'>{tokenTo.name}</p>
							<p className='text-xs text-base-content/60'>{tokenTo.symbol}</p>
						</div>
						<div className='ml-auto text-right'>
							<p className='text-xl font-bold'>{mockSwapMetrics.usdcAmount.toLocaleString()} USDC</p>
							<p className='text-xs text-base-content/60'>@ ${mockSwapMetrics.conversionRate.toLocaleString()}</p>
						</div>
					</div>
				</div>
			</div>

			<div className='mt-4 grid gap-3 rounded-2xl bg-base-200/60 p-4 text-sm'>
				<div className='flex items-center justify-between'>
					<span className='text-base-content/60'>Telegram</span>
					<span className='font-semibold'>{mockSwapSubscription.chatIdTelegram}</span>
				</div>
				<div className='flex items-center justify-between'>
					<span className='text-base-content/60'>Notification lead time</span>
					<span className='font-semibold'>{mockSwapSubscription.hourToSendNotification} hours</span>
				</div>
				<div className='flex items-center justify-between'>
					<span className='text-base-content/60'>Estimated gas</span>
					<span className='font-semibold'>${mockSwapMetrics.estimatedGasUSD.toFixed(2)}</span>
				</div>
				<div className='flex items-center justify-between'>
					<span className='text-base-content/60'>Next execution</span>
					<span className='font-semibold'>{mockSwapMetrics.nextExecution}</span>
				</div>
				<div className='flex items-center justify-between'>
					<span className='text-base-content/60'>Amount allocated</span>
					<span className='font-semibold'>
						${mockSwapSubscription.amountToSubscribe.toLocaleString()} / {mockSwapSubscription.percentageOfSwap}%
					</span>
				</div>
			</div>

			<div className='mt-6 flex flex-col gap-3 md:flex-row'>
				<a
					className='btn btn-outline btn-primary w-full rounded-2xl'
					href={`https://t.me/swapguard_bot?text=/start ${walletAddress}`}
					target='_blank'
					rel='noopener noreferrer'>
					Open Telegram Bot
				</a>
				<button className='btn btn-primary w-full rounded-2xl' onClick={onSimulateConfirmation}>
					Simulate confirmation
				</button>
			</div>
		</Modal>
	);
};

export const ModalSwapConfirmation = ({ wallet, onBackToPreview, onClose }: ModalSwapConfirmationProps) => {
	const walletAddress = wallet || mockSwapSubscription.address;
	return (
		<Modal id='modal-swap-confirmation'>
			<div className='mb-4 text-center'>
				<p className='text-xs uppercase tracking-wide text-success/70'>{mockSwapExecution.status}</p>
				<h3 className='text-2xl font-bold text-base-content'>Swap sale simulated</h3>
				<p className='text-sm text-base-content/70'>
					{mockSwapMetrics.ethAmount} {tokenFrom.symbol} sold for {mockSwapMetrics.usdcAmount.toLocaleString()} {tokenTo.symbol}.
				</p>
			</div>

			<div className='rounded-2xl border border-success/30 bg-base-100 p-4 shadow-sm'>
				<div className='flex items-center justify-between pb-3'>
					<div className='flex items-center gap-3'>
						<img src={tokenFrom.logo} alt={tokenFrom.symbol} className='h-10 w-10 rounded-full' />
						<div>
							<p className='text-sm font-semibold'>{tokenFrom.name}</p>
							<p className='text-xs text-base-content/60'>{tokenFrom.symbol}</p>
						</div>
					</div>
					<div className='text-right'>
						<p className='text-lg font-bold text-error'>-{mockSwapMetrics.ethAmount} {tokenFrom.symbol}</p>
						<p className='text-xs text-base-content/60'>Sale amount</p>
					</div>
				</div>
				<div className='flex items-center justify-between border-t border-dashed border-base-200 pt-3'>
					<div className='flex items-center gap-3'>
						<img src={tokenTo.logo} alt={tokenTo.symbol} className='h-10 w-10 rounded-full' />
						<div>
							<p className='text-sm font-semibold'>{tokenTo.name}</p>
							<p className='text-xs text-base-content/60'>{tokenTo.symbol}</p>
						</div>
					</div>
					<div className='text-right'>
						<p className='text-lg font-bold text-success'>+{mockSwapMetrics.usdcAmount.toLocaleString()} {tokenTo.symbol}</p>
						<p className='text-xs text-base-content/60'>Converted at ${mockSwapMetrics.conversionRate.toLocaleString()}</p>
					</div>
				</div>
			</div>

			<div className='mt-4 grid gap-3 rounded-2xl bg-base-200/60 p-4 text-sm'>
				<div className='flex items-center justify-between'>
					<span className='text-base-content/60'>Wallet</span>
					<span className='font-mono text-xs'>{walletAddress}</span>
				</div>
				<div className='flex items-center justify-between'>
					<span className='text-base-content/60'>Execution time</span>
					<span className='font-semibold'>{mockSwapExecution.executedAt}</span>
				</div>
				<div className='flex items-center justify-between'>
					<span className='text-base-content/60'>Route</span>
					<span className='font-semibold'>{mockSwapExecution.settlementVenue}</span>
				</div>
				<div className='flex items-center justify-between'>
					<span className='text-base-content/60'>Slippage</span>
					<span className='font-semibold'>{mockSwapExecution.slippage}</span>
				</div>
				<div className='flex flex-col gap-1'>
					<span className='text-base-content/60'>Tx hash</span>
					<span className='font-mono text-xs break-words'>{mockSwapExecution.txHash}</span>
				</div>
			</div>

			<div className='mt-6 flex flex-col gap-3 md:flex-row'>
				<button className='btn btn-outline w-full rounded-2xl' onClick={onBackToPreview}>
					Back to preview
				</button>
				<button className='btn btn-primary w-full rounded-2xl' onClick={onClose}>
					Close
				</button>
			</div>
		</Modal>
	);
};

export default ModalSwapPreview;
