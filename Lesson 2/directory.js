// Working with directories in node

const fs = require('fs')


if(!fs.existsSync('./testDir')){

    // If testDir is not available
    //Creating testDir

    fs.mkdir('./testDir', err => {
        if(err) throw err, console.error(err);

        console.log('Directory is created!');
    })

}

if(fs.existsSync('./testDir')){

    // If testDir exists
    // Deleting 

    fs.rmdir('./testDir', err => {
        if(err) throw err, console.error(err);

        console.log('Directory is deleted!');
    })

}