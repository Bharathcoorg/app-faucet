import { decodeAddress, encodeAddress } from "@polkadot/keyring";
import { hexToU8a, isHex } from "@polkadot/util";

export default function isEDGAddress(address: string): boolean {
	try {
		encodeAddress(isHex(address) ? hexToU8a(address) : decodeAddress(address));
		return true;
	} catch (error) {
		return false;
	}
}
