/**
 * Created by Bradley on 2/21/16.
 */

//possibly use ng-show for tabs
// ng-show="tab===1", display this one, put this in html div's
(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController(FormService, $rootScope) {
        console.log("Hello from form controller");
        console.log($rootScope.currentUser);

        //TODO can't figure out how to update this.forms inside of callback function
        //Maybe try with scope angular
        this.forms = FormService.findAllFormsForUser($rootScope.currentUser._id, function(usersForms){

        });

        console.log("Forms pulled from FormService logged below");
        console.log(this.forms);

        this.addForm = function(form){

            FormService.CreateFormForUser($rootScope.currentUser._id,form.title, function(form){

            });
            this.forms = FormService.findAllFormsForUser($rootScope.currentUser._id, function(usersForms){

            });
        };

        this.updateForm = function(form){

            FormService.updateFormById(form._id,form.title, function(form){

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

        this.selectForm = function(form){

            console.log('this is called')
            this.selectedForm = {"title": "test form"};

            console.log(this.selectedForm.title);


            this.forms = FormService.findAllFormsForUser($rootScope.currentUser._id, function(usersForms){

            });
        };
    }
})();