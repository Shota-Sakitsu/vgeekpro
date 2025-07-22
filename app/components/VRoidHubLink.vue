<script lang="ts" setup>
import ButtonLinkBase from "~/components/ButtonLinkBase.vue";

const {t} = useI18n();
type VRoidHubLinkAttributes = {
	userId?: string,
	characterId?: string,
	modelId?: string,
	useSimpleAnchor?: boolean,
	qrCode?: boolean;
};

const props = withDefaults(defineProps<VRoidHubLinkAttributes>(), {
	qrCode: true,
	useSimpleAnchor: false,
});

const link = computed(() => {
	if (props.userId != undefined) {
		return `user/${props.userId}`;
	} else if (props.characterId != undefined && props.modelId == undefined) {
		return `characters/${props.characterId}`;
	} else if (props.characterId != undefined && props.modelId != undefined) {
		return `characters/${props.characterId}/models/${props.modelId}`;
	} else {
		return "";
	}
})
const type = computed(() => {
	if (props.userId != undefined) {
		return "profileCommon.linkButtonUser";
	} else if (props.characterId != undefined && props.modelId == undefined) {
		return "profileCommon.linkButtonCharacter";
	} else if (props.characterId != undefined && props.modelId != undefined) {
		return "profileCommon.linkButtonModel";
	} else {
		return "profileCommon.linkButtonMissing";
	}
})
</script>

<template>
	<ButtonLinkBase :href="`https://hub.vroid.com/${link}`" :use-simple-anchor="props.useSimpleAnchor" rel="noopener noreferrer" target="_blank" :qr-code="props.qrCode">
		{{ t("profileCommon.vRoidHubLinkButton") }}{{ t(type) }}
	</ButtonLinkBase>
</template>
