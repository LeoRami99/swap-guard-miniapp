import { useQuery } from "@tanstack/react-query";
import { authenticate, isWebView, TransactionResult } from "@lemoncash/mini-app-sdk";

const useLemon = () => {
	const inWebView = isWebView();

	const {
		data: wallet,
		isLoading,
		isError,
		isSuccess,
		error,
		refetch,
	} = useQuery({
		queryKey: ["lemon", "wallet"],
		enabled: inWebView,
		retry: false,
		queryFn: async () => {
			const result = await authenticate();

			if (result.result !== TransactionResult.SUCCESS) {
				throw new Error("Lemon authentication failed");
			}
			return result.data.wallet as string;
		},
	});

	return {
		wallet,
		isLoading,
		isError,
		isSuccess,
		error,
		refetch,
	};
};

export default useLemon;
