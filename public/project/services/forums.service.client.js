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
                    //"time": "1205",
                    "hwID": "1234",
                    "hwName": "Kenya Moore",
                    "city": "The Real Housewives of Atlanta",
                    "season": 2,
                    "episode": 8,
                    "post": "Moore Mansion is almost complete"
                },
                {   "_id": "000",
                    //"time": "1205",
                    "hwID": "1234",
                    "hwName": "Kandi Burruss",
                    "city": "The Real Housewives of Atlanta",
                    "season": 4,
                    "episode": 1,
                    "post": "Season 2 of the Kandi Factory taping now"
                },
                {   "_id": "000",
                    //"time": "1205",
                    "hwID": "1234",
                    "hwName": "Kenya Moore",
                    "city": "The Real Housewives of Atlanta",
                    "season": 4,
                    "episode": 5,
                    "post": "Kim Fields instigated that entire fight, so I just twirled away"
                }



            ],

            createPost: createPost,
            getAllPosts: getAllPosts,
            getFanPosts: getFanPosts,
            getFanPosts2: getFanPosts2
        };

        return model;

        function createPost(post, housewife){

            var forum = {
                "_id": (new Date).getTime(),
                //"time": Date.now(),
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

        //will return all posts that are appropriate for user based of season and locaiton
        function getFanPosts(user){
        //TODO logically, may be better way to do this, figure that out
            if(user.roles == 'Fan') {
                var fanPosts = [];
                for (var i = 0; i < this.forums.length; i++) {
                    if (this.forums[i].hwName != null) {
                        for (var j = 0; j < user.cities.length; j++) {
                            if (user.cities[j].city == this.forums[i].city) {
                                if (user.cities[j].View && user.cities[j].Season >= this.forums[i].season) {
                                    if (user.cities[j].Season == this.forums[i].season) {
                                        if (user.cities[j].Episode >= this.forums[i].episode) {
                                            fanPosts.push(this.forums[i]);
                                        }
                                    } else {
                                        fanPosts.push(this.forums[i]);
                                    }
                                }
                            }
                        }
                    }
                }
                return (fanPosts);
            }else{

                var fanPosts = [];
                for (var i = 0; i < this.forums.length; i++) {
                    if (this.forums[i].hwName != null) {
                        fanPosts.push(this.forums[i]);
                    }
                }
                return fanPosts;
            }
        }

        //will return all posts that are appropriate for user based of season and locaiton
        function getFanPosts2(user){
            //TODO logically, may be better way to do this, figure that out
            console.log(user);
            if(user.roles == 'Fan') {
                var fanPosts = [];
                for (var i = 0; i < this.forums.length; i++) {
                    if (this.forums[i].hwName == null) {
                        for (var j = 0; j < user.cities.length; j++) {
                            if (user.cities[j].city == this.forums[i].city) {
                                if (user.cities[j].View && user.cities[j].Season >= this.forums[i].season) {
                                    if (user.cities[j].Season == this.forums[i].season) {
                                        if (user.cities[j].Episode >= this.forums[i].episode) {
                                            fanPosts.push(this.forums[i]);
                                        }
                                    } else {
                                        fanPosts.push(this.forums[i]);
                                    }
                                }
                            }
                        }
                    }
                }
                return (fanPosts);
            }else{

                var fanPosts = [];
                for (var i = 0; i < this.forums.length; i++) {
                    if (this.forums[i].hwName == null) {
                        fanPosts.push(this.forums[i]);
                    }
                }
                return fanPosts;
            }
        }
    }
})();