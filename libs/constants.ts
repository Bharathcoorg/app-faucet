import { EDGToken, MetamaskNetworks } from "@/libs/types";

export const SUPPORTED_TOKENS: EDGToken[] = [
	{
		symbol: "EDG",
		assetId: 0,
		logo: "cennz.svg",
		decimals: 18,
	},
	{
		symbol: "KAB",
		assetId: 0,
		logo: "cpay.svg",
		decimals: 18,
	},
];

export const NEXTAUTH_SECRET: string = String(process.env.NEXTAUTH_SECRET);

export const TWITTER_ID: string = String(process.env.TWITTER_ID);

export const TWITTER_SECRET: string = String(process.env.TWITTER_SECRET);

export const ENDOWED_ACCOUNT_SEEDS: string[] = String(
	process.env.ENDOWED_ACCOUNT_SEEDS
).split(",");

export const TRANSFER_AMOUNT: number = Number(
	process.env.NEXT_PUBLIC_TRANSFER_AMOUNT
);

export const CENNZNET_NIKAU_API_URL: string = String(
	process.env.NEXT_PUBLIC_EDGEVERSE_BERESHEET_API_URL
);

export const CENNZNET_RATA_API_URL: string = String(
	process.env.NEXT_PUBLIC_EDGEVERSE_SOUPCAN_API_URL
);

export const REDIS_URL: string = String(process.env.REDIS_URL);

export const GA_ID: string = process.env.NEXT_PUBLIC_GA_ID;

export const NETWORKS: MetamaskNetworks = {
	Nikau: {
		blockExplorerUrl: "https://edgscan.live",
		chainId: "0x7e6",
		chainName: "Edgeware EVM",
		rpcUrl: "https://edgeware.api.onfinality.io/public",
	},
};

export const EDG_IPFS: string =
	"https://gateway.pinata.cloud/ipfs/QmehPHqUocYho8FLC2Hs9EgU4vgm698br6RwMEddw1m9VD";

export const KAB_IPFS: string =
	"https://gateway.pinata.cloud/ipfs/QmfDkgrhCFfVJErVVDuU7UYasYsooXMEXFhBzLMNm6pgey";

export const APP_VERSION: string = process.env.APP_VERSION;

export const COMMIT_SHA: string = process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA;
