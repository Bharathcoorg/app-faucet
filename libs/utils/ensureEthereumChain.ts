import { MetaMaskInpageProvider } from "@metamask/providers";
import { EdgewareNetwork } from "@/libs/types";
import { NETWORKS } from "@/libs/constants";
import { addEDGToMetaMask } from "@/libs/utils";

export default async function ensureEthereumChain(
	extension: MetaMaskInpageProvider,
	network: EdgewareNetwork
): Promise<void> {
	const ethChainId = await extension.request({ method: "eth_chainId" });

	if (ethChainId === NETWORKS[network].chainId) return;

	await addEDGToMetaMask(extension, network);
}
