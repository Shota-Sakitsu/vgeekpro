<script lang="ts" setup>
import ButtonLinkBase from "~/components/ButtonLinkBase.vue";

const {t} = useI18n();
type TwitchStreamAttributes = {
	userId: string
	useSimpleAnchor?: boolean,
	qrCode?: boolean;
};

const props = withDefaults(defineProps<TwitchStreamAttributes>(), {
	qrCode: true,
	useSimpleAnchor: false,
});

</script>

<template>
	<ButtonLinkBase :href="`https://www.twitch.tv/${props.userId}`" :use-simple-anchor="props.useSimpleAnchor" rel="noopener noreferrer" target="_blank" :qr-code="props.qrCode">
		{{ t("profileCommon.twitchLinkButton") }} {{ t("profileCommon.linkButtonStream") }}
	</ButtonLinkBase>
</template>
