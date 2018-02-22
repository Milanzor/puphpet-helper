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

    // Make sure we have a puphpet/config-custom.yaml
    if (!fs.readFileSync(appPaths.config)) {
        console.log(`No puphpet/config-custom.yaml found, are you in the right folder?`);
        process.exit(0);
    }

    return true;

};

module.exports = detect;
