import {EventHandlerRequest, H3Event} from "h3";

async function updateCheckHandler(event: H3Event<EventHandlerRequest>) {
	const query = getQuery(event);
	if (query.t != undefined && query.t != "" && query.t != null) {
		const t = new Date(query.t.toString());
		const m = await $fetch<{ lastUpdate: string }>("https://infra.virtlive.jp/ytapi/modify");
		if (t.getTime() < new Date(m.lastUpdate).getTime()) {
			return {
				update: true,
			};
		} else {
			return {
				update: false,
			};
		}
	}
	return {
		update: true,
	};
}

export default defineEventHandler((event) => {
	let returnBuffer: { update: boolean } = {update: true};
	event.waitUntil((async () => {
		returnBuffer = await updateCheckHandler(event)
	})());
	return returnBuffer;
})
