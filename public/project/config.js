(function(){
    angular
        .module("HousewivesApp", ["ngRoute"])
        .config(function($routeProvider){
            $routeProvider
                .when("/", {
                    templateUrl: "views/home/home.view.html",
                    controller: "HomeController",
                    controllerAs: "model"
                })
                .when('/register', {
                    templateUrl: 'views/users/register.view.html',
                    controller: 'RegisterController',
                    controllerAs: "model"
                })
                .when('/register2', {
                    templateUrl: 'views/users/register2.view.html',
                    controller: 'Register2Controller',
                    controllerAs: "model"
                })
                .when('/register3', {
                    templateUrl: 'views/users/register3.view.html',
                    controller: 'Register3Controller',
                    controllerAs: "model"
                })
                .when('/profile', {
                    templateUrl: 'views/profile/profile.view.html',
                    controller: 'ProfileController',
                    controllerAs: "model"
                })
                .otherwise({
                    redirectTo: "/"
                });
        });
})();
