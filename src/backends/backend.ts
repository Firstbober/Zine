import { parentPort } from 'worker_threads';

const expose = (funcs: {}) => {
	let functionNames: string[] = [];
	let functionBody: Function[] = [];

	Object.entries(funcs).forEach(([name, fn], _index) => {
		functionNames.push(name);
		functionBody.push(fn as Function);
	})

	parentPort?.on("message", (call) => {
		for (let index = 0; index < functionNames.length; index++) {
			if(call.function == functionNames[index]) {
				functionBody[index]().then((data: any) => {
					parentPort?.postMessage({
						function: functionNames[index],
						data: data
					});
				})
			}
		}
	});
};

class Room {
	name: string;
	coverUrl: string;

	constructor(name: string, coverUrl: string) {
		this.name = name;
		this.coverUrl = coverUrl;
	}
};

interface Backend {
	name: string;

	login(username: string, password: string, sfa: string): Promise<string>;
	isLoggedIn(): Promise<boolean>;
	getRooms(): Promise<[]>;
};

export { expose, Room, Backend };