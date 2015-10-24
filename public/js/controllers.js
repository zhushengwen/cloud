/**
 * Created by Sandeep on 11/09/14.
 */
angular.module('todoApp.controllers',[]).controller('TodoListController',['$scope','$ionicPopup','Todo',function($scope,$ionicPopup,Todo){

    Todo.getAll().success(function(data){
        $scope.items=data.results;
    });

    $scope.onItemDelete=function(item){
        Todo.delete(item.objectId);
        $scope.items.splice($scope.items.indexOf(item),1);
    };
    $scope.postItem=function(item){
       var promise = Todo.post(item.content);
        promise.success(function(data){
            if(data.result)
            {
                $scope.data = {"objectId":data.result};
                $ionicPopup.show({
                    template: "<input type='text' ng-model='data.code'>",
                    title: "请输入手机验证码",
                    subTitle: "验证码为4位",
                    scope: $scope,
                    buttons: [
                        { text: "取消" },
                        {
                            text: "<b>提交</b>",
                            type: "button-positive",
                            onTap: function(e) {
                                return $scope.data;
                            }
                        }
                    ]
                })
                    .then(function(data) {
                        Todo.valid(data).success(function (resp) {
                            if(resp.result){
                                var results = resp.result.split(':');
                                var msg = resp.result;
                                if(results[0]=='error')
                                {
                                    msg = "验证失败:" + results[1];
                                }else{
                                    msg = "验证成功!";
                                }
                                $ionicPopup.alert({
                                    title: "提示",
                                    template: msg
                                })
                            }
                        });
                    });
            }
        });
    }

}]).controller('TodoCreationController',['$scope','Todo','$state',function($scope,Todo,$state){

    $scope.todo={};

    $scope.create=function(){
        Todo.create({content:$scope.todo.content}).success(function(data){
            $state.go('todos');
        });
    }


}]).controller('TodoEditController',['$scope','Todo','$state','$stateParams',function($scope,Todo,$state,$stateParams){

    $scope.todo={id:$stateParams.id,content:$stateParams.content};

    $scope.edit=function(){
        Todo.edit($scope.todo.id,{content:$scope.todo.content}).success(function(data){
            $state.go('todos');
        });
    }

}]);
