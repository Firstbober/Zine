import style from "./Space.module.css";
import { For } from "solid-js";

const Space = ({ imgSrc, colors, flares, selected, newMessage, iconified }: any) => {
	if (iconified == undefined)
		iconified = false;

	if (selected == undefined)
		selected = false;

	if (colors == undefined)
		colors = [];

	console.log(colors);

	return (
		<div class={`${style.space} ${iconified ? style["icon-space"] : ""}`}>
			<div class={style["space-icon-area"]}>
				{iconified ? (
					<div class={style["icon-area"]}>
						<img src={imgSrc} />
					</div>
				) : (
						<img src={imgSrc} />
					)
				}

				<div class={style["space-icon-overlay"]}>
					<div
						class={style["overlay-space-activity"]}
					>

						<div class={
							selected ? style["space-selected"] : (
								newMessage ? style["space-new-message"] : ""
							)
						}></div>
					</div>
				</div>

				<div class={style["space-icon-overlay"]}>
					<For each={flares}>
						{(flare: any, index: any) =>
							<div
								style={
									colors[index()] != undefined
										? `background-color: ${colors[index()]}`
										: ""
								}
								class={`${style["overlay-flare"]}`}
							>
								{flare}
							</div>
						}
					</For>
				</div>
			</div>
		</div>
	);
};

export default Space;