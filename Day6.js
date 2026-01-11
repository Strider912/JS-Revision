/* ================================================================
 * 1. NaN FROM INVALID NUMBER CONVERSION
 * ================================================================ */

let num = Number('Hello');

/*
Number('Hello') results in NaN (Not-a-Number)
*/

/* ================================================================
 * 2. typeof NaN CHECK (WRONG APPROACH)
 * ================================================================ */

/*
typeof NaN === 'number'
So comparing typeof num === NaN will ALWAYS fail, because num is also NaN
*/
if (typeof num === NaN) {
    // ❌ Never executed
}

/* ================================================================
 * 3. NaN COMPARISON BEHAVIOR
 * ================================================================ */

/*
NaN is NOT equal to itself
This only for NaN only
*/
NaN == NaN;   // false
NaN === NaN;  // false


/* ================================================================
 * 4. isNaN() FUNCTION
 * ================================================================ */

/*
isNaN() converts value to number before checking
Returns true if result is NaN
*/
isNaN(num); // true


/* ================================================================
 * 5. Number.isNaN() (RECOMMENDED)
 * ================================================================ */

/*
Strict check — no type coercion
Returns true ONLY if value is NaN
*/
Number.isNaN(num); // true


/* ================================================================
 * 6. Object.is() WITH NaN
 * ================================================================ */

/*
Object.is() correctly identifies NaN
*/
Object.is(num, NaN); // true


/* ================================================================
 * 7. ONE-LINE SUMMARY
 * ================================================================ */

/*
Use Number.isNaN() or Object.is(value, NaN) to reliably check for NaN.
*/


/* ================================================================
 * 7. ONE-LINE SUMMARY
 * ================================================================ */

/*============================================================================================================
 ===========================================================================================================*/

/* ================================================================
 2.  == Abstract Equality Comparison
* ================================================================= */

// == Abstract Equality Comparison

/*
1. checks the type, if x and y are of same type return x === y
2. If x === null or y === undefined return true
3. If x === undefined or y === null return true
4. If x and y are of different type, It will try to convert them to same type and then compare: Examples: 2 == '2' (string to number), true == 1 (boolean to number)
5. if x and y are is non-primitive, convert them to primitive and then compare

Ex: 0 == '' => true ('' converted to 0) because, it will try to convert them into same type Number('') => 0

Ex: [1] == 1 //true
String([1]) => '1' => Number('1') => 1 => 1 == 1 => true

Ex: [] == 0 //true
String([]) => '' => Number('') => 0 => 0 == 0 => true

Ex: {} == 0 //false
String({}) => '[object Object]' => Number('[object Object]') => NaN => 0 == NaN => false

Ex: [] == ![] //true
![] => false => Number(false) => 0
String([]) => '' => Number('') => 0 => 0 == 0 => true

Ex: null == 0 //false
null only equal to undefined in abstract equality comparison

Ex: undefined == 0 //false
Number(undefined) => NaN => NaN == 0 => false

Ex: null == 0 //false
Number(null) => 0 => 0 == 0 => true

Ex: +0 == -0 //true

The only limitation of == equality is It cannot compare -0 and +0 and also NaN, NaN
Above problem is solved by using Object.is Method. 

Object.is(0, -0)    // false
Object.is(NaN), NaN)    // true
*/

/*===========================================================================================================
 ===========================================================================================================*/

/*================================================================
 * 3. UNDEFINED — BASIC CONCEPT
 *================================================================*/

/*
undefined means a variable exists but has no value assigned.
It represents an empty or uninitialized state.
*/


/* ================================================================
 * 2. COMMON SCENARIOS
 * ================================================================ */

/*
Accessing a non-existing object property
*/
const obj = {};
obj.aman; // undefined

/*
Declared but not initialized variable
*/
let x;
x; // undefined


/* ================================================================
 * 3. UNDEFINED VS NULL
 * ================================================================ */

/*
undefined → automatically assigned by JS (no value yet)
null → explicitly assigned by developer (intentional empty value)
*/


/* ================================================================
 * 4. ONE-LINE SUMMARY
 * ================================================================ */
/*
undefined means "value not assigned", while null means "intentionally empty".
In js, if you try to access anything that is not there, you will get undefined undefined is like a box, 
space location for variable that is not being used at all. There is nothing inside it. Just a empty box.
*/

/*===========================================================================================================
 ===========================================================================================================*/

/* ================================================================
 * 1. SHALLOW COPY — BASIC IDEA
 * ================================================================ */

/*
Objects are copied by reference.
Assigning one object to another points to the same memory.
*/

const newObj = {};
const temp = newObj;
temp.x = 10;


/* ================================================================
 * 2. FUNCTION PARAMETER BEHAVIOR
 * ================================================================ */

/*
Objects passed to functions are passed by reference.
Modifying inside function affects original object.
*/

function Test(pObj) {
    pObj.x = 20;
}

Test(newObj);
// newObj => { x: 20 }


/* ================================================================
 * 3. SHALLOW COPY METHODS
 * ================================================================ */

/*
Shallow copy duplicates only the first level.
Nested objects still share references.
*/

Object.assign({}, obj);
{ ...obj };


/* ================================================================
 * 4. DEEP COPY OPTIONS
 * ================================================================ */

/*
JSON.parse(JSON.stringify(obj))
- Removes functions
- Removes Date objects
- Loses special data types
*/

/*
structuredClone(obj)
- True deep copy
- Does NOT support DOM nodes
*/

/* ================================================================
 * 5. ONE-LINE SUMMARY
 * ================================================================ */

/* ================================================================
 * 1. SHALLOW VS DEEP COPY (RECAP)
 * ================================================================ */

/*
Shallow copy shares references for nested objects.
Deep copy creates completely independent copies at all levels.
*/

/* ================================================================
 * 2. Object.freeze()
 * ================================================================ */

/*
Object.freeze() makes an object immutable at the top level. 
- Cannot add new properties
- Cannot delete properties
- Cannot modify existing properties
Note: Does not work with nested objects
*/

const obj2 = { k: "aman" };
Object.freeze(obj2);

obj2.d = {};      // ❌ Not added
obj2.k = "demo";  // ❌ Not modified

// obj2 => { k: "aman" }


/* ================================================================
 * 3. Object.seal()
 * ================================================================ */

/*
Object.seal() restricts structure but allows value updates.
- Cannot add new properties
- Cannot delete properties
- CAN modify existing properties
*/

const obj3 = { k: "aman" };
Object.seal(obj3);

obj3.k = "demo";  // ✅ Allowed
// obj3 => { k: "demo" }


/* ================================================================
 * 4. IMPORTANT LIMITATION (SHALLOW BEHAVIOR)
 * ================================================================ */

/*
Both Object.freeze() and Object.seal() work only at the first level.
Nested objects can still be modified.
*/

const obj4 = {
  user: {
    name: "Aman"
  }
};

Object.freeze(obj4);

obj2.user = {};          // ❌ Not allowed (changing reference)
obj2.newProp = "test";   // ❌ Not allowed (adding new property)
delete obj2.user;        // ❌ Not allowed (deleting property)

obj4.user.name = "Updated"; // ✅ Still allowed

/*
Only this is frozen:
obj4.user  → reference is frozen

NOT this:
obj4.user.name → still mutable

You are NOT changing obj4.user itself.
You are modifying a property INSIDE the nested object.
*/

/* ================================================================
 * 5. ONE-LINE SUMMARY
 * ================================================================ */

/*
freeze → no add, no delete, no update (shallow only)
seal   → no add, no delete, update allowed (shallow only)
*/

// Hoisting

// Stage 1: Parsing Phase
show()   // executable line
console.log({abc});     // executable line
let abc = 10    // declaration phase x:undefined

function show(){    // declaration phase function will copy as it is
    console.log('Inside show function');
}

/*
JS Execution Phases:

1. Parsing/Memory allocation Phases:
- We add information about variable and functions to their relevant scopes.
- Initialize variables defined with var.

2. Execution phase:
- Touch executable code in Execution phase and ignore declarative code.

===================================================

JS Execution Phases Starts

A. Parsing Phase:
1. x:undefined
2. function show(){   
    console.log('Inside show function');
}

B. Execution phase:
will print show
will print undefined since  x:undefined in parsing phase
wil update the value to 1 fro undefined

*/


/* ================================================================
 * 1. WHY THIS CODE WORKS
 * ================================================================ */

x();
console.log(x);

var x = 10;

function x() {
    console.log("Hello World");
}


/* ================================================================
 * 2. JAVASCRIPT HOISTING PHASE
 * ================================================================ */

/*
Before execution, JavaScript performs a *creation phase* (hoisting).

During this phase:
1. Function declarations are hoisted with their full body.
2. var declarations are hoisted but initialized as undefined.
*/


/* ================================================================
 * 3. WHAT ACTUALLY HAPPENS INTERNALLY
 * ================================================================ */

/*
Memory creation phase:

x → function x() { console.log("Hello World"); }

Then:
var x;  // ignored because function already exists
*/


/* ================================================================
 * 4. EXECUTION PHASE STEP-BY-STEP
 * ================================================================ */

/*
Step 1:
x(); 
→ Calls the function
→ Output: "Hello World"

Step 2:
console.log(x);
→ At this moment, x is still the function
→ Output: function x() { ... }

Step 3:
x = 10;
→ Function reference is overwritten with value 10
*/


/* ================================================================
 * 5. WHY FUNCTION WINS OVER var
 * ================================================================ */

/*
Function declarations have higher priority than var declarations
during the hoisting (memory creation) phase.
*/


/* ================================================================
 * 6. ONE-LINE SUMMARY
 * ================================================================ */

/*
Function declarations are hoisted with their definition, while var is hoisted as undefined — so functions win.
*/

/*************************************************************************************************************************************
*************************************************************************************************************************************/

/* ================================================================
 * 1. VAR vs LET — HOISTING BEHAVIOR
 * ================================================================ */

/*
var variables:
- Are hoisted
- Are initialized with `undefined`
- Accessible before declaration (no ReferenceError)
*/

console.log(y); // undefined
var y = 10;


/* ================================================================
 * 2. LET / CONST — TEMPORAL DEAD ZONE (TDZ)
 * ================================================================ */

/*
let and const:
- Are hoisted
- BUT are NOT initialized during parsing/creation phase
- Exist in the "Temporal Dead Zone" until initialization
*/

console.log(x); // ❌ ReferenceError
let x;


/* ================================================================
 * 3. WHY ReferenceError OCCURS
 * ================================================================ */

/*
Even though let/const are hoisted, accessing them before initialization
is illegal.

They exist in memory, but are uninitialized in parsing phase and If it is initialized in parsing phase with initial value as undefined like
in case of var, then it just violets the const rule that is value cannot be reassigned to them.
This period is called the Temporal Dead Zone (TDZ).
*/


/* ================================================================
 * 4. COMPARISON SUMMARY
 * ================================================================ */

/*
var:
- Hoisted
- Initialized with undefined
- Accessible before declaration
let / const:
- Hoisted
- NOT initialized in parsing phase like var.
- Life Cycle of var starts like in parsing phase => var x: undefiend  and in execution phase => x = 10
- Life Cycle of let/const starts like in parsing phase => let/const x: uninitialized (in TDZ) and in execution phase => x = value
- Accessing before declaration → ReferenceError
*/

/* ================================================================
 * 5. WHY let/const BEHAVE THIS WAY
 * ===============================================================*/

/*
If const were initialized with undefined, this would be possible:

const x = undefined;
x = 10; // ❌ violates const rule

To prevent this inconsistency, JS blocks access before initialization, this means that during parsing phase, let/const are uninitialized/not hoisted
*/

/* ================================================================
 * 6. ONE-LINE SUMMARY
 * ================================================================ */

/*
var is hoisted and initialized with undefined, let/const are hoisted but stay in TDZ until initialized.
*/

/*************************************************************************************************************************************
*************************************************************************************************************************************/
