const logEvents = require('./logEvents')

const EventEmitter = require('events')

// initialize object
const myEmitter = new EventEmitter()

// add listener for log event
// myEmitter.on() // listen to the event is done by .on()
myEmitter.on('log', (msg) => {logEvents(msg)})

console.log('waiting for it to be 5s');

//Firing an event called 'log' after 5 seconds
setTimeout(() => {
    //Emit event
    myEmitter.emit('log', 'Log event emitted!')
}, 5000 )