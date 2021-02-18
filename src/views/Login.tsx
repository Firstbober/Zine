import style from "./Login.module.css";
import { createSignal } from "solid-js";

const backgroundImage = require(`../../assets/login/backgrounds/${Math.floor(Math.random() * (7 - 0)) + 1}.webp`);

import iconDns from "../../assets/icons/dns.svg";
import matrixIcon from "../../assets/icons/matrix.svg";

import Dialog from "../components/login/dialog";

function LoginView() {
	const [canContinue, setContinuePossibility] = createSignal(false);

	return (
		<div
			class={`view ${style.loginview}`}
			style={`background-image: url(${backgroundImage})`}
		>
			<Dialog
				headerIcon={iconDns}
				headerText="Chat network"
				headerDesc="Select chat network you want to use"
			>
				<div class={style["network-select"]}>
					<div class={`${style.option} ${style.selected}`} >
						<img src={matrixIcon} />
						<span>Matrix</span>
					</div>
				</div>
				<div class={style["network-options"]}>
					<input type="text" placeholder="Homeserver URL" onInput={(ev: any) => {
						setContinuePossibility(ev.target.value.length > 0);
					}} />
				</div>
				<div class={style.continue}>
					<button class={`${style.next} ${canContinue() ? `` : style["btn-disabled"]}`}>Next</button>
				</div>
			</Dialog>
		</div>
	);
}

/*
<span class="error">some error</span>

const telegramIcon = require("../../public/icons/telegram.svg");
<div class="option">
	<img src={telegramIcon} />
	<span>Telegram</span>
</div>
*/

export default LoginView;
