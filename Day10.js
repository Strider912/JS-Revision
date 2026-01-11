/* ================================================================
 * 1. CALLBACK — CORE CONCEPT
 * ================================================================ */

/*
A callback is a function passed as an argument to another function and executed later by that function.
*/

/* ================================================================
 * 2. CALLBACK WITH setTimeout
 * ================================================================ */

/*
setTimeout accepts:
1. Callback function
2. Delay
3. Arguments passed to the callback
*/

const num1 = 2;
const num2 = 4;

function add(num3) {
  console.log(num1 + num2 + num3);
}

setTimeout((cb) => {
  const num3 = 20;
  cb(num3);
}, 2000, add);


/* ================================================================
 * 3. CALLBACK AS FUNCTION PARAMETER
 * ================================================================ */

function show(callbackFn) {
  callbackFn();
}

function printName() {
  console.log("Hello world");
}

show(printName);


/* ================================================================
 * 4. CALLBACKS IN ARRAY METHODS
 * ================================================================ */

/*
forEach executes the callback for each element.
Callback receives: value, index, array
*/

[1, 2, 3, 4, 5].forEach((value) => {
  console.log(value);
});


/* ================================================================
 * 5. CRYPTIC CALLBACK USAGE (IMPORTANT)
 * ================================================================ */

/*
Passing function reference directly:
*/

[1, 2, 3, 4, 5].forEach(console.log);

/*
Actual call:
console.log(value, index, array)
*/


/* ================================================================
 * 6. WHAT HAPPENS INTERNALLY
 * ================================================================ */

/*
forEach implementation (simplified):
*/

function forEach(cb) {
  for (let value of array) {
    cb(value);
  }
}


/* ================================================================
 * 7. ONE-LINE SUMMARY
 * ================================================================ */

/*
Callbacks allow functions to be executed later or repeatedly, commonly used in async code and array iteration.
*/

/* ================================================================
 * 2. SYNCHRONOUS CALLBACKS
 * ================================================================ */

/*
Executed immediately during code execution.
Commonly used in array methods.
*/

[1, 2, 3].forEach(v => console.log(v));

[1, 2, 3].map(v => v * 2);

[1, 2, 3].filter(v => v > 1);

/* ================================================================
 * 3. ASYNCHRONOUS CALLBACKS
 * ================================================================ */

/*
Executed later, after an async operation completes.
*/

setTimeout(() => {
  console.log("Executed later");
}, 1000);


/* ================================================================
 * 4. KEY DIFFERENCE
 * ================================================================ */

/*
Synchronous callback:
- Blocks current execution
- Runs immediately

Asynchronous callback:
- Non-blocking
- Runs after task completion
*/

/*
Callbacks can run synchronously (map, forEach, filter)
or asynchronously (setTimeout, events).
*/

/* ================================================================
 * 1. INVERSION OF CONTROL (IoC) — CORE IDEA
 * ================================================================ */

/*
Inversion of Control means:
You give control of your code (callback) to another function/library, and you TRUST it to call your code correctly.
Easy: You give responsibility to another person but that person forgot or does not do that work.
*/


/* ================================================================
 * 2. WHY CALLBACKS CAUSE IoC
 * ================================================================ */

/*
When using callbacks:
- You do NOT control WHEN the callback runs
- You do NOT control HOW MANY times it runs
- You do NOT control IF it runs at all
*/


/* ================================================================
 * 3. SIMPLE CALLBACK EXAMPLE
 * ================================================================ */

function processOrder(callback) {
  // third-party or internal API
  setTimeout(() => {
    callback(); // you trust this call
  }, 1000);
}

processOrder(() => {
  console.log("Payment done");
});


/* ================================================================
 * 4. IoC PROBLEM SCENARIOS
 * ================================================================ */

/*
What if the function:
- Calls callback twice?
- Never calls callback?
- Calls it with wrong data?
*/

function processOrder(callback) {
  callback();
  callback(); // ❌ called twice (bug)
}


/* ================================================================
 * 5. REAL-WORLD EXAMPLE (EVENTS / APIs)
 * ================================================================ */

/*
You give your logic to an external system.
You lose execution control.
*/

button.addEventListener("click", () => {
  console.log("Clicked");
});

/*
You don't control:
- When user clicks
- How many times callback fires
*/


/* ================================================================
 * 6. WHY THIS IS A PROBLEM
 * ================================================================ */

/*
IoC leads to:
- Unpredictable execution
- Callback hell
- Hard debugging
- Error handling issues
*/


/* ================================================================
 * 7. HOW PROMISES FIX IoC
 * ================================================================ */

/*
Promises return control back to you.
You decide what happens on success/failure.
*/

fetchData()
  .then(data => console.log(data))
  .catch(err => console.error(err));


/* ================================================================
 * 8. ONE-LINE SUMMARY
 * ================================================================ */

/*
Callbacks cause Inversion of Control because you hand over execution control to another function and must trust it blindly.
*/


/*****************************************************************************************************************************************
 CALLBACK
 ****************************************************************************************************************************************/

// Callback

// Callback has 2 phases, 
// 1. Creation phase
// 2. Consumption phase

// Creation phase
function fetchDataWithCallback(callback){
    setTimeout(() => {
        callback(null, "First result")
        callback(null, "Second result")
    }, 1000);
}

// Caller Code or Consumption phase
fetchDataWithCallback((err, data)=> {
    if(err) return console.log('Error => ',err);
    console.log('GOT : ', data);
})


/*****************************************************************************************************************************************
 PROMISE
 ****************************************************************************************************************************************/

// Promise

// Creation phase of callback
function fetchDataWithCallback(callback) {
    setTimeout(() => {
        callback(null, "First result")          // GOT : First result
        callback(null, "Second result")         // GOT : Second result
    }, 1000);
}

// Caller Code or Consumption phase
fetchDataWithCallback((err, data)=> {
    if(err) return console.log('Error => ',err);
    console.log('GOT : ', data);
})

// Creation phase of callback
function fetchDataWithCallbackAdvanced() {
    // promise class will call the function
    const promise = new Promise(function (resolveFun, rejectFun) {
        setTimeout(() => {
            resolveFun("First result")
            resolveFun("Second result")
        }, 1000);
    })

    return promise
}

const promiseObj = fetchDataWithCallbackAdvanced()

// Caller Code or Consumption phase
promiseObj.then(function(data){
    console.log(data);                  //  First result
})

/*

 1. then is the key available on promiseObj object which is a function. Inside then also we need to pass callback function
 2. callback function inside then() will be called, when resolved function has finished its execution and data returned by resolved function 
 will be available to then function

Promise: A promise is an object representing future value -
- Will resolve or reject only once
- Once settled, can;t be changed

Advantages: 
Better Control Flow (Fixes Inversion of Control)
Chaining & Composition
Built in Error Propagation
Async/await Readability
Standard Behavior

*/


// If promise is in pending state like calling api using fetch.
//  then apply below safe guard method


const fetchWrapper = new Promise(function(resolve, reject){
    fetch("url").then(res=> res.json).then(data => resolve(data)).catch(err=>{
        console.log('Error is there');
        reject("API call error")
    })

    // If fetch promise is in pending state, so settimeout will reject after 5 second 
    setTimeout(() => {
        reject("No Response from fetch API, Promise is in pending state, so rejecting..")
    }, 5000);
})

fetchWrapper.then((data)=>{
    console.log(data);
}).catch((error) =>{
    console.log(error);
})


/*****************************************************************************************************************************************
 ****************************************************************************************************************************************/

/* =================================================================================================================
 * CALLBACK vs PROMISE — EXPERT NOTES (CORRECTED & CONCISE)
 * ================================================================================================================= */


/* ================================================================
 * 1. CALLBACK — CORE IDEA
 * ================================================================ */

/*
A callback is a function passed to another function
to be executed later (often async).
Callbacks have TWO phases:
1. Creation phase (API defines when/how callback is called)
2. Consumption phase (caller provides the callback)
*/


/* ================================================================
 * 2. CALLBACK — PROBLEMATIC BEHAVIOR
 * ================================================================ */

function fetchDataWithCallback(callback) {
  setTimeout(() => {
    callback(null, "First result");
    callback(null, "Second result"); // ❌ called multiple times
  }, 1000);
}

fetchDataWithCallback((err, data) => {
  if (err) return console.log(err);
  console.log("GOT:", data);
});

/*
Problems:
- Callback can be called multiple times
- No guarantee of single completion
- Caller has NO control (Inversion of Control)
*/


/* ================================================================
 * 3. PROMISE — CORE IDEA
 * ================================================================ */

/*
A Promise represents a future value.
It has THREE states:
- pending
- fulfilled
- rejected
*/


/* ================================================================
 * 4. PROMISE — CREATION PHASE
 * ================================================================ */

function fetchDataWithPromise() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("First result");
      resolve("Second result"); // ❌ ignored
    }, 1000);
  });
}

/* ================================================================
 * 5. PROMISE — CONSUMPTION PHASE
 * ================================================================ */

fetchDataWithPromise().then(data => {
  console.log(data); // "First result"
});

/*
Promise guarantees:
- resolve / reject runs ONLY ONCE
- Extra calls are ignored
*/


/* ================================================================
 * 6. WHY PROMISES FIX CALLBACK PROBLEMS
 * ================================================================ */

/*
✔ No multiple execution
✔ Caller controls flow using then / catch
✔ Predictable behavior
✔ Built-in error propagation
*/


/* ================================================================
 * 7. PROMISE SAFEGUARD (TIMEOUT WRAPPER)
 * ================================================================ */

/*
Handling APIs that may stay pending forever.
*/

const fetchWrapper = new Promise((resolve, reject) => {
  fetch("url")
    .then(res => res.json())
    .then(data => resolve(data))
    .catch(() => reject("API error"));

  // Timeout safeguard
  setTimeout(() => {
    reject("Timeout: No response from API");
  }, 5000);
});

fetchWrapper
  .then(data => console.log(data))
  .catch(err => console.log(err));


/* ================================================================
 * 8. CALLBACK vs PROMISE (SUMMARY)
 * ================================================================ */

/*
Callback:
- No control over execution
- Can run multiple times
- Error handling is manual

Promise:
- Executes once
- Controlled flow
- Chainable
- Better readability
- async/await support
*/


/* ================================================================
 * 9. ONE-LINE SUMMARY
 * ================================================================ */

/*
Promises solve callback issues by enforcing single completion, restoring control flow, and providing predictable async behavior.
*/

/*
Async:
A piece of code that doesn't give us the result right away, but it take some time

We can use callbacks for async code but there is inversion of code problem there.
*/

// Finally

const finallyPromise = new Promise(function(resolve, reject){
  resolve(1)
  // reject(1)
})


finallyPromise.then((data)=>{
  console.log({data});
}).catch(err=>{
  console.log({err});
}).finally(()=>{
  console.log('Finally block executed ==');
})

// Finally callback always executed, if the promise is rejected and resolved.


// Promise Chaining

const promiseChaining = new Promise(function(resolve, reject){
  resolve('data is here')
})

const result = promiseChaining.then()       // result promise object
const result1 = promiseChaining.catch()     // result promise object
const result2 = promiseChaining.finally()   // result promise object

const result3 = promiseChaining.then().then() // It wil also return promise object

console.log({result});    // result promise object

// Example 1: Do not return anything inside  first then function

const p1 = promiseChaining.then((data)=>{
    console.log(data);      //    data is here
}).then((newData)=>{
  console.log(newData);     //    undefined
})

// Example 2: Return from first then function

const p2 = promiseChaining.then((data)=>{
    console.log(data);      //    data is here
    return 'Hello world'
}).then((newData)=>{
  console.log(newData);     //    Hello world
})

// Example 1: No callback function in firs then function

const p3 = promiseChaining.then().then((newData)=>{
  console.log(newData);     //    data is here
})

/***********************************************************************************************************************************
 * ********************************************************************************************************************************/

/* ================================================================
 * 1. Promise.finally() — CORE BEHAVIOR
 * ================================================================ */

/*
finally() is always executed,
regardless of promise being resolved or rejected.
*/

const finallyPromise1 = new Promise((resolve, reject) => {
  resolve(1); // or reject(1)
});

finallyPromise1
  .then(data => console.log({ data }))
  .catch(err => console.log({ err }))
  .finally(() => {
    console.log("Finally block executed");
  });


/* ================================================================
 * 2. IMPORTANT RULES ABOUT finally()
 * ================================================================ */

/*
- finally() does NOT receive resolved/rejected value
- It does NOT modify the value flowing through the chain
- It returns a NEW promise
*/


/* ================================================================
 * 3. PROMISE CHAINING — RETURN VALUE RULE
 * ================================================================ */

/*
Every then(), catch(), finally():
→ returns a NEW promise
*/

const promiseChaining = Promise.resolve("data is here");

const r1 = promiseChaining.then();
const r2 = promiseChaining.catch();
const r3 = promiseChaining.finally();

promiseChaining.then().then(); // still returns a promise


/* ================================================================
 * 4. then() WITHOUT RETURN
 * ================================================================ */

/*
If a then() callback does NOT return anything,
undefined is passed to the next then().
*/

promiseChaining
  .then(data => {
    console.log(data); // data is here
  })
  .then(newData => {
    console.log(newData); // undefined
  });


/* ================================================================
 * 5. then() WITH RETURN
 * ================================================================ */

/*
Returned value becomes input for the next then().
*/

promiseChaining
  .then(data => {
    console.log(data); // data is here
    return "Hello world";
  })
  .then(newData => {
    console.log(newData); // Hello world
  });


/* ================================================================
 * 6. then() WITHOUT CALLBACK
 * ================================================================ */

/*
then() without arguments passes the value forward unchanged.
*/

promiseChaining
  .then()
  .then(newData => {
    console.log(newData); // data is here
  });


/* ================================================================
 * 7. ONE-LINE SUMMARY
 * ================================================================ */

/*
finally() always runs, then() passes return values forward, and every promise method returns a new promise enabling chaining.
*/
