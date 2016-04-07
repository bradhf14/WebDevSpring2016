(function(){
    angular
        .module("HousewivesApp", ["ngRoute"])
        .config(function($routeProvider){
            $routeProvider
                .when("/", {
                    templateUrl: "views/home/home.view.html",
                    controller: "HomeController"
                })
                //.when('/register', {
                //    templateUrl: 'views/users/register.view.html',
                //    controller: 'RegisterController',
                //    controllerAs: "model"
                //})
                .otherwise({
                    redirectTo: "/"
                });
        });
})();
