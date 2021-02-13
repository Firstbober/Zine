/*
import { Renderer } from "@nodegui/react-nodegui";
import React from "react";
import App from "./ui/app";

process.title = "Zine";
Renderer.render(<App />);

// This is for hot reloading (this will be stripped off in production by webpack)
if (module.hot) {
	module.hot.accept(["./ui/app"], function() {
		Renderer.forceUpdate();
	});
}
*/

import Backends from "./backends/backends";
const backends = new Backends();

// Remove before commit

backends.getBackend("matrix")?.isLoggedIn().then((isLogged) => {
	if (isLogged) {
		console.log("Logged in from last session");

		backends.getBackend("matrix")?.synchronize();

		backends.getBackend("matrix")?.getRooms().then((rooms) => {
			console.log(rooms);
		});
	} else {
		backends.getBackend("matrix")?.login("REDACTED", "REDACTED", "").then((info) => {
			if (!info.status) {
				console.error("Error:", info.message);
				return;
			}

			console.log("Logged in from new session");
		});
	}
});