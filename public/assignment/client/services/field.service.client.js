/**
 * Created by Bradley on 4/13/16.
 */
(function() {
    'use strict';

    angular
        .module("FormBuilderApp")
        .factory("FieldService", FieldService);

    function FieldService($http) {

        var model = {
            createFieldForForm : createFieldForForm,
            getFieldsForForm: getFieldsForForm,
            getFieldForForm: getFieldForForm,
            deleteFieldFromForm: deleteFieldFromForm,
            updateField: updateField
        };
        return model;


        function createFieldForForm(formId, field){

            console.log("creating field and being passed to server service with the following form ID and field");
            console.log(formId);
            console.log(field);
            return $http.post ("/api/assignment/form/" + formId + "/field", field);
        }

        function getFieldsForForm(formId){
            console.log("we call get fields for form");
            return $http.get ("/api/assignment/form/" + formId + "/field");
        }

        function getFieldForForm(formId, fieldId){
            return $http.get ("/api/assignment/form/" + formId + "/field/" + fieldId);
        }

        function deleteFieldFromForm(formId, fieldId){
            return $http.delete ("/api/assignment/form/" + formId + "/field/" + fieldId);
        }

        function updateField(formId, fieldId, field){
            return $http.put ("/api/assignment/form/" + formId + "/field/" + fieldId, field);
        }
    }
})();
