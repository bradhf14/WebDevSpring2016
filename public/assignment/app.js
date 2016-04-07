//user angular to create the base module application FormBuilderApp, using routing module ngRoute
//QUESTION why is it in function? -> Good habit to use closure

 (function(){
     //angular js library
     //module creates new module
     //FormBuilderApp is application name
     //ngRoute is a dependency, other library we need
     "use strict";
     angular
        .module("FormBuilderApp", ["ngRoute"]);
 })();