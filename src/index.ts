#!/usr/bin/env node

import { createWriteStream } from 'node:fs';
import { Readable } from 'node:stream';
import axios from 'axios';

const fetchVideoUrl = async (videoId: string) => {
    const response = await axios.get(`https://www.instagram.com/graphql/query/?query_hash=b3055c01b4b222b8a47dc12b090e4e64&variables=%7B%22shortcode%22%3A%22${videoId}%22%2C%22child_comment_count%22%3A3%2C%22fetch_comment_count%22%3A40%2C%22parent_comment_count%22%3A24%2C%22has_threaded_comments%22%3Atrue%7D`);
    return response.data.data.shortcode_media.video_url;
}

const downloadVideoFromIG = async (videoId: string) => {
    const videoUrl = await fetchVideoUrl(videoId);

    const response: any = await fetch(`${videoUrl}`);

    if (!response.ok) throw new Error('Response is not ok.');

    const writeStream = createWriteStream('/Users/hem/Library/CloudStorage/OneDrive-Personal/Downloads/' + videoId + '.mp4');

    const readable = Readable.fromWeb(response.body);

    readable.pipe(writeStream);

    await new Promise((resolve, reject) => {
        readable.on('end', resolve);
        readable.on('error', reject);
    });
}

const main = (args: any) => {
    const site = args[2];

    if (site === 'ig') {
        const videoId = args[3].split('/')[4];
        downloadVideoFromIG(videoId);
    }

};

main(process.argv);