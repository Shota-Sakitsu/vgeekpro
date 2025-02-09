<script lang="ts" setup>
import type {Member} from "~/pages/index.vue";
import {hash} from "ohash";
import {YouTubeAPI} from "~/composables/youtubeApi/YouTubeAPI";

type VideoMemberAttributes = {
	members: Member[],
}

type VideoTab = {
	label: string,
	type: string,
	url: string,
	isShorts: boolean,
}

const {locale} = useI18n();
const config = useRuntimeConfig();

const youtubeAPI = new YouTubeAPI(config.public.YT_API_VERSION2)

const props = defineProps<VideoMemberAttributes>();

const tabs = computed<{ [tabId: string | symbol]: VideoTab }>(() => {
	return {
		schedule: {
			label: "videoListBox.scheduled",
			type: "schedule",
			url: youtubeAPI.getSearchApiEndpoint({members: props.members.map(e => e.profileId), type: "liveBefore"}),
			isShorts: false
		},
		live: {
			label: "videoListBox.live",
			type: "live",
			url: youtubeAPI.getSearchApiEndpoint({members: props.members.map(e => e.profileId), type: "liveNow"}),
			isShorts: false
		},
		archive: {
			label: "videoListBox.archive",
			type: "archive",
			url: youtubeAPI.getSearchApiEndpoint({members: props.members.map(e => e.profileId), type: "liveAfter", order: "desc"}),
			isShorts: false
		},
		video: {
			label: "videoListBox.video",
			type: "video",
			url: youtubeAPI.getSearchApiEndpoint({members: props.members.map(e => e.profileId), type: "video", isShorts: TriState.No, order: "desc"}),
			isShorts: false
		},
		shorts: {
			label: "videoListBox.shorts",
			type: "shorts",
			url: youtubeAPI.getSearchApiEndpoint({members: props.members.map(e => e.profileId), type: "video", isShorts: TriState.Yes, order: "desc"}),
			isShorts: true
		},
	};
});

const updateId = toRef<number>(0);

function tabChange(tabId: string | symbol) {
	selectedTab.value = tabId;
}

const lastFetched = toRef(new Date(0));
const fetchSlice = toRef(0);
const selectedTab = toRef<string | symbol>("live");
const updatedAt = toRef(new Date(0));
const fetched = toRef(false);

const updateTimeSet = (rawUpdatedAt: number) => {
	if (rawUpdatedAt <= updatedAt.value.getTime()) return;
	updatedAt.value = new Date(rawUpdatedAt);
	fetchSlice.value = Math.floor(updatedAt.value.getTime() / 300_000);
	fetched.value = true;
}

const update = () => {
	const fetchTimer = Math.floor((new Date().getTime() - lastFetched.value.getTime()) / 1000);
	if (
		(lastFetched.value.getTime() + 150_000) > new Date().getTime() ||
		fetchSlice.value >= Math.floor((new Date()).getTime() / 300_000)
	) {
		console.debug(
			"Fetch Skipped.\n%cCurrent Slice: %s\nFetched Slice: %s\nLast Fetch: %s (%s ago)",
			"font-family: monospace",
			Math.floor((new Date()).getTime() / 300_000),
			fetchSlice.value,
			lastFetched.value.toLocaleString("ja-jp"),
			(
				(fetchTimer >= 3600) ? `${Math.floor(fetchTimer / 3600)} Hour(s) ${Math.floor((fetchTimer % 3600) / 60)} Minute(s) ${Math.floor((fetchTimer % 3600) % 60)} Seconds` :
					((fetchTimer >= 60) ? `${Math.floor(fetchTimer / 60)} Minute(s) ${Math.floor((fetchTimer % 60))} Second(s)` : (
						(fetchTimer >= 1) ? `${Math.floor(fetchTimer)} Second(s)` : "Just now"
					)))
		);
		return;
	}
	if (lastFetched.value.getTime() == 0) {
		console.debug(
			"Fetch Started.\n%cCurrent Slice: %s\nFetched Slice: %s\nLast Fetch: Never",
			"font-family: monospace",
			Math.floor((new Date()).getTime() / 300_000),
			fetchSlice.value,
		);
	} else {
		console.debug(
			"Fetch Started.\n%cCurrent Slice: %s\nFetched Slice: %s\nLast Fetch: %s (%s ago)",
			"font-family: monospace",
			Math.floor((new Date()).getTime() / 300_000),
			fetchSlice.value,
			lastFetched.value.toLocaleString("ja-jp"),
			(
				(fetchTimer >= 3600) ? `${Math.floor(fetchTimer / 3600)} Hour(s) ${Math.floor((fetchTimer % 3600) / 60)} Minute(s) ${Math.floor((fetchTimer % 3600) % 60)} Seconds` :
					((fetchTimer >= 60) ? `${Math.floor(fetchTimer / 60)} Minute(s) ${Math.floor((fetchTimer % 60))} Second(s)` : (
						(fetchTimer >= 1) ? `${Math.floor(fetchTimer)} Second(s)` : "Just now"
					)))
		);
	}
	updateId.value += 1
	lastFetched.value = new Date()
	console.log(lastFetched.value);
}

let intervalCanceller: number | NodeJS.Timeout;

onMounted(() => {
	update();
	intervalCanceller = setInterval(update, 15_000);
});

onBeforeUnmount(() => {
	clearInterval(intervalCanceller);
})

</script>

<template>
	<div class="video-list-wrapper">
		<ul id="video-list-container" class="nav nav-tabs" role="tablist">
			<li v-for="tab in tabs" class="nav-item" role="presentation">
				<button :id="`#${tab.type}-tab`" :aria-controls="`${tab.type}-tab-pane`" :aria-selected="tab.type == selectedTab" :class="{'active':tab.type == selectedTab}" class="nav-link" role="tab" type="button" @click="()=>tabChange(tab.type)">
					{{ $t(tab.label) }}
				</button>
			</li>
		</ul>
		<div class="tab-content border-bottom border-start border-end p-2 rounded-bottom">
			<div v-for="tab in tabs" :id="`${tab.type}-tab-pane`" :key="hash(tab)" :aria-labelledby="`${tab.type}-tab`" :class="{'show': tab.type == selectedTab, 'active': tab.type == selectedTab}" class="tab-pane fade" role="tabpanel" tabindex="0">
				<LazyVideoList :key="updateId" :already-initialized="fetched" :is-shorts="tab.isShorts" :url="tab.url" @last-updated="updateTimeSet"/>
			</div>
		</div>
	</div>
	<div class="tw-flex placeholder-wave">
		<small v-if="fetched" class="ms-auto tw-text-black">{{ $t("videoListBox.lastFetched").replace("%s", updatedAt.toLocaleString(locale, {year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit"})) }}</small>
		<small v-else class="ms-auto tw-text-black placeholder col-1"></small>
	</div>
</template>

<style>
.video-list-wrapper {
	container-type: inline-size;
	height: fit-content;
}

.tab-content {
	background: #ffffff;
	container-type: inline-size;
}

.tab-pane {
	container-type: inline-size;
}
</style>
