<script lang="ts" setup>
const {t} = useI18n();
type ButtonLinkBaseAttributes = {
	href: string,
	target?: string,
	rel?: string,
	useSimpleAnchor?: boolean,
	class?: string,
	qrCode?: boolean,
};
const props = withDefaults(defineProps<ButtonLinkBaseAttributes>(), {
	qrCode: true,
	useSimpleAnchor: false,
});
const qrCodeModal = toRef(false);
const qrLoaded = toRef(false);
const qrLoadedFn = () => {
	qrLoaded.value = true;
}
const shareData = computed<ShareData>(() => {
	return {
		url: props.href,
	}
})
const shareFeatureAvailable = computed(() => {
	if (import.meta.client) {
		if (!navigator.canShare) {
			return false;
		}
		return navigator.canShare(shareData.value);
	} else {
		return true;
	}
})
const shareFn = () => {
	qrCodeModal.value = false;
	if (import.meta.client) {
		try {
			navigator.share(shareData.value);
		} catch (e) {
			console.log("Share Error.", e);
		}
	}
}
const copyFn = () => {
	qrCodeModal.value = false;
	if (import.meta.client) {
		try {
			navigator.clipboard.writeText(props.href);
		} catch (e) {
			console.log("Copy Error.", e);
		}
	}
}
</script>

<template>
	<a v-if="(!(props.useSimpleAnchor ?? false)) && (!(props.qrCode ?? true))" :class="`tw:self-stretch tw:flex tw:shrink tw:items-center tw:rounded-full tw:bg-rose-500 tw:hover:bg-rose-700 tw:text-white tw:px-4 tw:py-4${(props.class != undefined ? ` ${props.class}` : '')}`" :href="props.href" :rel="props.rel ?? ''" :target="props.target ?? ''">
		<slot/>
	</a>
	<div v-else-if="(!(props.useSimpleAnchor ?? false)) && ((props.qrCode ?? true))" class="d-flex">
		<a :class="`tw:self-stretch tw:flex tw:shrink tw:items-center tw:rounded-s-full tw:bg-rose-500 tw:hover:bg-rose-700 tw:text-white tw:ps-4 tw:pe-2 tw:py-4${(props.class != undefined ? ` ${props.class}` : '')}`" :href="props.href" :rel="props.rel ?? ''" :target="props.target ?? ''">
			<slot/>
		</a>
		<button :class="`tw:border-s-1 tw:border-white/50 tw:self-stretch tw:flex tw:shrink tw:items-center tw:rounded-e-full tw:bg-rose-500 tw:hover:bg-rose-700 tw:text-white tw:pe-4 tw:ps-2 ${(props.class != undefined ? ` ${props.class}` : '')}`" @click.stop="qrCodeModal = !qrCodeModal">
			<i class="mdi mdi-qrcode tw:text-[24px]"></i>
		</button>
		<teleport to="body">
			<BModal v-model="qrCodeModal" :ok-only="true" :title="t('profileCommon.linkButtonQrModalTitle')" title-class="fs-5 tw:text-stone-900">
				<template #footer>
					<div class="d-flex flex-row w-100">
						<div class="flex-shrink-1 me-auto">
							<small>
								{{ t("profileCommon.qrCodeGeneratedByIcyAPIs2") }}<br>
								<span v-html="t('profileCommon.qrCodeTrademark')"></span>
							</small>
						</div>
						<div class="ms-auto">
							<b-button-group class="h-100">
								<b-dropdown split :on-split-click="() => {qrCodeModal = false}">
									<template #button-content>
										<i class="mdi mdi-close"></i>
										{{ t("profileCommon.closeButton") }}
									</template>
									<b-dropdown-item @click.stop="qrCodeModal = false">
										<i class="mdi mdi-close"></i>
										{{ t("profileCommon.closeButton") }}
									</b-dropdown-item>
									<b-dropdown-item @click.stop="shareFn" v-if="shareFeatureAvailable">
										<i class="mdi mdi-share"></i>
										{{ t("profileCommon.shareAndCloseButton") }}
									</b-dropdown-item>
									<b-dropdown-item @click.stop="copyFn">
										<i class="mdi mdi-clipboard-text"></i>
										{{ t("profileCommon.copyUrlAndCloseButton") }}
									</b-dropdown-item>
								</b-dropdown>
							</b-button-group>
						</div>
					</div>
				</template>
				<div class="tw:flex tw:flex-col tw:text-white">
					<div class="d-grid qr-container" style="grid-template-columns: 1fr; grid-template-rows: 1fr;">
						<img
							:class="`${(qrLoaded ? '' : 'loading ')}qr-code`"
							style="grid-row: 1; grid-column: 1;"
							:src="`https://api2.isnow.jp/api/barcode/qrcode/generate?data=${encodeURI(props.href)}&margin=2`"
							:alt="t('profileCommon.linkButtonQrModalTitle')"
							loading="lazy" @load.stop="qrLoadedFn"/>
						<div v-if="!qrLoaded" class="qr-code placeholder placeholder-wave bg-secondary" style="grid-row: 1; grid-column: 1;"></div>
					</div>
				</div>
			</BModal>
		</teleport>
	</div>
	<a v-else :class="props.class ?? ''" :href="props.href" :rel="props.rel ?? ''" :target="props.target ?? ''">
		<slot/>
	</a>
</template>

<style scoped>
.qr-container {
	container-type: size;
	aspect-ratio: 1;
}

.qr-code {
	width: 100cqw;
	height: 100cqh;
	aspect-ratio: 1;
	object-fit: contain;

	&.loading {
		width: 0 !important;
		height: 0 !important;
		overflow: clip !important;
		opacity: 0 !important;
	}
}
</style>
