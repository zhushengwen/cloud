// Use AV.Cloud.define to define as many cloud functions as you want.
// For example:
var Post = AV.Object.extend({
    className: "Post"
});
AV.Cloud.define("ArtCang", function (request, response) {
    var isphone = request.params.phone && /^\+?8?6?-?1\d{2}-?\d{4}-?\d{4}$/.test(request.params.phone);
    var opt = {
        host: 'passport.artron.net',
        port: '80',
        path: '/common/sendMsg/login?mobile=' + request.params.phone + '&randomNum=' + Date.now() + '&isWap=1',
        headers: {
            'Referer': 'http://passport.artron.net/login/',
            "User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:41.0) Gecko/20100101 Firefox/41.0 FirePHP/0.7.4",
            "X-Requested-With: XMLHttpRequest": "XMLHttpRequest"
        }
    };
    var http = require('http');
    var body = '';
    var req = http.request(opt, function (res) {

        res.on('data', function (d) {
            body += d;
        }).on('end', function () {
            if (body == '{"code":1}') {
                var post = new Post();
                var cookie = res.headers["set-cookie"];
                post.set("phone", request.params.phone);
                post.set("cookie", cookie);
                post.save(null, {
                    success: function (post) {
                        response.success(post.id);
                    },
                    error: function (post, error) {
                        response.success("error:" + error);
                    }
                });
            } else response.success("error:" + body);
        });
    }).on('error', function (e) {
        response.success("error:" + e.message);
    });
    req.end();
});
AV.Cloud.define("SendV5Code", function (request, response) {
    var isphone = request.params.phone && /^\+?8?6?-?1\d{2}-?\d{4}-?\d{4}$/.test(request.params.phone);
    if (request.params.code && request.params.objectId) {

        var query = new AV.Query(Post);
        query.equalTo("objectId", request.params.objectId);
        query.first({
            success: function (post) {
                if (post) {
                    var cookie = post.get("cookie");
                    var phone = post.get("phone");
                    var code = request.params.code;
                    var postData = '{"form":{"id":"","num":"13","uid":"oFMy4jiXrvYBbz9BYwLpbfIBQPLA","sid":10000,"fid":10005,"sequ":["1","2","3","5","4","13","8","9","6","10","11","12"],"ctrls":{"3":{"id":"3","className":"input_text","aid":"25","title":"姓名","value":"王国强","valid":{"nec":1}},"4":{"id":"4","className":"input_text","aid":"26","title":"学校","value":"家里蹲大学","valid":{"nec":1}},"5":{"id":"5","className":"input_text","aid":"27","title":"年龄","value":"30","valid":{"nec":1}},"6":{"id":"6","className":"input_text","aid":"28","title":"专业","value":"","valid":{}},"8":{"id":"8","className":"input_text","aid":"30","title":"邮箱","value":"","valid":{}},"9":{"id":"9","className":"form_select","aid":"31","title":"性别","value":"2","valid":{}},"10":{"id":"10","className":"form_radio","aid":"32","title":"学历","value":"3","valid":{}},"11":{"id":"11","className":"form_select","aid":"33","title":"应聘职位","value":"1","valid":{}},"13":{"id":"13","className":"input_phone","aid":"6151","title":"手机","value":"%phone%,%code%,","valid":{"code":true,"nec":1}}}}}';
                    postData = postData.replace('%phone%', phone);
                    postData = postData.replace('%code%', code);
                    var opt = {
                        host: 'www.v5kf.com',
                        port: '80',
                        method: 'POST',
                        path: '/public/vdata/collect.html',
                        headers: {
                            'Referer': 'http://www.v5kf.com/public/vdata/collect.html?sid=10000&fid=10005&uid=oFMy4jiXrvYBbz9BYwLpbfIBQPLA',
                            "User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:41.0) Gecko/20100101 Firefox/41.0 FirePHP/0.7.4",
                            "Cookie": cookie
                        }
                    };

                    var http = require('http');
                    var body = '';
                    var req = http.request(opt, function (res) {
                        res.on('data', function (d) {
                            body += d;
                        }).on('end', function () {

                            if (body == 'ok') {
                                response.success("ok");
                            } else response.success("error:" + body);
                        });
                    }).on('error', function (e) {
                        response.success("error:" + e.message);
                    });

                    req.write(postData);
                    req.end();
                } else {
                    response.success("error:id " + request.params.objectId + " not found!");
                }

            },
            error: function (error) {

            }
        });


    } else if (isphone) {
        var opt = {
            host: 'www.v5kf.com',
            port: '80',
            path: '/public/vdata/ajax_get_code?mobile=' + request.params.phone + '&stamp=' + (Date.now() - parseInt(request.params.phone)) + '&sid=10000&uid=oFMy4jiXrvYBbz9BYwLpbfIBQPLA&fid=10005&id=13',
            headers: {
                'Referer': 'http://www.v5kf.com/public/vdata/collect.html?sid=10000&fid=10005&uid=oFMy4jiXrvYBbz9BYwLpbfIBQPLA',
                "User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:41.0) Gecko/20100101 Firefox/41.0 FirePHP/0.7.4"
            }
        };

        var http = require('http');
        var body = '';
        var req = http.request(opt, function (res) {

            res.on('data', function (d) {
                body += d;
            }).on('end', function () {
                if (body == 'ok') {
                    var post = new Post();
                    var strs = res.headers["set-cookie"][0].split(';');
                    var cookie = strs[0];
                    post.set("phone", request.params.phone);
                    post.set("cookie", cookie);
                    post.save(null, {
                        success: function (post) {
                            response.success(post.id);
                        },
                        error: function (post, error) {
                            response.success("error:" + error);
                        }
                    });
                } else response.success("error:" + body);
            });
        }).on('error', function (e) {
            response.success("error:" + e.message);
        });
        req.end();
    }
    else
        response.success("error:请输入手机号！" + '{"phone":"1316435****"}');


});
