import { expose } from "../backend";
import DataDirs from "../../datadir";

expose({
	async init() {
		console.log(DataDirs.data);
	},

	async login(username: string, password: string, sfa: string) {
		return "ok logged";
	},
});