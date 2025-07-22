//APIルート構造
import type {TriState} from "~~/shared/ExtendUtils";

export type VideosResponse = {
	items: VideoItems,
	results: ApiHeader
};

export type MemberResponse = {
	members: Members,
	results: ApiHeader
};

export type VideoType = ("video" | "liveBefore" | "liveNow" | "liveAfter");

//
export type SearchCondition = PaginationInformation & CommonVideoRequestCondition & {
	members?: string[],
};

export type VideosCondition = PaginationInformation & CommonVideoRequestCondition & {
	member?: string,
};

export type CommonVideoRequestCondition = {
	isShorts?: TriState,
	type?: VideoType;
}

export type PaginationInformation = CommonRequestParam & {
	limit?: number,
	page?: number,
}

export type CommonRequestParam = {
	order?: "desc" | "asc"
}

///エイリアス
export type SearchResponse = VideosResponse;

//内部構造
export type ApiHeader = {
	recode: {
		totalCounts: number,
		resultCounts: number,
		updatedAt: number,
	},
	page: {
		pageLimit: number,
		currentPage: number,
		totalPages: number,
	}
};

export type Members = Member[];
export type Member = {
	name: string,
	display_name: string,
	youtube_channel_id: string,
	url: string,
	auto_playlists: {
		allUploads: Playlist,
		uploadVideos: Playlist,
		popularVideos: Playlist,
		liveStreams: Playlist,
		membershipVideos: Playlist,
		membershipContents: Playlist,
		membershipShorts: Playlist,
		membershipLiveStreams: Playlist,
		popularShorts: Playlist,
		popularLiveStreams: Playlist,
		shorts: Playlist,
	}
}

export type Playlist = {
	id: string,
	url: string,
}

export type ThumbnailsList = {
	[key: string]: ThumbnailDefinition
}

export type ThumbnailDefinition = {
	url: string,
	width: number,
	height: number,
}

export type VideoInformation = {
	title: string,
	description: string,
}

export type LocalizedVideoInformation = {
	[lang: string]: VideoInformation,
}

export type VideoItem = (Video | LiveStreamSchedule | LiveStream | LiveStreamArchive);
export type VideoItems = VideoItem[];

export type VideoCommonProperties = VideoInformation & {
	url: string,
	videoId: string,
	publishedAt: string,
	channelTitle: string,
	thumbnailColor: ThumbnailColorDefinition,
	thumbnail: string,
	thumbnails: ThumbnailsList,
	localizations: LocalizedVideoInformation,
	defaultLanguage: string,
	defaultAudioLanguage: string,
	tags: string[],
	category: string,
	license: "youtube" | "creativeCommon",
	categoryId: number | null,
	isShorts: boolean,
}

export type ThumbnailColorDefinition = {
	decimal: number,
	hexadecimal: string,
	rgb: {
		r: number,
		g: number,
		b: number,
	},
	hsv: {
		h: number,
		s: number,
		v: number,
	},
}

export type Video = VideoCommonProperties & {
	liveBroadcast: "none",
};

export type LiveStreamSchedule = VideoCommonProperties & {
	liveBroadcast: "upcoming",
	liveScheduledStartTime: string,
};

export type LiveStream = VideoCommonProperties & {
	liveBroadcast: "live",
	liveScheduledStartTime?: string,
	liveActualStartTime: string,
};

export type LiveStreamArchive = VideoCommonProperties & {
	liveBroadcast: "none",
	liveScheduledStartTime?: string,
	liveActualStartTime: string,
	liveActualEndTime: string,
};

//旧式API
export type VideoItemV1 = {
	url: string,
	videoId: string,
	publishedAt: string,
	channelTitle: string,
	title: string,
	description: string,
	thumbnail: string,
	liveBroadcast: "none" | "live" | "upcoming",
	liveScheduledStartTime: string,
	liveActualStartTime: string,
	liveActualEndTime: string,
	isShorts: boolean
};

