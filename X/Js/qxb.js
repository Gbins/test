/*
#企信宝
^https?:\/\/app\.qixin\.com\/v4\/general\/getHotSearchWordsRedirect$ url reject
^https?:\/\/app\.qixin\.com\/v4\/user\/(getUserInfo|getUserSummary)$ url script-response-body qxb.js

hostname = "app.qixin.com"
*/
var url = $request.url;
let obj = JSON.parse($response.body);

const UserSummary = "/v4/user/getUserInfo"
const UnReadMessage = "/v4/user/getUserSummary"
const getImpSysSettings = "v4/general/getImpSysSettings"

if (url.indexOf(UnReadMessage) != -1) {
    obj.data.invoiceWarningFlag = true;
    obj.data.hasGroupVIP = true;
    obj.data.hasInvoiceRecord = true;
    obj.data.accountSummary.integralTotal = "8888";
    obj.data.accountSummary.rebatesTotal = "9999";
    obj.data.accountSummary.userGrade.key = "1";
    obj.data.accountSummary.userGrade.value = "CC钻石VIP";
    obj.data.accountSummary.vipStartDate = "2019/01/01";
    obj.data.accountSummary.vipExpiredDate = "2055/01/01";
    obj.data.accountSummary.integral = "8888";
    obj.data.accountSummary.rebates = "9999";
    obj.data.isCCVIP = true;
}
if (url.indexOf(UserSummary) != -1) {
    obj.data.name = "VIP";
    obj.data.level = "V1";
    obj.data.isCCVIP = true;
    obj.data.accountSummary.integralTotal = "8888";
    obj.data.accountSummary.rebatesTotal = "9999";
    obj.data.accountSummary.userGrade.key = "1";
    obj.data.accountSummary.userGrade.value = "CC钻石VIP";
    obj.data.accountSummary.vipStartDate = "2019/01/01";
    obj.data.accountSummary.vipExpiredDate = "2025/01/01";
    obj.data.accountSummary.integral = "8888";
    obj.data.accountSummary.rebates = "9999";
}
if (url.indexOf(getImpSysSettings) != -1) {
    obj.data.settings[0].value = true;
    obj.data.settings[1].value = true;
    obj.data.settings[2].value = true;
    obj.data.settings[3].value = true;
    obj.data.settings[4].value = true;
}
$done({body:JSON.stringify(obj)});