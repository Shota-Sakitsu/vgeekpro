<script lang="ts" setup>

type LocaleTimeAttributes = {
	year?: string | number,
	quarterYear?: 1 | 2 | 3 | 4,
	halfYear?: 1 | 2,
	month?: string | number,
	fuzzyDay?: "early" | "mid" | "late",
	halfMonth?: "early" | "late",
	day?: string | number,
	isFuzzy?: boolean,
}

const props = defineProps<LocaleTimeAttributes>();

const {locale, t} = useI18n();
const calender = useCookie("intl-calender");

const dateTimeValue = computed(() => {
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
	return value;
});

const isSetYear = computed(() => (props.year != undefined))
const isSetMonth = computed(() => (props.month != undefined || props.quarterYear != undefined || props.halfYear != undefined))
const isSetDay = computed(() => (props.month != undefined && (props.day != undefined || props.fuzzyDay != undefined || props.halfMonth != undefined)))
const isFuzzy = computed(() => (props.isFuzzy ?? false) && !isSetDay.value)
const processLevel = computed((): "u" | `y${"m" | "md" | "mdf" | "mf" | "f" | ""}` | `m${"d" | "df" | "f" | ""}` => {
	if (isSetMonth.value && props.month == undefined) {
		return `${isSetYear.value ? "y" : ""}m${isFuzzy.value ? "f" : ""}`;
	} else if (isSetDay.value) {
		return `${isSetYear.value ? "y" : ""}md${isFuzzy.value ? "f" : ""}`;
	} else if (isSetYear.value) {
		return `y${isFuzzy.value ? "f" : ""}`;
	}
	return "u";
})

const displayValue = computed(() => {
	const formatter = new Intl.DateTimeFormat(locale.value, {
		calendar: calender.value ?? "gregory",
		year: "numeric",
		month: "long",
		day: "numeric"
	});
	const rawParts = formatter.formatToParts(new Date(dateTimeValue.value));
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
	console.log(parts);
	switch (processLevel.value) {
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
})
</script>

<template>
	<span v-text="displayValue"/>
</template>

<style scoped>

</style>
