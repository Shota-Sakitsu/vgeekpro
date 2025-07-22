<script setup lang="ts">
const error = useError();
const router = useRouter();
const {t} = useI18n();
const generateErrorModal = toRef(false);
const showErrorModal = toRef(false);
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
if (error.value) {
	if (import.meta.client) {
		console.debug("エラー詳細を確認するには、このコンソールで `showErrorModal()` とタイプしてください。");
		// @ts-ignore
		window["showErrorModal"] = () => {
			generateErrorModal.value = true;
			setTimeout(() => {
				showErrorModal.value = true;
			}, 100);
		}
	}
}
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
		<client-only>
			<BModal v-model="showErrorModal" v-if="generateErrorModal" size="xl" :ok-only="true" title="Error (for debug)" aria-hidden="true" title-class="fs-5 tw:text-stone-900">
				<div class="tw:flex tw:flex-col">
					<table class="table table-hover table-striped table-bordered">
						<thead>
							<tr>
								<th scope="col">項目</th>
								<th scope="col">値</th>
							</tr>
						</thead>
						<tbody v-if="error">
							<tr>
								<th scope="row">名称</th>
								<td v-text="error.name"/>
							</tr>
							<tr>
								<th scope="row">ステータスコード</th>
								<td v-text="error.statusCode"/>
							</tr>
							<tr v-if="error.statusMessage">
								<th scope="row">ステータスメッセージ</th>
								<td v-text="error.statusMessage"/>
							</tr>
							<tr>
								<th scope="row">致命的</th>
								<td v-text="error.fatal ? 'はい' : 'いいえ'"/>
							</tr>
							<tr>
								<th scope="row">未捕捉の例外</th>
								<td v-text="error.unhandled ? 'はい' : 'いいえ'"/>
							</tr>
							<tr v-if="error.cause">
								<th scope="row">原因</th>
								<td>
									<output class="font-mono tw:whitespace-pre-wrap" v-text="error.cause"/>
								</td>
							</tr>
							<tr v-if="error.data">
								<th scope="row">データ</th>
								<td>
									<output class="font-mono tw:whitespace-pre-wrap" v-text="error.data"/>
								</td>
							</tr>
							<tr v-if="error.stack">
								<th scope="row">スタックトレース</th>
								<td>
									<BButton v-b-toggle.stack-trace variant="primary">表示</BButton>
									<BModal id="stack-trace" size="xl" :ok-only="true" title="Stack Trace (for debug)" aria-hidden="true" title-class="fs-5 tw:text-stone-900" scrollable>
										<div class="tw:flex tw:flex-col">
											<output class="font-mono tw:whitespace-pre-wrap" v-text="error.stack"/>
										</div>
									</BModal>
								</td>
							</tr>
						</tbody>
						<tbody v-else>
							<tr>
								<th scope="row">
									名称
								</th>
								<td>
									不明
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</BModal>
		</client-only>
	</NuxtLayout>
</template>
