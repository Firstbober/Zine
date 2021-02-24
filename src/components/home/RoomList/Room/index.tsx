import style_Room from "./Room.module.css";
import icon_dots_horizontal from "/assets/icons/dots-horizontal.svg";
import icon_earth from "/assets/icons/earth.svg";

const Room = ({ avatarUrl, title, isPublic, activity }: any) => {
	const createActivityFlare = () => {
		if(isPublic) {
			return (
				<div class={`${style_Room.flare} ${style_Room["icon-flare"]}`}>
					<img src={icon_earth} />
				</div>
			);
		}

		if(activity != undefined) {
			return (
				<div class={`${style_Room.flare} ${style_Room.activity} ${style_Room["activity-" + activity]}`}></div>
			);
		}
	};

	return (
		<div class={style_Room.Room}>
			<div class={style_Room.avatar}>
				<img src={avatarUrl} />
				<div class={style_Room["avatar-overlay"]}>
					{createActivityFlare()}
				</div>
			</div>
			<span title={title}>{title}</span>
			<div class={style_Room.settings}>
				<img src={icon_dots_horizontal} />
			</div>
		</div>
	)
};

export default Room;