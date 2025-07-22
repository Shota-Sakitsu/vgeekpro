<script lang="ts" setup>
definePageMeta({
	layout: 'member-page'
})
const name = "狐炎尾";
const yomi = "Kitune Enbi";
const description = "Happy prototyping!! 好奇心でカタチ創って、遊んでやろう！";
const imageId = "kitune_enbi";
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
				3Dプリンターをはじめとした個人で出来るDIY手法に興味がある化け狐！
				モノづくりとアソビが得意！動画作りや配信、人に見てもらう形に整えるのはまだ苦手…
				モノづくりの手法/ソフト/知識が個人の手元インターネット時代だからこそ、好奇心をカタチにする楽しさをお届けするのが目標です！
			</ProfileHead>
			<div class="tw:w-fit tw:flex tw:flex-col tw:xl:flex-row tw:xl:flex-wrap tw:justify-between tw:items-center tw:gap-4">
				<XButtonLink screen-name="KituneEnbiVT"/>
				<YouTubeChannel handle="KituneEnbiVT"/>
				<OtherSiteLink href="https://kozusha.com/member_V/EnbiVT.html">屋号「好事舎」サイト</OtherSiteLink>
			</div>
		</section>
	</section>
</template>
