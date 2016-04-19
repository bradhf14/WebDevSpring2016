(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("FieldController", FieldController);

    function FieldController(FieldService, FormService, $scope, $routeParams, $rootScope) {

        var fc = this;

        fc.formId = $rootScope.formId;
        fc.userId = $routeParams.userId;

        //implement these below
        fc.removeField = removeField;
        fc.addField = addField;

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

        function removeField(index){
            var fieldId = fc.fields[index]._id;
            FieldService
                .deleteFieldFromForm(fc.formId, fieldId)
                .then(showAllFields);
        }

        function addField(newFieldType) {

            console.log("addField is called");

            FieldService
                .createFieldForForm(fc.formId, {'type': newFieldType})
                .then(function(response) {

                    console.log("this is what is returned");
                    console.log(response);
                    findFieldsForFormAndSetScope();
                });
        };

        function showModal(field) {
            console.log("we get to show modal");

        };

    }






})();
