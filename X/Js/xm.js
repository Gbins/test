let obj = JSON.parse($request.body);
let url = $request.url;

$notify("Weather Condition:",obj,url);
$done();