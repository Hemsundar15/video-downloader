#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fs_1 = require("node:fs");
const node_stream_1 = require("node:stream");
const axios_1 = __importDefault(require("axios"));
const fetchVideoUrl = (videoId) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.get(`https://www.instagram.com/graphql/query/?query_hash=b3055c01b4b222b8a47dc12b090e4e64&variables=%7B%22shortcode%22%3A%22${videoId}%22%2C%22child_comment_count%22%3A3%2C%22fetch_comment_count%22%3A40%2C%22parent_comment_count%22%3A24%2C%22has_threaded_comments%22%3Atrue%7D`);
    return response.data.data.shortcode_media.video_url;
});
const downloadVideoFromIG = (videoId) => __awaiter(void 0, void 0, void 0, function* () {
    const videoUrl = yield fetchVideoUrl(videoId);
    const response = yield fetch(`${videoUrl}`);
    if (!response.ok)
        throw new Error('Response is not ok.');
    const writeStream = (0, node_fs_1.createWriteStream)('/Users/hem/Library/CloudStorage/OneDrive-Personal/Downloads/' + videoId + '.mp4');
    const readable = node_stream_1.Readable.fromWeb(response.body);
    readable.pipe(writeStream);
    yield new Promise((resolve, reject) => {
        readable.on('end', resolve);
        readable.on('error', reject);
    });
});
const main = (args) => {
    const site = args[2];
    if (site === 'ig') {
        const videoId = args[3].split('/')[4];
        downloadVideoFromIG(videoId);
    }
};
main(process.argv);
//# sourceMappingURL=index.js.map