<script lang="ts" setup>
import ButtonLinkBase from "~/components/ButtonLinkBase.vue";

const {t} = useI18n();
type RealityProfileAttributes = {
	userId: string
	useSimpleAnchor?: boolean,
	qrCode?: boolean;
};

const props = withDefaults(defineProps<RealityProfileAttributes>(), {
	qrCode: true,
	useSimpleAnchor: false,
});


</script>

<template>
	<ButtonLinkBase :href="`https://reality.app/profile/${props.userId}`" :use-simple-anchor="props.useSimpleAnchor" rel="noopener noreferrer" target="_blank" :qr-code="props.qrCode">
		{{ t("profileCommon.realityLinkButton") }} {{ t("profileCommon.linkButtonProfile") }}
	</ButtonLinkBase>
</template>
