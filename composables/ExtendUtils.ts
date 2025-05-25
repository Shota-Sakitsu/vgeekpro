export class TriState {
	public static Yes: number = 1;
	public static Default: number = 0;
	public static No: number = -1;

	public static toString(value: TriState): string {
		switch (value) {
			case TriState.Yes:
				return "Yes";
			case TriState.No:
				return "No";
			default:
				return "Default";
		}
	}

	public static condition(value: TriState, defaultValue: boolean = false): boolean {
		return value === TriState.Default ? defaultValue : value === TriState.Yes;
	}
}

export function customDateFormatter(date: Date): string {
	const year = (new Intl.DateTimeFormat("ja-JP-u-ca-japanese", {era: "long", year: "numeric"})).format(date).replace(/(?<!\d)1年$/g, "元年");
	const month = (new Intl.DateTimeFormat("ja-JP-u-ca-japanese", {month: "numeric"})).format(date);
	const day = (new Intl.DateTimeFormat("ja-JP-u-ca-japanese", {day: "numeric"})).format(date);
	const weekday = (new Intl.DateTimeFormat("ja-JP-u-ca-japanese", {weekday: "narrow"})).format(date);
	const hour = (new Intl.DateTimeFormat("ja-JP-u-ca-japanese", {hour: "numeric", hour12: true})).format(date);

	return `${year}${month}${day} (${weekday}) ${hour}頃`;
}

export function randomInt(max: number): number {
	return Math.floor(Math.random() * max);
}

//export function randomBytes(length: number): Uint8Array {}
