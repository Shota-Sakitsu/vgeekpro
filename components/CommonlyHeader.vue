<script lang="ts" setup>
const {locale, setLocale, t} = useI18n();

const setLocaleTo = (locale: "ja" | "en-US" | "en-GB") => {
	console.debug(`Set Locale: ${locale}`);
	setLocale(locale);
}
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
				<div class="tw:xl:ms-6 tw:flex tw:flex-auto tw:shrink tw:text-stone-900 tw:text-xs tw:xl:text-base tw:pointer-events-auto">
					<button :class="`tw:ps-5 tw:pe-2.5 tw:py-2 tw:rounded-s-full tw:border-white tw:border-s-2 tw:border-y-2 tw:cursor-pointer ${locale == 'ja' ? 'tw:text-white tw:bg-rose-500/75' : 'tw:bg-white/75 tw:hover:text-white tw:hover:bg-rose-500/75'}`" type="button" @click.stop="setLocaleTo('ja')">JP</button>
					<button :class="`tw:px-2.5 tw:py-2 tw:border-y-2 tw:border-white tw:cursor-pointer ${locale == 'en-US' ? 'tw:text-white tw:bg-rose-500/75' : 'tw:bg-white/75 tw:hover:text-white tw:hover:bg-rose-500/75'}`" type="button" @click.stop="setLocaleTo('en-US')">US</button>
					<button :class="`tw:ps-2.5 tw:pe-5 tw:py-2 tw:rounded-e-full tw:border-white tw:border-e-2 tw:border-y-2  tw:cursor-pointer ${locale == 'en-GB' ? 'tw:text-white tw:bg-rose-500/75' : 'tw:bg-white/75 tw:hover:text-white tw:hover:bg-rose-500/75'}`" type="button" @click.stop="setLocaleTo('en-GB')">UK</button>
				</div>
			</div>
		</nav>
	</header>
</template>
