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

export function randomInt(max: number): number {
	return Math.floor(Math.random() * max);
}

export type Locales =
	| "ja" | "ja-JP-x-dialect-kansai" | "ja-JP-x-dialect-northkyushu" | "ja-JP-x-dialect-ryukyu"
	| "en-GB" | "en-US"
	| "fr-FR"
	| "ko"
	| "zh-Hans" | "zh-Hant"

//export function randomBytes(length: number): Uint8Array {}
