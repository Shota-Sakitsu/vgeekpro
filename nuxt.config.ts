// https://nuxt.com/docs/api/configuration/nuxt-config
import viteTailwind from "@tailwindcss/vite";
export default defineNuxtConfig({
	compatibilityDate: '2024-04-03',
	modules: [
		//"@nuxtjs/tailwindcss",
		"nuxt-aos",
		"@nuxt/image",
		'@bootstrap-vue-next/nuxt',
		"@nuxtjs/i18n",
		"@nuxtjs/robots",
		"@vueuse/nuxt"
	],
	ssr: false,
	/*
	tailwindcss: {
		config: {
			prefix: "tw-"
		}
	},
	*/
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
			redirectOn: "root",
			fallbackLocale: 'ja',
		},
		//langDir: "./locales",
		locales: [
			{
				name: "JP",
				code: "ja",
				iso: "ja-JP",
				file: "ja.json"
			},
			{
				name: "US",
				code: "en-US",
				iso: "en-US",
				file: "en-us.json"
			},
			{
				name: "UK",
				code: "en-GB",
				iso: "en-GB",
				file: "en-gb.json",
			},
		],
		compilation: {
			strictMessage: false,
		}
	},
	runtimeConfig: {
		public: {
			WEB_API: process.env.VUE_APP_WEB_API ?? "https://infra.virtlive.jp/ytapi/v1",
			WEB_API_VERSION: process.env.VUE_APP_WEB_API_VERSION ?? "2",
			YT_API_VERSION2: process.env.YT_API_VERSION2 ?? "https://infra.virtlive.jp/ytapi/v2.1",
		}
	}
})
