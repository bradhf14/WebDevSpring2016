//possibly use ng-show for tabs
// ng-show="tab===1", display this one, put this in html div's
(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController(FormService, $rootScope, $scope, FieldService, $routeParams) {

        this.form ={};
        $scope.formUpdate = {};

        //TODO can't figure out how to update this.forms inside of callback function
        //Maybe try with scope angular

        FormService
            .findAllFormsForUser($rootScope.currentUser._id)
            .then(function(usersForms){
                $scope.forms = usersForms.data;
                console.log($scope.forms);

        });

        this.addForm = function(form){
            FormService
                .createFormForUser($rootScope.currentUser._id,form)
                .then(function(form){
                    FormService
                        .findAllFormsForUser($rootScope.currentUser._id)
                        .then(function(usersForms){
                            $scope.forms = usersForms.data;

                        });

            });

        };

        //TODO this is messy, clean this up, some work arounds because
        //I'm having issue keeping the fields values when it's updated
        this.updateForm = function(form){

            var fields = [];
            form.userId = $rootScope.currentUser._id;
            $scope.formUpdate = this.form;

            FieldService
                .getFieldsForForm(this.form._id)
                .then(function(response){
                    fields = (response.data);
                    form.fields = fields;

                    FormService
                        .updateFormById($scope.formUpdate._id,form)
                        .then(function(forms){
                            FormService
                                .findAllFormsForUser($rootScope.currentUser._id)
                                .then(function(usersForms){
                                    $scope.forms = usersForms.data;

                                });
                        });

                });

        };

        this.deleteForm = function(form){
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
                userId: $scope.forms[index].userId,
            };

            $routeParams.formId = $scope.forms[index]._id;

        };


        //TODO figure out better way of doing this
        this.updateFormId = function(formid){
            $routeParams.formId = formid;
        }
    }
})();