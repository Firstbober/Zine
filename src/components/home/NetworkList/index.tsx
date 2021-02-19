import style from "./NetworkList.module.css";

import icon_matrix from "/assets/icons/matrix.svg";
const telegramIcon = require("/assets/icons/telegram.svg");

import icon_home_variant from "/assets/icons/home-variant.svg";
import icon_compass from "/assets/icons/compass.svg"

import Space from "./Space";

const NetworkList = () => {
	return (
		<div class={style.NetworkList}>
			<div class={style.scroll}>

				<Space
					imgSrc={icon_home_variant}
					flares={[]}
					iconified={true}
				/>

				<div class={style.classifier}></div>

				<Space
					imgSrc="https://gacko.pl/_matrix/media/r0/download/gacko.pl/AvfleryNcbjeBWnvNnZhgSTo"
					colors={["", "#0088cc"]}
					flares={["", <img src={telegramIcon} style="filter: invert(100%);" />]}
					selected={true}
				/>

				<Space
					imgSrc="https://gacko.pl/_matrix/media/r0/download/gacko.pl/bhrfNNExsNPIEkjAalSjPOOb"
					colors={["", "#fff"]}
					flares={["", <img src={icon_matrix} />]}
					newMessage={true}
				/>

				<Space
					imgSrc="https://gacko.pl/_matrix/media/r0/download/gacko.pl/WuUTNyODvtOwSRGlZZsTJMEt"
					flares={[]}
				/>

				<Space
					imgSrc="https://gacko.pl/_matrix/media/r0/download/gacko.pl/qQTTSbRgmurdcaSHkhTzULbp"
					flares={[1, 2, 3, 4]}
					newMessage={true}
				/>

				<div class={style.classifier}></div>

				<Space
					imgSrc={icon_compass}
					flares={[]}
					iconified={true}
				/>
			</div>
		</div>
	);
};

export default NetworkList;