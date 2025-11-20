export interface ISwapGuardSubscription {
	address: string;
	tokenFrom: string;
	tokenTo: string;
	hourToSendNotification: number;
	amountToSubscribe: number;
	chatIdTelegram: string;
	percentageOfSwap: number;
}
