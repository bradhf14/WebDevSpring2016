//user angular to create the base module application FormBuilderApp, using routing module ngRoute
//QUESTION why is it in function? -> Good habit to use closure

 (function(){
     "use strict";
     angular
        .module("FormBuilderApp", ["ngRoute","ui.bootstrap"]);
 })();