(function(){
    "use strict";
    angular
        .module("HousewivesApp")
        .controller("FanForumController", FanForumController);

    function FanForumController(ForumService, UserService, $rootScope, $location) {

        console.log("hello from fan forum controller");

        var hwf = this;
        hwf.post  =  post;
        hwf.posts = ForumService.getFanPosts2($rootScope.currentUser);
        hwf.cities = UserService.findAllCities();
        console.log(hwf.cities);

        function post(newPost){

            console.log("this is the post you are trying to post");
            console.log(newPost);
            ForumService.createPost(newPost, $rootScope.currentUser);
            hwf.posts = ForumService.getFanPosts2($rootScope.currentUser);

        }
    }
})();