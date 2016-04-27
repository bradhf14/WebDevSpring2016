(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("AdminController", AdminController);

    function AdminController(FormService, $rootScope, $scope, FieldService, UserService, $routeParams) {

        this.user ={};
        $scope.userUpdate = {};

        //TODO can't figure out how to update this.forms inside of callback function
        //Maybe try with scope angular

        UserService
            .findAllUsers()
            .then(function(users){

                $scope.users = users.data;


            });

        this.addUser = function(user){

            UserService
                .createUserAdmin(user)
                .then(function(user){
                    UserService
                        .findAllUsers()
                        .then(function(users){

                            $scope.users = users.data;

                        });
                });
        };

        //TODO this is messy, clean this up, some work arounds because
        //I'm having issue keeping the fields values when it's updated
        this.updateUser = function(user){

            $scope.userUpdate = this.user;
            $scope.userUpdate.username = user.username;
            $scope.userUpdate.password = user.password;
            $scope.userUpdate.firstName = user.firstName;
            $scope.userUpdate.lastName = user.lastName;
            $scope.userUpdate.roles = user.roles;

            UserService
                .updateUserAdmin($scope.userUpdate._id, $scope.userUpdate)
                .then(function(users){

                    UserService
                        .findAllUsers()
                        .then(function(users){
                            $scope.users = users.data;

                        });

                });


        };

        this.deleteUser = function(user){
            UserService
                .deleteFormByIdAdmin(user._id)
                .then(function(users){
                    UserService
                        .findAllUsers()
                        .then(function(users){

                            $scope.users = users.data;


                        });

                });

        };

        this.selectUser = function(index){


            this.user = {
                _id: $scope.users[index]._id,
                username: $scope.users[index].username,
                password: $scope.users[index].password,
                firstName: $scope.users[index].firstName,
                lastName: $scope.users[index].lastName,
                roles: $scope.users[index].roles,
                phones: $scope.users[index].phones,
                emails: $scope.users[index].emails
            };

        };


        //TODO figure out better way of doing this
        this.updateFormId = function(formid){
            $routeParams.formId = formid;
        }


    }
})();