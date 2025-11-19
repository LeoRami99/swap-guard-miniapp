import { getCurrentEthPrice } from "@/app/services/current.coins";
import { useQuery } from "@tanstack/react-query";

export const useGetPriceETH = () => {
  return useQuery({
    queryKey: ["get-eht-price"],
    queryFn: () => getCurrentEthPrice(),
    retry: 1,
  });
};
