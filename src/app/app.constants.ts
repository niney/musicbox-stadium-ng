import {environment} from '../environments/environment';

export const SEARCH_URL = environment.searchUrl;
export const SEARCH_API_URL = `${SEARCH_URL}/api`;

export const SAVE_USER_URL = `${SEARCH_API_URL}/user/_save`;
export const SEARCH_USER_URL = `${SEARCH_API_URL}/user/_search`;
export const GET_USER_URL = `${SEARCH_API_URL}/user/_get`;
export const DEL_USER_URL = `${SEARCH_API_URL}/user/_del`;

export const SAVE_GAME_URL = `${SEARCH_API_URL}/game/_save`;
export const SEARCH_GAME_URL = `${SEARCH_API_URL}/game/_search`;
export const GET_GAME_URL = `${SEARCH_API_URL}/game/_get`;
export const DEL_GAME_URL = `${SEARCH_API_URL}/game/_del`;

export const SAVE_VIDEO_URL = `${SEARCH_API_URL}/video/_save`;
export const SEARCH_VIDEO_URL = `${SEARCH_API_URL}/video/_search`;
export const GET_VIDEO_URL = `${SEARCH_API_URL}/video/_get`;
export const DEL_VIDEO_URL = `${SEARCH_API_URL}/video/_del`;

export const SAVE_PLAYER_URL = `${SEARCH_API_URL}/player/_save`;
export const SEARCH_PLAYER_URL = `${SEARCH_API_URL}/player/_search`;
export const GET_PLAYER_URL = `${SEARCH_API_URL}/player/_get`;
export const DEL_PLAYER_URL = `${SEARCH_API_URL}/player/_del`;

export const FILE_UPLOAD_URL = `${SEARCH_API_URL}/file/upload`;

export const STREAMING_FILENAME_URL = `${SEARCH_API_URL}/streaming/resource`

export const SAVE_DEVICE_URL = `${SEARCH_API_URL}/device/_save`;
export const SEARCH_DEVICE_URL = `${SEARCH_API_URL}/device/_search`;
export const GET_DEVICE_URL = `${SEARCH_API_URL}/device/_get`;
export const DEL_DEVICE_URL = `${SEARCH_API_URL}/device/_del`;

export const SAVE_PLAYER_BBS_URL = `${SEARCH_API_URL}/playerBbs/_save`;
export const SEARCH_PLAYER_BBS_URL = `${SEARCH_API_URL}/playerBbs/_search`;
export const GET_PLAYER_BBS_URL = `${SEARCH_API_URL}/playerBbs/_get`;
export const DEL_PLAYER_BBS_URL = `${SEARCH_API_URL}/playerBbs/_del`;

export const SAVE_CLUB_BBS_URL = `${SEARCH_API_URL}/clubBbs/_save`;
export const SEARCH_CLUB_BBS_URL = `${SEARCH_API_URL}/clubBbs/_search`;
export const GET_CLUB_BBS_URL = `${SEARCH_API_URL}/clubBbs/_get`;
export const DEL_CLUB_BBS_URL = `${SEARCH_API_URL}/clubBbs/_del`;
