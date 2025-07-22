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

const {locale} = useI18n();
const calender = useCookie("intl-calender");

const timeFormatter = useTimeFormatter();

const displayValue = computed(() => timeFormatter.formatFuzzyAsText(props, locale.value, calender.value))
</script>

<template>
	<span v-text="displayValue"/>
</template>

<style scoped>

</style>
