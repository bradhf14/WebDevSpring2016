/**
 * Created by Bradley on 4/12/16.
 */

module.exports = function(app, formModel) {

    app.post("/api/assignment/user/:userId/form", createForm);
    app.get("/api/assignment/form/:formId", findByIdForm);
    app.get("/api/assignment/user/:userId/form", findAllFormsByUserId);
    app.put("/api/assignment/form/:userId", updateForm);
    app.delete("/api/assignment/form/:formId", deleteForm);

    //request to create form whose properties are the same as the form object
    //embedded in the HTTP requests body and the form belongs to the user whose id is
    //equal to the userId path parameter
    function createForm(req, res) {
        var userID = req.params.userId;  //So the userId comes from url request
        var newForm = req.body;         //and the req.body is the form, if we want to parse need body parser library
        newForm.userId = userID;                                //So we need to put userId into body before we create new form, thus
                                        // we will need body parser library???
        var forms = formModel.createForm(newForm)
            .then(function ( doc ) {
                    // login user if promise resolved
                    //TODO this req.session.currentuser breaks my code
                    //req.session.currentUser = doc;
                    res.json(doc);
                },
                // send error if promise rejected
                function ( err ) {
                    res.status(400).send(err);
                }
            );

        //res.json(forms);
    }

    // requests id to find a form given an respond with the form
    function findByIdForm(req, res) {
        var id = req.params.formId;
        var form = formModel.findFormById(id);
        res.json(form);
    }

    // requests the userId and responds with the forms for that user
    function findAllFormsByUserId(req, res) {
        var userId = req.params.userId;                     //gets the user id
        var forms = formModel.findAllFormsByUserId(userId)
            .then(function ( forms ) {
                    //TODO this req.session.currentuser breaks my code
                    //req.session.currentUser = doc;
                    res.json(forms);
                },
                // send error if promise rejected
                function ( err ) {
                    res.status(400).send(err);
                }
            );  //

    }

    // request to update a form with body
    // parse the id from the URL
    // update the form with that id with new body
    // respond with the updated form instance
    function updateForm(req, res) {
        var updatedForm = req.body;
        var id = req.params.userId;
        var forms = formModel.updateForm(id, updatedForm)
            .then(function ( form ) {
                    //TODO this req.session.currentuser breaks my code
                    //req.session.currentUser = doc;
                    res.json(form);
                },
                // send error if promise rejected
                function ( err ) {
                    res.status(400).send(err);
                }
            );

    }

    //request to read to delete particular form (check id)
    //respond with the updated list of forms
    function deleteForm(req, res) {
        var id = req.params.formId;
        var forms = formModel.deleteForm(id);
        res.json(forms);
    }
}




