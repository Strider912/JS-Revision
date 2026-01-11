
/*
---------------------------------------------------------------
1. CLASS FIELDS (flag, address)
---------------------------------------------------------------

- Defined directly inside the class body
- Automatically added to each instance
- Initialized BEFORE the constructor runs
- Do not require assignment inside constructor

Class fields define default properties for every object, while constructor properties assign dynamic values passed during object creation.
*/

class User {
  flag = true;
  address = "Test Address";

  constructor(parameter1, parameter2) {
    this.name = parameter1;
    this.age = parameter2;
  }
}

/*
1. Class fields are initialized
2. Constructor is executed
3. Properties inside constructor are assigned

2. KEY DIFFERENCES
----------------------------------------------------------------------------

| Feature               | Class Fields             | Constructor Properties |
|----------------------|--------------------------|------------------------|
| Where defined         | Inside class body        | Inside constructor     |
| Initialization time   | Before constructor runs  | During constructor     |
| Uses parameters       | ❌ No                    | ✅ Yes                |
| Purpose               | Default/static values    | Dynamic per instance   |
| Memory location       | Instance                 | Instance               |

*/

/*****************************************************************************************************************************************
 ****************************************************************************************************************************************/

/******************************************************************
 * EXPLANATION: this.name, this.age vs parameter1, parameter2
 ******************************************************************/

/*
Consider the following class:
*/

class User {
  constructor(parameter1, parameter2) {
    this.name = parameter1;
    this.age = parameter2;
  }
}

/*
---------------------------------------------------------------
1. WHAT ARE `parameter1` and `parameter2`?
---------------------------------------------------------------

- `parameter1` and `parameter2` are FUNCTION PARAMETERS.
- They are local variables that exist ONLY inside the constructor.
- They receive values when the class is instantiated using `new`.

Example:
*/

const user1 = new User("Aman", 25);

/*
Here:
parameter1 = "Aman"
parameter2 = 25
*/

/*
---------------------------------------------------------------
2. WHAT IS `this.name` AND `this.age`?
---------------------------------------------------------------

- `this` refers to the current object being created.
- `this.name` and `this.age` are PROPERTIES of that object.
- These properties persist on the object after construction.

Internally:
this === user1
so,

this.name → user1.name
this.age  → user1.age
*/

/*
---------------------------------------------------------------
3. WHY DO WE ASSIGN VALUES THIS WAY?
---------------------------------------------------------------

We do this:
this.name = parameter1;
this.age  = parameter2;

Because:
- parameter1 & parameter2 are temporary values
- this.name & this.age store values permanently on the object
*/

/*
---------------------------------------------------------------
4. MEMORY VIEW (CONCEPTUAL)
---------------------------------------------------------------

user1 = {
  name: "Aman",
  age: 25
}
*/

/*
---------------------------------------------------------------
5. IMPORTANT DIFFERENCE
---------------------------------------------------------------

parameter1 / parameter2:
- Exist only during constructor execution
- Are local variables
- Destroyed after constructor finishes

this.name / this.age:
- Stored on the object
- Accessible throughout object lifetime
*/

/*
---------------------------------------------------------------
6. ONE-LINE SUMMARY
---------------------------------------------------------------

Constructor parameters receive values,
while `this.property` stores those values on the object itself.
*/

/*****************************************************************************************************************************************
 ****************************************************************************************************************************************/

/******************************************************************
 * WHY DO WE NEED CONSTRUCTORS IN JAVASCRIPT?
 * PURPOSE OF CONSTRUCTOR IN A CLASS
 ******************************************************************/

/*
A constructor is a special method in a class that is:
- Automatically executed when an object is created
- Used to initialize (set up) object properties
*/

/* ================================================================
 * 1. WHY CONSTRUCTORS ARE NEEDED
 * ================================================================ */

/*
Without a constructor, every object would need to be manually
configured after creation.

Constructors allow:
- Initialization of object properties
- Dynamic data assignment
- Cleaner and reusable object creation
*/

/* ================================================================
 * 2. BASIC EXAMPLE
 * ================================================================ */

class User {
  constructor(parameter1, parameter2) {
    this.name = parameter1;
    this.age = parameter2;
  }
}

// Node this.name and this.age is seperate and constructor

const user1 = new User("Aman", 25);
const user2 = new User("Rahul", 30);

/*
Each object gets its own values:
user1 → { name: "Aman", age: 25 }
user2 → { name: "Rahul", age: 30 }
*/

/* ================================================================
 * 3. WHAT HAPPENS INTERNALLY WHEN `new` IS USED
 * ================================================================ */

/*
When you do:
const obj = new ClassName()

JavaScript internally does:
1. Creates a new empty object {}
2. Links it to ClassName.prototype
3. Calls the constructor with `this` pointing to the new object
4. Returns the newly created object
*/

/* ================================================================
 * 4. WHY CONSTRUCTOR IS IMPORTANT
 * ================================================================ */

/*
- Initializes instance-specific data
- Avoids repeating code
- Ensures consistent object creation
- Helps enforce required parameters
*/

/* ================================================================
 * 5. CLASS WITHOUT CONSTRUCTOR
 * ================================================================ */

class Sample {
  greet() {
    console.log("Hello");
  }
}

const s = new Sample();

/*
Even without a constructor:
- JavaScript provides a default constructor internally
- Equivalent to: constructor() {}
*/

/* ================================================================
 * 6. CONSTRUCTOR VS NORMAL METHOD
 * ================================================================ */

/*
Constructor:
- Special name: constructor
- Called automatically when object is created
- Used for setup logic

Normal Method:
- Called manually
- Used for behavior
*/

/* ================================================================
 * 7. ONE-LINE SUMMARY
 * ================================================================ */

/*
A constructor initializes object state and runs automatically
when a new instance of a class is created.
*/

/*****************************************************************************************************************************************
 ****************************************************************************************************************************************/

/******************************************************************
 * CLASS EXPRESSION IN JAVASCRIPT
 ******************************************************************/

/*
A class expression is a way to define a class as part of an expression,
similar to function expressions.

Classes created this way can be:
- Anonymous
- Named (for internal reference only)
*/

const x = class MyClass {};

/*
Here:
- `x` holds the class definition
- `MyClass` is the internal name (only accessible inside the class)
*/

/*
Creating an instance of the class
*/

const newObj = new x();

/*
EXPLANATION:
- `x` references the class definition
- `new x()` creates an object (instance) of that class
- `MyClass` is NOT accessible outside the class body
*/

// Example:
console.log(newObj); // Instance of class x

/*

IMPORTANT NOTES:
- Class expressions are NOT hoisted
- They are evaluated at runtime
- Useful for dynamic or conditional class creation
- Similar to function expressions but for classes
*/

/*
ONE-LINE SUMMARY:
A class expression allows you to define a class dynamically and assign it to a variable, 
with the class name (if provided) scoped only inside the class body.
Classes is not accessbile before initialization as like let and const variable
*/

/*****************************************************************************************************************************************
 ****************************************************************************************************************************************/

/******************************************************************
 * CLASS INSTANCE, PROPERTIES & PROTOTYPE IN JAVASCRIPT
 ******************************************************************/

/*
A class in JavaScript is syntactic sugar over constructor functions
and prototypes.
*/

class MyClass {
  age = 100;
  name = 'aman';

  printUserName() {
    console.log('User name is Aman');
  }
}

const obj1 = new MyClass();

obj1.printUserName();
console.log({ obj1 });

/*
OUTPUT:
User name is Aman
{ age: 100, name: 'aman' }
*/

/* ================================================================
 * INTERNAL STRUCTURE EXPLANATION
 * ================================================================ */

/*
When an object is created using `new MyClass()`:

1. Properties defined directly inside the class (age, name)
   → are added directly to the instance (obj1)

2. Methods defined in the class (printUserName)
   → are NOT copied to each object
   → they live on the prototype (MyClass.prototype)
*/

/*
So internally it looks like this:
*/

obj1 = {
  age: 100,
  name: 'aman',
  __proto__: {
    printUserName: function () {
      console.log('User name is Aman');
    }
  }
};

/*
IMPORTANT:
- Methods are shared across all instances
- This saves memory
- This is why classes are efficient
*/

/* ================================================================
 * WHY METHODS ARE NOT DIRECTLY ON THE OBJECT
 * ================================================================ */

/*
If methods were stored on every instance:
- Each object would get its own copy
- Memory usage would increase

JavaScript avoids this by using prototype chaining.
*/

/* ================================================================
 * ONE-LINE SUMMARY
 * ================================================================ */

/*
Instance properties live on the object itself,
while methods live on the class prototype and are shared.
*/

/*****************************************************************************************************************************************
 ****************************************************************************************************************************************/

/******************************************************************
 * OBJECT METHODS vs CLASS METHODS (PROTOTYPE BEHAVIOR)
 ******************************************************************/

/*
You already know:
- Class methods live on the prototype
- Instance properties live on the object itself

Now let’s understand what happens with OBJECT methods.
*/

/* ================================================================
 * 1. OBJECT LITERAL METHODS
 * ================================================================ */

const user = {
  name: "Aman",
  age: 25,
  greet() {
    console.log("Hello Aman");
  }
};

/*
Here:
- `greet` is a method of the object `user`
- It is stored DIRECTLY on the object
- NOT on a prototype created by you
*/

console.log(user);

/*
Internally it looks like:

user = {
  name: "Aman",
  age: 25,
  greet: function () {
    console.log("Hello Aman");
  }
}

So:
- Each object literal gets its own copy of the method
*/

/* ================================================================
 * 2. OBJECT CREATED VIA CONSTRUCTOR FUNCTION
 * ================================================================ */

function Person(name) {
  this.name = name;

  this.sayHello = function () {
    console.log("Hello", this.name);
  };
}

const p1 = new Person("Aman");
const p2 = new Person("Raj");

/*
Here:
- sayHello is created AGAIN for every instance
- Memory inefficient
*/

p1.sayHello === p2.sayHello; // false

/* ================================================================
 * 3. OBJECT METHOD USING PROTOTYPE (OPTIMAL WAY)
 * ================================================================ */

function Person2(name) {
  this.name = name;
}

Person2.prototype.sayHello = function () {
  console.log("Hello", this.name);
};

const p3 = new Person2("Aman");
const p4 = new Person2("Raj");

/*
Here:
- sayHello exists only ONCE in memory
- Shared across all instances
*/

p3.sayHello === p4.sayHello; // true

/* ================================================================
 * 4. CLASS SYNTAX (SAME AS PROTOTYPE UNDER THE HOOD)
 * ================================================================ */

class User {
  constructor(name) {
    this.name = name;
  }

  greet() {
    console.log("Hello", this.name);
  }
}

const u1 = new User("Aman");
const u2 = new User("Raj");

/*
Internally this is equivalent to:

User.prototype.greet = function () {
  console.log("Hello", this.name);
};
*/

u1.greet === u2.greet; // true

/* ================================================================
 * 5. SUMMARY TABLE
 * ================================================================ */

/*
| Type                         | Stored Where?         | Memory Efficient |
|------------------------------|-----------------------|------------------|
| Object literal method        | On each object        | ❌ No            |
| Constructor method           | On each instance      | ❌ No            |
| Prototype method             | On prototype          | ✅ Yes           |
| Class method                 | On prototype          | ✅ Yes           |
*/

/* ================================================================
 * ONE-LINE SUMMARY
 * ================================================================ */

/*
Object literal methods are stored on the object itself,
while class methods live on the prototype and are shared by all instances.
*/

/*****************************************************************************************************************************************
 ****************************************************************************************************************************************/

/******************************************************************
 * INHERITANCE IN JAVASCRIPT (PARENT & CHILD CLASSES)
 ******************************************************************/

/*
This example demonstrates:
- Class inheritance using `extends`
- How parent and child constructors work
- Why `super()` is required
*/

/* ================================================================
 * PARENT CLASS
 * ================================================================ */

class Parent {
  parentName = "Aman";

  constructor(infoFromChild) {
    console.log(infoFromChild);
    console.log("Parent constructor called");
  }

  printParentName() {
    console.log(`Parent name is Demo`);
  }
}

/* ================================================================
 * CHILD CLASS
 * ================================================================ */

class Child extends Parent {
  constructor() {
    super("data from child class"); // must be called first
    console.log("Child constructor called");
  }
}

/* ================================================================
 * OBJECT CREATION
 * ================================================================ */

const childObj = new Child();

console.log(childObj.parentName);      // Aman
childObj.printParentName();            // Parent name is Demo

/* ================================================================
 * EXECUTION FLOW (IMPORTANT)
 * ================================================================ */

/*
1. Child constructor is called
2. super() is executed FIRST
3. Parent constructor runs
4. Control returns to Child constructor
5. Child constructor completes execution
*/

/*
Console Output:
data from child class
Parent constructor called
Child constructor called
Aman
Parent name is Demo
*/

/* ================================================================
 * IMPORTANT RULES
 * ================================================================ */

/*
1. When a class extends another class, the parent constructor
   MUST be called using `super()` before using `this`.

2. If `super()` is not called:
   → JavaScript throws an error.

3. `super()` is used to:
   - Call the parent constructor
   - Access parent properties and methods
*/

/* ================================================================
 * ONE-LINE SUMMARY
 * ================================================================ */

/*
In inheritance, the parent constructor always runs before the child,
and `super()` is mandatory to initialize the parent class.

Note : We can access parent class methods using super(), but parent class properties cannot be accessed directly through super
*/

/*****************************************************************************************************************************************
 ****************************************************************************************************************************************/

// Private field in class

class User {
  #name = "Aman"; // private field, with #, we can make field private

  showChildName() {
    console.log(this.#name); // accessing private field inside class is allowed, but outside class it will give error
  }

  #showPrivateMethod() {
    console.log("This is private method");
  }
}

const childObj2 = new User();
console.log(childObj2.name); // undefined
console.log(childObj2.#name); // Syntax Error: Private field '#name' must be declared in an enclosing class
console.log(childObj2.showChildName()); // Aman
console.log(childObj2.#showPrivateMethod()); // Syntax Error: Private field '#showPrivateMethod' must be declared in an enclosing class

// Same applies for method and class fields as well


childObj2.age = 89

console.log(childObj2.age); // 89, Unlike objects, we can add new properties to class instances from outside the class
// But these properties will not be part of class structure and will not be available in all instances of class


/*****************************************************************************************************************************************
 ****************************************************************************************************************************************/

/******************************************************************
 * STATIC METHODS & STATIC PROPERTIES IN JAVASCRIPT
 ******************************************************************/

/*
- Static properties and methods belong to the CLASS itself
- They are NOT accessible through class instances
- Accessed directly using the class name
- Static members are properties or methods that belong to the CLASS itself,
  not to the instances (objects) created from that class.
- They are accessed using the class name, not using an object.
*/

class User {
  static staticField = "I am static field";
  static age = 50;

  static staticMethod() {
    console.log("I am static method", User.age);
  }
}

/*
USAGE
*/

const user21 = new User();

/* ❌ Not accessible through instance */
console.log(user21.age);        // undefined
user21.staticMethod();          // ❌ TypeError

console.log(User.staticField);     // I am static field
User.staticMethod();               // I am static method 50

/*
IMPORTANT POINTS
- Static members belong to the class, not the object
- Cannot access static members using `this` inside instance methods
- Cannot create a static class (only static members are allowed)
*/

/*
ONE-LINE SUMMARY:
Static properties and methods belong to the class itself,
not to its instances, and are accessed using the class name.
*/

/*****************************************************************************************************************************************
 ****************************************************************************************************************************************/

// Method Overriding Example:

class Parent {
  greet() {
    console.log("Hello from Parent");
  }
}

class Child extends Parent {
  greet() {
    console.log("Hello from Child");
  }
}

const childInstance = new Child();
childInstance.greet(); // Output: Hello from Child

/*
Here, the greet method in the Child class overrides the greet method in the Parent class. When we call greet on an instance of Child, 
it uses the Child's version of the method.
Note : In Js overloading is not possible. If we define two methods with same name in a class, then the last one will override the previous one.
*/

/*****************************************************************************************************************************************
 ****************************************************************************************************************************************/

/******************************************************************
 * `this` KEYWORD BEHAVIOR IN JAVASCRIPT (CLASS CONTEXT)
 ******************************************************************/

/*
`this` refers to the object that is calling the function.
Its value depends on HOW the function is invoked, not where it is defined.
*/

class User {
  personName = "Aman";

  getName() {
    console.log(this.personName);
  }
}

var personName = "Ankit"; // global variable

const userInstance = new User();

/* ================================================================
 * 1. Normal Method Call
 * ================================================================ */

userInstance.getName(); 
// Output: Aman

/*
Reason:
- Method is called on the object `userInstance`
- `this` refers to `userInstance`  
    userInstance = {  personName: "Aman" }, getName function is present in prototype
*/

/* ================================================================
 * 2. Method Inside setTimeout (Arrow Function)
 * ================================================================ */

setTimeout(() => {
  userInstance.getName();
}, 2000);

/*
Reason:
- Arrow function does NOT have its own `this`
- It uses lexical `this`
- Still refers to `userInstance`
*/

/* ================================================================
 * 3. Method Passed Directly (LOSS OF CONTEXT)
 * ================================================================ */

setTimeout(userInstance.getName(), 2000);

/*
Output: Ankit

Reason:
- Function is executed immediately
- `this` is no longer bound to userInstance
- Falls back to global context (window / globalThis)
*/

/* ================================================================
 * 4. Using call() to Manually Bind `this`
 * ================================================================ */

userInstance.getName.call({ personName: "Vikram" });

/*
Output: Vikram

Reason:
- call() explicitly sets `this`
*/

/* ================================================================
 * IMPORTANT NOTES
 * ================================================================ */

/*
1. `this` depends on HOW a function is called, not where it is written.
2. Arrow functions do NOT have their own `this`.
3. Regular functions get `this` from their caller.
4. Use `.call()`, `.apply()`, or `.bind()` to manually control `this`.
*/

/* ================================================================
 * ONE-LINE SUMMARY
 * ================================================================ */

/*
`this` refers to the calling object, and its value changes based on how a function is invoked.
*/

/*****************************************************************************************************************************************
 ****************************************************************************************************************************************/

/******************************************************************
 * SOLUTIONS TO PRESERVE `this` CONTEXT IN JAVASCRIPT
 ******************************************************************/

/*
Problem:
When a class method is passed as a callback, `this` loses its reference
to the class instance unless explicitly handled.
*/

/* ================================================================
 * SOLUTION 1: USING ARROW FUNCTION
 * ================================================================ */

class User {
  personName = "Aman";

  getName = () => {
    console.log(this.personName);
  };
}

var personName = "Ankit"; // global variable

const userInstance1 = new User();

userInstance1.getName(); // Aman

setTimeout(userInstance1.getName, 2000); // Aman

userInstance1.getName.call({ personName: "Vikram" }); 
// Output: Aman

/*
EXPLANATION:
- Arrow functions do NOT have their own `this`
- They inherit `this` from their lexical scope
- In this case, `this` always refers to `userInstance1`
- `.call()` cannot change `this` for arrow functions
*/

/* ================================================================
 * SOLUTION 2: USING bind()
 * ================================================================ */

class User {
  personName = "Aman";

  constructor() {
    this.getName = this.getName.bind(this);
  }

  getName() {
    console.log(this.personName);
  }
}

var personName = "Ankit"; // global variable

const userInstance2 = new User();

userInstance2.getName(); // Aman
setTimeout(userInstance2.getName, 2000); // Aman

userInstance2.getName.call({ personName: "Vikram" }); // Aman

/*
EXPLANATION:
- bind() creates a new function permanently bound to a specific `this`
- Even if `.call()` or `.apply()` is used, `this` cannot be changed
*/

/*
If we want to override `this`, we must bind explicitly again:
*/

const boundGetName = userInstance2.getName.bind({ personName: "Vikram" });
boundGetName(); // Vikram

/* ================================================================
 * KEY DIFFERENCES
 * ================================================================ */

/*
| Feature                     | Arrow Function | bind() |
|----------------------------|----------------|--------|
| Has its own `this`         | ❌ No          | ✅ Yes |
| `this` can be changed      | ❌ No          | ✅ Yes |
| Lexically scoped `this`    | ✅ Yes         | ❌ No |
| Common use case            | Callbacks      | Event handlers |
*/

/* ================================================================
 * ONE-LINE SUMMARY
 * ================================================================ */

/*
Arrow functions lock `this` from surrounding scope, 
We can fix the value of this using arrow functions,
while `bind()` explicitly fixes `this` to a specific object.
*/

/*****************************************************************************************************************************************
 /****************************************************************************************************************************************/ 

/******************************************************************
 * CLASSES VS OBJECT METHODS IN JAVASCRIPT
 ******************************************************************/

/*
Classes in JavaScript are actually special functions
that return objects when instantiated using `new`.
*/

/* ================================================================
 * CLASS METHOD SYNTAX
 * ================================================================ */

class User {
  personName = "Aman";

  xyz() {
    console.log(this.personName);
  }
}

/*
IMPORTANT:
- Inside a class, methods are defined WITHOUT the `function` keyword
- Using `function` keyword inside a class will cause a syntax error
*/

/*
Example (❌ INVALID):
class User {
  function xyz() { }  // ❌ Not allowed
}

Example (❌ INVALID):
const object3 = {
  function abc() {
     console.log('hello world');
  }
};

*/
/* ================================================================
 * OBJECT METHOD SYNTAX
 * ================================================================ */

const object2 = {
  abc: function () {
    console.log("Hello");
  }
};

/*
OR shorthand method syntax:
*/

const object4 = {
  abc() {
    console.log("Hello");
  }
};

/*
In object literals:
- You CAN use `function` keyword
- You can also use shorthand syntax
*/

const object3 = {
  function abc() {
    console.log("Hello");
  }
};

/* ================================================================
 * KEY DIFFERENCE
 * ================================================================ */

/*
| Feature                    | Class Method        | Object Method        |
|---------------------------|---------------------|----------------------|
| Uses `function` keyword   | ❌ No               | ✅ Yes               |
| Shorthand allowed         | ✅ Yes              | ✅ Yes               |
| Belongs to prototype      | ✅ Yes              | ❌ No (own property) |
| Syntax style              | Class-based         | Object literal       |
*/

/* ================================================================
 * ONE-LINE SUMMARY
 * ================================================================ */

/*
Classes define methods without the `function` keyword,
while object literals allow method definitions using `function`.
*/

/*****************************************************************************************************************************************
 ****************************************************************************************************************************************/

class Person {
  name = "aman"
}

const user11 = new Person();
const user12 = new Person();

user11.age = 29
// We can add dynamically key to class objects

console.log({user11, user12});
/*
{
  user11: Person { name: 'aman', age: 29 },
  user12: Person { name: 'aman' }
 }
*/

/*****************************************************************************************************************************************
1. We cannot create static classs in javascript like static method and static properties only possible.Child
2. We cannot create abstract class in javascript like other languages such as java and c# but we can simulate abstract class using throw error 
in constructor if someone try to create object of that class directly.
****************************************************************************************************************************************/















