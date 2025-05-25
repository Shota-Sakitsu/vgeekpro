<script setup lang="ts">
const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
const printPaper = useMediaQuery("print");
const motionReduced = computed(() => reduceMotion.value || printPaper.value);
</script>

<template>
	<client-only>
		<template #default>
			<Vue3Marquee :duration="motionReduced ? 0 : 50">
				<span
					:class="`tw:select-none tw:z-0 tw:inline-block tw:font-bold tw:text-stone-500/75 ${motionReduced ? 'tw:text-[12vw] tw:text-center' : 'tw:text-[50vw] tw:xl:text-[15vw]'}`">
					Vgeek Production
				</span>
			</Vue3Marquee>
		</template>
		<template #fallback>
			<span
				:class="`tw:select-none tw:z-0 tw:inline-block tw:font-bold tw:text-stone-500/75 ${motionReduced ? 'tw:text-[12vw] tw:text-center' : 'tw:text-[50vw] tw:xl:text-[15vw]'}`">
				Vgeek Production
			</span>
		</template>
	</client-only>

</template>

<style scoped>

</style>
