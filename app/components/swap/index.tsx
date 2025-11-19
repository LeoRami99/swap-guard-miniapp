import { useState } from "react";
import useSlider from "../slider";
import { ISwap } from "@/app/types/swap.types";
import { Input } from "../input";
import { TOKENS } from "@/app/const/token";
import Image from "next/image";
import { useGetPriceETH } from "@/app/hooks/useGetPriceETH";
import LogoSwapGuard from "@/app/assets/logoswapguard.png";

const useSwap = () => {
  const { data: ethPrice, isLoading, isError } = useGetPriceETH();
  const [swapData, setSwapData] = useState<ISwap | null>(null);
  const { percentage, SliderComponent, setPercentage } = useSlider();
  const [subscribe, setSubscribe] = useState(false);
  const [tokenFrom, setTokenFrom] = useState("");
  const [tokenTo, setTokenTo] = useState("");

  const [amountToSubscribe, setAmountToSubscribe] = useState<string>("");

  const SwapComponent = () => {
    return (
      <div className="card bg-base-100 w-96 shadow-lg border border-primary/80">
        <div className="card-body">
          <Image
            src={LogoSwapGuard}
            alt="Swap Guard Logo"
            className="w-16 h-16 mx-auto mb-2"
          />
          <h1 className="font-bold text-center text-2xl">Swap Guard</h1>

          <div className="flex flex-col gap-1">
            <label>Amount to Subscribe:</label>
            <Input
              className="input input-bordered"
              type="number"
              min={0}
              value={amountToSubscribe}
              onChange={(e) => setAmountToSubscribe(e.target.value)}
            />

            <div />
          </div>

          <SliderComponent />
          <div className="border border-primary/40 p-5 rounded-2xl bg-base-100 shadow-sm">
            <p className="text-center italic text-sm text-base-content/70 mb-3">
              Swap Guard is only available for subscriptions of these tokens
            </p>

            {isLoading && (
              <p className="text-sm text-center text-primary">
                Loading current prices of ETH...
              </p>
            )}
            {isError && (
              <p className="text-sm text-center text-error">
                Error loading current prices of ETH.
              </p>
            )}
            {ethPrice && (
              <p className="mt-2 text-sm text-center">
                <span className="opacity-70">Current ETH Price:</span>{" "}
                <span className="font-semibold">
                  $
                  {ethPrice.coins["coingecko:ethereum"].price.toLocaleString(
                    undefined,
                    { minimumFractionDigits: 2, maximumFractionDigits: 2 },
                  )}
                </span>
              </p>
            )}

            <div className="mt-4 flex items-center justify-center gap-6">
              {/* Token From */}
              <div className="flex flex-col items-center gap-2 bg-base-200 px-5 py-3 rounded-2xl shadow-sm">
                <img
                  src={TOKENS.ETH.logo}
                  alt="ETH"
                  className="w-8 h-8 rounded-full"
                />
                <span className="font-semibold text-sm text-center">
                  {TOKENS.ETH.name}
                  <span className="block text-xs opacity-70">
                    ({TOKENS.ETH.symbol})
                  </span>
                </span>
              </div>

              {/* Arrow */}
              <div className="text-base-content/60 font-medium text-sm">→</div>

              {/* Token To */}
              <div className="flex flex-col items-center gap-2 bg-base-200 px-5 py-3 rounded-2xl shadow-sm">
                <img
                  src={TOKENS.USDC.logo}
                  alt="USDC"
                  className="w-8 h-8 rounded-full"
                />
                <span className="font-semibold text-sm text-center">
                  {TOKENS.USDC.name}
                  <span className="block text-xs opacity-70">
                    ({TOKENS.USDC.symbol})
                  </span>
                </span>
              </div>
            </div>
          </div>

          <div className="card-actions">
            <button className="btn btn-primary w-full rounded-2xl">
              Subscribe now
            </button>
          </div>
        </div>
      </div>
    );
  };

  return {
    SwapComponent,
    amountToSubscribe,
  };
};

export default useSwap;
