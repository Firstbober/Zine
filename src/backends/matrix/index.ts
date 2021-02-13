import { expose, BooleanResponse, Storage } from "../backend";

/* Connectivity */
import axios from "axios";

/* Data storage */
const dataStorage = new Storage("matrix");

import validUrl from "valid-url";
enum Endpoints {
	WellKnown = "/.well-known/matrix/client",
	SpecVersion = "/_matrix/client/versions",
	Login = "/_matrix/client/r0/login",
	WhoAmI = "/_matrix/client/r0/account/whoami"
};

const DiscoveryErrors = {
	FAIL_PROMPT: { status: false, message: "Server discovery failed" },
	FAIL_ERROR: { status: false, message: "Discovered URL is not valid" },
	FAIL_SPEC_VER: { status: false, message: "Homeserver is not compatiable" }
};

const LoginErrors = {
	USERNAME_FORMAT: { status: false, message: "Invalid username! Please provide it in format @username:server.tld" },
	PASSWORD_EMPTY: { status: false, message: "Password is empty!" },
	RATE_LIMIT: { status: false, message: "Too much requests! Try again later" },
	SERVER_SUPPORT_PASSWORD: { status: false, message: "Server you trying to use does not support password log in method" },

	USER_DEACTIVATED: { status: false, message: "The user has been deactivated" },
	BAD_AUTH_DATA: { status: false, message: "The provided authentication data is incorrect" }
}

const reqGet = async (url: string, Endpoint: Endpoints) => {
	try {
		let res = await axios.get(url + Endpoint, { validateStatus: null });
		return res;
	} catch (error) {
		return { status: 999, data: null };
	}
}

const reqPost = async (url: string, Endpoint: Endpoints, body: object) => {
	try {
		let res = await axios.post(url + Endpoint, body, { validateStatus: null });
		return res;
	} catch (error) {
		return { status: 999, data: null };
	}
};

const reqAuthGet = async (Endpoint: Endpoints) => {
	try {
		let res = await axios.get(dataStorage.from("config")?.get("baseUrl") + Endpoint, {
			validateStatus: null, headers: {
				Authorization: `Bearer ${dataStorage.from("config")?.get("accessToken")}`
			}
		});
		return res;
	} catch (error) {
		return { status: 999, data: null };
	}
};

const reqAuthPost = async (Endpoint: Endpoints, body: object) => {
	try {
		let res = await axios.post(dataStorage.from("config")?.get("baseUrl") + Endpoint, body, {
			validateStatus: null, headers: {
				Authorization: `Bearer ${dataStorage.from("config")?.get("accessToken")}`
			}
		});
		return res;
	} catch (error) {
		return { status: 999, data: null };
	}
};

const actions = {
	async init() {
	},

	async checkServerUrl(serverUrl: string) {
		let res = await reqGet(serverUrl, Endpoints.WellKnown);
		let baseUrl = serverUrl;

		switch (res.status) {
			case 404:
				break;

			case 200:
				if (res.data.length == 0) {
					return DiscoveryErrors.FAIL_PROMPT;
				}

				try {
					let parsedJSON = res.data;

					if (parsedJSON["m.homeserver"]["base_url"] == undefined) {
						return DiscoveryErrors.FAIL_PROMPT;
					}

					if (validUrl.isWebUri(parsedJSON["m.homeserver"]["base_url"]) == undefined) {
						return DiscoveryErrors.FAIL_ERROR;
					}

					baseUrl = parsedJSON["m.homeserver"]["base_url"];
				} catch (error) {
					return DiscoveryErrors.FAIL_PROMPT;
				}

				break;

			default:
				return DiscoveryErrors.FAIL_PROMPT;
		}

		res = await reqGet(baseUrl, Endpoints.SpecVersion);
		if (res.status != 200) {
			return DiscoveryErrors.FAIL_ERROR;
		}

		// Check homeserver spec version here
		let versions = res.data;
		if (versions.versions.length < 7) {
			return DiscoveryErrors.FAIL_SPEC_VER;
		}

		return { status: true, message: "" };
	},

	async login(username: string, password: string, sfa: string) {
		if (dataStorage.from("config")?.get("loggedIn") == "true") {
			return { status: true, message: "Logged in" };
		}

		// Username and password checking
		let splittedId = username.split(":");

		if (splittedId.length != 2) {
			return LoginErrors.USERNAME_FORMAT
		}

		if (password.length == 0) {
			return LoginErrors.PASSWORD_EMPTY;
		}

		// Find homeserver url
		let info = await actions.checkServerUrl(sfa != "" ? sfa : "https://" + splittedId[1]);
		if (!info.status) {
			return info;
		}
		let baseUrl = sfa != "" ? sfa : "https://" + splittedId[1];

		let res = await reqGet(baseUrl, Endpoints.Login);
		if (res.status != 200) {
			return LoginErrors.RATE_LIMIT;
		}

		// Check if m.login.password is possible to use
		let foundAuthType = false;
		res.data["flows"].forEach((authType: any) => {
			if (authType["type"] == "m.login.password") {
				foundAuthType = true;
			}
		});

		if (!foundAuthType) {
			return LoginErrors.SERVER_SUPPORT_PASSWORD;
		}

		// Get access token
		res = await reqPost(baseUrl, Endpoints.Login, {
			type: "m.login.password",
			identifier: {
				type: "m.id.user",
				user: username
			},
			password: password,
			initial_device_display_name: "Zine Desktop"
		});

		if (res.status == 200) {
			dataStorage.from("config")?.set("loggedIn", "true");
			dataStorage.from("config")?.set("baseUrl", res.data.well_known["m.homeserver"]["base_url"].slice(0, -1));
			dataStorage.from("config")?.set("userId", res.data.user_id);
			dataStorage.from("config")?.set("accessToken", res.data.access_token);
			dataStorage.from("config")?.set("deviceId", res.data.device_id);
		} else if (res.status == 403) {
			if (res.data["errcode"] == "M_FORBIDDEN") {
				return LoginErrors.BAD_AUTH_DATA;
			} else if (res.data["errcode"] == "M_USER_DEACTIVATED") {
				return LoginErrors.USER_DEACTIVATED;
			}
		} else if (res.status == 429) {
			return LoginErrors.RATE_LIMIT;
		}


		return { status: true, message: "Logged in" };
	},

	async isLoggedIn() {
		if (dataStorage.from("config")?.get("loggedIn") == "true") {
			let res = await reqAuthGet(Endpoints.WhoAmI);

			if(res.status != 200) {
				dataStorage.from("config")?.set("loggedIn", "false");
				return false;
			}

			return true;
		} else {
			dataStorage.from("config")?.set("loggedIn", "false");
			return false;
		}
	}
};

expose(actions);