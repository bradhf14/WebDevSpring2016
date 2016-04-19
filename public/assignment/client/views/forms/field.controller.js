(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("FieldController", FieldController);

    function FieldController(FieldService, FormService, $scope, $routeParams, $rootScope, $uibModal) {

        var fc = this;

        fc.formId = $rootScope.formId;
        fc.userId = $routeParams.userId;
        //TODO figure out how to use $routeParams correctly

        //implement these below
        fc.removeField = removeField;
        fc.addField = addField;
        fc.showModal = showModal;

        //This updates the listing on the page
         FieldService
            .getFieldsForForm(fc.formId)
            .then(function(response){

                $scope.forms = response.data
            });

        function removeField(field){
            var fieldId = field._id;
            FieldService
                .deleteFieldFromForm(fc.formId, fieldId)
                .then(function(response){
                });
        }

        function addField(newFieldType) {

            FieldService
                .createFieldForForm(fc.formId, {'type': newFieldType})
                .then(function(response) {

                    FieldService
                        .getFieldsForForm(fc.formId)
                        .then(function(response){

                            $scope.forms = response.data
                        })
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
                .then(function (fieldUpdated) {
                    //once we edit using the modal, use the Field Service to update the field
                    fieldUpdated._id = field._id;
                    FieldService
                        .updateField(fc.formId, field._id, fieldUpdated)
                        .then(function(response) {

                            FieldService
                                .getFieldsForForm(fc.formId)
                                .then(function(response){

                                    $scope.forms = response.data
                                })
                        });
                });
        };

    }

    angular
        .module('FormBuilderApp')
        .controller('ModalInstanceController', ModalInstanceController);


    function ModalInstanceController($scope, $uibModalInstance, field) {

        var vm = this;
        vm.fieldToEdit = {};

        if (field.type == "TEXT"){
            vm.fieldToEdit.title = "Single Line Field";
            vm.fieldToEdit.type = "TEXT";
        } else if (field.type == "TEXTAREA"){
            vm.fieldToEdit.title = "Multiple Lines Field";
            vm.fieldToEdit.type = "TEXTAREA";
        } else if (field.type == "DATE"){
            vm.fieldToEdit.title = "Date Field";
            vm.fieldToEdit.type = "DATE";
        } else if (field.type == "OPTIONS"){
            vm.fieldToEdit.title = "Dropdown Field";
            vm.fieldToEdit.type = "OPTIONS";
        } else if (field.type == "CHECKBOXES"){
            vm.fieldToEdit.title = "Checkbox Field";
            vm.fieldToEdit.type = "CHECKBOXES";
        } else if (field.type == "RADIOS"){
            vm.fieldToEdit.title = "Radio Button Field";
            vm.fieldToEdit.type = "RADIOS";
        }

        vm.cancel = cancel;
        vm.update = update;

        function update(f) {

            var options = [];

            if(f.text) {
                angular.forEach(f.text, function (f) {
                    var tokens = f.trim().split(':');
                    if (tokens.length == 2) {
                        options.push({'label': tokens[0], 'value': tokens[1]});
                    }
                });

                vm.fieldToEdit.options = options;
            }

            if(f.placeholder)
            {
                vm.fieldToEdit.placeholder = f.placeholder;
            };

            vm.fieldToEdit.label = f.label;
            $uibModalInstance.close(vm.fieldToEdit);
        };

        function cancel() {
            $uibModalInstance.dismiss('cancel');

        };
    }

})();
