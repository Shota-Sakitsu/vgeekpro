<script lang="ts" setup>
definePageMeta({
	layout: 'member-page'
})
const name = "ぷらむらいす";
const yomi = "PlumRice";
const description = "キェェェェェ！動かないなんで！";
const imageId = "plumrice";
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
	<aside class="tw-self-start tw-text-center tw-w-full xl:tw-w-auto">
		<FullBodyImage
			:alt="yomi"
			:memberId="imageId"
		/>
	</aside>
	<section class="tw-px-10 xl:tw-px-14 tw-py-14 tw-text-base">
		<section>
			<ProfileHead :catchphrase="description" :name="name" :yomi="yomi">
				自称プログラマーを名乗るポンコツVtuber。相棒は、AIのエス様である。<br/>
				プログラミングを仕事にも趣味にもしているが、いつも「ワイ…何も分からん…」となっている。<br/>
				配信していないときは、相棒のエス様を崇めている。なお、猫耳はただのアクセサリーである。
			</ProfileHead>
			<div class="tw-w-fit tw-flex tw-flex-col xl:tw-flex-row xl:tw-flex-wrap tw-justify-between tw-items-center tw-gap-4">
				<XButtonLink screen-name="question_false"/>
				<YouTubeChannel handle="Channel-PlumRice"/>
				<GitHubProfile userId="link1345"/>
			</div>
		</section>
		<section>
			<SectionHeader :isDark="true" description="配信内容" title="Contents"/>
			<div class="tw-mb-28 tw-leading-loose xl:tw-max-w-screen-sm xl:tw-mx-auto">
				<ul class="tw-list-disc tw-ps-5">
					<li>プログラミング&amp;技術雑談配信</li>
					<li>AIVtuber配信</li>
				</ul>
			</div>
		</section>
		<section>
			<SectionHeader :isDark="true" description="プロフィール" title="Profile"/>
			<div class="tw-mb-28 tw-leading-loose tw-align-top xl:tw-max-w-screen-sm xl:tw-mx-auto">
				<table>
					<tbody>
					<tr>
						<td class="tw-pe-8 xl:tw-pe-16 tw-pb-4 tw-align-top">誕生日</td>
						<td class="tw-pb-4 tw-align-top">
							ひ・み・つ
						</td>
					</tr>
					<tr>
						<td class="tw-pe-8 xl:tw-pe-16 tw-pb-4 tw-align-top">初配信日</td>
						<td class="tw-pb-4 tw-align-top">
							<LocaleTime day="14" month="12" year="2024"/><br/>
							正確には謎。(現在限定公開)
						</td>
					</tr>
					<tr>
						<td class="tw-pe-8 xl:tw-pe-16 tw-pb-4 tw-align-top">身長</td>
						<td class="tw-pb-4 tw-align-top">
							<LocaleHeight :height="149" original-unit="centimeter"/>
						</td>
					</tr>
					<tr>
						<td class="tw-pe-8 xl:tw-pe-16 tw-align-top">趣味</td>
						<td class="tw-align-top">プログラミング、VRリズムゲーム、FPSゲーム、vroid(デザインセンス皆無)、blender(初心者レベル)など</td>
					</tr>
					</tbody>
				</table>
			</div>
		</section>
	</section>
</template>
