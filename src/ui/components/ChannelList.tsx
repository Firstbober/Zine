import React, { useState, useEffect } from "react";
import { View, Image, Text, Button, ScrollArea, useEventHandler } from "@nodegui/react-nodegui";
import { QPushButtonSignals } from "@nodegui/nodegui";
import { useHistory } from "react-router";

import Channel from "./Channel";

import backends from "../../backends/backends";

//<Image style={userInfoAvatarStyle} aspectRatioMode={AspectRatioMode.KeepAspectRatio} src="https://cdn.discordapp.com/avatars/319192366768455680/674f0ec42b951fe73accbcd0a8b56aee.png"/>

export default function ChannelList() {
	const [rooms, setRooms] = useState([]);
	const history = useHistory();

	useEffect(() => {
		if (rooms.length == 0) {
			backends.currentBackend?.getRooms().then((iRooms) => {
				setRooms(iRooms);
			});
		}
	}, []);

	return (
		<View style={style}>
			<View style={`flex-direction: column; width: 236px;`}>
				<ScrollArea style={channelContainerStyle}>
					<View style={channelContainerViewStyle}>
						{
							rooms.map((room: any, _i) => {
								return (<Channel key={room.id} roomName={room.name} on={{
									clicked: () => {backends.setCurrentRoom(room.id)}
								}} />)
							})
						}
					</View>
				</ScrollArea>
				<View style={userInfoStyle}>
					<View style={userInfoAvatarStyle}></View>
					<Text style={userInfoDisplayStyle}>Firstbober</Text>
					<Button style={userInfoSettingsStyle} on={{
						clicked: () => {
							backends.currentBackend?.logout().then(() => {
								history.push("/");
							});
						}
					}}></Button>
				</View>
			</View>
		</View>
	);
}

const style = `
	background-color: #42454c;
	border-radius: "6px";
	width: 240px;
	margin-right: "4px";
`

const channelContainerStyle = `
	flex: 1;
	background-color: transparent;
	padding: 6px;
`;

const channelContainerViewStyle = `
	background-color: transparent;
	flex-direction: column;
	padding-right: 2px;
	padding-left: 2px;
`;

const userInfoStyle = `
	flex-direction: row;
	padding: 6px;
	justify-content: "center";
	align-items: "center";
	background-color: #26272c;
	border-bottom-left-radius: 6px;
	border-bottom-right-radius: 6px;
`;

const userInfoAvatarStyle = `
	width: 32px;
	height: 32px;
	background-image: url("assets/routes.gif");
	border-radius: 4px;
`;

const userInfoDisplayStyle = `
	color: white;
	flex: 1;
	font-size: 16px;
	font-weight: bold;
	margin-left: 2px;
`;

const userInfoSettingsStyle = `
	padding: 0;
	width: 32px;
	height: 32px;
	background-image: url("assets/exit-to-app.svg");
	background-repeat: no-repeat;
	background-position: center;
`;