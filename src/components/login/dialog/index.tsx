import style from "./style.module.css";
import { onMount } from "solid-js";

import zineLogo from "/assets/logos/zine-logo.svg"

const Dialog = ({ headerIcon, headerText, headerDesc, children, onRef}: any) => {
	let animationDiv: any;
	let topLevelDiv: any;

	onMount(() => {
		onRef({
			startAnimation,
			stopAnimation,
			fadeOut,
			fadeIn
		});
		setTimeout(() => {
			fadeIn();
		}, 150);
	});

	const startAnimation = () => {
		animationDiv.style.visibility = "visible";
		animationDiv.style.opacity = 1;
	}

	const stopAnimation = () => {
		animationDiv.style.visibility = "hidden";
		animationDiv.style.opacity = 0;
	}

	const fadeOut = () => {
		topLevelDiv.style.opacity = 0;
	}

	const fadeIn = () => {
		topLevelDiv.style.opacity = 1;
	}

	return (
		<div class={style.dialog} ref={topLevelDiv}>
			<div class={style.header}>
				<img src={headerIcon} />
				<div>
					<span>{headerText}</span>
					<span>{headerDesc}</span>
				</div>
			</div>
			<div class={style.content}>
				{children}
			</div>
			<div class={style["loading-animation"]} ref={animationDiv}>
				<img src={zineLogo} />
			</div>
		</div>
	);
}

export default Dialog;