<script setup lang="ts">
useSeoMeta({
	title: "コミックマーケット105特設ページ",
	description: "ぶいぎーく！メンバーのコミックマーケット参加情報を確認出来ます。"
})
</script>

<template>
	<CommonlyHeader/>
	<main id="main-contents" class="tw:pt-40 tw:w-full tw:flex tw:flex-col tw:items-center">
		<CommonHead heading-level="2" ja="コミックマーケット 105 特設ページ" en="Comiket #105 special page"/>
		<hr class="py-1 w-75 tw:border-t-4 tw:border-t-fuchsia-300"/>
		<CommonHead heading-level="3" ja="" en=""/>
		<p class="tw:py-8">
			コミックマーケット105は2024年12月29日および30日に無事に開催されました。<br>
			参加者の皆さん、そして運営委員の皆様お疲れ様でした。
		</p>
		<hr class="py-1 w-50 tw:border-t-2 tw:border-t-amber-300"/>
		<section class="container-xl">
			<CommonHead heading-level="3" ja="参加情報" en="Store information"/>
			<table class="table table-dark table-hover table-bordered tw:border-lime-700 align-middle">
				<thead>
				<tr>
					<th scope="colgroup" colspan="2">
						名称
					</th>
					<th scope="col" rowspan="2">
						参加形態
					</th>
					<th scope="col" rowspan="2">
						曜日(日程)
					</th>
					<th scope="colgroup" colspan="3">
						配置
					</th>
					<th scope="col" rowspan="2">
						ジャンル
					</th>
				</tr>
				<tr>
					<th scope="col">メンバー</th>
					<th scope="col">サークル名</th>
					<th scope="col">ホール</th>
					<th scope="col">ブロック</th>
					<th scope="col">スペース</th>
				</tr>
				</thead>
				<tbody>
				<tr>
					<th scope="row">うさねこらーじ</th>
					<th scope="row" rowspan="2">
						うさねこらーじ
					</th>
					<td>サークル参加</td>
					<td rowspan="2">月曜日(2日目)</td>
					<td rowspan="2">東7</td>
					<td rowspan="2">v</td>
					<td rowspan="2">29b</td>
					<td rowspan="2">VTuber</td>
				</tr>
				<tr>
					<th scope="row">陽向あやめ</th>
					<td>売り子参加</td>
				</tr>
				<tr>
					<th scope="row">椎 半音</th>
					<th scope="row">
						椎半音GAMES
					</th>
					<td>サークル参加</td>
					<td>月曜日(2日目)</td>
					<td>東7</td>
					<td>w</td>
					<td>19a</td>
					<td>VTuber</td>
				</tr>
				<tr>
					<th scope="row">三峰スズ</th>
					<th scope="row">
						三峰スズ工房
					</th>
					<td>サークル参加</td>
					<td>月曜日(2日目)</td>
					<td>東7</td>
					<td>w</td>
					<td>19b</td>
					<td>VTuber</td>
				</tr>
				<tr>
					<th scope="row">珠響そうき</th>
					<th scope="row">
						Visterminal
					</th>
					<td>サークル参加</td>
					<td>月曜日(2日目)</td>
					<td>西2</td>
					<td>か</td>
					<td>44a</td>
					<td>歴史・創作(文芸・小説)</td>
				</tr>
				<tr>
					<th scope="row">夢向せつな</th>
					<th scope="row">
						ゆめむかい工房
					</th>
					<td>サークル参加</td>
					<td>月曜日(2日目)</td>
					<td>西2</td>
					<td>き</td>
					<td>50b</td>
					<td>同人ソフト</td>
				</tr>
				</tbody>
			</table>
		</section>
		<div class="tw:my-10 tw:w-full tw:flex tw:justify-around tw:items-start">
			<NuxtLinkLocale to="/" class="tw:self-stretch tw:flex-col tw:shrink tw:items-center tw:rounded-full tw:bg-rose-500 tw:hover:bg-rose-700 tw:text-white tw:px-8 tw:py-4" rel="noopener noreferrer">
				トップに戻る
			</NuxtLinkLocale>
		</div>
	</main>
</template>
