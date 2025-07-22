<script lang="ts" setup>
type LocaleHeightAttributes = {
	length: number,
	originalUnit: LengthUnit,
	toUnit?: LengthUnit,
	useInteger?: boolean,
}

const props = defineProps<LocaleHeightAttributes>();

const unitConverter = useUnitConverter();
const measurementUnit = useCookie("intl-measurement");

const calculatedLength = computed(() => {
	if (props.toUnit !== undefined) return unitConverter.convertLengthAsString(props.length, props.originalUnit, props.toUnit);
	switch (measurementUnit.value ?? "metre") {
		case "yard":
			return unitConverter.convertLengthAsString(props.length, props.originalUnit, "yard", props.useInteger);
		default:
			return unitConverter.convertLengthAsString(props.length, props.originalUnit, "meter", props.useInteger);
	}
})
</script>

<template>
	<span>
		{{ calculatedLength }}
	</span>
</template>

