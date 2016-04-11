(function(){
    "use strict";
    angular
        .module("HousewivesApp")
        .controller("FanForumController", FanForumController);

    function FanForumController(ForumService, UserService, $rootScope, $location) {

        console.log("hello from fan forum controller");

        var hwf = this;
        hwf.post  =   post;
        hwf.posts = ForumService.getAllPosts();
        hwf.cities = UserService.findAllCities();

        function post(newPost){

            console.log("this is the post you are trying to post");
            console.log(newPost);
            ForumService.createPost(newPost, $rootScope.currentUser);

        }
    }
})();