/**
 * Created by Bradley on 4/13/16.
 */

module.exports = function(app, formModel){

    // form field service endpoints
    app.get("/api/assignment/form/:formId/field", findAllFieldsByFormId);
    app.get("/api/assignment/form/:formId/field/:fieldId", findFieldAndFormById);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteField);
    app.post("/api/assignment/form/:formId/field", createField); //
    app.put("/api/assignment/form/:formId/field/:fieldId", updateField);


    // returns array of fields belong to a form whose id is equal to path param
    function findAllFieldsByFormId(req, res){
        var formId = req.params.formId;
        var form = formModel.findFieldsByFormId(formId);
        console.log(form);
        res.json(form);          //TODO Check if this logically works
    }

    // returns a field object whose id is equal to field id path param
    // field whose formId matches fieldId
    function findFieldAndFormById(req, res){
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = formModel.findFieldInFormById(formId, fieldId);
        res.json(field);
    }

    // removes a field object with fieldId, and belong to formField parameter, returns array of forms
    function deleteField(req, res){
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var forms = formModel.deleteField(formId, fieldId);
        res.json(forms);
    }

    // creates new field, in form with formid, returns new field object
    function createField(req, res){
        console.log("createField called");
        var newField = req.body;
        var formId = req.params.formId;
        var fields = formModel.createField(formId, newField);
        console.log("fields object being returned");
        console.log(fields);
        res.json(fields);
    }

    // updates field object, returns updated field object (check if correct return)
    function updateField(req, res){
        var field = req.body;
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var updatedField = formModel.updateField(formId, fieldId, field);
        res.json(updatedField);
    }


}
