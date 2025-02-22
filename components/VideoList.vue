<script lang="ts" setup>

import {randomInt} from "~/composables/ExtendUtils";
import type {SearchResponse} from "~/composables/youtubeApi/Types";

type VideoMemberAttributes = {
	url: string,
	alreadyInitialized: boolean,
	isShorts: boolean,
}


const {locale} = useI18n();
const config = useRuntimeConfig();

const props = defineProps<VideoMemberAttributes>();

const memberVideo = ref<SearchResponse>({
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

for (let i = 0; i < 8; i++) {
	placeholderColors.value.push(colors[randomInt(6)])
}

const loadedImageList = toRef<{ [videoId: string]: boolean }>({});

const loadCardImage = (videoId: string) => {
	loadedImageList.value[videoId] = true;
}

const emits = defineEmits<{
	(event: 'lastUpdated', updatedAt: number): void,
}>();

watch(() => props.url, async () => {
	try {
		memberVideo.value = await $fetch<SearchResponse>(props.url);
		emits("lastUpdated", memberVideo.value.results.recode.updatedAt);
		for (const item of memberVideo.value.items) {
			loadedImageList.value[item.videoId] = false;
		}
		isStart.value = false;
	} catch (error) {
		errorLog.value = 'API Error!' + error;
	}
}, {
	immediate: true
});

const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
const printMedia = useMediaQuery('print');

</script>

<template>
	<section class="list-container tw-h-[400px] tw-my-3">
		<div v-if="isStart === false && memberVideo.results.recode.resultCounts !== 0" class="tw-leading-loose tw-text-black tw-flex tw-flex-row tw-h-full tw-overflow-x-auto scrollbar">
			<div v-for="videoItem in memberVideo.items" class="tw-h-full tw-mx-2">
				<a :key="videoItem.videoId" :href="videoItem.url" class="tw-h-full disable-link-icons">
					<BCard :class="`video-list-card tw-h-full${videoItem.isShorts ? ' shorts' : ''}`" :style="`border-color: ${ videoItem.thumbnailColor.hexadecimal };`" body-class="video-list-card-body">
						<template v-slot:img>
							<img v-if="Object.keys(videoItem.thumbnails).length == 0" :alt="videoItem.title" :class="`thumbnail ${loadedImageList[videoItem.videoId] ? '' : 'loading'} ${videoItem.isShorts ? ' img-fluid rounded-start' : ' rounded-top'}`" :src="videoItem.thumbnail" loading="lazy" @load="() => {loadCardImage(videoItem.videoId);}"/>
							<img v-else :alt="videoItem.title" :class="`thumbnail ${loadedImageList[videoItem.videoId] ? '' : 'loading'} ${videoItem.isShorts ? ' img-fluid rounded-start' : ' rounded-top'}`" :src="videoItem.thumbnail" :srcset="Object.values(videoItem.thumbnails).map<string>(value => `${value.url} ${value.width}w`).join(',')" loading="lazy" @load="() => {loadCardImage(videoItem.videoId);}"/>
							<div v-if="!loadedImageList[videoItem.videoId]" :class="`thumbnail placeholder-wave placeholder`" :style="`background: ${videoItem.thumbnailColor.hexadecimal};`"></div>
						</template>
						<template v-slot:default>
							<div class="d-flex flex-column-reverse h-100">
								<small class="mt-2 description-text text-secondary flex-shrink-1 flex-grow-0">
									<span v-if="videoItem.liveBroadcast == 'upcoming'">
										<span class="tw-me-1">{{ $t("videoListBox.scheduledAt").replace("%s", new Date(videoItem.liveScheduledStartTime).toLocaleString(locale, {year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit"})) }}</span>
									</span>
									<span v-else-if="videoItem.liveBroadcast == 'live'">
										<span class="tw-me-1">{{ $t("videoListBox.from").replace("%s", new Date(videoItem.liveActualStartTime).toLocaleString(locale, {year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit"})) }}</span>
									</span>
									<span v-else-if="Object.keys(videoItem).indexOf('liveActualEndTime') !== -1">
										<span>{{ $t("videoListBox.from").replace("%s", new Date(videoItem.liveActualStartTime).toLocaleString(locale, {year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit"})) }}</span><br>
										<span>{{ $t("videoListBox.to").replace("%s", new Date(videoItem.liveActualEndTime).toLocaleString(locale, {year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit"})) }}</span>
									</span>
									<span v-else>
										<span>{{ $t("videoListBox.postedAt").replace("%s", new Date(videoItem.publishedAt).toLocaleString(locale, {year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit"})) }}</span>
									</span>
								</small>
								<small :lang="videoItem.defaultLanguage" class="flex-shrink-1 flex-grow-0 channel-name mt-auto description-text text-secondary">{{ videoItem.channelTitle }}</small><br>
								<p :lang="videoItem.defaultLanguage" class="flex-grow-0 tw-text-sm video-title">{{ videoItem.title }}</p>
							</div>
						</template>
					</BCard>
				</a>
			</div>
		</div>
		<div v-else-if="!isStart && memberVideo.results.recode.resultCounts === 0" class="tw-leading-loose tw-flex tw-flex-row tw-h-full tw-items-center tw-justify-center ">
		</div>
		<div v-else-if="!props.alreadyInitialized" class="tw-leading-loose tw-text-black tw-flex tw-flex-row tw-h-full tw-overflow-x-clip scrollbar">
			<div v-for="(color, num) in placeholderColors" :key="num" class="tw-h-full tw-mx-2">
				<BCard :class="`video-list-card tw-h-full${props.isShorts ? ' shorts' : ''} border-${color} ${((reduceMotion || printMedia) ? '' : ' placeholder-wave')}`">
					<template v-slot:img>
						<div :class="`thumbnail placeholder bg-${color}`"></div>
					</template>
					<template v-slot:default>
						<div class="d-flex flex-column h-100">
							<p class="flex-grow-1 tw-text-sm text-line-hidden video-title">
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
	width: 100cqw
}

.video-title {
	font-size: 15pt;
	line-height: 1.0625em;

	// 手元の環境では何故か動作しない
	// 互換性のため主要ブラウザ実装後にコメントアウト
	//line-clamp: 3;

	// Safari 以外用。何故か火狐も --moz- では無く --webkit- で動作する。
	//--webkit-line-clamp: 3;
	// 互換性の都合上、 --webkit-box でのみ動作するとのこと
	//display: -webkit-box;
	//--webkit-box-orient: vertical;
	overflow: hidden;
}

.description-text {
	font-size: 10.5pt;
	line-height: 1.125em;
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

.video-list-card {
	width: calc(calc(100cqw / 1.5) - 1rem);
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

@container (width <= 768px) {
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
