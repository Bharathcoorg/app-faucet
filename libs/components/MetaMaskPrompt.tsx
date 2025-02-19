import { FC } from "react";
import { useFaucet } from "@/libs/providers/FaucetProvider";
import { useMetaMaskExtension } from "@/libs/providers/MetaMaskExtensionProvider";
import { addEDGTokenToMetaMask, ensureEthereumChain } from "@/libs/utils";
import { Theme } from "@mui/material";
import { css } from "@emotion/react";

interface Props {
	isEDG: boolean;
}

const MetaMaskPrompt: FC<Props> = ({ isEDG }) => {
	const { network } = useFaucet();
	const { extension } = useMetaMaskExtension();

	if (isEDG)
		return (
			<>
				Click{" "}
				<span
					css={styles.toolTipTrigger}
					onClick={() =>
						ensureEthereumChain(extension, network).then(
							addEDGTokenToMetaMask
						)
					}
				>
					here
				</span>{" "}
				to add <span css={styles.tokenSymbol}>EDG</span> to your wallet.
			</>
		);

	return (
		<>
			Click{" "}
			<span
				css={styles.toolTipTrigger}
				onClick={() => ensureEthereumChain(extension, network)}
			>
				here
			</span>{" "}
			to switch to EdgewareEVM {network} in MetaMask.
		</>
	);
};

export default MetaMaskPrompt;

const styles = {
	toolTipTrigger: ({ palette, transitions }: Theme) => css`
		color: ${palette.primary.main};
		cursor: pointer;
		display: inline-block;
		border-bottom: 2px solid transparent;
		transition: border-bottom-color ${transitions.duration.short}ms;

		&:hover {
			border-bottom-color: ${palette.primary.main};
		}
	`,

	tokenSymbol: ({ palette }: Theme) => css`
		font-family: monospace;
		display: inline-block;
		font-weight: bold;
		padding: 0.2em 0.35em;
		border: 1px solid ${palette.secondary.main};
		border-radius: 4px;
		margin: 0;
		color: ${palette.primary.main};
		font-style: normal;
	`,
};
