// This keyword

/*
For Every function call there is execution context created,
and for every execution context will have its own this.AbortController


Multiple ways to invoke function call:
1. show()
2. Tagged template literal : show``   1 and 2 works in same way
3. new show() using new keyword
4. show.call()
5. show.apply()  // call and apply works similar  way
*/


/*  For Arrow function, this rules are not applicable
Rule 1: If you have invoked your function with new, value of this will always a empty object.

Rule 2: If you have used call or apply to invoke a function, value of this will be the object that
you have passed in call/apply.

Rule 3: If you have invoked your function on a object, then the value of this will be that object itself.

Rule 4: In strict mode, value will be undefined, else without strict mode it will be window object.

*/

function display(){
    console.log(this);
}

display.call()    // windows object
display.call({name:'rahul'})    // {name:'rahul'}


// Example 1 :
const object ={
    message :"Hello world",
    lagMessage(){
        console.log(this.message);
    }
}

object.lagMessage()     // Hello world

setTimeout( object.lagMessage ,100)     // undefined

// Example 2 :
const obj = {
    name :"hello world",
    show: function(){
        console.log('show =>', this.name);      // hello world
    
     function inner(){
        console.log('inner show =>', this.name);    // undefined
    }
    inner()
    }
}

obj.show()

// Example 3 :

var length = 4

function callback(){
    console.log(this.length);       // It will print 3
}

const object1 = {
    length: 5,
    method(){
        console.log(this);      // this will point to current object1
        arguments[0]()          // It will print 3, since arguments length is 3
    }
}

object1.method(callback, 1, 2)      

/* ================================================================
 * 1. this — CORE CONCEPT
 * ================================================================ */

/*
`this` is determined at CALL TIME, not at definition time.
Each function execution context gets its own `this` binding.
*/


/* ================================================================
 * 2. FUNCTION INVOCATION TYPES & this VALUE
 * ================================================================ */

/*
1. Normal call        → show()
2. Tagged template    → show``   (behaves like normal call)
3. Constructor call   → new show()
4. Explicit binding   → show.call(), show.apply()
*/


/* ================================================================
 * 3. this BINDING RULES (NON-ARROW FUNCTIONS)
 * ================================================================ */

/*
Rule 1: new keyword
→ `this` points to a newly created object
*/

function A() {
  console.log(this);
}
new A(); // {}


/*
Rule 2: call / apply
→ `this` is the object passed explicitly
*/

function display() {
  console.log(this);
}

display.call();                 // window (non-strict)
display.call({ name: "rahul" }); // { name: "rahul" }


/*
Rule 3: Method call
→ `this` points to the object before the dot
*/

const object = {
  message: "Hello world",
  logMessage() {
    console.log(this.message);
  }
};

object.logMessage(); // Hello world


/*
Rule 4: Default binding
→ strict mode: undefined
→ non-strict: window
*/

function test() {
  console.log(this);
}
test(); // window (non-strict)


/* ================================================================
 * 4. this LOST IN CALLBACKS
 * ================================================================ */

/*
When a method is passed as a callback, its object binding is LOST.
*/

setTimeout(object.logMessage, 100); // undefined


/* ================================================================
 * 5. NESTED FUNCTION this BEHAVIOR
 * ================================================================ */

/*
Inner normal functions get their own `this`, NOT inherited from outer function.
*/

const obj = {
  name: "hello world",
  show() {
    console.log("show =>", this.name); // hello world

    function inner() {
      console.log("inner =>", this.name); // undefined
    }

    inner();
  }
};

obj.show();


/* ================================================================
 * 6. arguments & this (INTERVIEW-LEVEL)
 * ================================================================ */

/*
arguments is array-like and has its own `length`
*/

var length = 4;

function callback() {
  console.log(this.length);
}

const object1 = {
  length: 5,
  method() {
    arguments[0](); // `this` → arguments object
  }
};

object1.method(callback, 1, 2); // 3


/* ================================================================
 * 7. ARROW FUNCTIONS (IMPORTANT EXCEPTION)
 * ================================================================ */

/*
Arrow functions:
- DO NOT have their own `this`
- Inherit `this` from lexical scope
- call/apply/bind DO NOT change `this`
*/

/* ================================================================
 * 8. ONE-LINE SUMMARY
 * ================================================================ */

/*
`this` depends on how a function is called; arrow functions inherit it, while normal functions bind it dynamically at runtime.
*/

/* ================================================================
 * 1. ARROW FUNCTION — CORE CONCEPT
 * ================================================================ */

/*
Arrow functions DO NOT have their own `this`. They capture `this` lexically from the surrounding scope.
`this` is fixed at creation time, not call time.
*/


/* ================================================================
 * 2. LEXICAL this BEHAVIOR
 * ================================================================ */

function show() {
  const arr = () => {
    console.log(this);
  };
  arr();
}

show();                         // window (non-strict script)
show.call({ name: "Aman" });    // { name: "Aman" }
new show();                     // {} (arrow uses `this` from show())


/* ================================================================
 * 3. STRICT MODE CLARIFICATION (IMPORTANT)
 * ================================================================ */

/*
Top-level `this`:
- Non-module script → window
- Module (type="module") → undefined
- Strict mode does NOT change top-level `this` in scripts
*/

"use strict";
console.log(this); // window (script, not module)

const arr = () => {
  console.log(this); // same as outer `this` → window
};
arr();


/* ================================================================
 * 4. ARROW FUNCTION AS OBJECT METHOD (COMMON PITFALL)
 * ================================================================ */

/*
Arrow functions should NOT be used as object methods
when `this` is expected to be the object.
*/

const obj = {
  myName: "hello world",
  fn: () => {
    console.log(this.myName);
  }
};

obj.fn(); // undefined (lexical `this` → window, no myName)


/* ================================================================
 * 5. call / apply WITH NORMAL FUNCTIONS
 * ================================================================ */

/*
call/apply explicitly set `this` for NORMAL functions.
They do NOT affect arrow functions.
*/

function showcall() {
  console.log(this);
}

showcall.call({ name: "hello world" }, 2, 3); // { name: "hello world" }

function showapply(...args) {
  console.log(args);
}

showapply.apply({ name: "apply here" }, [1, 2, 3]); // [1,2,3]


/* ================================================================
 * 6. bind BEHAVIOR
 * ================================================================ */

/*
bind() permanently sets `this` for a function.
call/apply cannot override a bound `this`.
*/

function show() {
  console.log(this);
}

const fn = show.bind({ k: "rahul" });
fn();                    // { k: "rahul" }
fn.call({ r: "Ankit" }); // { k: "rahul" }


/* ================================================================
 * 7. new OVERRIDES bind (IMPORTANT RULE)
 * ================================================================ */

/*
When a bound function is called with `new`,
the bound `this` is ignored and a new object is created.
*/

new fn(); // show {}  (new wins over bind)


/* ================================================================
 * 8. ONE-LINE SUMMARY
 * ================================================================ */

/*
Arrow functions inherit `this` lexically; call/apply/bind don’t affect them, bind fixes `this` for normal functions, and `new` overrides bind.
*/
