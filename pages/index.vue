<script lang="ts" setup>

import {customDateFormatter} from "~/composables/ExtendUtils";
import VGeekMarquee from "~/components/VGeekMarquee.vue";

export type Member = {
	name: string,
	yomi: string,
	profileId: string,
	imageId: string,
	imageAlt: string,
	tag: string[],
}

/**
 * メンバー一覧
 *
 * メンバーはこの配列の中に記載してください。
 * この配列の中のデータは`v-for`によるリストレンダリングで自動生成されます。
 * 型は上の`Member`の型定義を確認してください。
 * なお、リストレンダリングの主キーには`profileId`が使用されます。
 */
const members: Member[] = [
	{
		name: "うさねこらーじ",
		yomi: "Usaneko Large",
		profileId: "usaneko_xlarge",
		imageId: "usaneko_xlarge",
		imageAlt: "usaneko_xlarge",
		tag: [
			"security-girl",
			"member"
		],
	},
	{
		name: "陽向あやめ",
		yomi: "HINATA Ayame",
		profileId: "iris2664",
		imageId: "hinata_ayame",
		imageAlt: "HINATA Ayame",
		tag: [
			"security-girl",
			"member"
		],
	},
	{
		name: "椎半音",
		yomi: "Shii Sharp",
		profileId: "shiisharp",
		imageId: "shii_sharp",
		imageAlt: "Shii Sharp",
		tag: [
			"member",
			"csharp",
			"clang",
			"basic",
			"windows-forms",
			"cryptography-research",
			"security-engineer",
			"nessus",
			"programming",
			"game-development",
			"retro-pc",
			"x68000",
			"mz700",
			"pc6000",
			"msx",
			"operating-system",
			"free-bsd",
			"hard-geeks"
		],
	},
	{
		name: "夢向せつな",
		yomi: "Yumemukai Setsuna",
		profileId: "setsuna",
		imageId: "yumemukai_setsuna",
		imageAlt: "setsuna",
		tag: [
			"member",
			"rpg-maker-mz",
			"sqlserver",
			"internet-information-services",
			"windows-server",
			"solid-js",
			"chatgpt"
		],
	},
	{
		name: "小日向がく",
		yomi: "Kohinata Gaku",
		profileId: "kohinata_gaku",
		imageId: "kohinata_gaku",
		imageAlt: "Kohinata Gaku",
		tag: [
			"member",
			"hard-geeks"
		],
	},
	{
		name: "ますかぷる",
		yomi: "Maskaple",
		profileId: "maskaple",
		imageId: "maskaple",
		imageAlt: "Maskaple",
		tag: [
			"member",
			"system-engineer",
			"infrastructure",
			"hardware",
			"network",
			"server",
			"cloud",
			"operating-system",
			"b-to-b",
			"meow"
		],
	},
	{
		name: "にころ・ちゅーりんぐ",
		yomi: "Nicoro Turing",
		profileId: "nicoro_turing",
		imageId: "nicoro_turing",
		imageAlt: "Nicoro Turing",
		tag: [
			"member",
			"hard-geeks"
		],
	},
	{
		name: "乙木イオ",
		yomi: "IO Otogi",
		profileId: "io_otogi",
		imageId: "io_otogi",
		imageAlt: "IO Otogi",
		tag: [
			"member"
		],
	},
	{
		name: "創好リナ",
		yomi: "Lina Tsukusu",
		profileId: "lina_tsukusu",
		imageId: "lina_tsukusu",
		imageAlt: "Lina Tsukusu",
		tag: [
			"member",
			"linux",
			"docker",
			"typescript",
			"deno",
			"svelte",
			"web",
			"backend",
			"frontend",
			"freelance",
			"resonite",
			"vrchat",
			"lt",
			"minecraft"
		],
	},
	{
		name: "珠響そうき",
		yomi: "Tamayura Souki",
		profileId: "tamayura_souki",
		imageId: "tamayura_souki",
		imageAlt: "Tamayura Souki",
		tag: [
			"member"
		],
	},
	{
		name: "凪なぎさ",
		yomi: "Nagi Nagisa",
		profileId: "nagi_nagisa",
		imageId: "nagi_nagisa",
		imageAlt: "Nagi Nagisa",
		tag: [
			"member"
		],
	},
	{
		name: "坂道輪",
		yomi: "Rin Sakamichi",
		profileId: "rin_sakamichi",
		imageId: "rin_sakamichi",
		imageAlt: "rin_sakamichi",
		tag: [
			"member"
		],
	},
	{
		name: "Kazuryu",
		yomi: "Kazuryu",
		profileId: "kazuryu",
		imageId: "kazuryu",
		imageAlt: "kazuryu",
		tag: [
			"member",
			"hard-geeks"
		],
	},
	{
		name: "まりんとすふぃあ",
		yomi: "marine&sphere",
		profileId: "marine_sphere",
		imageId: "marine_sphere",
		imageAlt: "marine_sphere",
		tag: [
			"member"
		],
	},
	{
		name: "やすビディア",
		yomi: "YASUVIDIA",
		profileId: "yasuvidia",
		imageId: "yasuvidia",
		imageAlt: "YASUVIDIA",
		tag: [
			"member"
		],
	},
	{
		name: "崎津 祥汰",
		yomi: "Shota Sakitsu",
		profileId: "shota_sakitsu",
		imageId: "shota_sakitsu",
		imageAlt: "Shota Sakitsu",
		tag: [
			"staff",
			"backend",
			"frontend",
			"infrastructure",
			"csharp",
			"typescript",
		],
	},
	{
		name: "黒音キト",
		yomi: "Kuroné Kito",
		profileId: "kurone_kito",
		imageId: "kurone_kito",
		imageAlt: "Kuroné Kito",
		tag: [
			"automation",
			"csharp",
			"docker",
			"frontend",
			"linux",
			"macos",
			"member",
			"meow",
			"nodejs",
			"react",
			"solid-js",
			"typescript",
			"udonsharp",
			"unity3d",
			"ui-ux",
			"hard-geeks"
		],
	},
	{
		name: "白犬コマ",
		yomi: "Siroinu Koma",
		profileId: "koma_siroinu",
		imageId: "koma_siroinu",
		imageAlt: "Siroinu Koma",
		tag: [
			"member"
		],
	},
	{
		name: "ぷらむらいす",
		yomi: "PlumRice",
		profileId: "plumrice",
		imageId: "plumrice",
		imageAlt: "plumrice",
		tag: [
			"member",
			"backend",
			"frontend",
			"csharp",
			"typescript",
		],
	},
	{
		name: "三峰スズ",
		yomi: "Mitsumine Suzu",
		profileId: "suzu_mitsumine",
		imageId: "suzu_mitsumine",
		imageAlt: "Mitsumine Suzu",
		tag: [
			"member",
			"hard-geeks"
		],
	},
	{
		name: "猫耳ミクス",
		yomi: "Nekomix",
		profileId: "nekomix",
		imageId: "nekomix",
		imageAlt: "Nekomix",
		tag: [
			"member"
		],
	},
	{
		name: "知推カナエ",
		yomi: "Chisui Kanae",
		profileId: "chisui_kanae",
		imageId: "chisui_kanae",
		imageAlt: "Chisui Kanae",
		tag: [
			"member"
		],
	},
	{
		name: "狐炎尾",
		yomi: "Kitune Enbi",
		profileId: "kitune_enbi",
		imageId: "kitune_enbi",
		imageAlt: "Kitune Enbi",
		tag: [
			"member"
		],
	},
];

type Unit = {
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

const Units: Unit[] = [
	{
		unitId: "security_girl",
		unitName: "セキュリティガール",
		unitYomi: "Security Girl",
		members: [
			{
				name: "うさねこらーじ",
				yomi: "Usaneko Large",
			},
			{
				name: "陽向あやめ",
				yomi: "HINATA Ayame",
			},
		],
	},
	{
		unitId: "hard_geeks",
		unitName: "はーどぎーく！",
		unitYomi: "HARD GEEKS!",
		members: [
			{
				name: "椎半音",
				yomi: "Shii Sharp",
			},
			{
				name: "三峰スズ",
				yomi: "Suzu Mitsumine",
			},
			{
				name: "黒音キト",
				yomi: "Kuroné Kito",
			},
			{
				name: "Kazuryu",
				yomi: "Kazuryu",
			},
			{
				name: "にころ・ちゅーりんぐ",
				yomi: "Nicoro Turing",
			},
			{
				name: "小日向がく",
				yomi: "Gaku Kohinata",
			},
		],
	},
];

const {locale, t} = useI18n();

const mailAddress = "naomi.lilienthal.jpn@gmail.com";

const thisYear = toRef((new Date().getFullYear()))
const route = useRoute()

const currentlySelectedTag = toRef("all");

const displayMembers = computed(() => {
	const returnBuffer: Member[] = [];
	for (const member of members) {
		if (checkTag(currentlySelectedTag.value, member.tag)) {
			returnBuffer.push(member);
		}
	}
	return returnBuffer;
})

const showAllTags = toRef(false);

const mailModal = toRef(false);

const showContributorsModal = toRef(false);

let commandCheckerCount = 0;

const konamiCommandPatterns = [
	"arrowup",
	"arrowup",
	"arrowdown",
	"arrowdown",
	"arrowleft",
	"arrowright",
	"arrowleft",
	"arrowright",
	"b",
	"a",
];

if (import.meta.client) {
	let keyBuffer: string[] = [];
	let timerToken: number | undefined;
	window.addEventListener("keydown", (event) => {
		commandCheckerCount++;
		const currentCommandCheckerCount = commandCheckerCount;
		console.debug(event);
		window.clearTimeout(timerToken);
		switch (event.key.toLowerCase()) {
			case "a":
			case "b":
			case "arrowup":
			case "arrowdown":
			case "arrowleft":
			case "arrowright":
				keyBuffer.push(event.key.toLowerCase());
				break;
		}
		if (keyBuffer.length >= 10) {
			setTimeout(() => {
				console.debug("Checker Start: ", keyBuffer);
				//↑↑↓↓←→←→BA
				let checkStarted = false;
				while (true) {
					if (commandCheckerCount != currentCommandCheckerCount) return;
					let startIndex = keyBuffer.indexOf("arrowup", checkStarted ? 1 : 0)
					let checkBuffer = keyBuffer.slice(startIndex, keyBuffer.length);
					console.debug("Checker Start Index: ", startIndex);
					console.debug("Check Buffer: ", checkBuffer);
					if (checkBuffer.length < 10) {
						console.debug("Not Enough Check Buffer Length")
						return
					}
					let pointer = 0;
					let checkOk = false;
					for (const checkValue of checkBuffer) {
						if (checkValue != konamiCommandPatterns[pointer]) {
							break;
						} else {
							if (pointer == 9) checkOk = true;
						}
						pointer++;
					}
					if (checkOk) {
						console.debug("Check OK");
						showContributorsModal.value = true;
						keyBuffer = [];
						break;
					} else {
						console.debug("Check Failed: ", checkBuffer)
					}
					keyBuffer = checkBuffer
					checkStarted = true;
				}
			}, 250)
		}
	})
	window.addEventListener("keyup", () => {
		window.clearTimeout(timerToken);
		timerToken = window.setTimeout(() => {
			if (keyBuffer.length >= 10) return;
			console.debug("Clear Key");
			keyBuffer = [];
		}, 15 / 60 * 1000);
	})
}

const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
const printPaper = useMediaQuery("print");

onMounted(async () => {
	if (route.hash) {
		await nextTick()
		const elementId = route.hash.substring(1)
		const element = document.getElementById(elementId)

		console.log(elementId, element)
		console.time("scroll")

		const handler = (time: number = 0) => {
			if (element) {
				element.scrollIntoView({
					behavior: "smooth",
					block: "center",
				})
				console.timeEnd("scroll")
			} else {
				if ((Date.now() - time) < 2500) {
					setTimeout(handler, 15, time);
				}
			}
		};
		setTimeout(handler, 15, Date.now());
	}
})
</script>

<template>
	<CommonlyHeader/>
	<main id="main-contents" class="tw:w-full tw:flex tw:flex-col tw:items-center">

		<div id="home" class="tw:overflow-hidden tw:relative tw:w-full tw:h-svh tw:xl:h-svh">
			<div class="tw:relative tw:w-[400svw] tw:left-[-150svw] tw:xl:left-0 tw:xl:w-full tw:h-full">
				<div
					class="tw:z-10 tw:relative tw:w-full tw:h-svh tw:bg-gradient-to-b tw:from-transparent tw:from-40% tw:xl:from-60% tw:to-stone-900">
				</div>
				<img alt="top illust" class="tw:object-contain tw:xl:object-cover" src="/images/topillust.webp"
					 style="position:absolute;height:100%;width:100%;left:0;top:0;right:0;bottom:0;color:transparent">
				<div
					class="tw:z-20 tw:absolute tw:ps-[3vw] tw:w-full tw:bottom-14 tw:whitespace-nowrap tw:text-center tw:text-[6vw] font-slogan">
					Reality Meets Virtuality
				</div>
			</div>
		</div>

		<section id="about" class="bg-maze tw:w-full">
			<div class="tw:relative tw:bg-gradient-to-b tw:from-stone-600 tw:from-60%">
				<div class="tw:z-0 tw:absolute tw:top-40 tw:xl:top-28 tw:overflow-hidden tw:w-full">
					<VGeekMarquee/>
				</div>
				<div class="tw:z-10 tw:relative tw:flex tw:flex-col tw:xl:flex-row tw:justify-center tw:items-center">
					<section class="tw:px-10 tw:xl:px-14 tw:py-14 tw:text-base">
						<section>
							<SectionHeader :description="t('topPage.aboutVgeekPro')" :isDark="true" title="About"
										   titleColor="white"/>
							<ProfileHead :isDisableCatchphraseBrackets="true" catchphrase="Reality meets Virtuality"
										 name="ぶいぎーく！" yomi="Vgeek Production">
								{{ t('topPage.vgeekDescription') }}
							</ProfileHead>
						</section>
					</section>
				</div>
			</div>
		</section>

		<section id="members" class="tw:w-full">
			<div class="tw:relative tw:bg-gradient-to-b tw:from-stone-100 tw:from-[calc(100%-8rem)]">
				<div class="tw:z-10 tw:relative tw:flex tw:flex-col tw:xl:flex-row tw:justify-center tw:items-center">
					<section class="tw:px-10 tw:xl:px-14 tw:py-10 tw:text-base">
						<section>
							<SectionHeader :description="t('topPage.membersSubtitle')" title="Members" titleColor="black"/>
							<div class="tw:grid tw:pb-20 tw:grid-cols-1 tw:sm:grid-cols-1 tw:xl:grid-cols-2 tw:gap-20">
								<div class="tw:flex">
									<div class="tw:flex-glow tw:flex-auto me-1">
										<BFormFloatingLabel :label="t('topPage.searchByTag')">
											<BFormSelect v-model="currentlySelectedTag">
												<template v-if="!showAllTags">
													<BFormSelectOptionGroup :label="t('topPage.specialTags')">
														<BFormSelectOption v-for="availableTag in specialTags" :key="availableTag" :value="availableTag">
															{{ t(`tagNames.${availableTag}`) }}
														</BFormSelectOption>
													</BFormSelectOptionGroup>
													<BFormSelectOptionGroup :label="t('topPage.unitTags')">
														<BFormSelectOption v-for="availableTag in unitTags" :key="availableTag" :value="availableTag">
															{{ t(`tagNames.${availableTag}`) }}
														</BFormSelectOption>
													</BFormSelectOptionGroup>
													<BFormSelectOptionGroup :label="t('topPage.attributeTags')">
														<BFormSelectOption v-for="availableTag in currentlyAvailableTags" :key="availableTag" :value="availableTag">
															{{ t(`tagNames.${availableTag}`) }}
														</BFormSelectOption>
													</BFormSelectOptionGroup>
												</template>
												<template v-else>
													<BFormSelectOptionGroup :label="t('topPage.allTags')">
														<BFormSelectOption v-for="availableTag in allTags" :key="availableTag" :value="availableTag">
															{{ t(`tagNames.${availableTag}`) }}
														</BFormSelectOption>
													</BFormSelectOptionGroup>
												</template>
											</BFormSelect>
										</BFormFloatingLabel>
									</div>
									<div class="align-items-center tw:flex ms-1">
										<BFormCheckbox v-model="showAllTags">
											<span class="tw:text-black">
												{{ t(`topPage.showAllTags`) }}
											</span>
										</BFormCheckbox>
									</div>
								</div>
							</div>
							<div class="tw:w-full tw:px-[30px]">
								<VideoListBox :members="displayMembers"/>
							</div>
							<div
								class="tw:grid tw:grid-cols-1 tw:sm:grid-cols-2 tw:md:grid-cols-3 tw:2xl:grid-cols-4 tw:gap-20">
								<MemberCard v-for="member in displayMembers" :key="member.profileId" :imageAlt="member.imageAlt" :imageId="member.imageId" :name="member.name" :profileId="member.profileId" :yomi="member.yomi"/>
							</div>
						</section>
					</section>
				</div>
			</div>
		</section>

		<section id="groups" class="bg-maze tw:w-full">
			<div class="tw:relative tw:bg-gradient-to-b tw:from-stone-600 tw:from-60%">
				<div class="tw:z-10 tw:relative tw:flex tw:flex-col tw:xl:flex-row tw:justify-center tw:items-center">
					<section class="tw:px-10 tw:xl:px-14 tw:py-14 tw:text-base">
						<section>
							<SectionHeader :description="t('topPage.groupsSubtitle')" :isDark="true" title="Groups" titleColor="white"/>
							<section>
								<UnitInformation v-for="unit in Units" :key="unit.unitId" :members="unit.members" :unit-id="unit.unitId" :unit-image-alt="unit.unitImageAlt" :unit-image-id="unit.unitImageId" :unit-name="unit.unitName" :unit-yomi="unit.unitYomi"/>
							</section>
						</section>
					</section>
				</div>
			</div>
		</section>

		<section id="link" class="tw:w-full">
			<div class="tw:relative tw:bg-stone-400">
				<div class="tw:px-10 tw:xl:px-14 tw:py-14 tw:text-base">
					<SectionHeader :description="t('topPage.linkSubtitle')" title="Link" titleColor="stone-900"/>
					<div class="tw:leading-loose tw:text-center">
						<div
							class="tw:w-full tw:flex tw:flex-col tw:xl:flex-row tw:xl:flex-wrap tw:justify-between tw:items-center tw:gap-4">
							<a class="tw:self-stretch tw:flex-1 tw:items-center tw:rounded-full tw:bg-rose-500 tw:hover:bg-rose-700 tw:text-white tw:px-8 tw:py-4"
							   href="https://x.com/vgeekproduction" rel="noopener noreferrer" target="_blank">
								{{ t('topPage.xLinkButton') }}
							</a>
							<a class="tw:self-stretch tw:flex-1 tw:items-center tw:rounded-full tw:bg-rose-500 tw:hover:bg-rose-700 tw:text-white tw:px-8 tw:py-4"
							   href="https://www.youtube.com/@vgeekproduction" rel="noopener noreferrer"
							   target="_blank">
								{{ t('topPage.youTubeLinkButton') }}
							</a>
							<button
								class="tw:self-stretch tw:flex-1 tw:items-center tw:rounded-full tw:bg-rose-500 tw:hover:bg-rose-700 tw:text-white tw:px-8 tw:py-4"
								@click.stop="mailModal = !mailModal">
								<i class="bi bi-envelope tw:me-0.5" style="vertical-align: -.125em"></i>
								{{ t('topPage.openMailModal') }}
								<i class="bi bi-box-arrow-up-right tw:ms-0.5"
								   style="font-size: .5em; vertical-align: 1.2em"></i>
							</button>
						</div>
					</div>
				</div>
			</div>
		</section>

		<section id="guideline" class="tw:w-full" lang="ja">
			<div class="tw:relative tw:bg-stone-300 tw:text-stone-900">
				<div class="tw:px-10 tw:xl:px-14 tw:py-14 tw:text-base">
					<SectionHeader :description="t('topPage.guidelineSubtitle')" title="Guideline"/>
					<div class="tw:leading-loose tw:xl:max-w-screen-sm tw:xl:mx-auto">
						<div v-if="locale != 'ja'" class="fs-5 tw:mb-12" lang="en">
							The Guidelines are only valid in the original Japanese language.<br>
							They can be read using translations if necessary,
							but in some cases they may not be correct,
							as the Japanese version takes precedence over any discrepancies
							created by the translations.
						</div>
						<section>
							<p class="tw:mb-6 tw:font-bold">ぶいぎーく！について</p>
							<p class="tw:mb-12">
								「ぶいぎーく！」は個人が運営するIT系VTuber同士が助け合うためのグループです。
								実際の活動は各VTuberに任されており、「ぶいぎーく！」は各VTuberの活動に対する責任を負いません
							</p>
						</section>
						<section>
							<p class="tw:mb-6 tw:font-bold">参加したい方へ</p>
							<section>
								<p class="tw:mb-6">「ぶいぎーく！」では、以下の条件を満たすVTuberの参加をお待ちしています。</p>
								<ul class="tw:mb-6 tw:list-disc tw:ps-5">
									<li>Discord または LINE で運営からの連絡に15日以内に回答できる。</li>
									<li>Xなど上記以外の連絡手段を運営と共有する。</li>
									<li>社会的に不適切な行為（ハラスメント、差別、それらを助長する行為等）を行わない。</li>
									<li>「ぶいぎーく！」のDiscordサーバーや運営とのコミュニケーションを許可なく外部に共有しない。</li>
									<li>本ウェブサイトに掲載するための名前（日本語および英語表記）、立ち絵などの画像、口上、説明文を用意できる。</li>
									<li>メンバーの特別な紹介でない場合、成人している (18歳以上である) こと</li>
								</ul>
							</section>
							<section>
								<p class="tw:mb-6">参加希望者は、以下のいずれかの方法で運営までご連絡ください。</p>
								<ul class="tw:mb-6 tw:list-disc tw:ps-5">
									<li>
										<span class="contact-list-header">Discord</span>
										<span class="me-1">:</span>
										<span class="font-mono">usaneko_xlarge</span>
									</li>
									<li>
										<span class="contact-list-header">X (Twitter)</span>
										<span class="me-1">:</span>
										<a class="font-mono disable-link-icons tw:text-stone-900 text-decoration-none" href="https://x.com/messages/compose?recipient_id=1644686586318327808" rel="noopener noreferrer" target="_blank">@usaneko_xlarge</a>
									</li>
									<li>このページに記載のメールアドレス</li>
								</ul>
							</section>
							<section>
								<p class="tw:mb-6 tw:font-bold">ガイドラインの改訂および一般事項</p>
								<p class="tw:mb-6">本ガイドラインは予告なく追加や修正される場合があります。コンテンツをお楽しみいただく際や二次創作を行う際は、最新の内容をご確認ください。
								</p>
								<p>「ぶいぎーく！」やその二次創作、または本ガイドラインによって生じる損害については一切の責任を負いません。</p>
							</section>
						</section>
					</div>
				</div>
			</div>
		</section>
		<BModal v-model="mailModal" :ok-only="true" :title="t('topPage.mailModalTitle')" title-class="fs-5 tw:text-stone-900">
			<div class="tw:flex tw:flex-col tw:text-white">
				<a :href="`mailto:${mailAddress}`"
				   class="text-decoration-none tw:self-stretch tw:my-2 tw:flex-1 tw:items-center tw:rounded-full tw:bg-rose-500 tw:hover:bg-rose-700 tw:text-white tw:px-8 tw:py-4"
				   rel="noopener noreferrer" target="_blank">
					{{ t('topPage.openMailApp') }}
				</a>
				<a :href="`https://mail.google.com/mail/?extsrc=mailto&url=mailto:${mailAddress}`"
				   class="text-decoration-none tw:self-stretch tw:my-2 tw:flex-1 tw:items-center tw:rounded-full tw:bg-rose-500 tw:hover:bg-rose-700 tw:text-white tw:px-8 tw:py-4"
				   rel="noopener noreferrer" target="_blank">
					{{ t('topPage.openGmail') }}
				</a>
			</div>
		</BModal>
		<client-only>
			<BModal v-model="showContributorsModal" :ok-only="true" body-class="tw:text-stone-900" title="OSINT"
					title-class="fs-2 tw:text-stone-900">
				<div class="container">
					<div class="row">
						<span class="fs-3">コントリビュータ</span>
						<ul class="list-group">
							<li class="list-group-item">
								<span class="fs-4">うさねこらーじ</span>
								<ul class="list-group">
									<li class="list-group-item list-group-item-info">主な貢献</li>
									<li class="list-group-item">プロジェクトオーナー</li>
									<li class="list-group-item">プロトタイプ制作</li>
								</ul>
							</li>
							<li class="list-group-item">
								<span class="fs-4">羽山 祥樹</span>
								<ul class="list-group">
									<li class="list-group-item list-group-item-info">主な貢献</li>
									<li class="list-group-item">デザイン最適化</li>
									<li class="list-group-item">レスポンシブ対応</li>
								</ul>
							</li>
							<li class="list-group-item">
								<span class="fs-4">崎津 祥汰</span>
								<ul class="list-group">
									<li class="list-group-item list-group-item-info">主な貢献</li>
									<li class="list-group-item">新機能追加</li>
									<li class="list-group-item">YouTube APIプロキシ提供</li>
								</ul>
							</li>
							<li class="list-group-item">
								<span class="fs-4">参加タレントの皆様</span>
								<ul class="list-group">
									<li class="list-group-item list-group-item-info">主な貢献</li>
									<li class="list-group-item">自己紹介の提供</li>
									<li class="list-group-item">バグや改善案の提示</li>
									<li class="list-group-item">ぶいぎーく！への参加</li>
								</ul>
							</li>
							<li class="list-group-item">
								<span class="fs-4">Special Thanks</span>
								<ul class="list-group">
									<li class="list-group-item list-group-item-info">テストや応援などを行ってくださる</li>
									<li class="list-group-item">各配信者のファンの皆様</li>
									<li class="list-group-item">ふとした時に流れてきたリスナーの皆様</li>
									<li class="list-group-item">このサイトや各チャンネル・ストリームにアクセスした皆様</li>
								</ul>
							</li>
						</ul>
					</div>
				</div>
			</BModal>
		</client-only>
	</main>
	<footer class="tw:my-16 tw:footer tw:text-base tw:text-center">
		<span>
			<a class="tw:text-white text-decoration-none tw:inline tw:xl:hidden" @click.stop="showContributorsModal = true">
				<client-only>Copyright &copy; 2023, {{ thisYear }} Usaneko Large</client-only>
			</a>
			<a class="tw:text-white text-decoration-none tw:hidden tw:xl:inline">
				<client-only>Copyright &copy; 2023, {{ thisYear }} Usaneko Large</client-only>
			</a>
		</span>
		<span>
			<span v-if="reduceMotion || printPaper">
				<br>
				<span v-if="reduceMotion">
					アニメーション削減が有効です。
				</span>
				<span v-else-if="printPaper">
					{{ customDateFormatter(new Date()) }}印刷<br>
					掲載されている内容は印刷当時のものです。
				</span>
			</span>
		</span>
	</footer>
</template>

<style lang="less" scoped>
optgroup {
	font-style: normal;
}

.contact-list-header {
	display: inline-block;
	width: 11.25ex;
	// 現状は Firefox だけで機能する。実装バージョンはFx55(2017/08/08)
	// Chrome は10年以上前からテスト版で、この値は使えない
	// Chrome も Blink に fork してから対応したので Safari は現状、対応すらしていない
	// テキストのレンダリングに関しては Firefox が一番。
	text-justify: inter-character;
	text-align: justify;
	text-align-last: justify;
}
</style>
