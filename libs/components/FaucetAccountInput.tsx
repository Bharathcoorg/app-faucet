import { useEffect, FC } from "react";
import { css } from "@emotion/react";
import { AccountIdenticon } from "@/libs/components";
import { InputAdornment, TextField } from "@mui/material";
import { useFaucet } from "@/libs/providers/FaucetProvider";
import useAddressValidation from "@/libs/hooks/useAddressValidation";
import { useMetaMaskExtension } from "@/libs/providers/MetaMaskExtensionProvider";
import { isEthereumAddress } from "@/libs/utils";

const FaucetAccountInput: FC = () => {
	const { address, setAddress, addressType, setAddressType } = useFaucet();
	const { inputRef } = useAddressValidation(address, addressType);

	useEffect(() => {
		if (!address) return setAddressType(null);
		if (isEthereumAddress(address)) return setAddressType("Ethereum");
		setAddressType("Edgeware");
	}, [address, setAddressType, setAddress]);

	return (
		<TextField
			multiline={true}
			type="text"
			css={styles.root}
			value={address}
			inputRef={inputRef}
			required
			placeholder={"Enter a Edgeware or EVM address"}
			onChange={(e) => setAddress(e.target.value)}
			InputProps={{
				startAdornment: (
					<InputAdornment position="start" css={styles.adornment}>
						<AccountIdenticon value={address} fadeOnChange={true} />
					</InputAdornment>
				),
			}}
		/>
	);
};

export default FaucetAccountInput;

const styles = {
	root: css`
		width: 100%;
	`,

	adornment: css`
		margin-right: 0;
		> div {
			margin-right: 0.5em !important;
		}
	`,
};
