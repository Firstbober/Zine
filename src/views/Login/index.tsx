import style from "./Login.module.css";
import { createSignal } from "solid-js";

const backgroundImage = require(`/assets/login/backgrounds/${Math.floor(Math.random() * (7 - 0)) + 1}.webp`);

import icon_dns from "/assets/icons/dns.svg";
import icon_matrix from "/assets/icons/matrix.svg";
import icon_formTextboxPassword from "/assets/icons/form-textbox-password.svg";

import Dialog from "../../components/login/dialog";

function LoginView() {
	const [canContinue, setContinuePossibility] = createSignal(true);
	const [authStep, setAuthStep] = createSignal({
		type: "network.select"
	});

	let initialDialogRef: any;

	const initialDialog = () => {
		return (
			<Dialog
				headerIcon={icon_dns}
				headerText="Chat network"
				headerDesc="Select chat network you want to use"

				onRef={(ref: any) => { initialDialogRef = ref; }}
			>
				<div class={style["network-select"]}>
					<div class={`${style.option} ${style.selected}`} >
						<img src={icon_matrix} />
						<span>Matrix</span>
					</div>
				</div>
				<div class={style["network-options"]}>
					<div>
						<input type="text" class={style["general-input"]} placeholder="Homeserver URL" value="https://matrix.org" onInput={(ev: any) => {
							setContinuePossibility(ev.target.value.length > 0);
						}} />
					</div>
				</div>
				<div class={style.continue}>
					<button
						class={`${style.next} ${canContinue() ? `` : style["btn-disabled"]}`}
						onClick={() => {
							initialDialogRef.startAnimation();

							setTimeout(() => {
								initialDialogRef.fadeOut();

								setTimeout(() => {
									setAuthStep({
										type: "login.password"
									});
								}, 250);
							}, 2000);
						}}
					>
						Next
					</button>
				</div>
			</Dialog>
		);
	};

	const loginPassword_Dialog = () => {
		setContinuePossibility(true); // set to false

		return (
			<Dialog
				headerIcon={icon_formTextboxPassword}
				headerText="Authenticate"
				headerDesc="Enter username and password to continue"

				onRef={(ref: any) => { initialDialogRef = ref; }}
			>

				<div class={style["network-options"]}>
					<div>
						<input type="text" class={style["general-input"]} placeholder="Username" />
						<input type="password" class={style["general-input"]} placeholder="Password" />
					</div>
				</div>

				<div class={style.continue}>
					<button
						class={`${style.next} ${canContinue() ? `` : style["btn-disabled"]}`}
					>
						Log in
					</button>
				</div>
			</Dialog>
		);
	};

	const determinateStep = () => {
		switch (authStep().type) {
			case "network.select":
				return initialDialog();

			case "login.password":
				return loginPassword_Dialog();

			default:
				return initialDialog();
		}
	};

	return (
		<div
			class={`view ${style.loginview}`}
			style={`background-image: url(${backgroundImage})`}
		>

			{determinateStep()}

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
