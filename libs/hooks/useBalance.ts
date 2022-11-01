import { useCallback } from "react";
import { useFaucet } from "@/libs/providers/FaucetProvider";
import { Balance, fetchBalance } from "@/libs/utils";
import { EDGToken } from "@/libs/types";
import { cvmToAddress } from "@cennznet/types/utils";

export default function useBalance(): (
	asset: EDGToken
) => Promise<string> {
	const { address, addressType, network } = useFaucet();

	return useCallback(
		async (asset) => {
			if (!address || !addressType || !network) return;

			const balanceRaw = await fetchBalance(
				addressType === "EDG" ? address : cvmToAddress(address),
				asset.assetId,
				network
			);

			const balance = Balance.fromApiBalance(balanceRaw, asset);

			return balance.toPretty();
		},
		[address, addressType, network]
	);
}
