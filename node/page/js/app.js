var app = angular.module('myapp',['ngRoute']);

app.config(function($routeProvider){
    $routeProvider.when('/', {
        template: '<h1>This is the home page</h1>'
    })
    .when('/js/users', {
        templateUrl: 'users.html',
        controller: 'userController'
    })
    .when('/js/create', {
        templateUrl: 'create.html',
        controller: 'createController'
    });
    
});

app.controller('createController', ['$scope', '$http', '$location', function($scope, $http, $location){
    $scope.createUser = function(){
        $http.post('http://localhost:2000/createUser', $scope.user)
        .then(function(data){
            if(data.data.flag == 'success'){
                $location.path('/');
            }
        })
        .catch(function(err){
            console.log(err);
        });
    }

   
}]);

app.controller('userController', ['$scope', '$http', function($scope, $http){


    $http.get('http://localhost:2000/getUsers').then(function(data){
        $scope.data = data.data;
    })
    .catch(function(err){
        console.log(err);
    })
}]);