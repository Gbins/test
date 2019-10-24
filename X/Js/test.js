var body = $response.body;
var url = $request.url;
var obj = JSON.parse(body);
const path1 = '/rest/2.0/membership/user';



function svip_infos() {
	
	obj['product_infos']=[
		{
			"product_id": "5210897752128663390",
			"start_time": 1379134671,
			"end_time": 2147483648,
			"buy_time": "1379134671",
			"cluster": "offlinedl",
			"detail_cluster": "offlinedl",
			"product_name": "gz_telecom_exp"
		},
		{
			"product_name": "svip2_nd",
			"product_description": "",
			"function_num": 0,
			"start_time": 1551369599,
			"buy_description": "",
			"buy_time": 0,
			"product_id": "",
			"auto_upgrade_to_svip": 0,
			"end_time": 1584490527,
			"cluster": "vip",
			"detail_cluster": "svip",
			"status": 0
		}
	];
	//obj.reminder["reminderWithContent"]=[];
	//obj.reminder["advertiseContent"]=[];
	obj['reminder']={
		"reminderWithContent": [],
		"advertiseContent": [],
		"svip": {
			"leftseconds": 6223044,
			"nextState": "normal"
		}
	};
	body = JSON.stringify(obj);
		}




if (url.indexOf(path1) != -1){
	svip_infos()
}

$done({body});
