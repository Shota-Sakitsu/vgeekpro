<script lang="ts" setup>
definePageMeta({
	layout: 'member-page'
})
const name = "凪なぎさ";
const yomi = "Nagi Nagisa";
const description = "ノーバグ・ノーライフ";
const imageId = "nagi_nagisa";
useSeoMeta({
	title: name,
	description,
	ogType: "profile",
	ogTitle: name,
	ogDescription: description,
	ogImageUrl: `https://vgeekpro.com/images/members/${imageId}/upper_body.webp`,
	profileUsername: name,
	twitterCard: "summary",
	twitterSite: "@vgeekproduction",
})
</script>

<template>
	<aside class="tw:self-start tw:text-center tw:w-full tw:xl:w-auto">
		<FullBodyImage
			:alt="yomi"
			:memberId="imageId"
		/>
	</aside>
	<section class="tw:px-10 tw:xl:px-14 tw:py-14 tw:text-base">
		<section>
			<ProfileHead :catchphrase="description" :name="name" :yomi="yomi">
				ふわふわと海から流されてきたVtuber。<br/>
				プログラミング、ゲーム制作、Webサービス開発など、クリエイティブな配信をしています。<br/>
				バグと戦いつつも、リスナーのみんなと一緒に、面白くて新しい世界を作っていきたい！
			</ProfileHead>
			<div class="tw:w-fit tw:flex tw:flex-col tw:xl:flex-row tw:xl:flex-wrap tw:justify-between tw:items-center tw:gap-4">
				<XButtonLink screen-name="nagi_nagisachan"/>
				<YouTubeChannel handle="NagiNagisaCh"/>
			</div>
		</section>
	</section>
</template>
