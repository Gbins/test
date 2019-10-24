
/*
移动签到v0.2
2019.3.2更新
导入需要har重放的文件到file中，a.json是重放签到，gift.json是重放月度获得的签到流量。
*/

/*
let importRequest = () => {
    let data = $context.data
    let success = $file.write({
        data: data,
        path: "150.json"
    });
    $ui.alert(success ? '成功添加至脚本' : '添加到脚本失败，请重试')
}
*/
var resInfo
let handleRequesta = async () => {
    let infoJson = JSON.parse($file.read('file/a.json').string)
    let requestArr = infoJson.log.entries.sort((e1, e2) => {
        return new Date(e1.startedDateTime).getTime() > new Date(e2.startedDateTime).getTime()
    })
    let resArr = []
    for (const req of requestArr) {
        let resp = await requestWithInof(req)
        resArr.push(resp)
    }
    resInfo = resArr[resArr.length - 1].data
    $("mobilea").text = resInfo.resultCom.mobile
    //$("totala").title = "本月已签到：" + resInfo.resultObj.signInWeek.today.total + "次"
    totala = "本月已签到：" + resInfo.resultObj.signInWeek.today.total + "次"
    $("gifta").title = "今日签到流量：" + resInfo.resultObj.signInWeek.today.gift
    console.log(resInfo)
}

let handleRequestb = async () => {
    let infoJson = JSON.parse($file.read('file/b.json').string)
    let requestArr = infoJson.log.entries.sort((e1, e2) => {
        return new Date(e1.startedDateTime).getTime() > new Date(e2.startedDateTime).getTime()
    })
    let resArr = []
    for (const req of requestArr) {
        let resp = await requestWithInof(req)
        resArr.push(resp)
    }
    resInfo = resArr[resArr.length - 1].data

    $("mobileb").text = resInfo.resultCom.mobile
    totalb = "本月已签到：" + resInfo.resultObj.signInWeek.today.total + "次"
    $("giftb").title = "今日签到流量：" + resInfo.resultObj.signInWeek.today.gift

}

let handleRequestaGift = async () => {
    let infoJson = JSON.parse($file.read('file/agift.json').string)
    let requestArr = infoJson.log.entries.sort((e1, e2) => {
        return new Date(e1.startedDateTime).getTime() > new Date(e2.startedDateTime).getTime()
    })
    let resArr = []
    for (const req of requestArr) {
        let resp = await requestWithInof(req)
        resArr.push(resp)
    }
    resInfo = resArr[resArr.length - 1].data
    aa = resInfo.resultObj.signLogInMonth.prize
    bb = JSON.stringify(aa)
    cc = isGift(bb)
    dd = JSON.stringify(cc).match(/\d+/g)
    ee = sumArr(dd)
    console.log(resInfo)
    console.log(bb)
    console.log(cc)
    console.log(JSON.stringify(dd))
    console.log(ee)
    $("totala").text = totala + "\n" + "本月共获得签到流量" + ee + "MB"
}

let handleRequestbGift = async () => {
    let infoJson = JSON.parse($file.read('file/bgift.json').string)
    let requestArr = infoJson.log.entries.sort((e1, e2) => {
        return new Date(e1.startedDateTime).getTime() > new Date(e2.startedDateTime).getTime()
    })
    let resArr = []
    for (const req of requestArr) {
        let resp = await requestWithInof(req)
        resArr.push(resp)
    }
    resInfo = resArr[resArr.length - 1].data
    aa = resInfo.resultObj.signLogInMonth.prize
    bb = JSON.stringify(aa)
    cc = isGift(bb)
    dd = JSON.stringify(cc).match(/\d+/g)
    ee = sumArr(dd)
    console.log(resInfo)
    console.log(bb)
    console.log(cc)
    console.log(JSON.stringify(dd))
    console.log(ee)
    $("totalb").text = totalb + "\n" + "本月共获得签到流量" + ee + "MB"
}

let requestWithInof = async (req) => {
    let requestInof = req.request
    let httpOptions = {
        method: requestInof.method,
        url: requestInof.url,
        header: genJsonHeaders(requestInof.headers),
    }
    if (requestInof.bodySize > 0) {
        let contentType = requestInof.postData.mimeType
        let bodyText = requestInof.postData.text
        if (contentType === 'application/x-www-form-urlencoded') {
            httpOptions.body = genJsonBody(bodyText)
        } else if (contentType === 'application/json') {
            httpOptions.body = JSON.parse(bodyText)
        } else {
            let text = `暂不支持请求体类型『${contentType}』`
            $ui.alert(text)
            return
        }
    }
    let resp = await $http.request(httpOptions)
    return resp
}

let genJsonHeaders = (arr) => {
    let headers = {}
    arr.forEach(e => {
        if (e.name === 'Host') return
        headers[e.name] = e.value
    });
    return headers
}

let genJsonBody = str => {
    let body = {}
    str.split('&').forEach(i => {
        if (/^(.*?)=(.*)$/.test(i)) {
            body[RegExp.$1] = RegExp.$2
        }
    })
    return body
}

function isGift(str) {
    //同时满足2个正则条件 中间加|
    var reg = /\w+MB/g
    return str.match(reg)
}

function sumArr(arr) {
    return eval(arr.join("+"))
}//直接把他变成各个数的加法运算字符串

let main = async () => {
    let env = $app.env
    if (env === $env.action) {
        importRequest()
    } else if (env === $env.app) {
        await handleRequesta()
        await handleRequestb()
        await handleRequestaGift()
        await handleRequestbGift()
               
    }
}

main().then(_ => { })



$ui.render({
    props: {
        title: "",
    },
    views: [
 
        {
            type: "list",
            props: {
                bgcolor: $color("clear"),
                id: "jsmcc",
                data: [
                    {
                        //title: "",
                        rows: [
                            {
                                type: "label",
                                props: {
                                    id: "mobilea",
                                    text: "",
                                    bgcolor: $color("#DCDCDC"),
                                    titleColor: $color("black")
                                },
                                layout: $layout.fill,
                                events: {
                                    tapped: function (sender) {
                                        //$ui.toast("Tapped")
                                    }
                                }
                            },
                            {
                                type: "label",
                                props: {
                                    id: "totala",
                                    text: "",
                                    lines: 0,
                                    align: $align.center,
                                    bgcolor: $color("clear"),
                                    titleColor: $color("black")
                                },
                                layout: $layout.fill,
                                events: {
                                    tapped: function (sender) {
                                        //$ui.toast("Tapped")
                                    }
                                }
                            },
                            {
                                type: "button",
                                props: {
                                    id: "gifta",
                                    title: "",
                                    bgcolor: $color("clear"),
                                    titleColor: $color("black")
                                },
                                layout: $layout.fill,
                                events: {
                                    tapped: function (sender) {
                                        //$ui.toast("Tapped")
                                    }
                                }
                            },
                            {
                                type: "label",
                                props: {
                                    id: "mobileb",
                                    text: "",
                                    bgcolor: $color("#DCDCDC"),
                                    titleColor: $color("black")
                                },
                                layout: $layout.fill,
                                events: {
                                    tapped: function (sender) {
                                        //$ui.toast("Tapped")
                                    }
                                }
                            },
                            {
                                type: "label",
                                props: {
                                    id: "totalb",
                                    text: "",
                                    lines: 0,
                                    align: $align.center,
                                    bgcolor: $color("clear"),
                                    titleColor: $color("black")
                                },
                                layout: $layout.fill,
                                events: {
                                    tapped: function (sender) {
                                        //$ui.toast("Tapped")
                                    }
                                }
                            },
                            {
                                type: "button",
                                props: {
                                    id: "giftb",
                                    title: "",
                                    bgcolor: $color("clear"),
                                    titleColor: $color("black")
                                },
                                layout: $layout.fill,
                                events: {
                                    tapped: function (sender) {
                                        //$ui.toast("Tapped")
                                    }
                                }
                            },
                        ],
                    },
                  
                ]
            },
            //layout: $layout.fill,
            layout: function (make, view) {
                make.height.equalTo(260)
                make.width.equalTo(view.super.width)
            },
            events: {
                rowHeight: function (sender, indexPath) {
                    if (indexPath.row == 0) {
                        return 30
                    } else if (indexPath.row == 3) {
                        return 30
                    }
                }

            },

        },
        {
            type: "view",
            props: {
                bgcolor: $color("clear"),
            },
            layout: function (make, view) {
                make.top.equalTo(235)
                make.height.equalTo(view.super.height)
                make.width.equalTo(view.super.width)
                
            },
            views: [
                {
                    type: "button",
                    props: {
                        id: "jsmccico",
                        title: "",
                        smoothRadius:10,    //此项是调整ico边框是什么样式的，如矩形圆角等
                        src: "assets/jsmcc.jpg",
                    },
                    layout: function(make, view) {
                        make.center.equalTo(view.super)
                        make.size.equalTo($size(65, 65))
                      },
                    events: {
                        tapped: function (sender) {
                            $app.openURL("jsmcc://");
                        }
                    }
                },
            ]
        },
    ]

});

