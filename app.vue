<template>
	<NuxtLayout>
		<NuxtPage/>
	</NuxtLayout>
	<template v-if="!motionReduced">
		<div v-if="isShowBackground" class="eye-catch-backdrop tw:hidden tw:md:block"></div>
		<div v-if="isShowEyeCatch" class="eye-catch tw:hidden tw:md:block">
			<video autoplay class="object-fit-cover w-100 h-100" muted src="/videos/eyecatch.webm" type='video/webm' @abort="notShow" @canplay="imageLoaded" @error="notShow"/>
		</div>
		<div v-if="isShowForeground" class="eye-catch-backdrop tw:hidden tw:md:block"></div>
	</template>
</template>

<script lang="ts" setup>
import "assets/global.less";

useHead({
	link: [
		{
			rel: "icon",
			href: "/favicon.ico",
			type: "image/x-icon",
			sizes: "16x16 24x24 32x32 48x48 64x64 128x128 256x256"
		},
		{
			rel: "icon",
			href: "/favicon.svg",
			type: "image/svg+xml",
			sizes: "any"
		}
	]
})

const isShowEyeCatch = toRef(true);
const isShowBackground = toRef(true);
const isShowForeground = toRef(true);

const notShow = () => {
	console.log("Error Loading EyeCatch")
	isShowForeground.value = false
	isShowBackground.value = false
	isShowEyeCatch.value = false
}

const imageLoaded = () => {
	isShowForeground.value = false;
	setTimeout(() => {
		isShowBackground.value = false;
	}, 500);
	setTimeout(() => {
		isShowEyeCatch.value = false;
	}, 3750)
}

const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
const printPaper = useMediaQuery("print");
const motionReduced = computed(() => reduceMotion.value || printPaper.value);

</script>

<style lang="less" scoped>
.eye-catch, .eye-catch-backdrop {
	width: 100vw !important;
	height: 100vh !important;
	margin: 0 !important;
	padding: 0 !important;
	position: fixed !important;
	top: 0 !important;
	left: 0 !important;
	z-index: 65535 !important;
}

.eye-catch-backdrop {
	background-color: #808080 !important;
}
</style>
