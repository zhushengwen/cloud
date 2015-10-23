// Use AV.Cloud.define to define as many cloud functions as you want.
// For example:
  var Post = AV.Object.extend({
      className: "Post"
  });
 
AV.Cloud.define("SendV5Code", function(request, response) {
var isphone = request.params.phone && /^\+?8?6?-?1\d{2}-?\d{4}-?\d{4}$/.test(request.params.phone);
if(isphone && request.params.code)
{
  var query = new AV.Query(Post);
    query.equalTo("phone", request.params.phone);
    query.first({
        success: function(obj) {
            var cookie = obj.cookie;
            SendPost(request.params.phone,cookie,code);
        },
        error: function(error) {
        }
    });

    function SendPost(phone,cookie,code){
    var postData = '{"form":{"id":"","num":"13","uid":"oFMy4jiXrvYBbz9BYwLpbfIBQPLA","sid":10000,"fid":10005,"sequ":["1","2","3","5","4","13","8","9","6","10","11","12"],"ctrls":{"3":{"id":"3","className":"input_text","aid":"25","title":"姓名","value":"王国强","valid":{"nec":1}},"4":{"id":"4","className":"input_text","aid":"26","title":"学校","value":"家里蹲大学","valid":{"nec":1}},"5":{"id":"5","className":"input_text","aid":"27","title":"年龄","value":"30","valid":{"nec":1}},"6":{"id":"6","className":"input_text","aid":"28","title":"专业","value":"","valid":{}},"8":{"id":"8","className":"input_text","aid":"30","title":"邮箱","value":"","valid":{}},"9":{"id":"9","className":"form_select","aid":"31","title":"性别","value":"2","valid":{}},"10":{"id":"10","className":"form_radio","aid":"32","title":"学历","value":"3","valid":{}},"11":{"id":"11","className":"form_select","aid":"33","title":"应聘职位","value":"1","valid":{}},"13":{"id":"13","className":"input_phone","aid":"6151","title":"手机","value":"13164355238,","valid":{"code":true,"nec":%s}}}}}';
    postData = postData.replace('%s',code);
    var opt = {
        host: 'www.v5kf.com',
        port: '80',
        method: 'POST',
        path: '/public/vdata/ajax_get_code?mobile=' + phone + '&stamp=' + (Date.now() - parseInt(phone)) + '&sid=10000&uid=oFMy4jiXrvYBbz9BYwLpbfIBQPLA&fid=10005&id=13',
        headers: {
            'Referer': 
            'http://www.v5kf.com/public/vdata/collect.html?sid=10000&fid=10005&uid=oFMy4jiXrvYBbz9BYwLpbfIBQPLA',
            "User-Agent": 
            "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:41.0) Gecko/20100101 Firefox/41.0 FirePHP/0.7.4",
            "Cookie":cookie,
            'Content-Length': postData.length
        }
    };

    var http = require('http');
    var body = '';
    var req = http.request(opt, function(res) {
        res.on('data', function(d) {
            body += d;
        }).on('end', function() {
            if(body!='手机验证失败') {
                console.log('ok');
            }else console.log('error');
        });
    }).on('error', function(e) {
        console.log("Got error: " + e.message);
    })

    req.write(postData);
    req.end();
    }
}else if(isphone){
    var opt = {
     host:'www.v5kf.com',
     port:'80',
     path:'/public/vdata/ajax_get_code?mobile='+request.params.phone+'&stamp='+(Date.now() - parseInt(request.params.phone))+'&sid=10000&uid=oFMy4jiXrvYBbz9BYwLpbfIBQPLA&fid=10005&id=13',
     headers:{
        'Referer':
'http://www.v5kf.com/public/vdata/collect.html?sid=10000&fid=10005&uid=oFMy4jiXrvYBbz9BYwLpbfIBQPLA',
"User-Agent":	
"Mozilla/5.0 (Windows NT 6.1; WOW64; rv:41.0) Gecko/20100101 Firefox/41.0 FirePHP/0.7.4",
"Cookie":	
'v5id=16cf18ccfde107c6f65c601b047964e8'
     }
}
response.success(opt.path);
var http = require('http');
var body = '';
var req = http.request(opt, function(res) {
    res.on('data',function(d){
        body += d;
    }).on('end', function(){
        if(body=='ok'){
                var post = new Post();
                post.set("phone", request.params.phone);
                post.set("cookie", cookie);
                post.save(null, {
                    success: function(post) {
                        console.log(body);
                    },
                    error: function(post, error) {
                        console.log('save error');
                    }
                });
            }else console.log('req error');
    });
}).on('error', function(e) {
    console.log("Got error: " + e.message);
})
req.end();
}
else
response.success("请输入手机号！" + '{"phone":"1316435****"}');
});
