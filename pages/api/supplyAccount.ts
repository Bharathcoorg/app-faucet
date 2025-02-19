import type { NextApiRequest, NextApiResponse } from "next";
import { Api } from "@cennznet/api";
import { getSession } from "next-auth/react";
import {
	EDGEVERSE_BERESHEET_API_URL,
	EDGEVERSE_SOUPCAN_API_URL,
	ENDOWED_ACCOUNT_SEEDS,
	TRANSFER_AMOUNT,
} from "@/libs/constants";
import { EndowedAccounts } from "@/libs/utils";
import { fetchClaimStatus, setNewClaim } from "@/libs/utils/claimStatus";
import { EdgewareNetwork } from "@/libs/types";
import { cvmToAddress } from "@cennznet/types/utils";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { address, addressType, network, assetId } = JSON.parse(req.body);
	const EDGNetwork: EdgewareNetwork = network;

	if (!assetId)
		return res
			.status(400)
			.json({ success: false, error: "assetId param not provided" });
	if (!address)
		return res
			.status(400)
			.json({ success: false, error: "address param not provided" });
	if (!addressType)
		return res
			.status(400)
			.json({ success: false, error: "addressType param not provided" });
	if (!network)
		return res
			.status(400)
			.json({ success: false, error: "network param not provided" });

	const session = await getSession({ req });
	if (!session?.validAccount)
		return res
			.status(401)
			.json({ success: false, error: "Invalid Twitter account" });

	const EDGAddress =
		addressType === "Edgeware" ? address : cvmToAddress(address);
	const claimed = await fetchClaimStatus(EDGAddress, network, assetId);
	if (claimed)
		return res.status(400).send({ error: "Already claimed in 24h window" });

	try {
		let networkUrl: string;
		if ( EDGNetwork === "Beresheet") networkUrl = EDGEVERSE_BERESHEET_API_URL;
		else if (EDGNetwork === "Soupcan") networkUrl = EDGEVERSE_SOUPCAN_API_URL;
		const api = await Api.create({ provider: networkUrl });
		const endowedAccounts = new EndowedAccounts(api, ENDOWED_ACCOUNT_SEEDS);

		await endowedAccounts.init();
		await endowedAccounts.send(
			endowedAccounts.api.tx.genericAsset.transfer(
				assetId,
				EDGAddress,
				TRANSFER_AMOUNT
			)
		);

		await setNewClaim(EDGAddress, network, assetId);
		await api.disconnect();

		return res.status(200).json({ success: true });
	} catch (e) {
		return res.status(400).json({ success: false, error: e.message });
	}
}
