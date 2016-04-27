(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .config(function($routeProvider){
            $routeProvider
                .when("/", {
                    templateUrl: "views/home/home.view.html",
                    controller: "HomeController"
                })
                .when('/register', {
                    templateUrl: 'views/users/register.view.html',
                    controller: 'RegisterController',
                    controllerAs: "model"
                })
                .when('/login', {
                    templateUrl: 'views/users/login.view.html',
                    controller: 'LoginController',
                    controllerAs: "model"
                })
                .when('/profile/:username', {
                    templateUrl: 'views/users/profile.view.html',
                    controller: 'ProfileController',
                    controllerAs: "model",
                    resolve:{
                        loggedin: checkLoggedin
                    }
                })
                .when('/admin', {
                    templateUrl: 'views/admin/admin.view.html',
                    controller: 'AdminController',
                    controllerAs: "model",
                    resolve:{
                        isAdmin: checkIsAdmin
                    }
                })
                .when('/home', {
                    templateUrl: 'views/home/home.view.html',
                    controller: 'HomeController',
                    controllerAs: 'model'
                })
                .when('/forms', {
                    templateUrl: 'views/forms/forms.view.html',
                    controller: 'FormController',
                    controllerAs: "model"
                })
                .when('/form/:formId/fields', {
                    templateUrl: 'views/forms/fields.view.html',
                    controller: 'FieldController',
                    controllerAs: "model"
                })
                .otherwise({
                    redirectTo: "/"
                });
        });


        var checkLoggedin = function($q, $timeout, $http, $location, $rootScope)
        {
            var deferred = $q.defer();

            $http.get('/api/assignment/loggedin').success(function(user)
            {
                $rootScope.errorMessage = null;
                // User is Authenticated
                if (user !== '0')
                {
                    $rootScope.currentUser = user[0];
                    deferred.resolve();
                }
                // User is Not Authenticated
                else
                {
                    $rootScope.errorMessage = 'You need to log in.';
                    deferred.reject();
                    $location.url('/login');
                }
            });

            return deferred.promise;
        };

        //function checkIsLoggedIn($q, $http, $location, $rootScope){
        //
        //    var deferred = $q.defer();
        //    console.log("this is the user for the checkIsLoggedIn");
        //    console.log($rootScope.currentUser);
        //    var user = $rootScope.currentUser
        //    $http.get("/api/assignment/loggedin", user)
        //        .success(function(user){
        //
        //            console.log("are they logged in");
        //            console.log(user);
        //            if(user!=0){
        //                //$rootScope.currentUser = user;
        //                deferred.resolve();
        //            }
        //            else
        //            {
        //                $rootScope.currentUser = null;
        //                deferred.reject();
        //                $location.url("/login");
        //            }
        //
        //        });
        //    return deferred.promise;
        //
        //}


        function checkIsAdmin($q, $http, $location, $rootScope){

            var deferred = $q.defer();

            $http.get("/api/assignment/isAdmin")
                .then(function(user){
                    if(user.data!=0){
                        $rootScope.currentUser = user.data;
                        deferred.resolve();
                    }
                    else
                    {
                        deferred.reject();
                        $location.url("/home");
                    }

                });

            return deferred.promise;
        }
})();