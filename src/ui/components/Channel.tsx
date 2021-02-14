import React from "react";
import { View, Text, Button, useEventHandler } from "@nodegui/react-nodegui";
import { QIcon, QSize } from "@nodegui/nodegui";

export default function Channel(props: any) {
	let channelAvatar = new QIcon(props.avatarUrl);

	return (
		<Button style={style} text={props.roomName} icon={channelAvatar} on={props.on} iconSize={new QSize(32, 32)} />
	);
}

const style = `
	height: 44px;
	margin-bottom: 4px;
`;