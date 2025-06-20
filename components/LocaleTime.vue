<script lang="ts" setup>

type LocaleTimeAttributes = {
	year?: string | number,
	month?: string | number,
	day?: string | number,
}

const props = defineProps<LocaleTimeAttributes>();
const {locale} = useI18n();
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
const displayValue = computed(() => {
	const formatter = new Intl.DateTimeFormat(locale.value, {
		calendar: calender.value ?? "gregory",
		year: props.year != undefined ? "numeric" : undefined,
		month: props.month != undefined ? "short" : undefined,
		day: (props.month != undefined && props.day != undefined) ? "numeric" : undefined,
	})
	return formatter.format(new Date(dateTimeValue.value));
});
const usingTimeElement = toRef(true);
</script>

<template>
	<time v-if="usingTimeElement" :datetime="dateTimeValue" v-text="displayValue"></time>
</template>
