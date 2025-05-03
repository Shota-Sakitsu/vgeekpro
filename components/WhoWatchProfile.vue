<script lang="ts" setup>
import ButtonLinkBase from "~/components/ButtonLinkBase.vue";

const {t} = useI18n();
type WhoWatchProfileAttributes = {
	/**
	 * アカウントタイプを選択します。
	 *
	 * アカウントタイプを選択します。アカウントタイプはふわっちのIDの先頭から判別出来ます。
	 * IDをすべて記述する場合など、選択しない場合は、`Unknown`を選択してください。
	 * - `w:`: メールアドレスとパスワードの組で作成した場合と、ユーザーIDが一般表示されないアカウントで作成した場合です(要調査)
	 * - `t:`: 恐らくTwitterまたはXのアカウントでアカウントを作成した場合です。こちらは`XUser`が対応します
	 * - 該当無し: 一切不明です。こちらは`Unknown`が対応します
	 */
	accountType: "WhoWatchId" | "XUser" | "Unknown"
	userId: string
	useSimpleAnchor?: boolean,
	qrCode?: boolean;
};

const props = withDefaults(defineProps<WhoWatchProfileAttributes>(), {
	qrCode: true,
	useSimpleAnchor: false,
});
const accountPrefix = computed({
	get: () => {
		switch (props.accountType) {
			case "WhoWatchId":
				return "w:";
			case "XUser":
				return "t:";
			case "Unknown":
				return "";
		}
	}
})

</script>

<template>
	<ButtonLinkBase :href="`https://whowatch.tv/profile/${accountPrefix}${props.userId}`" :use-simple-anchor="props.useSimpleAnchor" rel="noopener noreferrer" target="_blank" :qr-code="props.qrCode">
		{{ t("profileCommon.whoWatchLinkButton") }} {{ t("profileCommon.linkButtonProfile") }}
	</ButtonLinkBase>
</template>
