
// 1) NodeJS runs on a server, not in a browser
// 2) The console is the terminal window

console.log('Welcome!')

// 3) global object instead of window object
// console.log(global)


// 4) Has common core modules
// 5) CommonJS modules instead of ES6 Modules (require instead of import)
// 6) NodeJS has some JS APIs missing like fetch()

const os = require('os')
const path = require('path')

// console.log(os.type())
// console.log(os.version())
// console.log(os.homedir())

// console.log(__dirname) //this gives the current directory name always

// console.log(__filename) // this gives directory name + filename (complete path)

// we can separate the filename and directory name from __filename as:

// console.log(path.dirname(__filename)) // gives only the directory name
// console.log(path.basename(__filename)) // gives only file name
// console.log(path.extname(__filename)) // gives only the extension
// console.log(path.parse(__filename)) // gives the object of everything separated


//Importing other files with their functionalities
const math = require('./math')

const a = math.multiply(2,3);
console.log(a);

//We could destructure the math object.

const {multiply, add, subtract, divide} = require('./math')
console.log(multiply(4,5));

//We can alias the destructured units as {unitName: alisa1, unit2: alias2}

const {multiply: mt, add: plus, subtract: minus, divide: bhag} = require('./math')
// After aliasing, we cannot use the actual name, we need to use the alias.
// console.log(multiply(3,4)); // This throws error that multiply is not defined
console.log(mt(3,4)); // This works perfectly.

