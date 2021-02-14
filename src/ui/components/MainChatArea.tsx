import React, { useState, useEffect } from "react";
import { View, Image, Text, ScrollArea } from "@nodegui/react-nodegui";
import { AspectRatioMode } from "@nodegui/nodegui";

import backends from "../../backends/backends";

export default function MainChatArea() {
	const [room, setRoom]: [any, Function] = useState(undefined);
	const [messages, setMessages]: [any, Function] = useState([]);

	useEffect(() => {
		backends.eventEmmiter.on("onCurrentRoomChange", (roomId) => {
			console.log("Changed room to", roomId);
			backends.currentBackend?.getRooms().then((rooms) => {
				rooms.forEach((rm: any) => {
					if (rm.id == roomId) {
						setRoom(rm);
					}
				});
			});
		});

		setInterval(() => {
			if (backends.currentRoom != undefined) {
				backends.currentBackend?.getMessagesInRoom(backends.currentRoom).then((msgs) => {
					if(messages != undefined) {
						setMessages(msgs);
					}
				});
			}
		}, 500);
	}, []);

	return (
		<View style={topChatStyle}>
			<View style={headerStyle}>
				<View style={chatAreaHeaderStyle}>
					{backends.currentRoom != undefined ? (
						<View>
							<View style={chatHeaderImageStyle + `background-image: url("assets/routes.gif");`}></View>
							<Text style={`font-size: 18px; color: white; font-weight: bold; margin-left: 4px`}>{room?.name}</Text>
							<Text style={`font-size: 18px; color: gray; margin-left: 2px; margin-right: 4px;`}>|</Text>
							<Text style={`color: gray;`}>{room?.topic}</Text>
						</View>
					) : null}
				</View>
				<View style={userAreaHeaderStyle}></View>
			</View>
			<View style={chatSplitStyle}>
				<View style={chatAreaStyle}>
					<ScrollArea style={chatAreaScrollStyle}>
						<View style={chatAreaScrollViewStyle}>
						{
							messages.map((msg: any, _i: any) => {
								return (<Text key={msg.id} children={`[${msg.sender}]: ${msg.content}`} />)
							})
						}
						</View>
					</ScrollArea>
				</View>
				<View style={userAreaStyle}>
						
				</View>
			</View>
		</View>
	);
}

const topChatStyle = `
	flex-direction: column;
	flex: 2;
`;

const headerStyle = `
	background-color: #26272c;
	height: 48px;

	border-top-left-radius: 6px;
	border-top-right-radius: 6px;

	margin-bottom: 4px;
	align-items: "center";
`;

const chatSplitStyle = `
	flex: 1;
	flex-direction: row;
`;

const chatAreaStyle = `
	background-color: #34363C;

	border-bottom-left-radius: 6px;
	border-bottom-right-radius: 6px;
	flex: 1;

	flex-direction: column;
`;

const userAreaStyle = `
	background-color: #42454c;
	width: 240px;
	border-bottom-left-radius: 6px;
	border-bottom-right-radius: 6px;
	margin-left: 4px;
`;

const chatAreaHeaderStyle = `
	flex: 1;
	padding-left: 6px;
	align-items: "center";
`;

const userAreaHeaderStyle = `
	width: 236px;
`

const chatHeaderImageStyle = `
	border-radius: 4px;
	width: 32px;
	height: 32px;
`;

const chatAreaScrollStyle = `
	flex: 1;
	background-color: transparent;
`;

const chatAreaScrollViewStyle = `
	background-color: transparent;
	flex-direction: column;
`;