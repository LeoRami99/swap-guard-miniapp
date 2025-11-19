import LogoSwapGuard from "@/app/assets/logoswapguard.png";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <img
        src={LogoSwapGuard.src}
        alt="Swap Guard Logo"
        className="w-24 h-24 mb-4 animate-spin-slow"
      />
      <span className="loading loading-spinner loading-xl"></span>
      <p className="text-lg font-medium text-center">Loading...</p>
    </div>
  );
};
export default Loading;
