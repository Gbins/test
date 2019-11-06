/*
#彩云小译
^https:\/\/api\.interpreter\.caiyunai\.com\/v1\/page\/auth
^https:\/\/api\.interpreter\.caiyunai\.com\/v1\/user\/ 
hostname = "api.interpreter.caiyunai.com"
*/
var url = $request.url;
let obj = JSON.parse($response.body);
const user = "/v1/user/"
const auth = "/v1/page/auth"
if (url.indexOf(user) != -1) {
	obj.user = {
		"status": "",
		"point": 8888,
		"audio_used_time": 1855,
		"mvp_count": 0,
		"continuous_reading_count": 0,
		"updated_at": 1572877240,
		"doc_trans_block": false,
		"id": "5d06e5d494ddc9000eb59e17",
		"be_liked_count": 0,
		"daily_comment_count": 0,
		"reading_page_count": 12,
		"type": "registered",
		"email": "",
		"username": "VIP",
		"daily_share_count": 0,
		"translation_count": 0,
		"biz": {
			"xy_vip_expire": 1888582465,
			"platform_name": "caiyun",
			"phone_num": "18888888888",
			"name": "VIP",
			"grade": "积雨云",
			"is_xy_vip": true,
			"last_acted_at": 1572401732.924965,
			"platform_id": "",
			"score": 2000,
			"avatar": "https://caiyunapp.com/imgs/webtrs/default.png",
			"_id": "5d06e5d494ddc9000eb59e17",
			"is_xy_auto_renewal": false
		},
		"audio_remaining_time": 16145,
		"daily_sentence_count": 0,
		"created_at": 1560733140,
		"free_download_count": 0,
		"avatar_url": "https://caiyunapp.com/imgs/webtrs/default.png",
		"reading_time_this_week": 0,
		"_id": "5d06e5d494ddc9000eb59e17"
	};
}
if (url.indexOf(auth) != -1) {
	obj["rc"] = 0;
}
$done({ body: JSON.stringify(obj) });