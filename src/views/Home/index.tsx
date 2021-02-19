import style from "./Home.module.css";

import NetworkList from "../../components/home/NetworkList";

const HomeView = () => {
	return (
		<div class={`view ${style.homeview}`}>
			<div class={style.toplevel}>
				<NetworkList />
			</div>
		</div>
	)
}

export default HomeView;