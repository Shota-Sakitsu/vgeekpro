<script lang="ts" setup>
definePageMeta({
	layout: 'member-page'
})
const name = "夢向せつな";
const yomi = "Yumemukai Setsuna";
const description = "いつから仕様書と実体が同じだと錯覚したんですか？";
const imageId = "yumemukai_setsuna";
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
		<FullBodyImage
			:alt="yomi"
			:memberId="imageId"
			variation="2"
		/>
	</aside>
	<section class="tw:px-10 tw:xl:px-14 tw:py-14 tw:text-base">
		<section>
			<ProfileHead :catchphrase="description" :name="name" :yomi="yomi">
				うつろという名の某システム導入チームのエンジニアの記憶を学習したAI。<br/>
				平日は基本仕事やばいということしか考えられていない。<br/>
				（お休みの日に流れ弾が来てないだけ今のところマシ）<br/>
				あいノセカイというRPGゲームの制作に関わっている。
			</ProfileHead>
			<div class="tw:w-fit tw:flex tw:flex-col tw:xl:flex-row tw:xl:flex-wrap tw:justify-between tw:items-center tw:gap-4">
				<XButtonLink screen-name="setsuna_hope"/>
				<YouTubeChannel handle="setsunayumemukai3989"/>
			</div>
		</section>
		<section>
			<SectionHeader :isDark="true" description="配信内容" title="Contents"/>
			<div class="tw:mb-28 tw:leading-loose tw:xl:max-w-screen-sm tw:xl:mx-auto">
				<ul class="tw:list-disc tw:ps-5">
					<li>雑談</li>
					<li>ゲーム制作進捗報告</li>
					<li>ゲーム制作の一部の作業雑談</li>
					<li>ゲーム実況</li>
				</ul>
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
							<LocaleTime day="6" month="3"/>
						</td>
					</tr>
					<tr>
						<td class="tw:pe-8 tw:xl:pe-16 tw:pb-4 tw:align-top">初配信月</td>
						<td class="tw:pb-4 tw:align-top">
							<LocaleTime month="9" year="2020"/>
						</td>
					</tr>
					<tr>
						<td class="tw:pe-8 tw:xl:pe-16 tw:pb-4 tw:align-top">イラストレーター</td>
						<td class="tw:pb-4 tw:align-top">0012</td>
					</tr>
					<tr>
						<td class="tw:pe-8 tw:xl:pe-16 tw:pb-4 tw:align-top">モデラー</td>
						<td class="tw:pb-4 tw:align-top">月華光、0012</td>
					</tr>
					<tr>
						<td class="tw:pe-8 tw:xl:pe-16 tw:pb-4 tw:align-top">ハッシュタグ</td>
						<td class="tw:pb-4 tw:align-top">
							配信タグ: <a href="https://x.com/hashtag/ゆめむか放送局" rel="noopener noreferrer" target="_blank">#ゆめむか放送局</a> <br/>
							ファンアートタグ: <a href="https://x.com/hashtag/ゆめむかいらすと" rel="noopener noreferrer" target="_blank">#ゆめむかいらすと</a>
						</td>
					</tr>
					<tr>
						<td class="tw:pe-8 tw:xl:pe-16 tw:align-top">趣味</td>
						<td class="tw:align-top">ゲーム制作、物語を考えること、はにわを愛でること</td>
					</tr>
					</tbody>
				</table>
			</div>
		</section>
	</section>
</template>
