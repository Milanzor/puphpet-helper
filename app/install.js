/**
 * Handles installation of the config
 */

const fs = require('fs');
const appPaths = require('./paths');

/**
 *
 * @param vhost
 */
const install = function (vhost) {

    fs.appendFileSync(appPaths.config, '\n' + vhost);
};

module.exports = install;