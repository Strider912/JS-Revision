/* ================================================================
 * 1. SCRIPT EXECUTION MODES IN BROWSER
 * ================================================================ */

/*
JavaScript execution is NOT only sequential.
Browser provides multiple loading & execution strategies.
*/

/* ================================================================
 * 2. NORMAL SCRIPT (DEFAULT)
 * ================================================================ */
/*

<script src="app.js"></script>

- HTML parsing pauses
- Script is downloaded
- Script executes immediately
- Then HTML parsing resumes
*/

Execution: Blocking + Sequential

/* ================================================================
 * 3. async ATTRIBUTE
 * ================================================================ */

/*
<script async src="app.js"></script>

- Script downloads in parallel
- Executes immediately after download
- Execution order is NOT guaranteed
- HTML parsing pauses only during execution
*/

Execution: Non-blocking + Non-deterministic order

Best for:
- Analytics
- Independent scripts


/* ================================================================
 * 4. defer ATTRIBUTE
 * ================================================================ */

/*
<script defer src="app.js"></script>

- Script downloads in parallel
- Executes AFTER HTML parsing completes
- Execution order IS guaranteed (top to bottom)
*/

Execution: Non-blocking + Ordered

Best for:
- App logic
- DOM-dependent scripts


/* ================================================================
 * 5. type="module"
 * ================================================================ */

/*
<script type="module" src="app.js"></script>

- Deferred by default
- Executes after HTML parsing
- Has its own module scope
- Supports import/export
- Executes once (strict mode)
*/

Execution: Deferred + Scoped + Dependency-aware


/* ================================================================
 * 6. DYNAMIC SCRIPT LOADING
 * ================================================================ */

/*
Scripts can be loaded at runtime.
*/

const script = document.createElement("script");
script.src = "dynamic.js";
document.body.appendChild(script);

/*
- Execution happens when loaded
- Order depends on load timing
*/


/* ================================================================
 * 7. EVENT-DRIVEN EXECUTION
 * ================================================================ */

/*
Execution triggered by events, not script order.
*/

button.addEventListener("click", () => {
  console.log("Executed on click");
});


/* ================================================================
 * 8. MICROTASK vs MACROTASK EXECUTION
 * ================================================================ */

/*
Event Loop controls async execution order.
*/

Promise.resolve().then(() => console.log("microtask"));
setTimeout(() => console.log("macrotask"), 0);

/*
Microtasks run BEFORE macrotasks.
*/


/* ================================================================
 * 9. WORKERS (PARALLEL EXECUTION)
 * ================================================================ */

/*
Web Workers run JS in a separate thread.
No access to DOM.
*/

const worker = new Worker("worker.js");

/* ================================================================
 * 10. ONE-LINE SUMMARY
 * ================================================================ */

/*
JS execution can be blocking, deferred, async, event-driven, task-queued, or parallel via workers — not just sequential.
*/

/************************************************************************************************************************************
*************************************************************************************************************************************/

/* =================================================================
 * 2. GLOBAL EXECUTION CONTEXT —
 * ================================================================= */

/*
Statement to clarify:
There is ONE Global Execution Context per page (non-module scripts). Multiple <script> files share the SAME global scope.
✔ This statement is STILL CORRECT.
*/

/* ================================================================
 * 4. WHY app.js STILL RUNS IF main.js HAS AN ERROR
 * ================================================================ */

/*
Reason:
JavaScript executes <script> files SEQUENTIALLY.

Each <script> tag:
- Is parsed
- Then executed independently
- Errors do NOT crash the entire JS runtime
*/

// <script src="main.js"></script>
// <script src="app.js"></script>


/* ================================================================
 * 5. WHAT HAPPENS INTERNALLY
 * ================================================================ */

/*
Step-by-step execution:

1. Browser loads main.js
2. Executes main.js line by line
3. If a RUNTIME error occurs:
   - Execution of main.js STOPS
   - Error is logged to console
4. Browser moves to next <script>
5. app.js executes normally
*/


/* ================================================================
 * 6. IMPORTANT DISTINCTION: SCOPE vs EXECUTION FLOW
 * ================================================================ */

/*
Same Global Execution Context ≠ Single execution flow.

- Global scope is shared
- Execution is isolated per script block
*/


/* ================================================================
 * 7. EXAMPLE
 * ================================================================ */

// main.js
var a = 10;
console.log(a);
throw new Error("Crash main.js");
var b = 20; // ❌ never runs

// app.js
console.log("App still runs"); // ✅ executes


/* ================================================================
 * 8. WHEN app.js WOULD FAIL
 * ================================================================ */

/*
app.js will fail ONLY if:
- It depends on variables/functions from main.js
- Those declarations never executed due to the error
*/

console.log(b); // ❌ ReferenceError (b was never created)


/* ================================================================
 * 9. MODULE SCRIPT EXCEPTION (IMPORTANT)
 * ================================================================ */

/*
In <script type="module">:
- Each file has its own module scope
- Still, runtime errors in one module do NOT crash others
*/


/* ================================================================
 * 10. FINAL CORRECT UNDERSTANDING
 * ================================================================ */

/*
✔ One Global Execution Context exists
✔ Scripts execute sequentially
✔ Runtime errors stop ONLY the current script
✔ Browser continues executing remaining scripts
*/

/* ================================================================
 * 11. ONE-LINE SUMMARY
 * ================================================================ */

/*
A runtime error halts only the current script’s execution, not the shared global execution context or subsequent scripts.
*/

/*************************************************************************************************************************************
*************************************************************************************************************************************/

/* ================================================================
 * 3. EXECUTION CONTEXT — CORE CONCEPT
 * ================================================================ */

/*
An Execution Context is the environment in which JavaScript code runs. It manages variables, functions, and the scope chain.
*/

/* ================================================================
 * 2. TYPES OF EXECUTION CONTEXTS
 * ================================================================ */

/*
1. Global Execution Context (GEC)
2. Function Execution Context (FEC)
3. Eval Execution Context (rare, discouraged)
*/


/* ================================================================
 * 3. GLOBAL EXECUTION CONTEXT (IMPORTANT CORRECTION)
 * ================================================================ */

/*
There is ONLY ONE Global Execution Context per JS runtime (per page). Multiple <script> files DO NOT create separate global contexts.
*/

//<script src="main.js"></script>
//<script src="app.js"></script>

/*
Both scripts:
- Share the SAME Global Execution Context
- Execute sequentially in the same global scope
*/


/* ================================================================
 * 4. FUNCTION EXECUTION CONTEXT
 * ================================================================ */

/*
Every time a function is called, a NEW execution context is created. It is destroyed after the function finishes execution
(unless preserved by closures).
*/


/* ================================================================
 * 5. EXECUTION CONTEXT LIFECYCLE
 * ================================================================ */

/*
Each execution context has two phases:

1. Creation Phase
   - Memory allocation
   - Hoisting happens

2. Execution Phase
   - Code is executed line by line
*/


/* ================================================================
 * 6. CLOSURES & MEMORY BEHAVIOR
 * ================================================================ */

/*
A closure is created when a function remembers variables from its lexical scope even after the outer function has finished.
*/

function outer() {
  let x = 10;
  return function inner() {
    console.log(x);
  };
}

const fn = outer(); // closure created
fn(); // 10

// ✔ Closures only keep REFERENCED variables alive. Ex: const x = outer(). x will be alive.
// Unreferenced variables ARE still garbage collected.


/* ================================================================
 * 7. GARBAGE COLLECTION (IMPORTANT CLARIFICATION)
 * ================================================================ */

/*
Garbage Collection removes memory that is no longer reachable.

Variables are NOT garbage collected if:
- They are still referenced by a closure
- They are reachable from active execution contexts
*/

/*
Once all references are gone, the memory becomes eligible for garbage collection.
*/


/* ================================================================
 * 8. COMMON MISCONCEPTION (CORRECTED)
 * ================================================================ */

/*
❌ "Closures prevent garbage collection"
✔ Closures only keep REFERENCED variables alive.
Unreferenced variables ARE still garbage collected.
*/


/* ================================================================
 * 9. ONE-LINE SUMMARY
 * ================================================================ */

/*
JS has one global execution context, functions create their own contexts, and closures preserve only the variables they reference from garbage collection.
*/


/* ================================================================
 * EXECUTION CONTEXT & CLOSURE — SHORT SUMMARY
 * ================================================================ */

/*
1. Every function call creates its OWN execution context.
   Blocks (if / for / {}) do NOT create execution contexts.
*/


/*
2. Normally, when a function finishes execution:
   - Its execution context is removed from the call stack
   - Local variables become eligible for garbage collection
*/


/*
3. BUT closures change this behavior.
   If an inner function references variables of the outer function, those variables are preserved in memory.
*/


/* ================================================================
 * CLOSURE EXAMPLE EXPLAINED
 * ================================================================ */

function test() {
  let t = 1;

  return function () {
    console.log(t);
  };
}

/*
Case 1:
test();

- No returned function is stored
- Execution context of test() is destroyed
- Variable `t` is garbage collected
*/

/*
Case 2:
let x = test();

- Returned function is stored in `x`
- Inner function still references `t`
- Execution context of test() is PRESERVED
- This is called a CLOSURE
*/

/* ================================================================
 * KEY TAKEAWAY
 * ================================================================ */

/*
Closures keep an outer function’s variables alive, even after the function has finished execution.
*/

/* Closure is an property that exist on function that only gets created inner function access the variable defined in the outer enclosing function. 

Global function do not create closure.
Closure are formed by function who are inside another function only

*/


function show(){
    let myName = "Aman"

    function printMyName(){
        console.log(myName);
    }

    function test(){
        eval('console.log(myName)')
    }

    console.dir(test);          // printMyName.prototype will have Scopes Array, in which closure will formed with myName
    console.dir(printMyName);   // printMyName.prototype will have Scopes Array, in which closure will formed with myName
    printMyName()
}

show()

// If we remove let myName = "Aman" this expression, then test and printMyName function will not have closures in their prototype

/* ================================================================
 * 1. CLOSURE — CORRECT DEFINITION
 * ================================================================ */

/*
A closure is formed when a function remembers and accesses variables from its lexical (outer) scope, even after that outer function has finished execution.
*/


/* ================================================================
 * 2. WHEN A CLOSURE IS CREATED
 * ================================================================ */

/*
A closure is created ONLY IF:
- An inner function accesses a variable from its outer function
- And that inner function is used (returned, stored, or referenced)
*/


/* ================================================================
 * 3. IMPORTANT CORRECTIONS (EXPERT NOTES)
 * ================================================================ */

/*
❌ Closure is NOT a property on the function or its prototype
✔ Closure is maintained via the internal [[Environment]] / scope chain

❌ Closures are not visible in JavaScript code
✔ They are observable in DevTools via [[Scopes]] (debug-only view)
*/


/* ================================================================
 * 4. CLOSURE EXAMPLE
 * ================================================================ */

function show() {
  let myName = "Aman";

  function printMyName() {
    console.log(myName); // closure over myName
  }

  function test() {
    eval("console.log(myName)"); // also creates closure
  }

  console.dir(printMyName);
  console.dir(test);

  printMyName();
}

show();

/* ================================================================
 * 5. WHY BOTH FUNCTIONS FORM CLOSURES
 * ================================================================ */

/*
Both `printMyName` and `test`:
- Access `myName`
- Therefore capture it in their lexical environment
*/


/* ================================================================
 * 6. WHAT HAPPENS IF myName IS REMOVED
 * ================================================================ */

/*
If `myName` does not exist in outer scope:
- No variable is captured
- No closure is formed
*/

/* ================================================================
 * 7. GLOBAL FUNCTIONS & CLOSURES (CLARIFICATION)
 * ================================================================ */

/*
Global functions DO NOT form closures over local variables, but they CAN access global variables.

Closures specifically refer to capturing NON-global, lexically scoped variables.
*/

/* ================================================================
 * 8. ONE-LINE SUMMARY
 * ================================================================ */

/*
A closure exists when an inner function captures outer-scope variable via its lexical environment, keeping them alive in memory.
*/



