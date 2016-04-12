(function(){
    "use strict";
    angular
        .module("HousewivesApp")
        .controller("HousewifeForumController", HousewifeForumController);

    function HousewifeForumController(ForumService, UserService, $rootScope, $location) {

        var hwf = this;
        hwf.post  =   post;

        hwf.posts = ForumService.getAllPosts();
        hwf.cities = UserService.findAllCities();
        hwf.fanPosts = ForumService.getFanPosts($rootScope.currentUser);

        function post(newPost){

            ForumService.createPost(newPost, $rootScope.currentUser);
            hwf.fanPosts = ForumService.getFanPosts($rootScope.currentUser);

        }
    }
})();