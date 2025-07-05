"use strict";
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const stdout = process.stdout
const stderr = process.stderr;
let colorAvailable = false;
if (process.platform === "win32" ||
	(Object.keys(process.env).includes("TERM") && (process.env.TERM.endsWith("-256color") || process.env.TERM.endsWith("-color") || process.env.TERM.startsWith("xterm")))) {
	colorAvailable = true;
}

function getColorId(color) {
	if (typeof color === "number") {
		if (color >= 0) {
			if (color < 8) {
				return 30 + Math.floor(color);
			} else if (color < 16) {
				return 90 + Math.floor(color);
			}
		}
	}
	switch (color) {
		case "black":
			return 30;
		case "crimson":
			return 31;
		case "green":
			return 32;
		case "gold":
			return 33;
		case "blue":
			return 34;
		case "magenta":
			return 35;
		case "cyan":
			return 36;
		case "lightgrey":
			return 37;
		case "darkgrey":
			return 90;
		case "red":
			return 91;
		case "lime":
			return 92;
		case "yellow":
			return 93;
		case "skyblue":
			return 94;
		case "purple":
			return 95;
		case "aqua":
			return 96;
		case "white":
			return 97;
	}
	return 39;
}

function setFGColor(color) {
	if (!colorAvailable) return "";
	let colorId = getColorId(color);
	return `\x1b[${colorId}m`
}

function setBGColor(color) {
	if (!colorAvailable) return "";
	let colorId = getColorId(color);
	return `\x1b[${colorId + 10}m`
}

if (process.argv.length < 3) {
	stdout.write(`使用法
${path.basename(process.argv[0])} ${path.basename(process.argv[1])} [入力ディレクトリ]
入力ディレクトリ内の "full_body" "upper_body" と名付けられた png, jpeg, jpg と言う拡張子をもつファイルを探します。
また、両ファイル共に "_variation_[バリエーション値]" のようにファイル名の末尾に追記することで、複数のバリエーションを同時に変換できます。
ファイル名の大文字小文字は区別されますが、ファイル探索時には区別されません。
正規表現では /^((?:full|upper)_body(?:_variation_\\d)?)\\.(png|jpe?g)$/i となります。
出力は入力ディレクトリ内に output というディレクトリが作成されます。
出力ディレクトリ内のファイルを確認の上、ディレクトリをメンバーIDにリネームして、本リポジトリ /public/images/members/ 以下に放り投げるか、圧縮してDiscordに送りつけてください。
*このスクリプトはぶいぎーく！公式サイト用に設計しているため、単にWebPに変換する場合では使い勝手が悪いものとなります。
`);
	process.exit(1);
}

const inputDir = path.resolve(process.argv[2]);
if (!fs.existsSync(inputDir)) {
	stderr.write(`${setFGColor("green")}入力ディレクトリがありません${setFGColor("reset")}\n`);
	process.exit(1);
}
if (!fs.statSync(inputDir).isDirectory()) {
	stderr.write(`${setFGColor("green")}入力ディレクトリとして指定されたパスはディレクトリではありません${setFGColor("reset")}\n`);
	process.exit(1);
}

const outputDir = path.join(inputDir, "output");
if (fs.existsSync(outputDir)) {
	if (!fs.statSync(outputDir).isDirectory()) {
		stderr.write(`${setBGColor("red")}${setFGColor("white")}出力ディレクトリを作成できません: ファイルが既に存在します${setFGColor("reset")}${setBGColor("reset")}\n`);
		process.exit(1);
	}
} else {
	fs.mkdirSync(outputDir);
}
const inputPattern = /^((?:full|upper)_body(?:_variation_\d)?)\.(png|jpe?g)$/i;
const files = fs.readdirSync(inputDir).filter(file => inputPattern.test(file));
if (files.length === 0) {
	stdout.write(`処理対象のファイルがありませんでした。\n`)
} else {
	stdout.write(`合計で ${files.length} 個のファイルを処理します\n`);
	startProcess(files).then();
}

async function startProcess(files) {
	await new Promise(resolve => setTimeout(resolve, 1000));
	let count = 1;
	const padLength = files.length.toString().length;
	const filesLength = files.length.toString().padStart(padLength + 1, " ");
	if (colorAvailable) stdout.write(`${filesLength}個中の ${count.toString().padStart(padLength, " ")}個目を変換中…\n`)
	for (const file of files) {
		if (colorAvailable) {
			stdout.write(`\x1b[1F${filesLength}個中の ${count.toString().padStart(padLength, " ")}\n`);
		} else {
			stdout.write(`${filesLength}個中の ${count.toString().padStart(padLength, " ")}個目を変換中\n`);
		}
		await sharp(path.join(inputDir, file))
			.webp()
			.toFile(path.join(outputDir, `${file.replace(inputPattern, "$1.webp")}`))
		count++;
	}
	stdout.write(`${colorAvailable ? "\x1b[1E" : "\n"}完了\n`);
}
