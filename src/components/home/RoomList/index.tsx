import style from "./RoomList.module.css";
import { onMount } from "solid-js";

import UserInfo from "./UserInfo";
import Category from "./Category";
import Room from "./Room";

import icon_nature_people from "/assets/icons/nature-people.svg";
const NoRooms = ({ text, iconUrl }: any) => {
	return (
		<div class={style["no-rooms"]}>
			<img src={iconUrl} />
			<span>{text}</span>
		</div>
	)
};

import icon_magnify from "/assets/icons/magnify.svg";
const RoomList = () => {
	onMount(() => {
		if (window.navigator.appVersion.includes("AppleWebKit")) {
			let animFrameId = window.requestAnimationFrame(() => {
				let found = document.getElementsByClassName("simplebar-content-wrapper");
				for (let index = 0; index < found.length; index++) {
					let item: any = found[index];
					item.classList.add("simplebar-webkit-content-wrapper-override");
					item.classList.remove("simplebar-content-wrapper");
				}

				window.cancelAnimationFrame(animFrameId);
			});
		}
	});

	return (
		<div class={style.RoomList}>
			<div class={style["room-container"]}>
				<div class={style["search-area"]}>
					<input type="text" placeholder="Search conversations" />
					<div>
						<img src={icon_magnify} />
					</div>
				</div>
				<div class={style.scroll} data-simplebar>
					<div class={style["scroll-container"]}>
						<Category title="Rooms">
							<Room
								avatarUrl="https://gacko.pl/_matrix/media/r0/download/gacko.pl/xubIlQAcsRyqYCnEjmcCfUht"
								title="Test room 1"
								isPublic={true}
							/>
							<Room
								avatarUrl="https://gacko.pl/_matrix/media/r0/download/gacko.pl/wGRTUJEmQDLtLGAWLQDfvwHZ"
								title="Test room 1"
								activity="busy"
							/>
							<Room
								avatarUrl="https://gacko.pl/_matrix/media/r0/download/gacko.pl/AaUsOUbTqGHEombamfBEYIlC"
								title="Test room 1"
								activity="online"
							/>
							<Room
								avatarUrl="https://gacko.pl/_matrix/media/r0/download/gacko.pl/wGRTUJEmQDLtLGAWLQDfvwHZ"
								title="Test room 1"
							/>
							<Room
								avatarUrl="https://gacko.pl/_matrix/media/r0/download/gacko.pl/wGRTUJEmQDLtLGAWLQDfvwHZ"
								title="Test room 1"
								activity="unavailable"
							/>
							<Room
								avatarUrl="https://gacko.pl/_matrix/media/r0/download/gacko.pl/AaUsOUbTqGHEombamfBEYIlC"
								title="Test room 1"
								activity="offline"
							/>
						</Category>
					</div>
				</div>
			</div>
			<UserInfo />
		</div>
	)
};

/*
				
*/

export default RoomList;