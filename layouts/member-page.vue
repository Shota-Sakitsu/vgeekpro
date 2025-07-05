<template>
	<CommonlyHeader/>
	<main id="main-contents" class="tw:pt-40 tw:w-full tw:flex tw:flex-col tw:items-center">
		<section id="about" class="bg-maze tw:w-full">
			<div class="tw:relative tw:bg-gradient-to-b tw:from-stone-600 tw:from-60%">
				<VGeekMarquee/>
				<div class="tw:z-10 tw:relative tw:flex tw:flex-col tw:xl:flex-row tw:justify-center tw:items-center">
					<slot/>
				</div>
			</div>
			<div class="tw:my-10 tw:w-full tw:flex tw:justify-around tw:items-start" v-if="reduceMotion || printPaper">
				<span v-if="reduceMotion">
					アニメーション削減が有効です。
				</span>
				<span v-else-if="printPaper">
					{{ customDateFormatter(new Date()) }}印刷<br>
					掲載されている内容は印刷当時のものです。
				</span>
			</div>
			<div class="tw:my-10 tw:w-full tw:flex tw:justify-around tw:items-start">
				<NuxtLinkLocale :to="`/#member-card-${profileId.replaceAll('_', '-')}`" class="tw:self-stretch tw:flex-col tw:shrink tw:items-center tw:rounded-full tw:bg-rose-500 tw:hover:bg-rose-700 tw:text-white tw:px-8 tw:py-4">
					{{ t("profileCommon.backToTop") }}
				</NuxtLinkLocale>
			</div>
		</section>
	</main>
</template>
<script lang="ts" setup>
import {customDateFormatter} from "~/composables/ExtendUtils";

useHead({
	htmlAttrs: {
		lang: "ja",
	},
	bodyAttrs: {
		class: "font-inter tw:bg-stone-600 tw:text-white"
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
})
const {t} = useI18n();
const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
const printPaper = useMediaQuery("print");

const route = useRoute();
const profileId = computed(() => {
	let prefixLength = route.fullPath.replace(/\/talents\/.+$/i, "/talents/").length;
	return route.fullPath.substring(prefixLength);
});

</script>
<style lang="less">
a {
	color: inherit;
}
</style>
