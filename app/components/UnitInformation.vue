<script lang="ts" setup>
import UnitImage from "~/components/UnitImage.vue";

type UnitInformation = {
	unitId: string,
	unitName: string,
	unitYomi: string,
	unitImageId?: string,
	unitImageAlt?: string,
	members: UnitMember[],
};

type UnitMember = {
	name: string,
	yomi: string,
}

const props = defineProps<UnitInformation>();
const {locale, t} = useI18n();
</script>

<template>
	<section>
		<UnitImage :alt="props.unitImageAlt ?? props.unitYomi" :unitId="props.unitImageId ?? props.unitId"/>
		<div class="tw:mb-28 tw:leading-loose tw:text-white">
			<p class="font-slogan tw:text-center tw:text-3xl tw:xl:text-5xl" v-text="locale == 'ja' ? props.unitName : props.unitYomi"></p>
			<p class="font-slogan tw:text-center tw:mb-14" v-text="locale == 'ja' ? props.unitYomi : props.unitName "></p>
			<ul class="tw:mb-6 tw:list-disc tw:ps-5">
				<li v-for="(member, index) in props.members" :key="index" v-text="locale == 'ja' ? member.name : member.yomi"></li>
			</ul>
		</div>
	</section>
</template>
