<script setup lang="ts">
const error = useError();
const router = useRouter();
const {t} = useI18n();
let code = toRef<number>(error.value?.statusCode ?? (Math.random() <= 0.25 ? 418 : 200));
useSeoMeta({
	title: "エラーが発生しました",
	description: "",
	robots: "noindex, nofollow",
})
const errorMessageHeader = computed(() => {
	const key = `errorMessages.messageHeader.http${code.value.toString().padStart(3, '0').slice(-3)}`;
	const message = t(key);
	if (message === key) return t("errorMessages.messageHeader.unknownError");
	return message;
})
const errorMessageBody = computed(() => {
	const key = `errorMessages.messageBody.http${code.value.toString().padStart(3, '0').slice(-3)}`;
	const message = t(key);
	if (message === key) return t("errorMessages.messageBody.unknownError");
	return message;
})
</script>

<template>
	<NuxtLayout>
		<CommonlyHeader/>
		<main id="main-contents" class="tw:pt-40 tw:w-full tw:flex tw:flex-col tw:items-center">
			<CommonHead heading-level="2" ja="エラーが発生しました" en="An error occurred"/>
			<hr class="py-1 w-75 tw:border-t-4 tw:border-t-fuchsia-300"/>
			<div>
				<div class="fs-2 font-mono text-center">
					HTTP {{ code.toString().padStart(3, '0').slice(-3) }} {{ errorMessageHeader }}
				</div>
				<div>
					{{ errorMessageBody }}
				</div>
			</div>
			<div class="tw:my-10 tw:w-full tw:flex tw:justify-around tw:items-start">
				<NuxtLinkLocale to="/" class="tw:self-stretch tw:flex-col tw:shrink tw:items-center tw:rounded-full tw:bg-rose-500 tw:hover:bg-rose-700 tw:text-white tw:px-8 tw:py-4" rel="noopener noreferrer">
					{{ t("profileCommon.backToTop") }}
				</NuxtLinkLocale>
			</div>
		</main>
	</NuxtLayout>
</template>
