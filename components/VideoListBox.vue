<script lang="ts" setup>
import type {Member} from "~/pages/index.vue";
import {hash} from "ohash";
import {YouTubeAPI} from "~/composables/youtubeApi/YouTubeAPI";
import type {ShallowRef} from "vue";
type VideoMemberAttributes = {
	members: Member[],
}

type VideoTab = {
	label: string,
	type: string,
	url: string,
	isShorts: boolean,
	icon: string,
}

const {locale, t} = useI18n();
const config = useRuntimeConfig();

const youtubeAPI = new YouTubeAPI(config.public.YT_API_VERSION2)

const props = defineProps<VideoMemberAttributes>();
const profileIds = props.members.map(e => e.profileId);

const tabs = computed<{ [tabId: string | symbol]: VideoTab }>(() => {
	return {
		schedule: {
			label: "videoListBox.scheduled",
			type: "schedule",
			url: youtubeAPI.getSearchApiEndpoint({members: profileIds, type: "liveBefore"}),
			isShorts: false,
			icon: "mdi mdi-calendar-star",
		},
		live: {
			label: "videoListBox.live",
			type: "live",
			url: youtubeAPI.getSearchApiEndpoint({members: profileIds, type: "liveNow"}),
			isShorts: false,
			icon: "mdi mdi-video-wireless",
		},
		archive: {
			label: "videoListBox.archive",
			type: "archive",
			url: youtubeAPI.getSearchApiEndpoint({members: profileIds, type: "liveAfter", order: "desc"}),
			isShorts: false,
			icon: "mdi mdi-archive",
		},
		video: {
			label: "videoListBox.video",
			type: "video",
			url: youtubeAPI.getSearchApiEndpoint({members: profileIds, type: "video", isShorts: TriState.No, order: "desc"}),
			isShorts: false,
			icon: "mdi mdi-video",
		},
		shorts: {
			label: "videoListBox.shorts",
			type: "shorts",
			url: youtubeAPI.getSearchApiEndpoint({members: profileIds, type: "video", isShorts: TriState.Yes, order: "desc"}),
			isShorts: true,
			icon: "mdi mdi-cellphone-play",
		},
	};
});

const lastFetched = toRef(new Date(0));
const fetchSlice = toRef(0);
const selectedTab = toRef<string | symbol>("live");
const updatedAt = toRef(new Date(0));
const fetched = toRef(false);
const references = toRef<Readonly<ShallowRef>[]>([]);
const updateKeys = toRef<{ [tabId: string | symbol]: number }>({
	"all-videos": 0,
	schedule: 0,
	live: 0,
	archive: 0,
	video: 0,
	shorts: 0,
});
const selectState = toRef<{ [tabId: string | symbol]: boolean }>({
	"all-videos": false,
	schedule: false,
	live: true,
	archive: false,
	video: false,
	shorts: false,
});
const loadingState = toRef<{ [tabId: string | symbol]: boolean }>({
	"all-videos": true,
	schedule: true,
	live: true,
	archive: true,
	video: true,
	shorts: true,
})

function tabChange(tabId: string | symbol) {
	for (const tabIdKey in selectState.value) {
		selectState.value[tabIdKey] = tabId == tabIdKey;
		selectState.value[tabIdKey] = tabId == tabIdKey;
	}
	if (selectedTab.value == tabId) {
		updateKeys.value[tabId]++;
		console.debug(`Self Updating: ${tabId.toString()}`);
	} else {
		selectedTab.value = tabId;
		console.debug(`Tab Change: ${tabId.toString()}`);
	}
}


const updateTimeSet = (rawUpdatedAt: number) => {
	if (rawUpdatedAt <= updatedAt.value.getTime()) return;
	updatedAt.value = new Date(rawUpdatedAt);
	fetchSlice.value = Math.floor(updatedAt.value.getTime() / 300_000);
	fetched.value = true;
}

const timeFormatAsSafeToParse = (date: Date): string => {
	return `${date.getUTCFullYear()}-${(date.getUTCMonth() + 1).toString().padStart(2, "0")}-${date.getUTCDate().toString().padStart(2, "0")}T${date.getUTCHours().toString().padStart(2, "0")}:${date.getUTCMinutes().toString().padStart(2, "0")}:${date.getUTCSeconds().toString().padStart(2, "0")}.${date.getUTCMilliseconds().toString().padStart(3, "0")}Z`
}
const infoModal = toRef(false);
</script>

<template>
	<div class="video-list-wrapper">
		<ul id="video-list-container" class="nav nav-tabs" role="tablist">
			<li v-for="tab in tabs" class="nav-item" role="presentation">
				<button :id="`#${tab.type}-tab`" :aria-controls="`${tab.type}-tab-pane`" :aria-selected="tab.type == selectedTab" :class="{'active':tab.type == selectedTab}" class="nav-link tab-selector" role="tab" type="button" @click="()=>tabChange(tab.type)">
					<span class="tab-icon">
						<i :class="tab.icon"></i>
					</span>
					<span class="tab-name">
						{{ t(tab.label) }}
					</span>
					<span class="loading-indicator">
						<span v-if="loadingState[tab.type]" class="spinner-grow spinner-grow-sm text-info" aria-hidden="true"></span>
					</span>
				</button>
			</li>
			<li class="nav-item" role="presentation">
				<button id="#all-videos-tab" aria-controls="all-videos-tab-pane" :aria-selected="'all-videos' == selectedTab" :class="{'active':'all-videos' == selectedTab}" class="nav-link" role="tab" type="button" @click="()=>tabChange('all-videos')">
					<span class="tab-icon">
						<i class="mdi mdi-playlist-play"></i>
					</span>
					<span class="tab-name">
						{{ t("videoListBox.allVideos") }}
					</span>
					<span class="loading-indicator">
						<span v-if="loadingState['all-videos']" class="spinner-grow spinner-grow-sm text-info" aria-hidden="true"></span>
					</span>
				</button>
			</li>
		</ul>
		<div class="tab-content border-bottom border-start border-end p-2 rounded-bottom">
			<div v-for="tab in tabs" :id="`${tab.type}-tab-pane`" :key="hash(tab)" :aria-labelledby="`${tab.type}-tab`" :class="{'show': tab.type == selectedTab, 'active': tab.type == selectedTab}" class="tab-pane fade" role="tabpanel" tabindex="0">
				<LazyVideoList @load-state="state => {loadingState[tab.type] = state;}" :current-key="tab.type" v-model:selected="selectState['all-videos']" :key="updateKeys[tab.type]" :ref="`videoList${tab.type.slice(0,1).toUpperCase()}${tab.type.slice(1)}`" :already-initialized="fetched" :is-shorts="tab.isShorts" :url="tab.url" @last-updated="updateTimeSet"/>
			</div>
			<div id="all-videos-tab-pane" aria-labelledby="`all-videos-tab" :class="{'show': 'all-videos' == selectedTab, 'active': 'all-videos' == selectedTab}" class="tab-pane fade" role="tabpanel" tabindex="0">
				<AllVideoList @load-state="state => {loadingState['all-videos'] = state;}" v-model:selected="selectState['all-videos']" :key="updateKeys['all-videos']" :members="profileIds" :already-initialized="fetched" @last-updated="updateTimeSet"/>
				/>
			</div>
		</div>
	</div>
	<div class="tw:flex placeholder-wave">
		<span class="ms-auto" @click.stop="infoModal = true">
			<i class="mdi mdi-information text-info"/>
		</span>
		<span>
			<small v-if="fetched" class="tw:text-black">{{ t("videoListBox.lastFetched").replace("%s", updatedAt.toLocaleString(locale, {year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit"})) }}</small>
			<small v-else class="tw:text-black placeholder col-1"></small>
		</span>
	</div>
	<BModal v-model="infoModal" title="Information" ok-only>
		<div class="d-flex flex-column">
			<span class="placeholder-wave my-2">
				<span v-if="fetched" class="tw:text-black">{{ t("videoListBox.lastFetched").replace("%s", updatedAt.toLocaleString(locale, {year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit"})) }}</span>
				<span v-else class="tw:text-black placeholder col-1"></span>
			</span>
			<span class="my-2" v-html="t('videoListBox.listInformationText')"></span>
			<div class="my-2 d-flex flex-column">
				<span>{{ t("videoListBox.apiPoweredBy") }}</span>
				<img loading="lazy" :src="`https://infra.virtlive.jp/badge${locale.toString().startsWith('ja') ? '.ja.svg' : '.svg'}`" alt="Powered by VirtLive! Common Infrastructure">
			</div>
		</div>
	</BModal>
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

<style scoped>
.loading-indicator {
	display: inline-block;
	width: 16px;
}

.tab-name {
	word-break: keep-all;
}

.tab-selector {
	word-break: keep-all;
	width: max-content;
}

.tab-icon {
	display: inline-block;
	width: 16px;
	margin-right: 4px;
}

.tab-icon > i {
	font-size: 16px;
}
</style>
