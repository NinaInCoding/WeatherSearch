export class Debouncer {
	link: undefined | null | number;
	time?: number;

	constructor(
		time?: number
	) {
		const DEBOUNCE_TIME_DEFAULT = 100;
		this.time = time ?? DEBOUNCE_TIME_DEFAULT;
	}

	action(action: (data?: any) => any): any {
		if (this.link != null) {
			clearTimeout(this.link);
		}
		this.link = setTimeout((data?: any) => {
			action(data);
		}, this.time);
	};
}
