<script lang="ts" setup>
import ButtonLinkBase from "~/components/ButtonLinkBase.vue";

const {t} = useI18n();
type IriamProfileAttributes = {
	uuid: string;
	userId: string;
	useSimpleAnchor?: boolean,
	qrCode?: boolean;
};

const props = withDefaults(defineProps<IriamProfileAttributes>(), {
	qrCode: true,
	useSimpleAnchor: false,
});

</script>

<template>
	<ButtonLinkBase :href="`https://web.iriam.app/s/user/${props.userId}?uuid=${props.uuid}`" :use-simple-anchor="props.useSimpleAnchor" rel="noopener noreferrer" target="_blank" :qr-code="props.qrCode">
		{{ t("profileCommon.iriamLinkButton") }} {{ t("profileCommon.linkButtonProfile") }}
	</ButtonLinkBase>
</template>
