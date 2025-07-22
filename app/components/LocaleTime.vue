<script lang="ts" setup>

type LocaleTimeAttributes = {
	year?: string | number,
	month?: string | number,
	day?: string | number,
}

const props = defineProps<LocaleTimeAttributes>();
const {locale} = useI18n();
const calender = useCookie("intl-calender");

const timeFormatter = useTimeFormatter();

const dateTimeValue = computed(() => timeFormatter.formatAsDateTime(props));
const displayValue = computed(() => timeFormatter.formatAsText(props, locale.value, calender.value));
const usingTimeElement = toRef(true);
</script>

<template>
	<time v-if="usingTimeElement" :datetime="dateTimeValue" v-text="displayValue"></time>
</template>
