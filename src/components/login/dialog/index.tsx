import style from "./style.module.css";

const Dialog = ({ headerIcon, headerText, headerDesc, children }: any) => {
	return (
		<div class={style.dialog}>
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
		</div>
	);
}

/*
			<div class="load-animation">

			</div>
*/

export default Dialog;