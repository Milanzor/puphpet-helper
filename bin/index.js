#!/usr/bin/env node

/*
 MIT License http://www.opensource.org/licenses/mit-license.php
 Author Milan van As
 */


// Get detect
const detect = require('../app/detect');

// Run detect
detect();

// Get the rest of the app
const questions = require('../app/questions');
const create = require('../app/create');
const install = require('../app/install');

// Launch
questions().then(answers => {

    // Only go if youre happy
    if (!answers.happy) {
        console.log(`Oh, try again I guess :)`);
        process.exit(0);
    }

    // Go
    install(create(answers));

    // Done!
    console.log(`Cool, all done!`);
});
