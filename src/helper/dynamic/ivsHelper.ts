import { S3_IVS_URL } from '@src/const';

export const generateIvsM3U8 = (prefix: string) => `${S3_IVS_URL}/${prefix}/media/hls/master.m3u8`;

export const generateIvsThumbUrl = (prefix: string, idx: number) => `${S3_IVS_URL}/${prefix}/media/thumbnails/thumb${idx}.jpg`;
