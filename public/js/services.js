/**
 * Created by Sandeep on 11/09/14.
 */
angular.module('todoApp.services',[]).factory('Todo',['$http','CREDENTIALS',function($http,CREDENTIALS){
    var GH = {};
    GH[CREDENTIALS.APP_IDNAME] = CREDENTIALS.APP_ID;
    GH[CREDENTIALS.APP_KEYNAME] = CREDENTIALS.REST_API_KEY;
    var PH = angular.copy(GH);
    PH['Content-Type'] = 'application/json';
    var BASE_URL = CREDENTIALS.APP_URL+'/'+CREDENTIALS.APP_VER+'/classes/'+CREDENTIALS.APP_CLA;
    return {
        getAll:function(){
            return $http.get(BASE_URL,{
                headers:GH
            });
        },
        get:function(id){
            return $http.get(BASE_URL+'/'+id,{
                headers:GH
            });
        },
        post:function(phone){
            return $http.post('https://api.leancloud.cn/1.1/functions/SendV5Code1',{"phone":phone},{
                headers:GH
            });
        },
        valid:function(data){
            return $http.post('https://api.leancloud.cn/1.1/functions/SendV5Code1',data,{
                headers:GH
            });
        },
        create:function(data){
            return $http.post(BASE_URL,data,{
                headers:PH
            });
        },
        edit:function(id,data){
            return $http.put(BASE_URL+'/'+id,data,{
                headers:PH
            });
        },
        delete:function(id){
            return $http.delete(BASE_URL+'/'+id,{
                headers:PH
            });
        }
    }
}]).value('CREDENTIALS1',{
    APP_URL:'https://api.parse.com',
    APP_VER:'1',
    APP_CLA:'Todo',
    APP_IDNAME:'X-Parse-Application-Id',
    APP_KEYNAME:'X-Parse-REST-API-Key',
    APP_ID: 'xhTpJiNedJ7mmDj3LTTBUePqSVegcJHzEbh70Y0Q',
    REST_API_KEY:'XCfQDPODgNB1HqmaCQgKLPWGxQ0lCUxqffzzURJY'
}).value('CREDENTIALS',{
    APP_URL:'https://leancloud.cn',
    APP_VER:'1.1',
    APP_CLA:'Todo',
    APP_IDNAME:'X-AVOSCloud-Application-Id',
    APP_KEYNAME:'X-AVOSCloud-Application-Key',
    APP_ID: 'Ldg56kwcgWhUOpuzipUoTvGE',
    REST_API_KEY:'rE72MRgOtI6iePFtzQiUlJ1f'
});
