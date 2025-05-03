<script lang="ts" setup>
import ButtonLinkBase from "~/components/ButtonLinkBase.vue";

type OtherSiteLinkAttributes = {
	href: string
	useSimpleAnchor?: boolean,
	qrCode?: boolean;
};

const props = withDefaults(defineProps<OtherSiteLinkAttributes>(), {
	qrCode: true,
	useSimpleAnchor: false,
});


</script>

<template>
	<ButtonLinkBase :href="props.href" :use-simple-anchor="props.useSimpleAnchor" rel="noopener noreferrer" target="_blank" :qr-code="props.qrCode">
		<i class="mdi mdi-web"></i>
		<slot/>
	</ButtonLinkBase>
</template>
