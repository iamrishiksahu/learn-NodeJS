// First thing is fileRead is fully buffered method. and streaming is partial buffered method.

// fileRead reads all the data at once and stores in a buffer which is less memory efficient and time taking. The data is only available to the client once the complete reading is done. for 1 GB file it is tedius.

// createReadStream reads the data in smaller chunks and the chunks are buffered so that the client has access to the data as soon as the file is started to be read. You can pipe() the data into the response so that the client has access to the stream.

const fs = require('fs')
const path = require('path')

const readStream = fs.createReadStream(path.join(__dirname, 'files', 'rishik.txt'), 'utf-8')
const writeStream = fs.createWriteStream(path.join(__dirname, 'files', 'streamWriteFile.txt'))


//Efficient Way
readStream.pipe(writeStream)

// readStream.on('data', (dataChunk) =>{
//     writeStream.write(dataChunk)
// })

