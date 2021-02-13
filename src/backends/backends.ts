import { BooleanResponse, Backend, Room } from "./backend";
import { Worker } from "worker_threads";

const MakePromise = <Pr>(worker: Worker, functionName: string, args: {}): Promise<Pr> => {
	return new Promise((resolve, _reject) => {
		worker.postMessage({
			function: functionName,
			params: args
		});

		worker.on("message", (msg) => {
			if (msg.function == functionName) {
				resolve(msg.data);
			}
		});
	});
}

class WorkerBackend implements Backend {
	name: string;
	worker: Worker;

	constructor(backendName: string, worker: Worker) {
		this.name = backendName;
		this.worker = worker;

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

	getRooms(): Promise<[]> {
		return MakePromise(this.worker, "getRooms", {});
	}
};

class Backends {
	backends: Map<string, Backend>;

	constructor() {
		this.backends = new Map<string, Backend>();

		this.backends.set("matrix", new WorkerBackend(
			"matrix", new Worker(
				__dirname + "/backend-matrix.js"
			)
		));

	}

	getBackend(backendName: string): Backend | undefined {
		return this.backends.get(backendName);
	}
}

export default Backends;