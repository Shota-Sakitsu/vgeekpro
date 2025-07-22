<script lang="ts" setup>

type LocaleHeightAttributes = {
	height: number,
	originalUnit: LengthUnit,
	toUnit?: LengthUnit,
	isApprox?: boolean,
}

const props = defineProps<LocaleHeightAttributes>();

const {t} = useI18n();
const measurementUnit = useCookie("intl-measurement");
const unitConverter = useUnitConverter();

const calculatedHeight = computed(() => {
	if (props.toUnit !== undefined) return unitConverter.convertLengthAsString(props.height, props.originalUnit, props.toUnit);
	switch (measurementUnit.value ?? "metre") {
		case "yard":
			return unitConverter.convertLengthAsString(props.height, props.originalUnit, "feet", false);
		default:
			return unitConverter.convertLengthAsString(props.height, props.originalUnit, "centimetre", false);
	}
})
</script>

<template>
	<span>
		{{ (props.isApprox ?? false) ? `${t("profileCommon.approx")} ` : "" }}{{ calculatedHeight }}
	</span>
</template>

