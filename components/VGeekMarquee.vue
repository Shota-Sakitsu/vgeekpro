<script setup lang="ts">
import {breakpointsTailwind} from "@vueuse/core";

const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
const printPaper = useMediaQuery("print");
const motionReduced = computed(() => reduceMotion.value || printPaper.value);
const breakpoint = useBreakpoints(breakpointsTailwind);
const xl = breakpoint.greaterOrEqual("xl");
const md = breakpoint.smallerOrEqual("md");
</script>

<template>
	<div :class="`vgeek-marquee-container ${motionReduced ? 'motion-reduced ' : ''} ${xl || md ? `breakpoint-${xl ? 'xl' : 'md'}` : ''}`">
		<client-only>
			<Vue3Marquee :duration="motionReduced ? 0 : 50">
				<span
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

	&.breakpoint-xl {
		font-size: 15vw;
	}

	&.motion-reduced {
		font-size: 11.5vw;

		&.breakpoint-md {
			font-size: calc(calc(100vh - calc(var(--tw-spacing) * 40)) / 100 * 11);
			writing-mode: vertical-rl;
		}
	}
}
</style>
