<script lang="ts" setup>

import {randomInt} from "~/composables/ExtendUtils";
import type {SearchResponse} from "~/composables/youtubeApi/Types";

type VideoMemberAttributes = {
	url: string,
	alreadyInitialized: boolean,
	isShorts: boolean,
	selected: boolean,
	currentKey: string,
}


const {locale, t} = useI18n();
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

const scrollRequired = toRef(false);

const emits = defineEmits<{
	(event: 'lastUpdated', updatedAt: number): void,
	(event: 'loadState', state: boolean): void,
}>();

watch(() => props.url, async () => {
	try {
		console.debug(`${props.currentKey}: Updating`);
		emits("loadState", true);
		memberVideo.value = await $fetch<SearchResponse>(props.url);
		emits("lastUpdated", memberVideo.value.results.recode.updatedAt);
		for (const item of memberVideo.value.items) {
			loadedImageList.value[item.videoId] = false;
		}
		if (scrollRequired.value) scroll();
		console.debug(`${props.currentKey}: Updated`);
		emits("loadState", false);
		isStart.value = false;
	} catch (error) {
		errorLog.value = 'API Error!' + error;
	}
}, {
	immediate: true
});

const update = () => {
	emits("loadState", true);
	console.debug(`${props.currentKey}: Updating`);
	$fetch<SearchResponse>(props.url).then(response => {
		memberVideo.value = response;
		console.debug(`${props.currentKey}: Updated`);
		emits("loadState", false)
	});
}

let updateCancellerToken: number | NodeJS.Timeout;

const scroll = () => {
	console.debug("scrolling");
	if (import.meta.client) {
		const divider = document.querySelector(`video-list-container-${props.currentKey} .video-list-item`);
		if (divider) divider.scrollIntoView({behavior: "instant", inline: "start", block: "nearest"});
	}
	scrollRequired.value = false;
}

watch(() => props.selected, (value) => {
	if (value) scroll()
}, {
	immediate: true
});

onMounted(() => {
	scrollRequired.value = true;
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
		<div v-if="isStart === false && memberVideo.results.recode.resultCounts !== 0" :class="`video-list-container-${props.currentKey} tw:leading-loose tw:text-black video-list-body tw:h-full tw:overflow-x-auto scrollbar`">
			<VideoCard v-for="videoItem in memberVideo.items" :key="videoItem.videoId" :video-item="videoItem"/>
		</div>
		<div v-else-if="!isStart && memberVideo.results.recode.resultCounts === 0" class="tw:leading-loose video-list-body tw:h-full tw:items-center tw:justify-center ">
		</div>
		<div v-else-if="!props.alreadyInitialized" class="tw:leading-loose tw:text-black video-list-body tw:h-full tw:overflow-x-clip scrollbar">
			<div v-for="(color, num) in placeholderColors" :key="num" class="tw:h-full tw:mx-2">
				<BCard :class="`video-list-card tw:h-full${props.isShorts ? ' shorts' : ''} border-${color} ${((reduceMotion || printMedia) ? '' : ' placeholder-wave')}`">
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
