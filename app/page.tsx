"use client";
import Image from "next/image";
import useSwap from "@/app/components/swap/";
import Navbar from "@/app/components/navbar";

export default function Home() {
  const { SwapComponent } = useSwap();
  return (
    <>
      <Navbar />
      <main className="relative flex min-h-screen flex-col items-center justify-center p-24">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#9fe88d6d_1px,transparent_1px),linear-gradient(to_bottom,#9fe88d6d_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#9fe88d_10%,transparent_110%)]"></div>
        <div className="absolute top-0 -z-10 h-full w-full ">
          <div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[50%] translate-y-[50%] rounded-full bg-[#9fe88d] opacity-10 blur-[80px]"></div>
        </div>
        <SwapComponent />
      </main>
    </>
  );
}
