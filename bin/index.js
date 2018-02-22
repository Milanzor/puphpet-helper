#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const randomstring = require('randomstring');
const format = require('string-template');

const inquirer = require('inquirer');

const templatePath = path.resolve(__dirname, '..', 'templates');

// const isElevated = require('is-elevated');
// const hostile = require('hostile');
//
// isElevated().then(function (isElevated) {
//     if (isElevated) {
//         console.log(`Running elevated, showing contents of host file`);
//         hostile.get(false, (err, lines) => {
//             if (err) {
//                 console.error(err.message);
//             }
//             lines.forEach(function (line) {
//                 console.log(line);
//             });
//         });
//     }
// });

console.log(`Hi, let's do some work.`);

const questions = [
    {
        type: 'input',
        name: 'vhostservername',
        message: 'Domain?',
        default: 'example.local',
        filter: function (val) {
            return val.toLowerCase();
        }
    },
    {
        type: 'input',
        name: 'vhostdocroot',
        message: 'Document root?',
        default: '/var/www/example.local/public_html',
        filter: function (val) {
            return val.toLowerCase();
        }
    },
    {
        type: 'input',
        name: 'vhostport',
        message: 'Port?',
        default: '80',
        filter: function (val) {
            return val.toLowerCase();
        }
    }
];

inquirer.prompt(questions).then(answers => {

    // Read the template of the vhost
    const vhost = fs.readFileSync(path.join(templatePath, 'vhost.yaml'), 'utf8');

    // Template it
    const vhostYaml = format(vhost, {
        vhostuniq: randomstring.generate(12),
        vhostservername: answers.vhostservername,
        vhostdocroot: answers.vhostdocroot,
        vhostport: answers.vhostport,
        directoryuniq: randomstring.generate(12),
    });

    console.log(vhostYaml);

    // Now write it to the right place
    console.log(`Done!`);

}).catch(function (error) {
    console.log(`Something went wrong with the prompt.`);
    console.log(error);
});
