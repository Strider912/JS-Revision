//  Coersion Vs Conversion

//  Coersion : Explicit Conversion
//  Coersion : Implicit Conversion => JS engine automatically converts one data type to another data type.

// Coersion Examples
Number(1) //  Explicit Conversion
String(1) //  Explicit Conversion
Boolean(1) //  Explicit Conversion

// Conversion Examples
console.log('5' + 5); // Implicit Conversion to String
console.log('5' - 5); // Implicit Conversion to Number
console.log('5' * 5);   // Implicit Conversion to Number


//  JS is weakly typed language  =>  it does not force you to declare data types of variables. 
// JS is dynamically typed language => data types are determined at runtime based on the value assigned to the variable.

let x =10
x = "Hello"

/******************************************************************************************************************************************
******************************************************************************************************************************************/

// Strings

const str= ''

Number(str) // 0
Boolean(str) // false

const str1= 'Hello'

Number(str1) // NaN
Boolean(str1) // true

// Numbers

const num = 0

String(num) // '0'
Boolean(num) // false

const num1 = 25

String(num1) // '25'
Boolean(num1) // true

// Objects

const obj = {}

Number(obj) // NaN
Boolean(obj) // true
String(obj) // '[object Object]'

// Arrays

const arr = []

Number(arr) // 0
Boolean(arr) // true
String(arr) // ''

const arr1 = [1,2,3]

Number(arr1) // NaN
Boolean(arr1) // true
String(arr1) // '1,2,3'

const arr2 = [{}]

Number(arr2) // NaN
Boolean(arr2) // true
String(arr2) // '[object Object]'   

// Null and Undefined

const n = null

Number(n) // 0
Boolean(n) // false
String(n) // 'null'

const u = undefined

Number(u) // NaN
Boolean(u) // false
String(u) // 'undefined'

/* ================================================================
 * 1. TYPE COERCION — BASIC CONCEPT
 * ================================================================ */

/*
Type coercion is JavaScript’s automatic conversion of one data type to another during operations.
*/

/* ================================================================
 * 2. ARITHMETIC OPERATION WITH STRINGS
 * ================================================================ */

const num3 = 20;
const num4 = '3';

const result = num3 - num4; 
// '3' is implicitly converted to number 3
// result => 17


/* ================================================================
 * 3. HOW JS PERFORMS TYPE COERCION (INTERNAL STEPS)
 * ================================================================ */

/*
When an operation involves non-primitive values:

1. JS calls valueOf() to get a primitive value.
2. If valueOf() does not return a primitive, JS calls toString().
3. After conversion, type coercion rules are applied.
*/


/* ================================================================
 * 4. SPECIAL CASE: + OPERATOR
 * ================================================================ */

/*
The + operator behaves differently:
- If either operand is a string → string concatenation
- Otherwise → numeric addition
*/

const str2 = 20;
const str3 = '3';

const res1 = str2 + str3;
// 20 + '3' → '20' + '3' → '203'


/* ================================================================
 * 5. OTHER ARITHMETIC OPERATORS
 * ================================================================ */

/*
Operators like -, *, / always convert operands to numbers.
*/

20 - '3'; // 17
20 * '3'; // 60
20 / '3'; // 6.666...


/*
 ONE-LINE SUMMARY:
+ does string concatenation if any operand is a string, all other arithmetic operators force numeric conversion.
*/

/***************************************************************************************************************************************
***************************************************************************************************************************************/

/* ================================================================
 * 1. RELATIONAL OPERATORS (>, <, >=, <=)
 * ================================================================*/

/*
Relational operators compare values and return a boolean (true / false).
*/

/* ================================================================
 * 2. STRING vs STRING COMPARISON
 * ================================================================ */

/*
When BOTH operands are strings, comparison is done lexicographically (dictionary order), based on Unicode values.
*/

'5' > '3';   // true  → '5' comes after '3'
'10' > '2';  // false → '1' < '2' (first character comparison)

/* ================================================================
 * 3. STRING vs NUMBER COMPARISON
 * ================================================================ */

/*
When one operand is a number and the other is a string, the string is converted to a number.
*/

'5' > 3;   // true  → 5 > 3
'2' < 10;  // true  → 2 < 10


/* ================================================================
 * 4. NON-NUMERIC STRING CASE
 * ================================================================ */

/*
If string cannot be converted to number, result becomes false due to NaN.
*/

'abc' > 3;  // false
'abc' < 3;  // false


/* ================================================================
 * 5. NULL & UNDEFINED COMPARISON
 * ================================================================ */

/*
null is converted to 0 in relational comparison undefined becomes NaN
*/

null > 0;    // false
null >= 0;   // true
undefined > 0; // false


/* ================================================================
 * 6. ONE-LINE SUMMARY
 * ================================================================ */

/*
Relational operators compare strings lexicographically, but convert operands to numbers when types differ.
*/


/* ================================================================
 * 1. LOOSE EQUALITY WITH ARRAY & BOOLEAN
 * ================================================================ */

/*
[] == false → true
Reason:
[] → ''  (toString)
'' → 0   (Number conversion)
false → 0
0 == 0 → true
*/

[] == false; // true


/* ================================================================
 * 2. STRING & NUMBER CONVERSION FLOW
 * ================================================================ */

/*
String([]) → ''
Number('') → 0
Number(false) → 0
*/


/* ================================================================
 * 3. TEMPLATE LITERAL COERCION
 * ================================================================ */

/*
Template literals call toString() internally.
*/

`${[1, 2, 3]}`;     // "1,2,3"
`${25}`;            // "25"
`${{ a: 1 }}`;      // "[object Object]"


/* ================================================================
 * 4. UNARY PLUS (+) TYPE COERCION
 * ================================================================ */

/*
Unary + converts values to numbers.
// Function call => alert, console.log will convert the value to string using toString() method.
*/

+'233';        // 233
-'45';         // -45
+'Hello';      // NaN
+true;         // 1
+false;        // 0
+null;         // 0
+undefined;    // NaN
-[];           // 0
-[1,2,3];      // NaN

/* ================================================================
 * 5. OBJECT COERCION IN OPERATIONS
 * ================================================================ */

/*
Objects are converted using:
1. valueOf()
2. if not primitive → toString()
If done any airthmatic operation with object it will first try to convert it to primitive value using valueOf() method if it returns non primitive value then it will use toString() method. valueOf() method is present in object prototype.
*/

const obj2 = { a: 10, b: 20 };
obj2 + 200; // "[object Object]200"

/* ================================================================
 * 6. CUSTOM valueOf & toString
 * ================================================================ */

const obj3 = {
  valueOf() {
    return 50;
  },
  toString() {
    return this;
  }
};

/* ================================================================
 * 7. OBJECT KEYS ARE STRINGS
 * ================================================================ */

/*
Object keys are always strings.
*/

const obj4 = {};
obj4[{}] = 1;

console.log(obj4); 
// { "[object Object]": 1 }


/* ================================================================
 * 8. ONE-LINE SUMMARY
 * ================================================================ */

/*
JS coercion follows: valueOf() → toString() → conversion rules, with special handling for + and template literals.
*/

/* ================================================================
 * 1. VALIDATING FUNCTION PARAMETERS (BEST PRACTICE)
 * ================================================================ */

/*
Always validate and normalize function inputs before using them. Do not assume correct data types.
*/


/* ================================================================
 * 2. TYPE CHECKING (NUMBER EXAMPLE)
 * ================================================================ */

/*
Correct way to check for a valid number:
*/

if (typeof a === 'number' && !Number.isNaN(a)) {
  a.toString();
}

/*
Avoid using isNaN() alone — it coerces values.

isNaN("123");    // false  → "123" → 123
isNaN("hello");  // true   → "hello" → NaN
isNaN("");       // false  → "" → 0  ❌ misleading
isNaN(null);     // false  → null → 0 ❌ misleading
isNaN(true);     // false  → true → 1 ❌ misleading

Number.isNaN("hello"); // false
Number.isNaN(NaN);     // true
Number.isNaN("");      // false
Number.isNaN(null);    // false

Prefer Number.isNaN().
*/


/* ================================================================
 * 3. CHECKING METHOD EXISTENCE SAFELY
 * ================================================================ */

/*
Before calling a method, ensure it exists. Optional chaining is the safest approach.
*/

a?.toString?.();


/* ================================================================
 * 4. NULL / UNDEFINED CHECK (IMPORTANT FIX)
 * ================================================================ */

/*
This condition is WRONG:
if (a || a !== null)

Because:
- null || false → false
- undefined || false → false
- But numbers like 0 fail incorrectly
*/

/*
Correct check:
*/
if (a !== null && a !== undefined && a !== '') {
  console.log("Value exists");
} else {
  console.log("Value is null or undefined");
}


/* ================================================================
 * 5. RECOMMENDED FUNCTION VERSION
 * ================================================================ */

function Test(a) {
  if (a === null || a === undefined) {
    console.log("Invalid value");
    return;
  }

  if (typeof a === "number" && !Number.isNaN(a)) {
    console.log(a.toString());
    return;
  }

  if (typeof a?.toString === "function") {
    console.log(a.toString());
  }
}


/* ================================================================
 * 6. ONE-LINE SUMMARY
 * ================================================================ */

/*
Always validate input types, avoid unsafe truthy checks, and prefer explicit conversions with Number/String/Boolean.
*/

/*************************************************************************************************************************************
*************************************************************************************************************************************/

/* ================================================================
 * 1. EXPLICIT TYPE CONVERSION (TYPE CASTING)
 * ================================================================ */

/*
Type casting means manually converting one data type into another to avoid unexpected implicit coercion 
*/

/* ================================================================
 * 2. SHORT / IMPLICIT CONVERSION METHODS (NOT RECOMMENDED)
 * ================================================================ */

/*
These work, but are NOT very readable and may cause bugs.
*/

+value;        // Converts to number
!!value;       // Converts to boolean
!value;        // Negates boolean
value.toString(); // Converts to string (can throw error if null/undefined)

/*
Examples:
*/
+'23';        // 23
!!'hello';    // true
!0;           // true


/* ================================================================
 * 3. WHY THESE ARE RISKY
 * ================================================================ */

/*
- Hard to read and maintain
- Easy to misuse
- Can behave unexpectedly with null / undefined
*/


/* ================================================================
 * 4. RECOMMENDED EXPLICIT CONVERSION (BEST PRACTICE)
 * ================================================================ */

/*
Always prefer clear and explicit conversion functions.
*/

Number('23');      // 23
Boolean('23');     // true
String(123);       // "123"
parseInt('12px');  // 12
parseFloat('12.5'); // 12.5


/* ================================================================
 * 5. WHEN TO USE parseInt / parseFloat
 * ================================================================ */

/*
Use parseInt / parseFloat when extracting numbers from strings.
*/

parseInt('10px');     // 10
parseFloat('10.75px'); // 10.75


/* ================================================================
 * 6. ONE-LINE SUMMARY
 * ================================================================ */

/*
Prefer explicit conversions (Number, String, Boolean) over shorthand coercion for safer and readable code.
*/

/* ================================================================
 * 1. SCOPE — BASIC CONCEPT
 * ================================================================ */

/*
Scope defines where a variable can be accessed in code. Access depends on how and where the variable is declared.
*/


/* ================================================================
 * 2. FUNCTION/LOCAL SCOPE
 * ================================================================ */

/*
Variables declared inside a function are accessible only within that function.
*/

function test() {
  let x = 1;
  console.log(x); // 1
}

test();
console.log(x); // ❌ ReferenceError


/* ================================================================
 * 3. BLOCK SCOPE (let / const)
 * ================================================================ */

/*
Variables declared with let/const are block-scoped.
*/

{
  let y = 2;
}

console.log(y); // ❌ ReferenceError


/* ================================================================
 * 4. var IS NOT BLOCK-SCOPED
 * ================================================================ */

/*
var ignores block scope and leaks outside.
*/

{
  var x = 1;
}

console.log(x); // 1


/* ================================================================
 * 5. GLOBAL SCOPE
 * ================================================================ */

/*
Variables declared outside functions are global.
*/

var globalVar = "something";

function testGlobal() {
  console.log(globalVar); // accessible
}


/* ================================================================
 * 6. SCRIPT SCOPE
 * ================================================================ */

/*
let/const declared at top-level are script-scoped. They do NOT attach to window object.
*/

let scriptVar = true;

console.log(scriptVar); // true
console.log(window.scriptVar); // undefined


/* ================================================================
 * 7. MODULE SCOPE
 * ================================================================ */

/*
In <script type="module">:
- Each file has its own scope
- Variables are not global
*/


/* ================================================================
 * 8. LEXICAL SCOPE (STATIC SCOPE)
 * ================================================================ */

/*
Lexical scope is determined at compile time.
Inner functions can access outer variables.
*/

function foo() {
  let x = 10;

  return function bar() {
    console.log(x); // 10
  };
}

const outerFun = foo();
outerFun();


/* ================================================================
 * 9. RUNTIME vs LEXICAL SCOPE
 * ================================================================ */

/*
Runtime scopes:
- Global
- Function
- Block
- Script
- Module

Lexical scope:
- Defines variable lookup rules
- Fixed by code structure
*/


/* ================================================================
 * 10. ONE-LINE SUMMARY
 * ================================================================ */

/*
Scope controls variable visibility; let/const respect block scope, var does not, and lexical scope is fixed at compile time.
*/
