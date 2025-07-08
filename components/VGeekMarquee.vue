<script setup lang="ts">
import {breakpointsTailwind} from "@vueuse/core";

const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
const printPaper = useMediaQuery("print");
const motionReduced = computed(() => reduceMotion.value || printPaper.value);
const breakpoint = useBreakpoints(breakpointsTailwind);
const xl = breakpoint.greaterOrEqual("xl");
const md = breakpoint.smallerOrEqual("md");
const container = useTemplateRef("container");
const addStyle = computed(() => {
	// BlinkやWebKitでマーキーが静止状態の時に幅がズレる問題を修正
	// ChromeやEdge (Blink)を引っかける
	if (navigator.userAgent.toLowerCase().includes("applewebkit/537.36")) {
		console.log("Chrome or Edge (Blink) Marquee Width fix (letter-spacing: 0.15vw;)")
		return "letter-spacing: 0.15vw;"
	}
	// Safari (WebKit)を引っかける
	if (navigator.userAgent.toLowerCase().includes("applewebkit")) {
		console.log("Safari (WebKit) Marquee Width fix (letter-spacing: -0.12vw;)")
		return "letter-spacing: -0.12vw;"
	}
	// Firefox (Gecko)などはUA的に引っかからないはず
	return "";
})
</script>

<template>
	<div ref="container" :class="`vgeek-marquee-container ${motionReduced ? 'motion-reduced ' : ''} ${xl || md ? `breakpoint-${xl ? 'xl' : 'md'}` : ''}`">
		<client-only>
			<Vue3Marquee :duration="motionReduced ? 0 : 50">
				<span
					:style="addStyle"
					:class="`vgeek-marquee tw:text-stone-500/75 ${motionReduced ? 'motion-reduced ' : ''} ${xl || md ? `breakpoint-${xl ? 'xl' : 'md'}` : ''}`">
					Vgeek Production
				</span>
			</Vue3Marquee>
		</client-only>
	</div>
</template>

<style lang="less" scoped>
.vgeek-marquee-container {
	position: absolute;
	z-index: 0;
	overflow: hidden;
	width: 100%;
	top: calc(var(--tw-spacing) * 40);

	&.breakpoint-xl {
		top: calc(var(--tw-spacing) * 28);
	}

	&.motion-reduced.breakpoint-md {
		width: unset;
		height: 100%;
		top: 0;
	}
}

.vgeek-marquee {
	user-select: none;
	z-index: 0;
	display: inline-block;
	font-weight: bold;
	font-size: 50vw;
	margin-inline: .5ex;

	&.breakpoint-xl {
		font-size: 15vw;
	}

	&.motion-reduced {
		font-size: 11.5vw;
		margin-inline: unset;

		&.breakpoint-md {
			font-size: calc(calc(100vh - calc(var(--tw-spacing) * 40)) / 100 * 11);
			writing-mode: vertical-rl;
		}
	}
}
</style>
