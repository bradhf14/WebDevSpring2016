(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("FieldController", FieldController);

    function FieldController(FieldService, FormService, $scope, $routeParams, $rootScope, $uibModal) {

        var fc = this;

        fc.formId = $rootScope.formId;
        fc.userId = $routeParams.userId;


        //implement these below
        fc.removeField = removeField;
        fc.addField = addField;
        fc.showModal = showModal;

         FieldService
             .getFieldsForForm(fc.formId)
             .then(function(response){

                 $scope.forms = response.data
             })

        //get the fields for the form
        //if (fc.formId){
          //  FieldService
            //    .getFieldsForForm(fc.formId)
              //  .then(fieldsCallback);
        //}

        function fieldsCallback(response){
            if (response.data){
                fc.fields = response.data;
            }
        }

        //now that we have set up the fc implement the functions that this fc supports : removefield, addfield, and showmodal

        function removeField(field){
            var fieldId = field._id;
            FieldService
                .deleteFieldFromForm(fc.formId, fieldId)
                .then(function(response){
                    console.log(response);
                });
        }

        function addField(newFieldType) {

            console.log("addField is called");

            FieldService
                .createFieldForForm(fc.formId, {'type': newFieldType})
                .then(function(response) {

                    console.log("this is what is returned");
                    console.log(response);
                    //findFieldsForFormAndSetScope();
                });
        };



        function showModal(field) {


            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'views/forms/modal.view.html',
                controller: 'ModalInstanceController',
                controllerAs: 'model',
                resolve: {
                    field: function () {
                        return field;
                    }
                }
            });
            modalInstance.result
                .then(function (field) {
                    //once we edit using the modal, use the Field Servie to update the field
                    FieldService
                        .updateField(vm.formId, field._id, field)
                        .then(function() {
                            //not sure what goes here
                        });
                });
        };

    }



    angular
        .module('FormBuilderApp')
        .controller('ModalInstanceController', ModalInstanceController);


    function ModalInstanceController($scope, $uibModalInstance, field) {

        var vm = this;



        if (field.type == "TEXT"){
            vm.fieldTitle = "Single Line Field";
            vm.fieldType = "TEXT";
        } else if (field.type == "TEXTAREA"){
            vm.fieldTitle = "Multiple Lines Field";
            vm.fieldType = "TEXTAREA";
        } else if (field.type == "DATE"){
            vm.fieldTitle = "Date Field";
            vm.fieldType = "DATE";
        } else if (field.type == "OPTIONS"){
            vm.fieldTitle = "Dropdown Field";
            vm.fieldType = "OPTIONS";
        } else if (field.type == "CHECKBOXES"){
            vm.fieldTitle = "Checkbox Field";
            vm.fieldType = "CHECKBOXES";
        } else if (field.type == "RADIOS"){
            vm.fieldTitle = "Radio Button Field";
            vm.fieldType = "RADIOS";
        }

        vm.cancel = cancel;
        vm.update = update;


        console.log("hello from modal controller");
        console.log(field);
        console.log(field.type);
        function update() {
            var optionsTextFragments = vm.fieldToEdit.optionsText.split('\n'),
                options = [];
            angular.forEach(optionsTextFragments, function(optionTextFragment) {
                var tokens = optionTextFragment.trim().split(';');
                if (tokens.length === 2) {
                    options.push({'label': tokens[0], 'value': tokens[1]});
                }
            });
            vm.fieldToEdit.options = options;
            $uibModalInstance.close(vm.fieldToEdit);
        };

        function cancel() {
            $uibModalInstance.dismiss('cancel');

        };
    }




})();
