Symbol: Symbols are non enumerable, this means they wont show up in Object keys & in for in loops. 

Objects:

const obj = {}

Always apply check for null conditions because typeof null is also 'object'

if(typeof obj === 'object' && obj !== null){

}

1. Dynamic Keys in Object

const obj ={}

const magic = "ThisisnewKey"

obj[magic] = "New Value"

console.log(obj) // { ThisisnewKey: 'New Value' }

obj.magic = "Another Value" // This will create a key with name 'magic' not the value of magic variable
// Ex: { magic: 'Another Value' }

Note : object keys are always strings.

2. Ceation of objects

1. const obj = {}  // Object Literal
2. const obj = new Object() // Object Constructor

Both 1 and 2 are same, because objects are created with new keyword internally. when created like this => const obj = {}

3. Keys in Objects

obj.k = "aman"

1. writable
2. enumerable. Visible in  Object.keys and for in loops.
3. configurable. can be deleted or modified.

console.log(Object.keys(obj)); // will print ['k']

Object.defineProperties(obj, "k", {}) // will print [] empty array because enumerable is false now.
Object.defineProperties(obj, "k", {}) => This will keep everything off like writable : false, enumerable : false, configurable : false


Everything in JS behaves like objects.Always

Examples:

1. primative data type 's'.toUpperCase() // behaves like object.

2. undefined.x // error

3. null.x // error

Boxing 

const  s = "hello"
s.toUpperCase() // behaves like object.

Behind the scenes JS engine creates a temporary object for s and calls toUpperCase on that object. This is called boxing.
After the operation is done the temporary object is deleted.

const stringObject = new String(s)
const returnValue =  stringObject.toUpperCase() // behaves like object.
stringObject = null
return returnValue

Above concepts is called boxing.








