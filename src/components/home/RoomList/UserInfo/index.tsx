import { User } from "../../../../backend-old/backend";
import style_UserInfo from "./UserInfo.module.css";
import icon_exitToApp from "/assets/icons/exit-to-app.svg";

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

export default UserInfo;