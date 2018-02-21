#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const argv = require('minimist')(process.argv.slice(2));
const isElevated = require('is-elevated');
const hostile = require('hostile');

const inquirer = require('inquirer');

isElevated().then(function (isElevated) {
    if (isElevated) {
        console.log(`Running elevated, showing contents of host file`);
        hostile.get(false, (err, lines) => {
            if (err) {
                console.error(err.message);
            }
            lines.forEach(function (line) {
                console.log(line);
            })
        });
    }
});

inquirer.prompt([
    {
        type: 'list',
        name: 'size',
        message: 'What size do you need?',
        choices: ['Large', 'Medium', 'Small'],
        filter: function (val) {
            return val.toLowerCase();
        }
    }
]).then(answers => {
    console.log(answers);
}).catch(function () {
});
