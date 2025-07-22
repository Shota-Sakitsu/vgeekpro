import type {Locales} from "#shared/ExtendUtils";

export type TimeFormatterParam = {
	/**
	 * 年を表す値を格納するための変数。
	 * 数値または文字列で年を指定できます。
	 * 値が指定されない場合もあります（オプション）。
	 */
	year?: string | number,
	/**
	 * 月を表す変数。文字列形式または数値形式で利用可能です。
	 *
	 * 文字列形式はVueでパラメータをバインドを使用しない場合、文字型の数値を受け取るために対応しています。
	 * 数値形式は正規の月情報を数値として扱う場合に利用されます。
	 *
	 * 型:
	 * - `string`: 数値を文字列として表現。例: "1", "12"。
	 * - `number`: 数値そのもの。例: 1, 12。
	 *
	 * 任意のプロパティであるため、明示的に指定されない場合は未定義の可能性があります。
	 */
	month?: string | number,
	/**
	 * 日付や曜日を表す可変的なデータを格納する変数。
	 *
	 * - 日付の場合には「YYYY-MM-DD」形式の文字列として格納される。
	 * - 曜日などの識別には数字が使用されることもある。
	 * - 任意のプロパティであるため、未定義の場合もある。
	 */
	day?: string | number,
	/**
	 * 時間を表すオプションの変数。
	 * 時間を文字列または数値で指定できます。
	 * 時間はこの時・分が定義されて初めて有効です
	 */
	hour?: string | number,
	/**
	 * 時間の分を表します。
	 * 分数として文字列または数値のどちらかを指定できます。
	 * オプショナルプロパティのため、値を指定しなくても構いません。
	 * 時間はこの時・分が定義されて初めて有効です
	 */
	minute?: string | number,
	/**
	 * 秒数または関連データを格納するための変数。
	 *
	 * `string`または`number`型の値を格納可能です。テキストによるデータが必要な場合や、数値としての秒数を扱う場合に使用されます。
	 * このプロパティはオプションであり、未定義の場合もあります。
	 * 時間はこの時・分が定義されて初めて有効です
	 */
	second?: string | number,
	/**
	 * 処理に使用されるミリ秒を表す値。
	 * 文字列または数値として指定が可能。
	 *
	 * - 文字列として指定する場合、特定のフォーマットや説明が必要な場合は別途記述が必要。
	 * - 数値として使用する場合、単位はミリ秒であり、プロセスやタイマーの設定などに使用される。
	 *
	 * オプショナルプロパティであるため、指定しない場合もある。
	 * 時間はこの時・分が定義されて初めて有効です
	 */
	millisecond?: string | number,
	/**
	 * タイムゾーンを表すオプションの変数。
	 *
	 * 値は文字列または数値が使用できます。文字列の場合はタイムゾーンの名称（例：'UTC', 'America/Los_Angeles'など）を指定し、
	 * 数値の場合はUTCからのオフセット値を時間単位で指定します（例：-8, 0, 5.5など）。
	 *
	 * この変数は省略可能で、未指定の場合はデフォルトのタイムゾーン(環境依存)が適用されます。
	 *
	 * 型:
	 * - `string`: タイムゾーン名を表現します。
	 * - `number`: UTCからのオフセットを指定します。
	 */
	timeZone?: string | number,
}

export type DateFormatInfo = {
	year?: "numeric" | "2-digit",
	month?: "numeric" | "2-digit" | "long" | "short" | "narrow",
	day?: "numeric" | "2-digit",
	hour?: "numeric" | "2-digit",
	minute?: "numeric" | "2-digit",
	second?: "numeric" | "2-digit",
	era?: "long" | "short" | "narrow",
};
export type FuzzyTimeFormatterParam = TimeFormatterParam & {
	quarterYear?: 1 | 2 | 3 | 4,
	halfYear?: 1 | 2,
	fuzzyDay?: "early" | "mid" | "late",
	halfMonth?: "early" | "late",
	halfDay?: "am" | "pm",
	chineseTwelveZodiac?:
		| "rat" | "ox" | "tiger" | "rabbit" | "dragon" | "snake"
		| "horse" | "sheep" | "monkey" | "cock" | "dog" | "boar"
	zodiacSplit?: 1 | 2 | 3 | 4,
	isFuzzy?: boolean,
};

export const useTimeFormatter = () => {
	const {t, locale} = useI18n();
	const calender = useCookie("intl-calender");
	const getPrintTime = () => {
		const date = new Date();
		let year = date.getFullYear();
		let month = date.getMonth() + 1;
		let day = date.getDate();
		let hour = date.getHours();
		let minute = Math.round(date.getMinutes() / 15) * 15;
		if (minute == 60) {
			hour++;
			minute = 0;
			if (hour == 24) {
				hour = 0;
				day++;
				if (
					((month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) && day == 32) ||
					((month == 4 || month == 6 || month == 9 || month == 11) && day == 31) ||
					(
						month == 2 &&
						(
							(((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)) && day == 30) ||
							((year % 4 != 0 || (year % 100 == 0 && year % 400 != 0)) && day == 29)
						)
					)
				) {
					day = 1;
					month++;
					if (month == 13) {
						month = 1;
						year++;
					}
				}
			}
			return t("footerMessage.printed").replace("%s", t("time.isFuzzy").replace("%s", formatAsText({
				year,
				month,
				day,
				hour,
				minute,
			}, locale.value, calender.value)));
		}
	}
	const formatAsDateTime = (props: TimeFormatterParam) => {
		let value = "";
		if (props.year != undefined) {
			value += `${props.year}-`;
		} else {
			const currentYear = new Date().getFullYear();
			if (currentYear % 400 == 0 || (currentYear % 4 == 0 && currentYear % 100 != 0)) {
				value += `${currentYear}-`;
			} else {
				value += `${Math.floor((currentYear - 1) / 4) * 4}-`;
			}
		}
		if (props.month != undefined) {
			value += `${props.month.toString().padStart(2, "0")}-`;
		} else {
			value += "01-";
		}
		if (props.day != undefined) {
			value += `${props.day.toString().padStart(2, "0")}`;
		} else {
			value += "01";
		}
		if (props.hour != undefined && props.minute != undefined) {
			if (props.second != undefined) {
				if (props.millisecond != undefined) {
					value += `T${props.hour.toString().padStart(2, "0")}:${props.minute.toString().padStart(2, "0")}:${props.second.toString().padStart(2, "0")}.${props.millisecond.toString().padStart(3, "0")}`;
				} else {
					value += `T${props.hour.toString().padStart(2, "0")}:${props.minute.toString().padStart(2, "0")}:${props.second.toString().padStart(2, "0")}`;
				}
			} else {
				value += `T${props.hour.toString().padStart(2, "0")}:${props.minute.toString().padStart(2, "0")}:00`;
			}
			if (props.timeZone != undefined) {
				if (typeof props.timeZone == "string") {
					value += props.timeZone;
				} else {
					const hour = Math.ceil(props.timeZone);
					const minute = Math.round((props.timeZone - hour) * 60);
					value += `+${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
				}
			}
		}
		return value;
	}
	const formatAsText = (props: TimeFormatterParam, locale: Locales, calender: string | undefined | null, format?: DateFormatInfo) => {
		format = format ?? {};
		const formatter = new Intl.DateTimeFormat(locale, {
			calendar: calender ?? "gregory",
			year: props.year != undefined ? (format.year ?? "numeric") : undefined,
			month: props.month != undefined ? (format.month ?? "short") : undefined,
			day: (props.month != undefined && props.day != undefined) ? (format.day ?? "numeric") : undefined,
			hour: (props.hour != undefined && props.minute != undefined) ? (format.hour ?? "2-digit") : undefined,
			minute: (props.hour != undefined && props.minute != undefined) ? (format.minute ?? "2-digit") : undefined,
			second: (props.hour != undefined && props.minute != undefined && props.second != undefined) ? (format.second ?? "2-digit") : undefined,
			era: (props.year != undefined) ? (format.era ?? "long") : undefined,
		})
		return formatter.format(new Date(formatAsDateTime(props)));
	}

	const formatFuzzyAsText = (props: FuzzyTimeFormatterParam, locale: Locales, calender: string | undefined | null) => {
		const isSetYear: boolean = (() => (props.year != undefined))()
		const isSetMonth: boolean = (() => (props.month != undefined || props.quarterYear != undefined || props.halfYear != undefined))()
		const isSetDay: boolean = (() => (props.month != undefined && (props.day != undefined || props.fuzzyDay != undefined || props.halfMonth != undefined)))()
		const isFuzzy: boolean = (() => (props.isFuzzy ?? false) && !isSetDay)()

		const processLevel = ((): "u" | `y${"m" | "md" | "mdf" | "mf" | "f" | ""}` | `m${"d" | "df" | "f" | ""}` => {
			if (isSetMonth && props.month == undefined) {
				return `${isSetYear ? "y" : ""}m${isFuzzy ? "f" : ""}`;
			} else if (isSetDay) {
				return `${isSetYear ? "y" : ""}md${isFuzzy ? "f" : ""}`;
			} else if (isSetYear) {
				return `y${isFuzzy ? "f" : ""}`;
			}
			return "u";
		})()

		const formatter = new Intl.DateTimeFormat(locale, {
			calendar: calender ?? "gregory",
			year: "numeric",
			month: "long",
			day: "numeric"
		});
		const rawParts = formatter.formatToParts(new Date(formatAsDateTime(props)));
		const parts: Intl.DateTimeFormatPart[] = [];
		let currentPart: Intl.DateTimeFormatPart | undefined = undefined;
		for (const part of rawParts) {
			if (part.type != "literal") {
				if (currentPart != undefined) {
					parts.push(currentPart);
				}
				currentPart = part;
			} else {
				if (currentPart != undefined) {
					currentPart.value += part.value;
				} else {
					parts.push(part);
				}
			}
		}

		switch (processLevel) {
			case "y":
				// 年
				return (parts.some(part => part.type == "era") ? parts.find(part => part.type == "era")!.type : "") + (parts.find(part => part.type == "year")!.value);
			case "yf":
				// 年頃
				return t("time.isFuzzy").replace("%s", (parts.some(part => part.type == "era") ? parts.find(part => part.type == "era")!.type : "") + (parts.find(part => part.type == "year")!.value));
			case "ym":
				// 年月
				const ymYear = (parts.some(part => part.type == "era") ? parts.find(part => part.type == "era")!.type : "") + (parts.find(part => part.type == "year")!.value);
				if (props.halfYear != undefined) {
					return ymYear + t(`time.half${props.halfYear == 1 ? "One" : "Two"}`)
				} else if (props.quarterYear != undefined) {
					switch (props.quarterYear) {
						case 1:
							return ymYear + t("time.quarterOne");
						case 2:
							return ymYear + t("time.quarterTwo");
						case 3:
							return ymYear + t("time.quarterThree");
						case 4:
							return ymYear + t("time.quarterFour");
					}
				}
				return ymYear + parts.find(part => part.type == "month")!.value;
			case "ymf":
				// 年月頃
				const ymfYear = (parts.some(part => part.type == "era") ? parts.find(part => part.type == "era")!.type : "") + (parts.find(part => part.type == "year")!.value);
				if (props.halfYear != undefined) {
					return t("time.isFuzzy").replace("%s", ymfYear + t(`time.half${props.halfYear == 1 ? "One" : "Two"}`));
				} else if (props.quarterYear != undefined) {
					switch (props.quarterYear) {
						case 1:
							return t("time.isFuzzy").replace("%s", ymfYear + t("time.quarterOne"));
						case 2:
							return t("time.isFuzzy").replace("%s", ymfYear + t("time.quarterTwo"));
						case 3:
							return t("time.isFuzzy").replace("%s", ymfYear + t("time.quarterThree"));
						case 4:
							return t("time.isFuzzy").replace("%s", ymfYear + t("time.quarterFour"));
					}
				}
				return t("time.isFuzzy").replace("%s", ymfYear + parts.find(part => part.type == "month")!.value);
			case "ymd":
				// 年月日
				const ymdYear = (parts.some(part => part.type == "era") ? parts.find(part => part.type == "era")!.type : "") + (parts.find(part => part.type == "year")!.value);
				const ymdYearMonth = ymdYear + parts.find(part => part.type == "month")!.value;
				if (props.halfMonth != undefined) {
					return t(`time.${props.halfMonth}HalfMonth`).includes("%s") ? ymdYear + t(`time.${props.halfMonth}HalfMonth`).replace("%s", parts.find(part => part.type == "month")!.value) : ymdYearMonth + t(`time.${props.halfMonth}HalfMonth`);
				} else if (props.fuzzyDay != undefined) {
					return t(`time.${props.fuzzyDay}Month`).includes("%s") ? ymdYear + t(`time.${props.fuzzyDay}Month`).replace("%s", parts.find(part => part.type == "month")!.value) : ymdYearMonth + t(`time.${props.fuzzyDay}Month`);
				}
				return ymdYearMonth + parts.find(part => part.type == "day")!.value;
			case "ymdf":
				// 年月日頃
				const ymdfYear = (parts.some(part => part.type == "era") ? parts.find(part => part.type == "era")!.type : "") + (parts.find(part => part.type == "year")!.value);
				const ymdfYearMonth = ymdfYear + parts.find(part => part.type == "month")!.value;
				parts.find(part => part.type == "month")!.value;
				if (props.halfMonth != undefined) {
					return t("time.isFuzzy").replace("%s", t(`time.${props.halfMonth}HalfMonth`).includes("%s") ? ymdfYear + t(`time.${props.halfMonth}HalfMonth`).replace("%s", parts.find(part => part.type == "month")!.value) : ymdfYearMonth + t(`time.${props.halfMonth}HalfMonth`));
				} else if (props.fuzzyDay != undefined) {
					return t("time.isFuzzy").replace("%s", t(`time.${props.fuzzyDay}Month`).includes("%s") ? ymdfYear + t(`time.${props.fuzzyDay}Month`).replace("%s", parts.find(part => part.type == "month")!.value) : ymdfYearMonth + t(`time.${props.fuzzyDay}Month`));
				}
				return t("time.isFuzzy").replace("%s", ymdfYearMonth + parts.find(part => part.type == "day")!.value);
			case "m":
				// 月
				if (props.month != undefined) return t("time.sometime");
				return parts.find(part => part.type == "month")!.value;
			case "mf":
				// 月頃
				if (props.month != undefined) return t("time.sometime");
				return t("time.isFuzzy").replace("%s", parts.find(part => part.type == "month")!.value);
			case "md":
				// 月日
				const mdMonth = parts.find(part => part.type == "month")!.value;
				if (props.halfMonth != undefined) {
					return t(`time.${props.halfMonth}HalfMonth`).includes("%s") ? t(`time.${props.halfMonth}HalfMonth`).replace("%s", parts.find(part => part.type == "month")!.value) : mdMonth + t(`time.${props.halfMonth}HalfMonth`);
				} else if (props.fuzzyDay != undefined) {
					return t(`time.${props.fuzzyDay}Month`).includes("%s") ? t(`time.${props.fuzzyDay}Month`).replace("%s", parts.find(part => part.type == "month")!.value) : mdMonth + t(`time.${props.fuzzyDay}Month`);
				}
				return mdMonth + parts.find(part => part.type == "day")!.value;
			case "mdf":
				// 年月日頃
				const mdfMonth = parts.find(part => part.type == "month")!.value;
				if (props.halfMonth != undefined) {
					return t("time.isFuzzy").replace("%s", t(`time.${props.halfMonth}HalfMonth`).includes("%s") ? t(`time.${props.halfMonth}HalfMonth`).replace("%s", parts.find(part => part.type == "month")!.value) : mdfMonth + t(`time.${props.halfMonth}HalfMonth`));
				} else if (props.fuzzyDay != undefined) {
					return t("time.isFuzzy").replace("%s", t(`time.${props.fuzzyDay}Month`).includes("%s") ? t(`time.${props.fuzzyDay}Month`).replace("%s", parts.find(part => part.type == "month")!.value) : mdfMonth + t(`time.${props.fuzzyDay}Month`));
				}
				return t("time.isFuzzy").replace("%s", mdfMonth + parts.find(part => part.type == "day")!.value);
			default:
				// いつか
				return t("time.sometime");
		}
	}
	return {
		formatAsDateTime,
		formatAsText,
		formatFuzzyAsText,
		getPrintTime,
	}
}
