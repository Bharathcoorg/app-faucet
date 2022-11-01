import { NETWORKS } from "@/libs/constants";
import { MetaMaskInpageProvider } from "@metamask/providers";
import { EdgewareNetwork } from "@/libs/types";

export default async function addEDGToMetaMask(
	extension: MetaMaskInpageProvider,
	network: EdgewareNetwork
) {
	try {
		await extension.request({
			method: "wallet_switchEthereumChain",
			params: [{ chainId: NETWORKS[network].chainId }],
		});
	} catch (error) {
		if (error.code !== 4902) throw error;

		await extension.request({
			method: "wallet_addEthereumChain",
			params: [
				{
					chainId: NETWORKS[network].chainId,
					blockExplorerUrls: [NETWORKS[network].blockExplorerUrl],
					chainName: NETWORKS[network].chainName,
					nativeCurrency: {
						name: "EDG",
						symbol: "EDG",
						decimals: 18,
					},
					rpcUrls: [NETWORKS[network].rpcUrl],
				},
			],
		});
	}
}
