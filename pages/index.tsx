import { FC } from "react";
import { css } from "@emotion/react";
import { Faucet } from "@/libs/components";

const Home: FC = () => {
	return (
		<div css={styles.background}>
			<div css={styles.container}>
				<Faucet />
			</div>
		</div>
	);
};

export default Home;

const styles = {
	background: css`
		background-color: #f5ecff;
		overflow: auto;
		z-index: 0;
		height: 100%;
		display: flex;
		align-items: center;
	`,

	container: css`
		margin: 0 auto;
	`,

	headerImage: css`
		width: 45%;
		display: block;
		margin-bottom: 2em;
	`,
};
