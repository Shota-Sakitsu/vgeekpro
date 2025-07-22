"use strict";

import * as child_process from "node:child_process";
import path from "node:path";
import fs from "node:fs";

const projectRoot = path.dirname(import.meta.dirname);

if (!fs.existsSync(path.join(projectRoot, "package.json"))) {
	console.error("想定外の位置のようです。");
	process.exit(1);
}

if (!fs.existsSync(path.join(projectRoot, "node_modules"))) {
	console.log("依存関係のインストール中")
	child_process.spawnSync("pnpm", ["install"], {
		cwd: projectRoot,
		shell: true,
		stdio: [
			process.stdin,
			process.stdout,
			process.stderr,
		]
	})
}

console.log("ビルド中");
let build = child_process.spawnSync("pnpm", ["build"], {
	cwd: projectRoot,
	shell: true,
	stdio: [
		process.stdin,
		process.stdout,
		process.stderr,
	]
})

if (build.status !== 0) {
	console.error("ビルド失敗");
	process.exit(1);
}

console.log("テストするパスを確認しています");
/** @type {string[]} */
const testingAddresses = [];
/** @type {string[]} */
const vueAddresses = [];
/** @type {string[]} */
const publicAddresses = [];
checkPathVue(path.join(projectRoot, "app", "pages"), path.join(projectRoot, "app", "pages"), vueAddresses);
checkPathPublic(path.join(projectRoot, "public"), path.join(projectRoot, "public"), publicAddresses);
testingAddresses.push(...vueAddresses, ...publicAddresses);
const vueCount = vueAddresses.length;
const publicCount = publicAddresses.length;


let userAgent = "";

console.log("ユーザーエージェント文字列を準備しています");
try {
	/** @type {{[key: string]: string}} */
	const versions = JSON.parse(await (await fetch("https://product-details.mozilla.org/1.0/firefox_versions.json")).text());
	const version = `${versions["LATEST_FIREFOX_VERSION"].replaceAll(/^(\d+)\.\d+\.\d+.*$/g, "$1")}.0`;
	userAgent = `Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:${version}) Gecko/20100101 Firefox/${version}`;
} catch (e) {
	console.error("Firefoxのバージョン情報を確認出来ませんでした。コードの28行目付近を編集してください。");
	process.exit(1);
}

console.log("プレビューサーバーを起動中");
let server = child_process.spawn("pnpm", ["preview"], {
	cwd: projectRoot,
	shell: true,
	stdio: [
		process.stdin,
		process.stdout,
		process.stderr,
	]
})

console.log("起動完了を10秒間待っています");
await new Promise((resolve) => {
	setTimeout(resolve, 10000)
})

const results = {}
const total = testingAddresses.length;
const totalWidth = (total.toString().length + 1);
let count = 0;
let success = 0;
let failed = 0;

console.log("テストを開始しています");
for (const testingAddress of testingAddresses) {
	const url = new URL(testingAddress, "http://localhost:3000");
	const current = ++count;
	const result = await fetch(url, {
		method: "GET",
		headers: {
			"Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
			"Accept-Language": "ja,en-US;q=0.7,en;q=0.3",
			"User-Agent": userAgent
		},
	});
	results[testingAddress] = result.ok;
	if (result.ok) {
		console.log(`${current.toString().padStart(totalWidth, " ")} / ${total.toString().padStart(totalWidth, " ")} | OK : ${testingAddress}`);
		success++;
	} else {
		console.warn(`${current.toString().padStart(totalWidth, " ")} / ${total.toString().padStart(totalWidth, " ")} | NG : ${testingAddress}`);
		failed++;
	}
	await new Promise((resolve) => {
		setTimeout(resolve, 250)
	})
}

console.log("後処理を行っています")
server.kill();

const vuePercent = vueCount / total * 100;
const publicPercent = publicCount / total * 100;
const successPercent = success / total * 100;
const failedPercent = failed / total * 100;
const successCount = successPercent / 100 * 24
const failedCount = 24 - successCount;
const successAddresses = [];
const failedAddresses = [];

for (const [address, result] of Object.entries(results)) {
	if (result) {
		successAddresses.push(address);
	} else {
		failedAddresses.push(address);
	}
}

console.log("テストが完了しました");
console.log(`成  功: ${success.toString().padStart(16, " ")}件`);
console.log(`失  敗: ${failed.toString().padStart(16, " ")}件`);
console.log(`全  体: ${total.toString().padStart(16, " ")}件`);
console.log(`成功率: ${successPercent.toFixed(2).padStart(17, " ")}%`);
console.log(`|\x1b[102m${"=".repeat(successCount)}\x1b[0m|\x1b[101m${".".repeat(failedCount)}\x1b[0m|`);

const now = new Date();
const fileSafeDateTime = `${now.getFullYear().toString().slice(-2)}-${(now.getMonth() + 1).toString().padStart(2, " ")}-${now.getDate().toString().padStart(2, " ")}_${now.getHours().toString().padStart(2, " ")}-${now.getMinutes().toString().padStart(2, " ")}-${now.getSeconds().toString().padStart(2, " ")}`;

const weekDay = ["日", "月", "火", "水", "木", "金", "土"];

let markdown = `# ぶいぎーく！公式サイト テスト結果レポート
## 概要
| 項目             | 値                      |
| :--------------- | :---------------------- |
| 実施日           | ${now.getFullYear()}年 ${(now.getMonth() + 1).toString().padStart(2, " ")}月 ${now.getDate().toString().padStart(2, " ")}日 ${weekDay[now.getDay()]}曜日 |
| 実施時刻         | ${now.getHours() >= 12 ? "午後" : "午前"} ${(now.getHours() % 12).toString().padStart(2, " ")}時 ${now.getMinutes().toString().padStart(2, " ")}分頃        |
| 実施件数         | ${total.toString().padStart(6, " ")}件                |
| │ ├ 内ページ数   | ${vueCount.toString().padStart(6, " ")}件 (${vuePercent.toFixed(2).padStart(6, " ")}%)      |
| │ └ 内メディア数 | ${publicCount.toString().padStart(6, " ")}件 (${publicPercent.toFixed(2).padStart(6, " ")}%)      |
| ├ 成功数         | ${success.toString().padStart(6, " ")}件 (${successPercent.toFixed(2).padStart(6, " ")}%)      |
| └ 失敗数         | ${failed.toString().padStart(6, " ")}件 (${failedPercent.toFixed(2).padStart(6, " ")}%)      |

### お知らせ
本ツールはHTTP応答を使った簡易試験です。  
正常にレンダリングされるかは実際のページをご確認ください。

### 本ツールの開発者
- [佐藤 聖月　(Icicle Project)](https://icicle.isnow.jp/)

## 成功した項目
${successAddresses.map(address => `- \`${address}\``).join("\n")}

## 失敗した項目
${failedAddresses.map(address => `- \`${address}\``).join("\n")}
`;

fs.writeFileSync(path.join(import.meta.dirname, "results", `${fileSafeDateTime}.md`), markdown);
console.log(`結果レポートを ${path.resolve(path.join(import.meta.dirname, "results", `${fileSafeDateTime}.md`))} に保存しました。`);

process.exit(0);

function checkPathVue(base, dir, addresses) {
	const files = fs.readdirSync(dir);
	for (const file of files) {
		if (file.startsWith(".")) continue;
		const filePath = path.join(dir, file);
		const stat = fs.statSync(filePath);
		if (stat.isDirectory()) {
			checkPathVue(base, filePath, addresses);
		} else if (stat.isFile()) {
			if (file.endsWith(".vue")) {
				addresses.push(filePath.slice(base.length + 1));
			}
		}
	}
}

function checkPathPublic(base, dir, addresses) {
	const files = fs.readdirSync(dir);
	for (const file of files) {
		if (file.startsWith(".")) continue;
		const filePath = path.join(dir, file);
		const stat = fs.statSync(filePath);
		if (stat.isDirectory()) {
			checkPathPublic(base, filePath, addresses);
		} else if (stat.isFile()) {
			addresses.push(filePath.slice(base.length + 1));
		}
	}
}
