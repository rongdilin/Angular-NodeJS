var app = angular.module('myapp', ['ngRoute']);


app.config(function($routeProvider){
    $routeProvider
    .when('/',{
        templateUrl: 'login.html',
        controller: 'loginController'
    })
    .when('/register',{
        templateUrl: 'register.html',
        controller: 'registerController'
    })
    .when('/home/:username',{
        templateUrl: 'home.html',
        controller: 'userHomeController'
    })
    .when('/home/:username/post_job', {
        templateUrl: 'post_job.html',
        controller: 'postJobController'
    })
    .when('/home/:username/search_job', {
        templateUrl: 'search_job.html',
        controller: 'searchJobController'
    })
    .when('/error', {
        template: '<p style="color:red"> Invaild Page</p> '
    })
    .otherwise({
        redirectTo:'/error'
    })
});

/*
    This is a controller which handle the search job page
*/
app.controller('searchJobController', ['$scope', '$rootScope', '$window', '$location', '$http', function($scope, $rootScope, $window, $location, $http){
    if($rootScope.flag == true){
        $scope.username = $rootScope.username;
        
        $scope.search = function(){
            var job = {
                title: $scope.title,
                keywords: $scope.keywords,
                location: $scope.location
            }
            $http.post('http://localhost:3000/search', job).success(function(data){
                $scope.jobs = data;
            });
        };
        
        $scope.reset = function(){
            $scope.jobs = [];
            $scope.title = [];
            $scope.keywords = [];
            $scope.location = [];
        }
        
        $scope.back = function(){
            $location.path('/home/' + $scope.username);
        };
    } else{
        $window.alert("Invalid User");
        $location.path('/');    
    }
}]);


/*
    This is a controller which handle the post job page
*/
app.controller('postJobController', ['$scope', '$rootScope', '$window', '$location', '$http', function($scope, $rootScope, $window, $location, $http){
    if($rootScope.flag == true){
        $scope.username = $rootScope.username;
        
        $http.get('http://localhost:3000/').success(function(data){
            $scope.jobs = data;
        });
        
        $scope.submit = function(){
            var job = {
                "title": $scope.title,
                "description": $scope.description,
                "keywords": $scope.keywords,
                "location": $scope.location,
            };
            $http.post('http://localhost:3000/post_job', job).success(function(data){
                if(data == "jobPosted"){
                    $http.get('http://localhost:3000/').success(function(data){
                        $scope.jobs = data;
                    });
                    $window.alert("Post Job Successfully!");
                    $scope.title = [];
                    $scope.description = [];
                    $scope.keywords = [];
                    $scope.location = [];
                } else{
                    $window.alert(data);
                }
            });
        };
        $scope.back = function(){
            
            $location.path('/home/' + $scope.username);
        }
    } else{
        $window.alert("Invalid User");
        $location.path('/');    
    }
}]);

/*
    This is a controller which handle the user home page
*/
app.controller('userHomeController', ['$scope', '$rootScope', '$window', '$location', function($scope, $rootScope, $window, $location){
    if($rootScope.flag == true){
        $scope.username = $rootScope.username;
        $scope.user_type = $rootScope.user_type;
        $scope.logout = function(){
                    //$scope.username = "";
                    $rootScope.username = [];
                    $rootScope.flag = false;
                    $location.path('/');
        };
    } else{
        $window.alert("Invalid User");
        $location.path('/');
    }
}]);

/*
    This is a controller which handle the login page
*/
app.controller('loginController', ['$scope', '$rootScope', '$location','$window', '$http', function($scope, $rootScope, $location, $window, $http){
    // user validation
    $scope.validate = function(){
        var user = {
            "username": $scope.username,
            "password": $scope.password,
        };
        $http.post('http://localhost:3000/login', user).success(function(data){
            if(data.user.username == user.username){
                $rootScope.user_type = data.user.user_type;
                $rootScope.username = data.user.username;
                $rootScope.flag = data.flag;
                console.log($rootScope.flag)
                $window.alert("Log successfully!");
                $location.path('/home/' + user.username);
            } else{
                $window.alert(data);
            }
        });
    };
    // go to register page
    $scope.register = function(){
        $location.path('/register');
    };
}]);

/*
    This is a controller which handle the sign up page
*/
app.controller('registerController', ['$scope', '$location', '$window', '$http', function($scope, $location, $window, $http){
    //store the user information in db
    $scope.submit = function(){
        var user = {
            "username": $scope.username,
            "password": $scope.password,
            "phone": $scope.phone,
            "email": $scope.email,
            "location": $scope.location,
            "user_type": $scope.user_type
        };
        $http.post('http://localhost:3000/register', user).success(function(data){
            if(data == "userExists"){
                $window.alert("Username existed, please choose another one.");
            } else if(data == "userRegistered"){
                $window.alert("Create User Successfully!");
                $location.path('/');
            } else{
                $window.alert(data);
            }
        });

    };

    //go back to login page
    $scope.cancel = function(){
        $location.path('/');
    };
}]);