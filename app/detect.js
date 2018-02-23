/**
 * Detects we have everything we need
 */

const fs = require('fs');

const appPaths = require('./paths');

/**
 *
 * @returns {boolean}
 */
const detect = function () {

    // Make sure we have a puphpet folder
    if (!fs.existsSync(appPaths.puphpetFolder)) {
        console.log(`No puphpet folder found, are you sure you're in a PuPHPet+Vagrant directory?`);
        process.exit(0);
    }

    return true;

};

module.exports = detect;
