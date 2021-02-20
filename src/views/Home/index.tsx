import style from "./Home.module.css";

import NetworkList from "../../components/home/NetworkList";
import RoomList from "../../components/home/RoomList";

const HomeView = () => {
	return (
		<div class={`view ${style.homeview}`}>
			<div class={style.toplevel}>
				<NetworkList />
				<RoomList />
			</div>
		</div>
	)
}

export default HomeView;