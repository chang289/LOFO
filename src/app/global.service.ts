export class GlobalService {
	globalVar: string = "test";

	updateVar(value: string) {
		this.globalVar = value;
	}

	getVar() {
		return this.globalVar;
	}
}