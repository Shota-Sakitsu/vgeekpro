<script setup lang="ts">
import type {LiveStream, LiveStreamArchive, LiveStreamSchedule, VideoItem} from "~/composables/youtubeApi/Types";

const {locale, t} = useI18n();

type VideoCardAttribute = {
	videoItem: VideoItem;
}

const {videoItem} = defineProps<VideoCardAttribute>();
const imageLoaded = toRef(false);
const videoType = computed<"upcoming" | "live" | "archive" | "video" | "shorts">(() => {
	switch (videoItem.liveBroadcast) {
		case "upcoming":
		case "live":
			return videoItem.liveBroadcast
		case "none":
			if (Object.keys(videoItem).indexOf('liveActualEndTime') !== -1) return "archive"
			return videoItem.isShorts ? "shorts" : "video"
	}
})
const typeIconClass = computed(() => {
	switch (videoType.value) {
		case "upcoming":
			return "mdi mdi-calendar-star";
		case "live":
			return "mdi mdi-video-wireless";
		case "archive":
			return "mdi mdi-archive";
		case "video":
			return "mdi mdi-video";
		case "shorts":
			return "mdi mdi-cellphone-play";
	}
})
const intervalString = (from: Date | number, to: Date | number = new Date(), type: 0 | 1 = 0): string => {
	if (typeof from === "number") from = new Date(from);
	if (typeof to === "number") to = new Date(to);
	const diff = to.getTime() - from.getTime();
	const diffAxis = (to.getTime() > from.getTime()) ? 1 : (to.getTime() == from.getTime() ? 0 : -1);
	let diffBuffer = Math.abs(diff);
	let diffStr = "";
	if (diffBuffer >= 31556952000) {
		// 年 (31556952秒 ＝ 365.2425日 ≒ 1年)
		const year = Math.floor(diffBuffer / 31556952000);
		diffBuffer %= 31556952000;
		diffStr += t(`videoListBox.year${year >= 2 ? 's' : ''}`).replace("%s", year.toString());
	}
	if (diffBuffer >= 2629746000) {
		// 月 (2629746秒 ≒ 30.4369日 ≒ 1月)
		const month = Math.floor(diffBuffer / 2629746000);
		diffBuffer %= 2629746000;
		diffStr += t(`videoListBox.month${month >= 2 ? 's' : ''}`).replace("%s", month.toString());
	}
	if (diffBuffer >= 86400000) {
		// 日 (86400秒 ＝ 1日)
		const day = Math.floor(diffBuffer / 86400000);
		diffBuffer %= 86400000;
		diffStr += t(`videoListBox.day${day >= 2 ? 's' : ''}`).replace("%s", day.toString());
	}
	if (diffBuffer >= 3600000) {
		// 時間 (3600秒 ＝ 1時間)
		const hour = Math.floor(diffBuffer / 3600000);
		diffBuffer %= 3600000;
		diffStr += t(`videoListBox.hour${hour >= 2 ? 's' : ''}`).replace("%s", hour.toString());
	}
	if (diffBuffer >= 60000) {
		// 分 (60秒 ＝ 1分)
		const minute = Math.floor(diffBuffer / 60000);
		diffBuffer %= 60000;
		diffStr += t(`videoListBox.minute${minute >= 2 ? 's' : ''}`).replace("%s", minute.toString().padStart(2, '0'));
	}
	if (diffBuffer >= 500) {
		// 秒(1秒)
		const second = Math.round(diffBuffer / 1000);
		diffStr += t(`videoListBox.second${second >= 2 ? 's' : ''}`).replace("%s", second.toString().padStart(2, '0'));
	}
	switch (diffAxis) {
		case 1:
			return t(`videoListBox.${type == 0 ? "elapsed" : "ago"}`).replace("%s", diffStr);
		case -1:
			return t(`videoListBox.${type == 0 ? "left" : "later"}`).replace("%s", diffStr);
		case 0:
			return t('videoListBox.justNow');
	}
}
</script>

<template>
	<div class="tw:h-full tw:mx-2" :lang="videoItem.defaultLanguage">
		<a :key="videoItem.videoId" :href="videoItem.url" class="tw:h-full disable-link-icons">
			<BCard :class="`video-list-card tw:h-full${videoItem.isShorts ? ' shorts' : ''}`" :style="`border-color: ${ videoItem.thumbnailColor.hexadecimal };`" body-class="video-list-card-body">
				<template v-slot:img>
					<img v-if="Object.keys(videoItem.thumbnails).length == 0" :alt="videoItem.title" :class="`thumbnail ${imageLoaded ? '' : 'loading'} ${videoItem.isShorts ? ' img-fluid rounded-start' : ' rounded-top'}`" :src="videoItem.thumbnail" loading="lazy" @load="imageLoaded = true"/>
					<img v-else :alt="videoItem.title" :class="`thumbnail ${imageLoaded ? '' : 'loading'} ${videoItem.isShorts ? ' img-fluid rounded-start' : ' rounded-top'}`" :src="videoItem.thumbnail" :srcset="Object.values(videoItem.thumbnails).map<string>(value => `${value.url} ${value.width}w`).join(',')" loading="lazy" @load="imageLoaded = true"/>
					<div v-if="!imageLoaded" :class="`thumbnail placeholder-wave placeholder`" :style="`background: ${videoItem.thumbnailColor.hexadecimal};`"></div>
				</template>
				<template v-slot:default>
					<div class="d-flex flex-column h-100">
						<p class="flex-grow-0 tw:text-sm video-title text-truncate text-truncate-3">
							<i :class="typeIconClass"></i>
							{{ videoItem.title }}
						</p>
						<small class="flex-shrink-1 flex-grow-0 channel-name mt-auto description-text text-secondary text-truncate text-truncate-2">{{ videoItem.channelTitle }}</small><br>
						<small class="mt-2 description-text text-secondary flex-shrink-1 flex-grow-0">
							<span v-if="videoType == 'upcoming'">
								<span class="video-card-time">{{ t("videoListBox.scheduledAt").replace("%s", new Date((videoItem as LiveStreamSchedule).liveScheduledStartTime).toLocaleString(locale, {year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit"})) }}</span><br>
								<span class="video-card-time">{{ intervalString(new Date((videoItem as LiveStreamSchedule).liveScheduledStartTime)) }}</span>
							</span>
							<span v-else-if="videoType == 'live'">
								<span class="video-card-time">{{ t("videoListBox.from").replace("%s", new Date((videoItem as LiveStream).liveActualStartTime).toLocaleString(locale, {year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit"})) }}</span><br>
								<span class="video-card-time">{{ intervalString(new Date((videoItem as LiveStream).liveActualStartTime)) }}</span>
							</span>
							<span v-else-if="videoType == 'archive'">
								<span class="video-card-time">{{ t("videoListBox.from").replace("%s", new Date((videoItem as LiveStreamArchive).liveActualStartTime).toLocaleString(locale, {year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit"})) }}</span><br>
								<span class="video-card-time">{{ t("videoListBox.to").replace("%s", new Date((videoItem as LiveStreamArchive).liveActualEndTime).toLocaleString(locale, {year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit"})) }}</span>
							</span>
							<span v-else>
								<span class="video-card-time">{{ t("videoListBox.postedAt").replace("%s", new Date(videoItem.publishedAt).toLocaleString(locale, {year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit"})) }}</span>
							</span>
						</small>
					</div>
				</template>
			</BCard>
		</a>
	</div>
</template>

<style scoped lang="less">
*[lang^="zh-Hant"i] {
	font-family: "Noto Sans TC", sans-serif;
}

*[lang^="zh-Hans"i] {
	font-family: "Noto Sans SC", sans-serif;
}

*[lang^="ko"i] {
	font-family: "Noto Sans KR", sans-serif;
}

*[lang^="ja"i] {
	font-family: "M PLUS 1", sans-serif;
}

*[lang^="en"i] {
	font-family: "Roboto", sans-serif;
}

.video-card-time {
	font-family: "M PLUS 1 Code", monospace;
}

.list-container {
	container-type: size;
	width: 100cqw
}

.text-truncate {
	&-2 {
		display: -webkit-box;
		white-space: wrap;
		overflow: hidden;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		line-height: 1.0625em;
		max-height: calc(1.0625em * 3);

		&:hover {
			-webkit-line-clamp: none;
			line-clamp: none;
			text-overflow: initial;
			max-height: max-content;
		}
	}

	&-3 {
		display: -webkit-box;
		white-space: wrap;
		overflow: hidden;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
		line-clamp: 3;
		line-height: 1.0625em;
		max-height: calc(1.0625em * 3);

		&:hover {
			-webkit-line-clamp: none;
			line-clamp: none;
			text-overflow: initial;
			max-height: max-content;
		}
	}
}

.video-title {
	font-size: 15pt;
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
