import { BooleanResponse, Backend, Room, User, Message } from "./backend";
import { Worker } from "worker_threads";
import DataDirs from "../datadir";
import events from "events";
import axios from "axios";
import path from "path";
import fs from "fs";

const MakePromise = <Pr>(worker: Worker, functionName: string, args: {}): Promise<Pr> => {
	return new Promise((resolve, _reject) => {
		worker.postMessage({
			function: functionName,
			params: args
		});

		const msgFunc = (msg: any) => {
			if (msg.function == functionName) {
				//worker.removeListener("message", msgFunc);
				resolve(msg.data);
			}
		}

		worker.on("message", msgFunc);
	});
}

class WorkerBackend implements Backend {
	name: string;
	worker: Worker;

	constructor(backendName: string, worker: Worker) {
		this.name = backendName;
		this.worker = worker;

		this.worker.setMaxListeners(100);

		MakePromise(this.worker, "init", {});
	}

	checkServerUrl(serverUrl: string): Promise<BooleanResponse> {
		return MakePromise(this.worker, "checkServerUrl", {
			serverUrl: serverUrl
		});
	}
	login(username: string, password: string, sfa: string): Promise<BooleanResponse> {
		return MakePromise(this.worker, "login", {
			username: username,
			password: password,
			sfa: sfa
		});
	}
	isLoggedIn(): Promise<boolean> {
		return MakePromise(this.worker, "isLoggedIn", {});
	}
	logout(): Promise<void> {
		return MakePromise(this.worker, "logout", {});
	}

	synchronize(): Promise<void> {
		return MakePromise(this.worker, "synchronize", {});
	}
	startSyncLoop(): Promise<void> {
		return MakePromise(this.worker, "startSyncLoop", {});
	}
	stopSyncLoop(): Promise<void> {
		return MakePromise(this.worker, "stopSyncLoop", {});
	}

	getCurrentUser(): Promise<User> {
		return MakePromise(this.worker, "getCurrentUser", {});
	}

	imageUrlGetThumbnail(url: string, size: number): Promise<string> {
		return MakePromise(this.worker, "imageUrlGetThumbnail", { url: url, size: size });
	}
	imageUrlGetOrginal(url: string): Promise<string> {
		return MakePromise(this.worker, "imageUrlGetOrginal", { url: url });
	}

	getRooms(): Promise<[]> {
		return MakePromise(this.worker, "getRooms", {});
	}

	getMessagesInRoom(roomId: string): Promise<Array<Message>> {
		return MakePromise(this.worker, "getMessagesInRoom", {roomId: roomId});
	}
};

class Backends {
	backends: Map<string, Backend>;
	currentBackend: Backend | undefined;
	currentRoom: string;

	eventEmmiter: events.EventEmitter;

	constructor() {
		this.backends = new Map<string, Backend>();

		this.backends.set("matrix", new WorkerBackend(
			"matrix", new Worker(
				__dirname + "/backend-matrix.js"
			)
		));

		this.currentBackend = undefined;
		this.currentRoom = "";

		this.eventEmmiter = new events.EventEmitter();
	}

	getBackend(backendName: string): Backend | undefined {
		return this.backends.get(backendName);
	}

	setCurrentBackend(backendName: string) {
		this.currentBackend = this.getBackend(backendName);
	}

	setCurrentRoom(roomId: string) {
		this.currentRoom = roomId;
		this.eventEmmiter.emit("onCurrentRoomChange", roomId);
	}

	async getFileFromUrl(url: string): Promise<string> {
		fs.mkdirSync(DataDirs.cache, { recursive: true });
		const filename = path.basename(url);

		let found = false;
		fs.readdirSync(DataDirs.cache).forEach((file) => {
			if(file == filename) {
				found = true;
			}
		});

		if(found) {
			return `${DataDirs.cache}/${filename}`
		}

		let res = await axios({
			method: "GET",
			url: url,
			responseType: "stream"
		});
		res.data.pipe(fs.createWriteStream(`${DataDirs.cache}/${filename}`));

		return `${DataDirs.cache}/${filename}`;
	}
}

var backends: Backends = new Backends();
export default backends;