/**
 * Handles the questions for the config
 */

const inquirer = require('inquirer');

const questionList = [
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
    },
    {
        type: 'confirm',
        name: 'happy',
        message: 'Are you happy and ready to go?',
        default: true
    }
];


/**
 * The question
 */
const questions = function () {
    return inquirer.prompt(questionList);
};

module.exports = questions;
