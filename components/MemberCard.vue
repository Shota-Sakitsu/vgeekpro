<script lang="ts" setup>
import UpperBodyImage from "~/components/UpperBodyImage.vue";

type MemberCardAttributes = {
	name: string,
	yomi: string,
	profileId: string,
	imageId: string,
	imageAlt: string,
}

const {locale, t} = useI18n();

const props = defineProps<MemberCardAttributes>();
</script>

<template>
	<section class="tw:items-center d-flex flex-column" :id="`member-card-${props.profileId.replaceAll('_', '-')}`">
		<UpperBodyImage :alt="props.imageAlt" :isDisableMarginTopExpand="true" :memberId="props.imageId"/>
		<div class="tw:leading-loose tw:text-black d-flex flex-column flex-grow-1 mb-4">
			<p class="font-slogan tw:text-center font-size my-auto" v-text="locale == 'ja' ? props.name : props.yomi"></p>
			<p class="font-slogan tw:text-center font-size phonetic mt-2 mb-0" v-text="locale == 'ja' ? props.yomi : props.name "></p>
		</div>
		<div class="d-flex flex-column tw:text-white flex-shrink-1 mt-auto">
			<NuxtLinkLocale :to="`/talents/${props.profileId}`" class="tw:self-stretch tw:rounded-full tw:bg-rose-500 tw:hover:bg-rose-700 tw:px-8 tw:py-4 tw:text-center" rel="noopener noreferrer">
				{{ t("topPage.toProfilePage") }}
			</NuxtLinkLocale>
		</div>
	</section>
</template>

<style scoped>
.font-size {
	font-size: 1.875rem;
	line-height: 1.2;

	&.phonetic {
		font-size: calc(1.875rem * 0.5);
	}
}

@media (width >= 80rem) {
	.font-size {
		font-size: 3rem;

		&.phonetic {
			font-size: calc(3rem * 0.5);
		}
	}
}
</style>
