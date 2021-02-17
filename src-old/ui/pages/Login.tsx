import React, { useState, useEffect, useRef } from "react";

import { Text, View, Button, useEventHandler, LineEdit } from "@nodegui/react-nodegui";
import { useHistory } from "react-router";
import { QPushButtonSignals } from "@nodegui/nodegui";

import backends from "../../backends/backends";

export default function Login() {
	const [error, setError] = useState("");

	let loginField = "";
	let passwordField = "";

	const history = useHistory();
	const handler = useEventHandler<QPushButtonSignals>(
		{
			"clicked": () => {
				// @ts-ignore
				backends.getBackend("matrix")?.login(loginField, passwordField, "").then((info) => {
					if (!info.status) {
						setError(`Error: ${info.message}`);
						return;
					}

					history.push("/home");
				});
			}
		},
		[]
	);

	useEffect(() => {
		backends.getBackend("matrix")?.isLoggedIn().then((isLogged) => {
			if(isLogged) {
				history.push("/home");
			}
		});
	}, []);

	return (
		<View style={homeStyle}>
			<View style={loginContainerStyle}>
				<Text style={loginTextStyle}>Log in</Text>
				<LineEdit on={{textChanged: (textVal) => {loginField = textVal}}} placeholderText="@username:server.tld" />
				<LineEdit on={{textChanged: (textVal) => {passwordField = textVal}}} placeholderText="password" />
				<Button text="Log in" on={handler} />
				{error != "" ? <Text style={errorStyle}>{error}</Text> : null}
			</View>
		</View>
	);
}

const homeStyle = `
	flex-direction: row;
	flex: 1;
	background-image: url("assets/pexels-dids-3530102.jpg");
	background-repeat: no-repeat;
	background-position: center;
	align-items: "center";
	padding-left: 60px;
`

const loginContainerStyle = `
	background-color: #34363C;
	padding: 6px;
	height: 200px;
	width: 200px;
	border-radius: 6px;
	justify-content: "center";
`;

const loginTextStyle = `
	color: white;
	font-weight: bold;
	font-size: 24px;
	margin-bottom: 12px;
`;

const errorStyle = `
	margin-top: 6px;
	color: red;
	font-weight: bold;
`