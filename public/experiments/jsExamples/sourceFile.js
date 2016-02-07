
var alice = {
    "firstname": "Kyle",      //properties of alice
    "lastname": "Richards",
    "salary": 2400000,

    lisa:[{title: "friend"}]

    //sometimes need to have a string rep of object
};

var str = JSON.stringify(alice);

alert(hello);
console.log(alice);
console.log(str);

//can also parse string back into object!
var dept = '{"firstname":"Kyle","lastname":"Richards","salary":2400000,"lisa":[{"title":"friend"}]}';
var deptObj = JSON.parse(dept);
console.log(deptObj);


//important to be able to put strings into object representation