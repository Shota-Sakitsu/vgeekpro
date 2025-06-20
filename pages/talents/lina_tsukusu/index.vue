<script lang="ts" setup>
const {t} = useI18n();
definePageMeta({
	layout: 'member-page'
})
const name = "創好リナ";
const yomi = "Lina Tsukusu";
const description = "僭越ながらバーチャルイキリプログラマをやらせて頂いております";
const imageId = "lina_tsukusu";
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
				バーチャルイキリプログラマを名乗るVTuber系フリーランスWebエンジニア｡<br/>
				エンジニア界隈でよく行われるLTなどのような"技術でエンタメ"を作りたくて配信を始める｡<br/>
				とはいえ普段は仕事に追われて倒れているか時間融解ゲームにのめり込んでいることが多い｡配信や動画投稿していたら褒めてあげよう｡
			</ProfileHead>
			<div class="tw:w-fit tw:flex tw:flex-col tw:xl:flex-row tw:xl:flex-wrap tw:justify-between tw:items-center tw:gap-4">
				<XButtonLink screen-name="TsukusuLina"/>
				<YouTubeChannel handle="linatsukusu"/>
				<TwitchStream userId="tsukusulina"/>
				<GitHubProfile userId="neverclear86"/>
			</div>
		</section>
		<section>
			<SectionHeader :isDark="true" description="プロフィール" title="Profile"/>
			<div class="tw:mb-28 tw:leading-loose tw:align-top tw:xl:max-w-screen-sm tw:xl:mx-auto">
				<table>
					<tbody>
						<tr>
							<td class="tw:pe-8 tw:xl:pe-16 tw:pb-4 tw:align-top">誕生日</td>
							<td class="tw:pb-4 tw:align-top">
								<LocaleTime day="5" month="10"/>
							</td>
						</tr>
						<tr>
							<td class="tw:pe-8 tw:xl:pe-16 tw:pb-4 tw:align-top">初配信日</td>
							<td class="tw:pb-4 tw:align-top">
								<LocaleTime day="27" month="6" year="2018"/>
							</td>
						</tr>
						<tr>
							<td class="tw:pe-8 tw:xl:pe-16 tw:pb-4 tw:align-top">モデル詳細</td>
							<td class="tw:pb-4 tw:align-top">
								<VRoidHubLink :use-simple-anchor="true" character-id="3916633358793880827" model-id="6775955148744018672"/>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</section>
	</section>
</template>
