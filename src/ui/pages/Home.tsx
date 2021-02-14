import React from "react";

import { Text, View, Button, useEventHandler} from "@nodegui/react-nodegui";
import { useHistory } from "react-router";
import { QPushButtonSignals } from "@nodegui/nodegui";

import ChannelList from "../components/ChannelList";
import MainChatArea from "../components/MainChatArea";

export default function Home() {
	const history = useHistory();
	const handler = useEventHandler<QPushButtonSignals>(
		{ "clicked": () => history.push("/about") },
		[]
	);
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