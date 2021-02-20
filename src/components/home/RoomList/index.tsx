import style from "./RoomList.module.css";

import icon_exitToApp from "/assets/icons/exit-to-app.svg";
import icon_magnify from "/assets/icons/magnify.svg";

import icon_nature_people from "/assets/icons/nature-people.svg";
const NoFriends = () => {
	return (
		<div class={style["no-friends"]}>
			<img src={icon_nature_people} />
			<span>You have no friends</span>
		</div>
	)
};

import style_UserInfo from "./UserInfo.module.css";
const UserInfo = () => {
	return (
		<div class={style_UserInfo["user-info"]}>
			<img src="https://gacko.pl/_matrix/media/r0/download/gacko.pl/EEVCCmdzIUkcnRjuTdJOvsQh" />
			<div>
				<span title="ultra_long_nickname">ultra_long_nickname</span>
				<button title="Log out"><img src={icon_exitToApp} /></button>
			</div>
		</div>
	);
};

const Category = ({title, children}: any) => {
	return (
		<div>

		</div>
	)
}

const RoomList = () => {
	return (
		<div class={style.RoomList}>
			<div class={style["room-container"]}>
				<div class={style["search-area"]}>
					<input type="text" placeholder="Search conversations" />
					<div>
						<img src={icon_magnify} />
					</div>
				</div>
				<div class={style.scroll}>
					<NoFriends/>
				</div>
			</div>
			<UserInfo />
		</div>
	)
};

export default RoomList;