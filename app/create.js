/**
 * Handles creation of the config
 */

// Filesystem
const fs = require('fs');

// Randomstring
const randomstring = require('randomstring');

// Format
const format = require('string-template');

// Get the appPaths
const appPaths = require('./paths');

// Get the vhost template as string
const vhostTemplate = fs.readFileSync(appPaths.vhostTemplate, 'utf8');


/**
 * Formats the vhost template with an object of answers
 *
 * @param answers
 * @returns {*}
 */
const create = function (answers) {

    // Create random strings for the vhost and directory
    answers.vhostuniq = randomstring.generate(12);
    answers.directoryuniq = randomstring.generate(12);

    // Parse the template and return it
    return format(vhostTemplate, answers);

};

module.exports = create;
