import { ReactNode } from "react";

export type EdgewareNetwork = "Beresheet" | "Soupcan";

export interface EDGToken {
	symbol: string;
	assetId: number;
	logo: string;
	decimals: number;
}

export interface TxStatus {
	status: "in-progress" | "success" | "fail";
	message: ReactNode;
	balance?: string;
}

interface MetaMaskNetwork {
	blockExplorerUrl: string;
	chainId: string;
	chainName: string;
	rpcUrl: string;
}

export interface MetamaskNetworks {
	Beresheet: MetaMaskNetwork;
}

export type Chain = "Edgeware" | "Ethereum";

export interface GenericCoin {
	decimals: number;
	decimalsValue: number;
	symbol: string;
}

export interface PropsWithChildren {
	children?: ReactNode;
}

declare module "*.svg";
