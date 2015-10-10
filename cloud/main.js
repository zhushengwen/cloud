// Use AV.Cloud.define to define as many cloud functions as you want.
// For example:
AV.Cloud.define("SendV5Code", function(request, response) {
  
if(request.params.phone && /^\+?8?6?-?1\d{2}-?\d{4}-?\d{4}$/.test(request.params.phone)){
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
        console.log(body)
    });
}).on('error', function(e) {
    console.log("Got error: " + e.message);
})
req.end();
}
else
response.success("请输入手机号！" + '{"phone":"1316435****"}');
});
