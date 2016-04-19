//possibly use ng-show for tabs
// ng-show="tab===1", display this one, put this in html div's
(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController(FormService, $rootScope, $scope) {

        this.form ={};

        //TODO can't figure out how to update this.forms inside of callback function
        //Maybe try with scope angular

        FormService
            .findAllFormsForUser($rootScope.currentUser._id)
            .then(function(usersForms){
                $scope.forms = usersForms.data;

        });

        this.addForm = function(form){

            console.log("creating form, this is the form");
            FormService
                .createFormForUser($rootScope.currentUser._id,form)
                .then(function(form){
                    console.log(form);
                    FormService
                        .findAllFormsForUser($rootScope.currentUser._id)
                        .then(function(usersForms){
                            $scope.forms = usersForms.data;

                        });

            });

        };

        this.updateForm = function(form){

            form.userId = $rootScope.currentUser._id;
            FormService
                .updateFormById(this.form._id,form)
                .then(function(forms){
                    FormService
                        .findAllFormsForUser($rootScope.currentUser._id)
                        .then(function(usersForms){
                            $scope.forms = usersForms.data;

                        });
                });

        };

        this.deleteForm = function(form){

            console.log("delete is called");
            console.log(form);
            FormService
                .deleteFormById(form._id)
                .then(function(forms){
                    FormService
                        .findAllFormsForUser($rootScope.currentUser._id)
                        .then(function(usersForms){
                            $scope.forms = usersForms.data;

                        });

            });

        };

        this.selectForm = function(index){

            this.form = {
                _id: $scope.forms[index]._id,
                title: $scope.forms[index].title,
                userId: $scope.forms[index].userId
            };
            $rootScope.formId = $scope.forms[index]._id;

        };
    }
})();