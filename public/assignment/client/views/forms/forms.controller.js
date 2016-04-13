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
        this.forms = FormService.findAllFormsForUser($rootScope.currentUser._id, function(usersForms){
        });

        this.addForm = function(form){

            FormService.CreateFormForUser($rootScope.currentUser._id,form.title, function(form){

            });
            this.forms = FormService.findAllFormsForUser($rootScope.currentUser._id, function(usersForms){

            });
        };

        this.updateForm = function(form){

            FormService.updateFormById(this.form._id,form.title, function(form){

            });
            this.forms = FormService.findAllFormsForUser($rootScope.currentUser._id, function(usersForms){

            });
        };

        this.deleteForm = function(form){
            FormService.deleteFormById(form._id, function(form){

            });
            this.forms = FormService.findAllFormsForUser($rootScope.currentUser._id, function(usersForms){

            });
        };

        this.selectForm = function(index){

            this.form = {
                _id: this.forms[index]._id,
                title: this.forms[index].title,
                userId: this.forms[index].userId
            };

            this.forms = FormService.findAllFormsForUser($rootScope.currentUser._id, function(usersForms){

            });
        };
    }
})();