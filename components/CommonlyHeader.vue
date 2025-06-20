<script lang="ts" setup>
import {TransitionPresets} from "@vueuse/core";
import type {Locale} from "@intlify/core-base";

const {locale, setLocale, t} = useI18n();
const measurementUnit = useCookie("intl-measurement");
const calenderType = useCookie("intl-calender");
const isUsing24HourClock = useCookie("intl-24clock");

const localeUpdate = () => {
	measurementUnit.value = unitType.value;
	calenderType.value = calender.value;
	isUsing24HourClock.value = clock24h.value ? "true" : "false";
	setLocale(selectedDialect.value);
}

const localeShortName = {
	"ja": "日本",
	"ja-JP-x-dialect-kansai": "関西",
	"ja-JP-x-dialect-northkyushu": "九州",
	"ja-JP-x-dialect-ryukyu": "沖縄",
	"en-GB": "UK",
	"en-US": "US",
	"fr-FR": "FR",
	"zh-Hans": "简体",
	"zh-Hant": "繁體",
	"ko": "한국",
}
const localeSetModal = toRef(false);

const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
const printPaper = useMediaQuery("print");
const motionReduced = computed(() => reduceMotion.value || printPaper.value);

type Dialect = {
	name: string,
	lang: "ja" | "en" | "fr" | "zh" | "ko",
	value: Locale,
	selectable: boolean,
}

const dialects: Dialect[] = [
	{
		name: "標準語",
		lang: "ja",
		value: "ja",
		selectable: true,
	},
	{
		name: "関西弁",
		lang: "ja",
		value: "ja-JP-x-dialect-kansai",
		selectable: true,
	},
	{
		name: "北部九州方言",
		lang: "ja",
		value: "ja-JP-x-dialect-northkyushu",
		selectable: true,
	},
	{
		name: "ウチナーグチ",
		lang: "ja",
		value: "ja-JP-x-dialect-ryukyu",
		selectable: true,
	},
	{
		name: "United Kingdom",
		lang: "en",
		value: "en-GB",
		selectable: true,
	},
	{
		name: "United States",
		lang: "en",
		value: "en-US",
		selectable: true,
	},
	{
		name: "简体字",
		lang: "zh",
		value: "zh-Hans",
		selectable: true,
	},
	{
		name: "繁體字",
		lang: "zh",
		value: "zh-Hant",
		selectable: true,
	},
]
const selectedLanguage = toRef(locale.value.split("-")[0]);
const isEnableDialectSelector = computed(() => selectableDialects.value.length > 1);
const selectableDialects = computed(() => {
	const result = dialects.filter(v => v.lang === selectedLanguage.value);
	if (result.length === 0) {
		let selectedLanguageValue = selectedLanguage.value;
		switch (selectedLanguageValue) {
			case "fr":
				selectedLanguageValue = "fr-FR";
				break;
		}
		return [{
			name: "",
			lang: selectedLanguageValue,
			value: selectedLanguageValue,
			selectable: false,
		}] as Dialect[];
	}
	return result;
})
watch(selectedLanguage, () => {
	selectedDialect.value = selectableDialects.value[0].value;
})
const selectedDialect = toRef(locale.value);
const calenders = computed(() => {
	const regionName = new Intl.DisplayNames(selectedDialect.value, {
		type: "calendar"
	})
	return [
		"buddhist",
		"chinese",
		"coptic",
		//"ethiopia",
		"ethiopic",
		"gregory",
		"hebrew",
		"indian",
		"islamic",
		"iso8601",
		"japanese",
		"persian",
		"roc",
	].map(v => ({
		display: regionName.of(v),
		value: v,
	}));
});
const unitType = toRef("metric");
const calender = toRef("gregory");
const clock24h = toRef(true);
const transitionDuration = computed(() => motionReduced.value ? 0 : 500);
const langSelectTranslateSource = shallowRef([0, 0, 1, 1, 1, 1, 1]);
const langSelectScaleSource = shallowRef([1, 0, 0, 0, 0, 0, 0]);
const langSelectOpacitySource = shallowRef([1, 0, 0, 0, 0, 0, 0]);
const langSelectTranslateOutput = useTransition(langSelectTranslateSource, {
	duration: transitionDuration,
	transition: TransitionPresets.easeInCubic,
});
const langSelectScaleOutput = useTransition(langSelectScaleSource, {
	duration: transitionDuration,
	transition: TransitionPresets.easeInCubic,
});
const langSelectOpacityOutput = useTransition(langSelectOpacitySource, {
	duration: transitionDuration,
	transition: TransitionPresets.easeInCubic,
});
const languageSelectLabelInterval = useInterval(3000);
watch(languageSelectLabelInterval, (newValue, oldValue) => {
	const newScaleSource = [0, 0, 0, 0, 0, 0, 0];
	const newOpacitySource = [0, 0, 0, 0, 0, 0, 0];
	const newTranslateSource = [1, 1, 1, 1, 1, 1, 1];
	newScaleSource[newValue % 7] = 1;
	newScaleSource[oldValue % 7] = 0;
	newOpacitySource[newValue % 7] = 1;
	newOpacitySource[oldValue % 7] = 0;
	newTranslateSource[(newValue + 1) % 7] = 0;
	newTranslateSource[newValue % 7] = 0;
	newTranslateSource[oldValue % 7] = 1;
	langSelectScaleSource.value = newScaleSource;
	langSelectOpacitySource.value = newOpacitySource;
	langSelectTranslateSource.value = newTranslateSource;
});
const langSelect = computed((): { scale: number, translate: number, opacity: number }[] => {
	return [
		{
			scale: langSelectScaleOutput.value[0],
			translate: langSelectTranslateOutput.value[0],
			opacity: langSelectOpacityOutput.value[0],
		},
		{
			scale: langSelectScaleOutput.value[1],
			translate: langSelectTranslateOutput.value[1],
			opacity: langSelectOpacityOutput.value[1],
		},
		{
			scale: langSelectScaleOutput.value[2],
			translate: langSelectTranslateOutput.value[2],
			opacity: langSelectOpacityOutput.value[2],
		},
		{
			scale: langSelectScaleOutput.value[3],
			translate: langSelectTranslateOutput.value[3],
			opacity: langSelectOpacityOutput.value[3],
		},
		{
			scale: langSelectScaleOutput.value[4],
			translate: langSelectTranslateOutput.value[4],
			opacity: langSelectOpacityOutput.value[4],
		},
		{
			scale: langSelectScaleOutput.value[5],
			translate: langSelectTranslateOutput.value[5],
			opacity: langSelectOpacityOutput.value[5],
		},
		{
			scale: langSelectScaleOutput.value[6],
			translate: langSelectTranslateOutput.value[6],
			opacity: langSelectOpacityOutput.value[6],
		},
	]
});
onMounted(() => {
	unitType.value = measurementUnit.value ?? "metre";
	calender.value = calenderType.value ?? "gregory";
	clock24h.value = String(isUsing24HourClock.value ?? "true").toLowerCase() === "true";
})

type PreviewTranslation = {
	selectDialect: string;
	selectUnit: string;
	unitMetre: string;
	unitImperial: string;
	selectCalender: string;
	use24Hour: string;
	clockShortFormat: string;
	clockLongFormat: string;
}

const previewTranslations: { [key: string]: PreviewTranslation } = {
	"ja": {
		selectDialect: "方言の選択",
		selectUnit: "単位の選択",
		unitMetre: "メートル法",
		unitImperial: "ヤード・ポンド法",
		selectCalender: "カレンダーの選択",
		use24Hour: "24時間表示にする",
		clockShortFormat: "短い形式",
		clockLongFormat: "長い形式",
	},
	"ja-JP-x-dialect-kansai": {
		selectDialect: "方言の選択",
		selectUnit: "単位の選択",
		unitMetre: "メートル法",
		unitImperial: "ヤード・ポンド法",
		selectCalender: "カレンダーの選択",
		use24Hour: "24時間表示にする",
		clockShortFormat: "短い形式",
		clockLongFormat: "長い形式",
	},
	"ja-JP-x-dialect-northkyushu": {
		selectDialect: "方言の選択",
		selectUnit: "単位の選択",
		unitMetre: "メートル法",
		unitImperial: "ヤード・ポンド法",
		selectCalender: "カレンダーの選択",
		use24Hour: "24時間表示にする",
		clockShortFormat: "短い形式",
		clockLongFormat: "長い形式",
	},
	"ja-JP-x-dialect-ryukyu": {
		selectDialect: "方言の選択",
		selectUnit: "単位の選択",
		unitMetre: "メートル法",
		unitImperial: "ヤード・ポンド法",
		selectCalender: "カレンダーの選択",
		use24Hour: "24時間表示にする",
		clockShortFormat: "短い形式",
		clockLongFormat: "長い形式",
	},
	"en-GB": {
		selectDialect: "Select dialect",
		selectUnit: "Select units",
		unitMetre: "Metric system",
		unitImperial: "Yard and pound system",
		selectCalender: "Select calendar system",
		use24Hour: "Set 24-hour display",
		clockShortFormat: "Short time format",
		clockLongFormat: "Long time format",
	},
	"en-US": {
		selectDialect: "Select a dialect",
		selectUnit: "Select a unit",
		unitMetre: "Metric system",
		unitImperial: "Yard and pound system",
		selectCalender: "Select a calendar system",
		use24Hour: "Set 24-hour display",
		clockShortFormat: "Short time format",
		clockLongFormat: "Long time format",
	},
	"fr-FR": {
		selectDialect: "Sélectionner le dialecte",
		selectUnit: "Sélectionner les unités",
		unitMetre: "Système métrique",
		unitImperial: "Système des verges et des livres",
		selectCalender: "Sélectionner le système de calendrier",
		use24Hour: "Régler l'affichage sur 24 heures",
		clockShortFormat: "Format de l'heure courte",
		clockLongFormat: "Format de l'heure longue",
	},
	"zh-Hans": {
		selectDialect: "选择简体/繁体字符",
		selectUnit: "选择单位",
		unitMetre: "公制系统",
		unitImperial: "英制和磅制系统",
		selectCalender: "选择日历系统",
		use24Hour: "设置 24 小时显示",
		clockShortFormat: "短时间格式",
		clockLongFormat: "长时间格式",
	},
	"zh-Hant": {
		selectDialect: "選擇繁體或簡體字",
		selectUnit: "選擇單位",
		unitMetre: "公制系統",
		unitImperial: "英磅系統",
		selectCalender: "選擇日曆系統",
		use24Hour: "設定 24 小時顯示",
		clockShortFormat: "短時間格式",
		clockLongFormat: "長時間格式",
	},
	"ko": {
		selectDialect: "방언 선택",
		selectUnit: "단위 선택",
		unitMetre: "미터법 선택",
		unitImperial: "야드-파운드법",
		selectCalender: "달력법 선택",
		use24Hour: "24시간 표시로 설정",
		clockShortFormat: "짧은 시간 형식",
		clockLongFormat: "긴 시간 형식",
	},
}
const currentPreviewTranslations = computed(() => {
	return previewTranslations[selectedDialect.value] ?? previewTranslations["ja"];
});
</script>

<template>
	<header>
		<a v-smooth-scroll="{offset: -50}" class="tw:transition tw:left-0 tw:bg-primary tw:text-primary-content tw:absolute tw:p-3 tw:m-3 tw:-translate-y-16 tw:focus:translate-y-0" href="#main-contents">Skip to main contents</a>
		<nav class="tw:z-30 tw:fixed tw:left-0 tw:top-0 tw:flex tw:justify-between tw:items-start tw:p-4 tw:xl:font-bold tw:pointer-events-none tw:w-[100vw]">
			<div class="tw:flex tw:shrink tw:justify-items-start">
				<NuxtLinkLocale v-smooth-scroll="{offset: -50}" to="/#home" class="tw:cursor-pointer tw:pointer-events-auto">
					<img
						alt="Vgeek Logo"
						class="tw:object-contain tw:w-auto tw:h-auto tw:max-w-[40vw] tw:xl:max-w-full tw:max-h-[30vh] tw:xl:max-h-[15vh]"
						height="267"
						src="/images/logo.webp"
						width="544"/>
				</NuxtLinkLocale>
			</div>
			<div class="tw:text-stone-900 tw:flex tw:glow tw:justify-items-end">
				<div class="tw:hidden tw:xl:flex tw:text-base tw:pointer-events-auto">
					<NuxtLinkLocale v-smooth-scroll="{offset: -50}" to="/#about" class="tw:ps-10 tw:pe-8 tw:py-4 tw:rounded-s-full tw:border-white tw:border-s-2 tw:border-y-2 tw:bg-white/75 tw:cursor-pointer tw:hover:text-white tw:hover:bg-rose-500/75">
						About
					</NuxtLinkLocale>
					<NuxtLinkLocale v-smooth-scroll="{offset: -50}" to="/#members" class="tw:px-8 tw:py-4 tw:border-white tw:border-y-2 tw:bg-white/75 tw:cursor-pointer tw:hover:text-white tw:hover:bg-rose-500/75">
						Members
					</NuxtLinkLocale>
					<NuxtLinkLocale v-smooth-scroll="{offset: -50}" to="/#groups" class="tw:px-8 tw:py-4 tw:border-white tw:border-y-2 tw:bg-white/75 tw:cursor-pointer tw:hover:text-white tw:hover:bg-rose-500/75">
						Groups
					</NuxtLinkLocale>
					<NuxtLinkLocale to="/comiket/" class="tw:px-8 tw:py-4 tw:border-white tw:border-y-2 tw:bg-white/75 tw:cursor-pointer tw:hover:text-white tw:hover:bg-rose-500/75">
						Comiket
					</NuxtLinkLocale>
					<NuxtLinkLocale v-smooth-scroll="{offset: -50}" to="/#link" class="tw:px-8 tw:py-4 tw:border-white tw:border-y-2 tw:bg-white/75 tw:cursor-pointer tw:hover:text-white tw:hover:bg-rose-500/75">
						Link
					</NuxtLinkLocale>
					<NuxtLinkLocale v-smooth-scroll="{offset: -50}" to="/#guideline" class="tw:ps-8 tw:pe-10 tw:py-4 tw:rounded-e-full tw:border-white tw:border-e-2 tw:border-y-2 tw:bg-white/75 tw:cursor-pointer tw:hover:text-white tw:hover:bg-rose-500/75">
						Guideline
					</NuxtLinkLocale>
				</div>
				<div class="tw:xl:ms-6 me-2 tw:flex tw:flex-auto tw:shrink tw:text-stone-900 tw:text-xs tw:xl:text-base tw:pointer-events-auto">
					<button class="tw:px-5 tw:py-2 tw:rounded-full tw:border-white tw:border-s-2 tw:border-y-2 tw:cursor-pointer tw:bg-white/75 tw:hover:text-white tw:hover:bg-rose-500/75" type="button" @click.stop="localeSetModal = !localeSetModal">
						<span>{{ localeShortName[locale] }}</span>
						<teleport to="body">
							<BModal v-model="localeSetModal" @ok="localeUpdate" :ok-only="true" :title="`Select language`" title-class="fs-5 tw:text-stone-900" size="xl" lang="zxx">
								<div class="tw:flex tw:flex-col tw:text-stone-900">
									<b-row class="mb-1">
										<b-col>
											<label for="language-select">
												<svg aria-label="Select a language" id="language-select-label" viewBox="0 0 10 1.2" height="1.2em" width="10em">
													<text lang="ja" font-family="'M PLUS 1', sans-serif" stroke="none" fill="currentColor" :opacity="langSelect[0].opacity" font-size="1" y="1" x="0" text-anchor="start" :transform="`translate(0, ${langSelect[0].translate}), scale(1, ${langSelect[0].scale})`">言語の選択</text>
													<text lang="ja" font-family="'M PLUS 1', sans-serif" stroke="none" fill="currentColor" :opacity="langSelect[1].opacity" font-size="1" y="1" x="0" text-anchor="start" :transform="`translate(0, ${langSelect[1].translate}), scale(1, ${langSelect[1].scale})`">ことば を えらぶ</text>
													<text lang="en" font-family="'Roboto', sans-serif" stroke="none" fill="currentColor" :opacity="langSelect[2].opacity" font-size="1" y="1" x="0" text-anchor="start" :transform="`translate(0, ${langSelect[2].translate}), scale(1, ${langSelect[2].scale})`">Select a language</text>
													<text lang="fr" font-family="'Roboto', sans-serif" stroke="none" fill="currentColor" :opacity="langSelect[3].opacity" font-size="1" y="1" x="0" text-anchor="start" :transform="`translate(0, ${langSelect[3].translate}), scale(1, ${langSelect[3].scale})`">Sélection de la langue</text>
													<text lang="zh-Hans" font-family="'Noto Sans SC', sans-serif" stroke="none" fill="currentColor" :opacity="langSelect[4].opacity" font-size="1" y="1" x="0" text-anchor="start" :transform="`translate(0, ${langSelect[4].translate}), scale(1, ${langSelect[4].scale})`">选择语言</text>
													<text lang="zh-Hant" font-family="Noto Sans TC'', sans-serif" stroke="none" fill="currentColor" :opacity="langSelect[5].opacity" font-size="1" y="1" x="0" text-anchor="start" :transform="`translate(0, ${langSelect[5].translate}), scale(1, ${langSelect[5].scale})`">選擇語言</text>
													<text lang="ko" font-family="'Noto Sans KR', sans-serif" stroke="none" fill="currentColor" :opacity="langSelect[6].opacity" font-size="1" y="1" x="0" text-anchor="start" :transform="`translate(0, ${langSelect[6].translate}), scale(1, ${langSelect[6].scale})`">언어 선택</text>
												</svg>
											</label>
										</b-col>
										<b-col>
											<select class="form-select" id="language-select" v-model="selectedLanguage">
												<option value="ja">日本語</option>
												<option value="en">English</option>
												<option value="fr">Français</option>
												<option value="zh">中文</option>
												<option value="ko">한국어</option>
											</select>
										</b-col>
									</b-row>
									<b-row class="mb-1">
										<b-col>
											<label for="dialect-select">{{ currentPreviewTranslations.selectDialect }}</label>
										</b-col>
										<b-col>
											<select class="form-select" id="dialect-select" v-model="selectedDialect" :disabled="!isEnableDialectSelector">
												<option v-for="option in selectableDialects" :key="option.value" :value="option.value" :disabled="!option.selectable" v-text="option.name"/>
											</select>
										</b-col>
									</b-row>
									<b-row class="mb-1">
										<b-col>
											<label for="select-units">{{ currentPreviewTranslations.selectUnit }}</label>
										</b-col>
										<b-col>
											<select class="form-select" id="select-units" v-model="unitType">
												<option value="metre">{{ currentPreviewTranslations.unitMetre }}</option>
												<option value="yard">{{ currentPreviewTranslations.unitImperial }}</option>
											</select>
										</b-col>
									</b-row>
									<b-row class="mb-1">
										<b-col>
											<label for="select-calender">{{ currentPreviewTranslations.selectCalender }}</label>
										</b-col>
										<b-col>
											<select class="form-select" id="select-calender" v-model="calender">
												<option v-for="calenderItem in calenders" :key="calenderItem.value" :value="calenderItem.value">{{ calenderItem.display }}</option>
											</select>
										</b-col>
									</b-row>
									<b-row class="mb-1">
										<b-col>
											<div class="form-check form-switch">
												<input class="form-check-input" type="checkbox" role="switch" id="clock24h" v-model="clock24h">
												<label class="form-check-label" for="clock24h">{{ currentPreviewTranslations.use24Hour }}</label>
											</div>
										</b-col>
									</b-row>
									<b-row>
										<b-col>
											<span>{{ currentPreviewTranslations.clockLongFormat }}:</span>
											<time class="ms-1" datetime="2024-01-12 12:35:56">{{ (new Date("2024-01-12 12:34:56")).toLocaleString(`ja-JP-u-ca-${calender}-hc-h${clock24h ? '23' : '11'}`, {dateStyle: 'medium', timeStyle: 'medium'}) }}</time>
										</b-col>
									</b-row>
									<b-row>
										<b-col>
											<span>{{ currentPreviewTranslations.clockShortFormat }}:</span>
											<time class="ms-1" datetime="2024-01-12 12:35:56">{{ (new Date("2024-01-12 12:34:56")).toLocaleString(`ja-JP-u-ca-${calender}-hc-h${clock24h ? '23' : '11'}`, {dateStyle: 'short', timeStyle: 'short'}) }}</time>
										</b-col>
									</b-row>
									<b-row>
										<b-col>
											<span>{{  }}</span>
										</b-col>
									</b-row>
								</div>
							</BModal>
						</teleport>
					</button>
				</div>
			</div>
		</nav>
	</header>
</template>
