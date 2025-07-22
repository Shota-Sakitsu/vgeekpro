<script setup lang="ts">
import type {LiveStream, LiveStreamArchive, LiveStreamSchedule, VideoItem} from "~~/shared/youtubeApi/Types";

const {locale, t} = useI18n();
const calendar = useCookie("intl-calendar");
const hour24 = useCookie("intl-24clock");

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
	const diff = Math.abs(to.getTime() - from.getTime());
	const diffAxis = (to.getTime() > from.getTime()) ? 1 : (to.getTime() == from.getTime() ? 0 : -1);
	// この仕様が新しすぎて、ts-ignoreを消すとエラーが出ます（汗）
	// @ts-ignore
	const formatter = new Intl.DurationFormat(locale.value, {style: "short"})
	const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.2425));
	const months = Math.floor(diff % (1000 * 60 * 60 * 24 * 365.2425) / (1000 * 60 * 60 * 24 * 365.2425 / 12));
	const days = Math.floor(diff % (1000 * 60 * 60 * 24 * 365.2425 / 12) / (1000 * 60 * 60 * 24));
	const hours = Math.floor(diff % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
	const minutes = Math.floor(diff % (1000 * 60 * 60) / (1000 * 60));
	// @ts-ignore
	const diffStr: string = formatter.format({
		years,
		months,
		days,
		hours,
		minutes,
	})
	switch (diffAxis) {
		case 1:
			return t(`videoListBox.${type == 0 ? "elapsed" : "ago"}`).replace("%s", diffStr);
		case -1:
			return t(`videoListBox.${type == 0 ? "left" : "later"}`).replace("%s", diffStr);
		case 0:
			return t('videoListBox.justNow');
	}
}

const dateTimeFormatter = computed(() => new Intl.DateTimeFormat(locale.value, {
	calendar: calendar.value ?? "gregory",
	hour12: !(hour24.value ?? true),
	year: "numeric",
	month: "2-digit",
	day: "2-digit",
	hour: "2-digit",
	minute: "2-digit",
}));
</script>

<template>
	<div class="video-card-container" :lang="videoItem.defaultLanguage">
		<a :key="videoItem.videoId" :href="videoItem.url" class="disable-link-icons">
			<BCard :class="`video-list-card${videoItem.isShorts ? ' shorts' : ''}`" :style="`border-color: ${ videoItem.thumbnailColor.hexadecimal }`" body-class="video-list-card-body">
				<template v-slot:img>
					<img aria-hidden="true" v-if="Object.keys(videoItem.thumbnails).length == 0" :alt="videoItem.title" :class="`thumbnail ${imageLoaded ? '' : 'loading'} ${videoItem.isShorts ? ' img-fluid rounded-start' : ' rounded-top'}`" :src="videoItem.thumbnail" loading="lazy" @load="imageLoaded = true"/>
					<img aria-hidden="true" v-else :alt="videoItem.title" :class="`thumbnail ${imageLoaded ? '' : 'loading'} ${videoItem.isShorts ? ' img-fluid rounded-start' : ' rounded-top'}`" :src="videoItem.thumbnail" :srcset="Object.values(videoItem.thumbnails).map<string>(value => `${value.url} ${value.width}w`).join(',')" loading="lazy" @load="imageLoaded = true"/>
					<div aria-hidden="true" v-if="!imageLoaded" :class="`thumbnail placeholder-wave placeholder`" :style="`background: ${videoItem.thumbnailColor.hexadecimal};`"></div>
				</template>
				<template v-slot:default>
					<div class="d-flex flex-column h-100">
						<p class="flex-grow-0 tw:text-sm video-title text-truncate text-truncate-3">
							<i :class="typeIconClass"></i>
							<span :id="`video-card-title:${videoItem.videoId}`" v-text="videoItem.title"/>
						</p>
						<small class="flex-shrink-1 flex-grow-0 channel-name mt-auto description-text text-secondary text-truncate text-truncate-2">{{ videoItem.channelTitle }}</small><br>
						<small class="mt-2 description-text text-secondary flex-shrink-1 flex-grow-0">
							<span v-if="videoType == 'upcoming'">
								<span class="video-card-time" v-html='t("videoListBox.scheduledAt").replace("%s", `<time datetime="${new Date((videoItem as LiveStreamSchedule).liveScheduledStartTime).toISOString()}">${dateTimeFormatter.format(new Date((videoItem as LiveStreamSchedule).liveScheduledStartTime))}</time>`)'></span><br>
								<span class="video-card-time">{{ intervalString(new Date((videoItem as LiveStreamSchedule).liveScheduledStartTime)) }}</span>
							</span>
							<span v-else-if="videoType == 'live'">
								<span class="video-card-time" v-html='t("videoListBox.from").replace("%s", `<time datetime="${new Date((videoItem as LiveStream).liveActualStartTime).toISOString()}">${dateTimeFormatter.format(new Date((videoItem as LiveStream).liveActualStartTime))}</time>`)'></span><br>
								<span class="video-card-time">{{ intervalString(new Date((videoItem as LiveStream).liveActualStartTime)) }}</span>
							</span>
							<span v-else-if="videoType == 'archive'">
								<span class="video-card-time" v-html='t("videoListBox.from").replace("%s", `<time datetime="${new Date((videoItem as LiveStreamArchive).liveActualStartTime).toISOString()}">${dateTimeFormatter.format(new Date((videoItem as LiveStreamArchive).liveActualStartTime))}</time>`)'></span><br>
								<span class="video-card-time" v-html='t("videoListBox.to").replace("%s", `<time datetime="${new Date((videoItem as LiveStreamArchive).liveActualEndTime).toISOString()}">${dateTimeFormatter.format(new Date((videoItem as LiveStreamArchive).liveActualEndTime))}</time>`)'></span><br>
							</span>
							<span v-else>
								<span class="video-card-time">{{ t("videoListBox.postedAt").replace("%s", dateTimeFormatter.format(new Date(videoItem.publishedAt))) }}</span>
							</span>
						</small>
					</div>
				</template>
			</BCard>
		</a>
	</div>
</template>

<style scoped lang="less">
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

@container (300px <= width < 500px) {
	.thumbnail {
		aspect-ratio: 22/9;
		width: 100%;
		height: fit-content;
		object-fit: cover;
		object-position: center;
	}
}

@container (500px <= width <= 768px) {
	.thumbnail {
		aspect-ratio: 22/6;
		width: 100%;
		height: fit-content;
		object-fit: cover;
		object-position: center;
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
