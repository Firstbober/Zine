import { createSignal } from "solid-js";

import style_Category from "./Category.module.css";
import icon_chevronDown from "/assets/icons/chevron-down.svg";

const Category = ({ title, children }: any) => {
	const [closed, close] = createSignal(false);

	return (
		<div class={style_Category.category}>
			<header class={style_Category.header} onClick={() => { close(!closed()) }}>
				<div class={closed() ? style_Category.hidden : ""}>
					<img src={icon_chevronDown} />
				</div>
				<span>{title.toUpperCase()}</span>
			</header>
			<div class={`${style_Category.content} ${closed() ? style_Category.hidden : ""}`}>
				{children}
			</div>
		</div>
	)
};

export default Category;