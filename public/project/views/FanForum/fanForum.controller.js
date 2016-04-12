(function(){
    "use strict";
    angular
        .module("HousewivesApp")
        .controller("FanForumController", FanForumController);

    function FanForumController(ForumService, UserService, $rootScope, $location) {

        var hwf = this;
        hwf.post  =  post;
        hwf.posts = ForumService.getFanPosts2($rootScope.currentUser);
        hwf.cities = UserService.findAllCities();

        function post(newPost){

            ForumService.createFanPost(newPost, $rootScope.currentUser);
            hwf.posts = ForumService.getFanPosts2($rootScope.currentUser);

        }
    }
})();