import { FC } from "react";
import { css } from "@emotion/react";
import { MenuItem, Select, SelectChangeEvent, Theme } from "@mui/material";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { EdgewareNetwork } from "@/libs/types";

const BERESHEET: EdgewareNetwork = "Beresheet";
const SOUPCAN: EdgewareNetwork = "Soupcan";

interface Props {
	selectedNetwork: EdgewareNetwork;
	onNetworkChange: (event: SelectChangeEvent) => void;
}

const NetworkSelect: FC<Props> = ({ selectedNetwork, onNetworkChange }) => {
	return (
		<Select
			css={styles.root}
			value={selectedNetwork}
			onChange={onNetworkChange}
			MenuProps={{ sx: styles.selectDropdown as any }}
			IconComponent={ExpandMore}
			autoWidth={false}
		>
			{[BERESHEET, SOUPCAN].map((network) => (
				<MenuItem key={network} value={network} css={styles.selectItem}>
					{network}
				</MenuItem>
			))}
		</Select>
	);
};

export default NetworkSelect;

const styles = {
	root: css`
		width: 100%;
		height: 48px;

		.MuiSelect-select {
			display: flex;
			align-items: center;
			padding-right: 2em !important;
			font-weight: bold;
		}
	`,
	selectDropdown: ({ palette, shadows }: Theme) => css`
		.MuiPaper-root {
			border-radius: 4px;
			overflow: hidden;
			transform: translate(-1px, 1em) !important;
			box-shadow: ${shadows[1]};
			border: 1px solid ${palette.secondary.main};
		}

		.MuiMenu-list {
			padding: 0;
		}
	`,
	selectItem: css`
		display: flex;
		padding-top: 0.75em;
		padding-bottom: 0.75em;
		font-weight: bold;
	`,
};
