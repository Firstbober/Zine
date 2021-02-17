import { parentPort } from 'worker_threads';
import DataDirs from "./datadir";
import fs from "fs";
import sqlite from "better-sqlite3";

export const expose = (funcs: {}) => {
	let functionNames: string[] = [];
	let functionBody: Function[] = [];

	Object.entries(funcs).forEach(([name, fn], _index) => {
		functionNames.push(name);
		functionBody.push(fn as Function);
	})

	parentPort?.on("message", (call) => {
		for (let index = 0; index < functionNames.length; index++) {
			if (call.function == functionNames[index]) {
				functionBody[index](...Object.values(call.params)).then((data: any) => {
					parentPort?.postMessage({
						function: functionNames[index],
						data: data
					});
				})
			}
		}
	});
};

export class DataSet {
	name: string;
	data: sqlite.Database;

	constructor(backendName: string, dataSetName: string) {
		fs.mkdirSync(`${DataDirs.data}/${backendName}/`, { recursive: true });
		this.name = dataSetName;

		this.data = sqlite(`${DataDirs.data}/${backendName}/${dataSetName}.sqlite`);
		this.data.prepare(`CREATE TABLE IF NOT EXISTS ${dataSetName} ('key' TEXT, 'value' TEXT);`).run();
	}

	set(key: string, value: string) {
		let els = this.data.prepare(`SELECT * FROM ${this.name} WHERE key = ?`).all(key);

		if (els.length > 0) {
			this.data.prepare(`UPDATE ${this.name} SET value = ? WHERE key = ?`).run(
				value, key
			);
		} else {
			this.data.prepare(`INSERT INTO ${this.name} (key, value) VALUES(?, ?)`).run(
				key, value
			);
		}
	}

	get(key: string) {
		let val = this.data.prepare(`SELECT * FROM ${this.name} WHERE key = ?`).get(key);
		return val == undefined ? undefined : val.value;
	}

	remove(key: string) {
		this.data.prepare(`DELETE FROM ${this.name} WHERE key = ?`).run(key);
	}

	all() {
		return this.data.prepare(`SELECT * FROM ${this.name}`).all();
	}

	removeAll() {
		this.data.prepare(`DELETE FROM ${this.name}; VACUUM;`).run();
	}
};

export class Storage {
	backendName: string;
	dataSets: Map<string, DataSet>;

	constructor(backendName: string) {
		this.backendName = backendName;
		this.dataSets = new Map();
	}

	from(dataSet: string): DataSet | undefined {
		if (this.dataSets.has(dataSet)) {
			return this.dataSets.get(dataSet);
		} else {
			let ds = new DataSet(this.backendName, dataSet);
			this.dataSets.set(dataSet, ds);
			return ds;
		}
	}
};

export class Room {
	id: string;
	name: string;
	avatarUrl: string;
	topic: string;

	constructor(name: string, avatarUrl: string, topic: string, id: string) {
		this.name = name;
		this.avatarUrl = avatarUrl;
		this.topic = topic;
		this.id = id;
	}
};

export interface Message {
	sender: string,
	content: string,
	id: string
}

export interface User {
	displayName: string,
	userId: string,
	avatarUrl: string
};

export interface BooleanResponse {
	status: boolean,
	message: string
};

export interface Backend {
	name: string;

	checkServerUrl(serverUrl: string): Promise<BooleanResponse>;

	login(username: string, password: string, sfa: string): Promise<BooleanResponse>;
	isLoggedIn(): Promise<boolean>;
	logout(): Promise<void>;

	synchronize(): Promise<void>;
	startSyncLoop(): Promise<void>;
	stopSyncLoop(): Promise<void>;

	getCurrentUser(): Promise<User>;

	imageUrlGetThumbnail(url: string, size: number): Promise<string>;
	imageUrlGetOrginal(url: string): Promise<string>;

	getRooms(): Promise<[]>;
	getMessagesInRoom(roomId: string): Promise<Array<Message>>;
};