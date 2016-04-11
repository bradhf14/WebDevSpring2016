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
                .when('/login', {
                    templateUrl: 'views/login/login.view.html',
                    controller: 'LoginController',
                    controllerAs: "model"
                })
                .when('/profileWife', {
                    templateUrl: 'views/profile/profileWife.view.html',
                    controller: 'WifeProfileController',
                    controllerAs: "model"
                })
                .when('/register2Wife', {
                    templateUrl: 'views/users/register2Wife.view.html',
                    controller: 'RegisterWifeController',
                    controllerAs: "model"
                })
                .when('/housewifeForum', {
                    templateUrl: 'views/HousewifeForum/housewifeForum.view.html',
                    controller: 'HousewifeForumController',
                    controllerAs: "model"
                })
                .when('/fanForum', {
                    templateUrl: 'views/FanForum/fanForum.view.html',
                    controller: 'FanForumController',
                    controllerAs: "model"
                })
                .otherwise({
                    redirectTo: "/"
                });
        });
})();
