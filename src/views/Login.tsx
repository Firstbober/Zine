import "./Login.css";
import { createSignal } from "solid-js";

const backgroundImage = require(`../../public/login/backgrounds/${Math.floor(Math.random() * (7 - 0)) + 1}.webp`);

import iconDns from "../../public/icons/dns.svg";
import matrixIcon from "../../public/icons/matrix.svg";

function LoginView() {
	const [canContinue, setContinuePossibility] = createSignal(false);

	return (
		<div
			class="view loginview"
			style={`background-image: url(${backgroundImage})`}
		>
			<div class="login-dialog">
				<div class="header">
					<img src={iconDns} />
					<div>
						<span>Chat network</span>
						<span>Select chat network you want to use</span>
					</div>
				</div>
				<div class="content">
					<div class="network-select">
						<div class="option selected">
							<img src={matrixIcon} />
							<span>Matrix</span>
						</div>
					</div>
					<div class="network-options">
						<input type="text" placeholder="Homeserver URL" onInput={(ev: any) => {
							setContinuePossibility(ev.target.value.length > 0);
						}} />
					</div>
					<div class="continue">
						<button class={`next ${canContinue() ? `` : `btn-disabled`}`}>Next</button>
					</div>
				</div>
				<div class="load-animation">

				</div>
			</div>
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
