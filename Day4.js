/******************************************************************
 * JAVASCRIPT CORE CONCEPTS – FORMATTED NOTES
 ******************************************************************/

/* ================================================================
 * 1. FOR LOOPS – var vs let (Closures + setTimeout)
 * ================================================================ */

// Example 1: Using `var`

for (var i = 0; i < 10; i = i + 2) {
  setTimeout(() => {
    console.log({ i });
  }, 0);
}

/*
Explanation:
- `var` is function-scoped
- Same variable `i` is reassigned
- All callbacks share the same `i`

Conceptually:
var i = 0;
{
  console.log(i);
  i = 2;
  console.log(i);
  i = 4;
  console.log(i);
}
*/

 /*
Final Output:
{ i: 10 }
{ i: 10 }
{ i: 10 }
{ i: 10 }
{ i: 10 }
*/


// ---------------------------------------------------------------

// Example 2: Using `let`

for (let i = 0; i < 10; i = i + 2) {
  setTimeout(() => {
    console.log({ i });
  }, 0);
}

/*
Explanation:
- `let` is block-scoped
- Each iteration gets its own `i`
- Each callback closes over its own value

Conceptually:
{
  let i = 0;
  setTimeout(() => console.log({ i }), 0);
}
{
  let i = 2;
  setTimeout(() => console.log({ i }), 0);
}
{
  let i = 3;
  setTimeout(() => console.log({ i }), 0);
}
*/

 /*
Final Output:
{ i: 0 }
{ i: 2 }
{ i: 4 }
{ i: 6 }
{ i: 8 }
*/

// Note:
// Each setTimeout callback closes over its own `i`, not a shared one.

// =================================================================
// forEach / map work correctly by design
// =================================================================

// Reasons:
// 1. forEach/map pass value as function parameter
// 2. Function parameters are block-scoped
// 3. Each callback gets its own copy
// 4. Closures capture the parameter

/*
(function (value) {
  setTimeout(() => console.log(value), 0);
})(0);
*/

// =================================================================

/* ================================================================
 * 2. FOR...OF LOOPS
 * ================================================================ */

// Works only with iterable values (Symbol.iterator)

// Works with:
// - Array
// - String
// - Map
// - Set
// - TypedArray
// - arguments
// - NodeList

// Does NOT work with:
// - Plain JavaScript objects

// for...of internally:
// 1. Checks Symbol.iterator
// 2. If exists → iteration allowed
// 3. If not → error

/* ================================================================
 * 3. FOR...IN LOOPS
 * ================================================================ */

// for...in works with:
// - Objects
// - Arrays
// - Strings
// Iterates over keys (not values)

/* ================================================================
 * 4. FUNCTIONS
 * ================================================================ */

/* ------------------------------
 * 1. Function Declaration
 * ------------------------------ */

console.log(declaredFunction()); // Works due to hoisting

function declaredFunction() {
  return "I am a function declaration";
}

/* ============================================================
 * 2. FUNCTION EXPRESSION
 * ============================================================
 * - Function is assigned to a variable
 * - Not hoisted
 * - Can be anonymous or named
 * - Created at runtime
 */

const expressedFunction = function () {
  return "I am a function expression";
};

console.log(expressedFunction()); // Works

// console.log(exprBeforeInit()); // Error
// const exprBeforeInit = function () {};

/* ------------------------------
 * Named Function Expression
 * ------------------------------ */

const namedExpression = function internalName() {
  return "I am a named function expression";
};

console.log(namedExpression()); // Works
// console.log(internalName()); // ReferenceError

/* ============================================================
 * 3. FUNCTION DEFINITION (Conceptual Term)
 * ============================================================
 * - NOT a JavaScript syntax type
 * - General term meaning "creating a function"
 * - Can be done using:
 *   - Function declaration
 *   - Function expression
 *   - Arrow function
 */

// Declaration
function definitionExample1() {}

// Expression
const definitionExample2 = function () {};

// Arrow function
const definitionExample3 = () => {};

/* ============================================================
 * 4. IMMEDIATELY INVOKED FUNCTION EXPRESSIONS (IIFE)
 * ============================================================
 * - Works ONLY with function expressions
 * - Used for isolation and immediate execution
 */

(function () {
  console.log("IIFE executed immediately");
})();

+function () {
  console.log("IIFE using unary + operator");
}();

/*
Summary:
- Function Declaration → hoisted and Cannot be directly invoked immediately
- Function Expression → not hoisted and  Can be anonymous or named and Can be used as IIFE
- Function Definition → conceptual term
*/

// =================================================================

/* ================================================================
 * DIFFERENT WAYS TO CALL FUNCTIONS
 * ================================================================ */

// 1. Simple Call
demo();

function demo() {
  console.log("Simple function call");
}

// 2. Method Call
const obj = {
  display: function printUserName() {
    console.log("Hello Aman");
  },
};

obj.display();

// 3. Constructor Call
function PrintUserName() {
  console.log("Hello Aman");
}

new PrintUserName();

// 4. call / bind / apply / arrow function (not shown)

// 5. IIFE

/*
This is NOT valid: This is not valid because iffe fucntion cannot be called with fucntion declaration 
Function declarations must have a name and cannot be immediately invoked
So when the parser sees (), it throws an error because declarations are not callable expressions.

function printUserName() {
  console.log("Hello Aman");
}();
*/ 

// This works because it becomes an expression
+function printUserName() {
  console.log("Hello Aman");
}();

// =================================================================

/* ================================================================
 * 6. CALLBACK FUNCTION
 * ================================================================ */

function firstFunction() {
  console.log("Hello world");
}

function secondFunction(cb) {
  cb();
}

secondFunction(firstFunction);

// =================================================================

/* ================================================================
 * 7. FUNCTION CONSTRUCTOR
 * ================================================================ */

// Functions are objects in JavaScript
// All arguments except last → parameters
// Last argument → function body

const fn = new Function("a", "b", "return a + b");
console.log(fn(10, 10)); // 20

function sum(a, b) {
  return a + b;
}

console.log(sum(10, 10)); // 20

// Scope limitation of Function constructor

let x = 10;
const fn1 = new Function("return x");
// console.log(fn1()); // ReferenceError

// Reason:
// new Function does NOT capture local scope
// Behaves like eval()

// =================================================================

/* ================================================================
 * 8. PURE FUNCTIONS
 * ================================================================ */

// Rules:
// 1. No access to outside variables
// 2. Same input → same output
// 3. No side effects

function pureFn(a, b) {
  return a + b;
}

// Not pure (side effect)
function notPure1() {
  console.log(1);
}

// Not pure (external dependency)
let y = 1;
function notPure2() {
  return y;
}

/******************************************************************
 5. ARGUMENTS OBJECT IN JAVASCRIPT
 ******************************************************************/

/*
 * The `arguments` object is an array-like object available
 * inside normal (non-arrow) functions.
 * It contains all arguments passed to the function.
 */

/* ================================================================
 * Example: Using arguments
 * ================================================================ */

function fn() {
  console.log(arguments);
}

fn(1, 2, 3, 4, 5, 6, 7, 8);

/*
Output (console):
Arguments(8) [1, 2, 3, 4, 5, 6, 7, 8]

Note:
- It looks like an array
- But it is NOT a real array
*/

/* ================================================================
 * Why arguments.forEach() throws an error
 * ================================================================ */

function testForEach() {
  // arguments.forEach(x => {
  //   console.log(x);
  // });
}

/*
Error:
TypeError: arguments.forEach is not a function

Reason:
- `arguments` is an array-like object
- It has indexes and length
- But it does NOT have array methods like forEach, map, filter
*/

/* ================================================================
 * Correct Way: Convert arguments to an Array
 * ================================================================ */

function iterateArguments() {
  [...arguments].forEach(x => {
    console.log(x);
  });
}

iterateArguments(1, 2, 3, 4);

/* ================================================================
 * Alternative (older JavaScript approach)
 * ================================================================ */

function iterateArgumentsOld() {
  Array.prototype.forEach.call(arguments, x => {
    console.log(x);
  });
}

iterateArgumentsOld(5, 6, 7, 8);

/* ================================================================
 * Modern & Recommended Way: Rest Parameters
 * ================================================================ */

function modernFn(...args) {
  args.forEach(x => console.log(x));
}

modernFn(9, 10, 11, 12);

/* ================================================================
 * Important Notes
 * ================================================================ */

/*
1. `arguments` exists only in normal functions
2. Arrow functions DO NOT have `arguments`
3. Use rest parameters (...args) in modern JavaScript
*/

/* ================================================================
 * MEMORY NOTE
 * ================================================================ */

/*
arguments looks like an array but is NOT an array,
so convert it before using array methods.
*/

/* ================================================================
7. DYNAMIC THIS
 * ================================================================ */

 function fn(){
  console.log(this);
}

fn()

fn.call({a:1, b : 2})

/******************************************************************
 * 8. FUNCTIONS ARE FIRST-CLASS CITIZENS IN JAVASCRIPT
 ******************************************************************/

/*
In JavaScript, functions are called "first-class citizens" because they can:
1. Be assigned to variables
2. Be passed as arguments
3. Be returned from other functions
*/

/* ================================================================
 * 1. Functions can be assigned to variables
 * ================================================================ */

const greet = function () {
  console.log("Hello!");
};

greet(); // Hello!

/* ================================================================
 * 2. Functions can be passed as arguments
 * ================================================================ */

function execute(fn) {
  fn();
}

execute(function () {
  console.log("Function passed as argument");
});

/* ================================================================
 * 3. Functions can be returned from other functions
 * ================================================================ */

function multiplier(factor) {
  return function (number) {
    return number * factor;
  };
}

const double = multiplier(2);
console.log(double(5)); // 10

/* ================================================================
 * MEMORY NOTE
 * ================================================================ */

/*
Functions in JavaScript behave like values:
they can be stored, passed, and returned just like data.
*/


/******************************************************************
8. CLOSURE & GARBAGE COLLECTION IN JAVASCRIPT
 ******************************************************************/

/*
A closure is created when a function "remembers" the variables
from its outer (lexical) scope even after the outer function
has finished execution.
*/

function fn() {
  let x = 10; // local variable

  return function show() {
    console.log(x++);
  };
}

const log = fn();

/*
At this point:
- fn() execution is finished
- BUT variable `x` is NOT garbage collected
- Because `show()` still references `x`
*/

log(); // 10
log(); // 11

/*
WHY `x` IS NOT GARBAGE COLLECTED:
- `log` references `show`
- `show` closes over `x`
- JavaScript keeps `x` in memory as long as the closure is reachable

Memory reference chain:
log → show() → x
*/

/*
WHEN WILL `x` BE GARBAGE COLLECTED?
*/

log = null;

/*
Once:
- No references to `show` exist
- The closure becomes unreachable

Then:
- `x` becomes eligible for garbage collection
*/

/*
IMPORTANT NOTES:
- Closures extend the lifetime of variables
- This is expected and correct behavior
- Not a memory leak unless references are unintentionally retained
*/

/*
ONE-LINE SUMMARY:
Variables captured by a closure are not garbage collected as long as the function referencing them is reachable.
*/

// =======================================================================================================================
// =======================================================================================================================

/*
- In JS Functions are objects
*/

/*
- Function expressions are needed for runtime control, callbacks,
  conditional logic, and functional programming patterns.
- Anonymous function expressions are simple and common.
- Named function expressions improve debugging and allow recursion.
- Declarations define functions early; expressions create them when needed.
*/

// =======================================================================================================================
// =======================================================================================================================

/******************************************************************
9. HIGHER ORDER FUNCTION
 ******************************************************************/

// A function that accepts a function, as a argument, it is called as HOF  
// function returning another function will be high order function  

/******************************************************************
11. ARROW FUNCTION
 ******************************************************************/

const z = _ => ({a:1, k:_})
console.log(x(100));      //  {a:1, k: 100}

/*
- arugments not available inside arrow function
- this value in arrow function always lexically figures out from parent scope
*/


