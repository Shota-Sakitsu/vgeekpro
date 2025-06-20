<script lang="ts" setup>

type LocaleHeightAttributes = {
	height: number,
	originalUnit: "inch" | "feet" | "yard" | "millimeter" | "centimeter" | "decimeter" | "meter",
	isApprox?: boolean,
}

const props = defineProps<LocaleHeightAttributes>();

const {locale, t} = useI18n();
const measurementUnit = useCookie("intl-measurement");

const toInch = (input: number, unit: "inch" | "feet" | "yard" | "millimeter" | "centimeter" | "decimeter" | "meter") => {
	let processBuffer = input;
	switch (unit) {
		case "inch":
			return input;
		case "feet":
			return input * 12;
		case "yard":
			return input * 36;
		case "meter":
			return processBuffer / 0.0254;
		case "decimeter":
			return processBuffer / 0.254;
		case "centimeter":
			return processBuffer / 2.54;
		case "millimeter":
			return processBuffer / 25.4;
	}
}

const toMilliMeter = (input: number, unit: "inch" | "feet" | "yard" | "millimeter" | "centimeter" | "decimeter" | "meter") => {
	let processBuffer = input;
	switch (unit) {
		case "yard":
			return processBuffer * 914.4;
		case "feet":
			return processBuffer * 304.8;
		case "inch":
			return processBuffer * 25.4;
		case "meter":
			return processBuffer * 1000;
		case "decimeter":
			return processBuffer * 100;
		case "centimeter":
			return processBuffer * 10;
		case "millimeter":
			return processBuffer;
	}
}

const calculatedHeight = computed(() => {
	const inputInch = toInch(props.height, props.originalUnit);
	const inputMilliMeter = toMilliMeter(props.height, props.originalUnit);
	switch (measurementUnit.value ?? "metre") {
		case "yard":
			const feet = Math.floor(inputInch / 12)
			const inch = Math.round(inputInch % 12);
			if (feet >= 1) {
				return `${feet}ft ${inch}in`;
			} else {
				return `${inch}in`;
			}
		default:
			return `${inputMilliMeter / 10}cm`;
	}
})
</script>

<template>
	<span>
		{{ (props.isApprox ?? false) ? `${t("profileCommon.approx")} ` : "" }}{{ calculatedHeight }}
	</span>
</template>

