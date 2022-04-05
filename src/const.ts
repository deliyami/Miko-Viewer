import { DoneItem } from './types/share/DoneItem';

// Debug Mode
export const dummyMotion = true;

// VALUE
export const MAX_MSGS = 500;

// Const
export const LOGIN_COOKIE = 'isLogin';
export const LARAVEL_SESSION = 'laravel_session';
export const USER_TICKET_COOKIE = 'userTicket';
export const categoryArray = ['J-POP', 'K-POP', '애니메이션', '재즈/소울', '밴드', '발라드'];
export const doneItem: DoneItem[] = [{ name: 'ハート', price: 5000, id: 0 }];

export const chType = ['チャージ', 'チケット購入', 'SC送り', 'アイテム使用', 'グッズ購入', 'チケット販売', 'グッズ販売', 'SC受け', 'アイテム受け'];
export const chChargeIdx = 0;
export const chTicketBuyIdx = 1;
export const chSuperChatSendIdx = 2;
export const chDoneItemSendIdx = 3;
export const chGoodsBuyIdx = 4;
export const chTicketSoldIdx = 5;
export const chGoodsSoldIdx = 6;
export const chSuperChatSendedIdx = 7;
export const chSuperDoneItemSendedIdx = 8;

export const S3_URL = 'https://miko-image.s3.ap-northeast-2.amazonaws.com/';

export const MY_AVATAR_ID = 'myAvatar'; // 이거 변경하면 @src/components/viewing/GlobalModel.ts에 default value변경해야함

// Env
const ENV_PREFIX = 'NEXT_PUBLIC_';

export const LARAVEL_URL = process.env[ENV_PREFIX + 'LARAVEL_URL'] ?? 'http://localhost:8080/api';
export const NEST_URL = process.env[ENV_PREFIX + 'NEST_URL'] ?? 'http://localhost:3001/api';
export const SOCKET_URL = process.env[ENV_PREFIX + 'SOCKET_SERVER'] ?? 'http://localhost:3002';

export const NEXT_URL = process.env[ENV_PREFIX + 'NEXT_URL'] ?? 'http://localhost:3000';

// URL
export const URL_USER_TICKET = '/user_tickets';
