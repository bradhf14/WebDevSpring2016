/**
 * Created by Bradley on 4/10/16.
 */

(function(){
    "use strict";
    angular
        .module("HousewivesApp")
        .factory("ForumService", ForumService);

    function ForumService() {

        var model = {
            forums: [
                {   "_id": "000",
                    "hwID": "1234",
                    "hwName": "Kenya Moore",
                    "city": "The Real Housewives of Atlanta",
                    "season": 2,
                    "episode": 5,
                    "post": "Moore Mansion is almost complete"
                }


            ],

            createPost: createPost,
            getAllPosts: getAllPosts
        };

        return model;

        function createPost(post, housewife){

            var forum = {
                "_id": (new Date).getTime(),
                "hwID": housewife._id,
                "hwName":  housewife.name,
                "city": post.city,
                "season": post.season,
                "episode": post.episode,
                "post": post.post
            };

            this.forums.push(forum);
            console.log("these are the forums");
            console.log(this.forums);

        }

        function getAllPosts(){
            return this.forums;
        }
    }
})();