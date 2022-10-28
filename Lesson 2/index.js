const fsPromises = require('fs').promises
const fs = require('fs')
const path = require('path')

const fileOperations = async () => {
    try {
        const data = await fsPromises.readFile(path.join(__dirname, 'files', 'rishik.txt'), 'utf-8')

        console.log(data);

        await fsPromises.unlink(path.join(__dirname, 'files', 'output.json')) //DELETE OPERATION

        await fsPromises.writeFile(path.join(__dirname, 'files', 'output2.txt'), 'written something on the file.')

        await fsPromises.appendFile(path.join(__dirname, 'files', 'output2.txt'), ' appended something on the file.')

        await fsPromises.rename(path.join(__dirname, 'files', 'output2.txt'), path.join(__dirname, 'files', 'renamedFile.txt'))

        const newData = await fsPromises.readFile(path.join(__dirname, 'files', 'renamedFile.txt'), 'utf-8');

        console.log("\n\n\n\n\n",newData);

         
    } catch (err) {
        console.error(err);
    }
}


fileOperations()


// fs.readFile('./files/rishik.txt', (err, data) => {
//     // This is an async function
//     if(err) {
//         throw err
//     }
//     console.log(data.toString());
// })

//To avoid hardcoding the file, we can use the path module
// const path = require('path')
// fs.readFile(path.join(__dirname, 'files', 'rishik.txt'), (err, data) => {
    
// })  


// WRITING A FILE
// We can write any string to the file, but here I am writing a JSON for demonstration purpose.

// const toWrite = {
//     message: "weldome to the write ind",
//     nice: "weldm"
// }

// The content to be written has to be a string so using JSON.stringify()
// fs.writeFile(path.join(__dirname, 'files', 'output.json'), JSON.stringify(toWrite) ,(err) => {
//     if(err) throw err

//     console.log('Write complete');
    
// })


// If the content to be appended after the write operation, then appendFile method should be
// placed inside the callback of the writeFile method.
// fs.appendFile(path.join(__dirname, 'files', 'output.json'), '\n\n\n Good Appened!' ,(err) => {
//     if(err) throw err

//     console.log('Append complete');
    
// })

// similiarly
// fs.rename works




//according to the docs, if there is an uncaught exception, you need to catch it explicitly.

//process.on() is a method available without import.
// process.on('uncaughtException', err => {
//     console.error(`There was an uncaught error: ${err}`)
//     process.exit(1)
// })
