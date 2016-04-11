(function(){
    "use strict";
    angular
        .module("HousewivesApp")
        .controller("HousewifeForumController", HousewifeForumController);

    function HousewifeForumController(UserService, $rootScope, $location) {

        console.log("hello from housewife forum controller");

        var hwf = this;
        hwf.post  =   post;

        hwf.cities = UserService.findAllCities();

        function post(newPost){

            console.log("this is the post you are trying to post");
            console.log(newPost);
        }
    }
})();