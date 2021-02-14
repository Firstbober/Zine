import React, { useEffect } from "react";

import { Text, View, Button, useEventHandler } from "@nodegui/react-nodegui";

import ChannelList from "../components/ChannelList";
import MainChatArea from "../components/MainChatArea";

import backends from "../../backends/backends";

export default function Home() {
	useEffect(() => {
		backends.currentBackend?.synchronize();
		backends.currentBackend?.startSyncLoop();
	}, []);

	return (
		<View style={homeStyle}>
			<ChannelList />
			<MainChatArea />
		</View>
	);
}

const homeStyle = `
	flex-direction: row;
	flex: 1;
`