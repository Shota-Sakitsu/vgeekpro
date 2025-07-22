<script lang="ts" setup>
import ButtonLinkBase from "~/components/ButtonLinkBase.vue";

const {t} = useI18n();
type GitHubProfileAttributes = {
	userId: string,
	useSimpleAnchor?: boolean,
	qrCode?: boolean;
};

const props = withDefaults(defineProps<GitHubProfileAttributes>(), {
	qrCode: true,
	useSimpleAnchor: false,
});
</script>

<template>
	<ButtonLinkBase :href="`https://github.com/${props.userId}`" :use-simple-anchor="props.useSimpleAnchor" rel="noopener noreferrer" target="_blank" :qr-code="props.qrCode">
		{{ t("profileCommon.gitHubLinkButton") }} {{ t("profileCommon.linkButtonUser") }}
	</ButtonLinkBase>
</template>
