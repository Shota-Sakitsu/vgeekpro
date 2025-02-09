<template>
	<div :data-bs-theme="prefersDark ? 'dark' : 'light'">
		<slot/>
	</div>
</template>

<script lang="ts" setup>
import {provideSSRWidth} from "@vueuse/core";

useHead({
	htmlAttrs: {
		lang: "ja",
	},
	bodyAttrs: {
		class: "font-inter tw-bg-stone-600 tw-text-white"
	}
})
useSeoMeta({
	title: "VGeek",
	titleTemplate: "%s - ぶいぎーく！",
	description: "IT 系 VTuber グループ「ぶいぎーく！」の公式サイトです。",
	ogType: "website",
	ogSiteName: "ぶいぎーく！",
	ogImageUrl: "https://vgeekpro.com/images/logo.webp",
	ogDescription: "IT 系 VTuber グループ「ぶいぎーく！」の公式サイトです。",
	twitterCard: "summary_large_image",
	twitterSite: "@vgeekproduction",
})

provideSSRWidth(1280);

const prefersDark = false;
//const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');
</script>
