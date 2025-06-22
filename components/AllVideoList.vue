<script lang="ts" setup>

import {randomInt} from "~/composables/ExtendUtils";
import type {LiveStreamArchive, SearchResponse} from "~/composables/youtubeApi/Types";
import {YouTubeAPI} from "~/composables/youtubeApi/YouTubeAPI";

type VideoMemberAttributes = {
	members: string[],
	alreadyInitialized: boolean,
	selected: boolean,
}


const {t} = useI18n();
const config = useRuntimeConfig();
const props = defineProps<VideoMemberAttributes>();
const youtubeAPI = new YouTubeAPI(config.public.YT_API_VERSION2)

const scheduleUrl = youtubeAPI.getSearchApiEndpoint({members: props.members, type: "liveBefore", order: "desc"});
const liveUrl = youtubeAPI.getSearchApiEndpoint({members: props.members, type: "liveNow", order: "desc"});
const archiveUrl = youtubeAPI.getSearchApiEndpoint({members: props.members, type: "liveAfter", order: "desc"});
const videoUrl = youtubeAPI.getSearchApiEndpoint({members: props.members, type: "video", order: "desc", limit: 100});

const scheduleList = ref<SearchResponse>({
	items: [],
	results: {
		recode: {
			totalCounts: 0,
			resultCounts: 0,
			updatedAt: 0,
		},
		page: {
			pageLimit: 50,
			currentPage: 1,
			totalPages: 1,
		}
	}
});
const liveList = ref<SearchResponse>({
	items: [],
	results: {
		recode: {
			totalCounts: 0,
			resultCounts: 0,
			updatedAt: 0,
		},
		page: {
			pageLimit: 50,
			currentPage: 1,
			totalPages: 1,
		}
	}
});
const videoList = ref<SearchResponse>({
	items: [],
	results: {
		recode: {
			totalCounts: 0,
			resultCounts: 0,
			updatedAt: 0,
		},
		page: {
			pageLimit: 50,
			currentPage: 1,
			totalPages: 1,
		}
	}
});

const isStart = ref(true);
const errorLog = ref("");

const colors: ("primary" | "secondary" | "success" | "danger" | "warning" | "info")[] = ["primary", "secondary", "success", "danger", "warning", "info"];
const placeholderColors = toRef<("primary" | "secondary" | "success" | "danger" | "warning" | "info")[]>([]);

const colorUtils = useColorUtils();

const scheduleLiveDividerCardBorderColorH = toRef(0);
const scheduleLiveDividerCardBorderColor = computed(() => {
	const {r, g, b} = colorUtils.hsv2rgb(scheduleLiveDividerCardBorderColorH.value, 100, 100, false, false);
	return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
});
const liveVideoDividerCardBorderColorH = toRef(0);
const liveVideoDividerCardBorderColor = computed(() => {
	const {r, g, b} = colorUtils.hsv2rgb(liveVideoDividerCardBorderColorH.value, 100, 100, false, false);
	return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
});

for (let i = 0; i < 8; i++) {
	placeholderColors.value.push(colors[randomInt(6)])
}

const loadedImageList = toRef<{ [videoId: string]: boolean }>({});

const loadCardImage = (videoId: string) => {
	loadedImageList.value[videoId] = true;
}

const emits = defineEmits<{
	(event: 'lastUpdated', updatedAt: number): void,
	(event: 'loadState', state: boolean): void,
}>();

const scrollRequired = toRef(false);

const update = () => {
	emits("loadState", true);
	console.debug("All Videos: updating");
	const processBuffer: SearchResponse = {
		items: [],
		results: {
			recode: {
				totalCounts: 0,
				resultCounts: 0,
				updatedAt: 0,
			},
			page: {
				pageLimit: 50,
				currentPage: 1,
				totalPages: 1,
			}
		}
	};

	$fetch<SearchResponse>(liveUrl).then(liveResponse => {
		liveList.value = liveResponse;
		$fetch<SearchResponse>(scheduleUrl).then(scheduleResponse => {
			scheduleList.value = scheduleResponse;
			$fetch<SearchResponse>(videoUrl).then(videoResponse => {
				processBuffer.items = videoResponse.items;
				processBuffer.results = videoResponse.results;
				$fetch<SearchResponse>(archiveUrl).then(archiveResponse => {
					processBuffer.results.page.totalPages += archiveResponse.results.page.totalPages;
					processBuffer.results.page.pageLimit += archiveResponse.results.page.pageLimit;
					processBuffer.results.recode.resultCounts += archiveResponse.results.recode.resultCounts;
					processBuffer.results.recode.totalCounts += archiveResponse.results.recode.totalCounts;
					processBuffer.items.push(...archiveResponse.items);
					processBuffer.items.sort((a, b) => {
						let aPublished: Date;
						let bPublished: Date;
						if (Object.keys(a).indexOf('liveActualEndTime') !== -1) {
							aPublished = new Date((a as LiveStreamArchive).liveActualStartTime);
						} else {
							aPublished = new Date(a.publishedAt);
						}
						if (Object.keys(b).indexOf('liveActualEndTime') !== -1) {
							bPublished = new Date((b as LiveStreamArchive).liveActualStartTime);
						} else {
							bPublished = new Date(b.publishedAt);
						}

						return bPublished.getTime() - aPublished.getTime();
					})
					videoList.value = processBuffer;
					isStart.value = false;
					if (scrollRequired.value) setTimeout(scroll, 100);
					console.debug("All Videos: updated");
					emits("loadState", false);
					emits("lastUpdated", archiveResponse.results.recode.updatedAt);
				});
			});
		});
	});
}

let updateCancellerToken: number | NodeJS.Timeout;

const scroll = () => {
	console.debug("scrolling");
	if (import.meta.client) {
		const divider = document.getElementById("schedule-live-divider-card");
		if (divider) divider.scrollIntoView({behavior: "instant", inline: "center", block: "nearest"});
	}
	scrollRequired.value = false;
}

watch(() => props.selected, (value) => {
	if (value) setTimeout(scroll, 100)
}, {
	immediate: true,
	deep: true,
});

onMounted(() => {
	update();
	scheduleLiveDividerCardBorderColorH.value = Math.floor(Math.random() * 360);
	liveVideoDividerCardBorderColorH.value = Math.floor(Math.random() * 360);
	if (props.selected) scrollRequired.value = true;
	updateCancellerToken = setInterval(update, 30_000);
})

onBeforeUnmount(() => {
	clearInterval(updateCancellerToken);
})

const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
const printMedia = useMediaQuery('print');

</script>

<template>
	<section class="list-container tw:my-3">
		<div v-if="isStart === false" class="tw:leading-loose tw:text-black video-list-body tw:h-full tw:overflow-x-auto scrollbar">
			<VideoCard v-for="videoItem in scheduleList.items ?? []" :video-item="videoItem"/>
			<div class="video-card-container" id="schedule-live-divider-card">
				<BCard class="video-list-card" :style="`border-color: ${ scheduleLiveDividerCardBorderColor }`" body-class="video-list-card-body">
					<template v-slot:default>
						<div class="d-flex flex-column h-100">
							<div class="divider-text my-auto text-end d-flex flex-row h-100">
								<div class="d-flex flex-column my-auto">
									<i class="bi bi-caret-up-fill video-list-icon-y"></i>
									<i class="bi bi-caret-left-fill video-list-icon-x"></i>
								</div>
								<div class="d-flex flex-column my-auto">
									{{ t("videoListBox.scheduled") }}
								</div>
								<div class="d-flex flex-column my-auto">
									<i class="mdi mdi-calendar-star"></i>
								</div>
							</div>
							<hr/>
							<div class="divider-text my-auto text-end d-flex flex-row-reverse h-100">
								<div class="d-flex flex-column my-auto">
									<i class="bi bi-caret-down-fill video-list-icon-y"></i>
									<i class="bi bi-caret-right-fill video-list-icon-x"></i>
								</div>
								<div class="d-flex flex-column my-auto">
									{{ t("videoListBox.live") }}
								</div>
								<div class="d-flex flex-column my-auto">
									<i class="mdi mdi-video-wireless"></i>
								</div>
							</div>
						</div>
					</template>
				</BCard>
			</div>
			<VideoCard v-for="videoItem in liveList.items ?? []" :video-item="videoItem"/>
			<div class="video-card-container" id="live-video-divider-card">
				<BCard class="video-list-card" :style="`border-color: ${ liveVideoDividerCardBorderColor }`" body-class="video-list-card-body">
					<template v-slot:default>
						<div class="d-flex flex-column h-100">
							<div class="divider-text my-auto text-end d-flex flex-row h-100">
								<div class="d-flex flex-column my-auto">
									<i class="bi bi-caret-up-fill video-list-icon-y"></i>
									<i class="bi bi-caret-left-fill video-list-icon-x"></i>
								</div>
								<div class="d-flex flex-column my-auto">
									{{ t("videoListBox.live") }}
								</div>
								<div class="d-flex flex-column my-auto">
									<i class="mdi mdi-video-wireless"></i>
								</div>
							</div>
							<hr/>
							<div class="divider-text my-auto text-end d-flex flex-row-reverse h-100">
								<div class="d-flex flex-column my-auto">
									<i class="bi bi-caret-down-fill video-list-icon-y"></i>
									<i class="bi bi-caret-right-fill video-list-icon-x"></i>
								</div>
								<div class="d-flex flex-column my-auto">
									<div class="d-flex flex-row h-100">
										<div class="d-flex flex-column my-auto">
											<i class="mdi mdi-archive"></i>
										</div>
										<div class="d-flex flex-column my-auto">
											{{ t("videoListBox.archive") }}
										</div>
									</div>
									<div class="d-flex flex-row h-100">
										<div class="d-flex flex-column my-auto">
											<i class="mdi mdi-video"></i>
										</div>
										<div class="d-flex flex-column my-auto">
											{{ t("videoListBox.video") }}
										</div>
									</div>
								</div>
							</div>
						</div>
					</template>
				</BCard>
			</div>
			<VideoCard v-for="videoItem in videoList.items ?? []" :video-item="videoItem"/>
		</div>
		<div v-else-if="!props.alreadyInitialized" class="tw:leading-loose tw:text-black video-list-body tw:h-full tw:overflow-x-clip scrollbar">
			<div v-for="(color, num) in placeholderColors" :key="num" class="tw:h-full tw:mx-2">
				<BCard :class="`video-list-card tw:h-full border-${color} ${((reduceMotion || printMedia) ? '' : ' placeholder-wave')}`">
					<template v-slot:img>
						<div :class="`thumbnail placeholder bg-${color}`"></div>
					</template>
					<template v-slot:default>
						<div class="d-flex flex-column h-100">
							<p class="flex-grow-1 tw:text-sm text-line-hidden video-title">
								<span class="placeholder col-8"></span>
							</p>
							<small class="flex-shrink-1 flex-grow-0 channel-name mt-auto description-text text-secondary placeholder"></small><br>
							<small class="mt-2 description-text text-secondary flex-shrink-1 flex-grow-0">
								<span class="placeholder col-6"></span><br>
								<span class="placeholder col-6"></span>
							</small>
						</div>
					</template>
				</BCard>
			</div>
		</div>
	</section>
</template>

<style lang="less" scoped>
.list-container {
	container-type: size;
	width: 100cqw;
	height: 400px;
}

.video-title {
	font-size: 15pt;
	line-height: 1.0625em;
	overflow: hidden;
}

.description-text {
	font-size: 10.5pt;
	line-height: 1.125em;
}

.divider-text {
	font-size: 1.6rem;
}

.thumbnail {
	/* 親指の爪…… ではなく縮小版 */
	background-color: #cccccc;
	aspect-ratio: 16/9;
	object-fit: cover;
	flex-shrink: 0;

	&.loading {
		width: 0 !important;
		height: 0 !important;
		overflow: clip !important;
		opacity: 0 !important;
	}
}

.channel-name {
	font-size: 12pt;
}

.video-list-body {
	display: flex;
	flex-direction: row;
}

.video-list-card {
	width: calc(calc(100cqw / 1.5) - 1rem);
}

.video-card-container {
	width: inherit;
	height: 100%;
	padding-inline: 0;
	padding-block: calc(var(--tw-spacing) * 2);
	margin-inline: calc(var(--tw-spacing) * 2);
	margin-block: 0;
}

.shorts {
	&.video-list-card {
		width: calc(calc(100cqw / 2.5) - 1rem);
		flex-direction: row;
	}

	& .thumbnail {
		aspect-ratio: 9/16;
		height: 100%;
		width: fit-content;
	}
}

.video-list-icon {
	&-x {
		display: inherit;
	}

	&-y {
		display: none;
	}
}

@container (width <= 768px) {
	.video-list-icon {
		&-x {
			display: none;
		}

		&-y {
			display: inherit;
		}
	}

	.video-list-body {
		flex-direction: column;
	}

	.shorts {
		&.video-list-card {
			flex-direction: column;
		}

		& .thumbnail {
			aspect-ratio: 16/9;
			width: 100%;
			height: fit-content;
			object-fit: cover;
		}
	}

	.divider-text {
		font-size: 1.2rem;
	}
}

@container (640px <= width <= 768px) {
	.shorts.video-list-card {
		width: calc(calc(100cqw / 2.5) - 1rem);
	}
}

@container (width <= 640px) {
	.shorts.video-list-card {
		width: calc(calc(100cqw / 1.5) - 1rem);
	}
}

@container (width >= 640px) {
	.video-list-card {
		width: calc(calc(100cqw / 2.5) - 1rem);
	}
}

@container (width >= 768px) {
	.video-list-card {
		width: calc(calc(100cqw / 3.5) - 1rem);

		&.shorts {
			width: calc(calc(100cqw / 1.75) - 1rem);
		}
	}
}

@container (width <= 768px) {
	.video-list-card,
	.shorts.video-list-card {
		width: 100%;
	}

	.video-card-container {
		width: 100%;
		padding-inline: calc(var(--tw-spacing) * 2);
		padding-block: 0;
		margin-inline: 0;
		margin-block: calc(var(--tw-spacing) * 2);
	}
}

@container (width > 768px) {
	.video-list-card,
	.shorts.video-list-card {
		height: 100%;
	}

	.video-card-container {
		height: 100%;
		padding-inline: 0;
		padding-block: calc(var(--tw-spacing) * 2);
		margin-inline: calc(var(--tw-spacing) * 2);
		margin-block: 0;
	}
}

@container (width >= 1024px) {
	.video-list-card {
		width: calc(calc(100cqw / 4.5) - 1rem);

		&.shorts {
			width: calc(calc(100cqw / 2) - 1rem);
		}
	}
}

@container (width >= 1280px) {
	.video-list-card {
		width: calc(calc(100cqw / 5.5) - 1rem);

		&.shorts {
			width: calc(calc(100cqw / 2.5) - 1rem);
		}
	}
}

@container (width >= 1536px) {
	.video-list-card {
		width: calc(calc(100cqw / 6.5) - 1rem);

		&.shorts {
			width: calc(calc(100cqw / 2.75) - 1rem);
		}
	}
}

@container (width >= 1920px) {
	.video-list-card {
		width: calc(calc(100cqw / 7.5) - 1rem);

		&.shorts {
			width: calc(calc(100cqw / 2.75) - 1rem);
		}
	}
}

@container (width >= 3840px) {
	.video-list-card {
		width: calc(calc(100cqw / 12.5) - 1rem);

		&.shorts {
			width: calc(calc(100cqw / 4.5) - 1rem);
		}
	}
}
</style>
