Difference between var and let in JavaScript:

var a = 10
var a = 20

will work but 

let b = 10
let b = 20
will throw an error. => Identifier b has already been declared.


2. Var variables can be accessed before declaration due to hoisting, while let variables cannot be accessed before declaration.

3. var variables will be get binded with windows object if declared as global scope but let variables will not be binded with windows object.


const c = 10 
c = 20 will throw an error. => Assignment to constant variable.

Note : Const variables cannot be re-assigned but their properties can be modified if they are objects.

Note : 
console.log(x);
x= 20 will throw an error. => 

console.log(x); followed by x = 20 will throw an error: "Cannot access 'x' before initialization."
This happens because in JavaScript, variables declared with let or const cannot be accessed before they are initialized. They exist in the Temporal Dead Zone until the execution reaches their declaration.

Data Types:

Primitives: They work on pass by value 
String
Number
Boolean

BigInt  Largetst Number : Number.MAX_SAFE_INTEGER 
let  a = 10n; // BigInt
let f = BigInt(9007199254740991); // BigInt

Null : Developer assigned value meaning no value.
Undefined : JavaScript didn't assign any value. Undefined comes from javascript.
Examples: 

Case 1:
let x 
console.log(x); // undefined. JavaScript didn't assign any value.

Case 2:
function getData(){

}
console.log(x()); // undefined. Function didn't return anything.

Case 3:


Symbol : Its is built-in object whose constructor returns a Symbol. 
Symbol is function which generates unique id on each call.

Non-Primitives: They work on pass by reference

Objects (Arrays, Functions, Map, Set, Date )



