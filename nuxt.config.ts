// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2024-04-03',
	modules: [
		"@nuxtjs/tailwindcss",
		"nuxt-aos",
		"@nuxt/image",
		'@bootstrap-vue-next/nuxt',
		"@nuxtjs/i18n",
		"@nuxtjs/robots",
		"@vueuse/nuxt"
	],
	ssr: false,
	tailwindcss: {
		config: {
			prefix: "tw-"
		}
	},
	css: [
		"bootstrap/dist/css/bootstrap.css",
		"bootstrap-icons/font/bootstrap-icons.css",
	],
	i18n: {
		defaultLocale: 'ja',
		strategy: "prefix_except_default",
		detectBrowserLanguage: {
			useCookie: true,
			redirectOn: "root",
			fallbackLocale: 'ja',
		},
		langDir: "./locales",
		locales: [
			{
				name: "JP",
				code: "ja",
				language: "ja-JP",
				file: "ja.json"
			},
			{
				name: "US",
				code: "en-US",
				language: "en-US",
				file: "en-us.json"
			},
			{
				name: "UK",
				code: "en-GB",
				language: "en-GB",
				file: "en-gb.json"
			},
		]
	},
	runtimeConfig: {
		public: {
			WEB_API: process.env.VUE_APP_WEB_API ?? "https://infra.virtlive.jp/ytapi/v1",
			WEB_API_VERSION: process.env.VUE_APP_WEB_API_VERSION ?? "2",
			YT_API_VERSION2: process.env.YT_API_VERSION2 ?? "https://infra.virtlive.jp/ytapi/v2.1",
		}
	}
})
