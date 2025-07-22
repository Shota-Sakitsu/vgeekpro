// https://nuxt.com/docs/api/configuration/nuxt-config
import viteTailwind from "@tailwindcss/vite";
import * as child_process from "node:child_process";

let commitHash = "";
let shortCommitHash = "";

const gitShow = child_process.spawnSync("git", ["show", "HEAD", "-s", "--format=%H"]);
if (gitShow.error == undefined) {
	commitHash = gitShow.stdout.toString().trim();
	shortCommitHash = commitHash.slice(0, 7);
} else {
	console.warn(gitShow);
}

export default defineNuxtConfig({
	compatibilityDate: '2025-07-15',
	modules: [
		"nuxt-aos",
		"@nuxt/image",
		'@bootstrap-vue-next/nuxt',
		"@nuxtjs/i18n",
		"@nuxtjs/robots",
		"@vueuse/nuxt",
		"@nuxt/fonts",
	],
	ssr: false,
	vite: {
		plugins: [
			viteTailwind(),
		]
	},
	css: [
		"@mdi/font/css/materialdesignicons.css",
		//"bootstrap/dist/css/bootstrap.css",
		"bootstrap-icons/font/bootstrap-icons.css",
		"assets/tailwind.css",
	],
	i18n: {
		defaultLocale: 'ja',
		strategy: "prefix_except_default",
		detectBrowserLanguage: {
			useCookie: true,
			redirectOn: "all",
			fallbackLocale: 'ja',
		},
		//langDir: "./locales",
		locales: [
			{
				name: "日本語",
				code: "ja",
				iso: "ja-JP",
				file: "ja-jp.json",
			},
			{
				name: "関西弁",
				code: "ja-JP-x-dialect-kansai",
				iso: "ja-JP-x-dialect-kansai",
				file: "ja-jp-x-dialect-kansai.json",
			},
			{
				name: "北部九州方言",
				code: "ja-JP-x-dialect-northkyushu",
				iso: "ja-JP-x-dialect-northkyushu",
				file: "ja-jp-x-dialect-northkyushu.json",
			},
			{
				name: "ウチナーグチ",
				code: "ja-JP-x-dialect-ryukyu",
				iso: "ja-JP-x-dialect-ryukyu",
				file: "ja-jp-x-dialect-ryukyu.json",
			},
			{
				name: "British English",
				code: "en-GB",
				iso: "en-GB",
				file: "en-gb.json",
			},
			{
				name: "American English",
				code: "en-US",
				iso: "en-US",
				file: "en-us.json",
			},
			{
				name: "Français",
				code: "fr-FR",
				iso: "fr-FR",
				file: "fr-fr.json",
			},
			{
				name: "简体中文",
				code: "zh-Hans",
				iso: "zh-Hans",
				file: "zh-hans.json",
			},
			{
				name: "繁體中文",
				code: "zh-Hant",
				iso: "zh-Hant",
				file: "zh-hant.json",
			},
			{
				name: "한국어",
				code: "ko",
				iso: "ko",
				file: "ko.json",
			},
		],
		compilation: {
			strictMessage: false,
		},
	},
	runtimeConfig: {
		public: {
			WEB_API: process.env.VUE_APP_WEB_API ?? "https://infra.virtlive.jp/ytapi/v1",
			WEB_API_VERSION: process.env.VUE_APP_WEB_API_VERSION ?? "2",
			YT_API_VERSION2: process.env.YT_API_VERSION2 ?? "https://infra.virtlive.jp/ytapi/v2.1",
			COMMIT_HASH: commitHash,
			SHORT_COMMIT_HASH: shortCommitHash,
		},
	},
})
