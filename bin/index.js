#!/usr/bin/env node

/*
 MIT License http://www.opensource.org/licenses/mit-license.php
 Author Milan van As
 */


const fs = require('fs');
const inquirer = require('inquirer');
const yaml = require('yamljs');
const randomstring = require('randomstring');

const appPaths = require('../app/paths');

const questionList = require('../app/questionlist');

class PuphpetHelper {

    constructor() {

        // Check if we have all env requirements (e.g. are in a Puphpet folder)
        this.requirements();

        this.setup().then(() => {
            this.questions()
        });
    }

    async setup() {
        this.puphpetConfig = await this.getPuphpetConfig() || {};
        this.puphpetCustomConfig = await this.getPuphpetConfig(true) || {};
    }

    /**
     *
     * @param getCustom
     * @returns {Promise}
     */
    async getPuphpetConfig(getCustom) {
        return new Promise(function (resolve, reject) {

            let target = getCustom ? appPaths.customConfig : appPaths.config;
            if (!fs.existsSync(target)) {
                resolve({});
            }

            yaml.load(target, resolve);

        });
    }

    /**
     *
     * @returns {Promise<void>}
     */
    async questions() {

        /**
         * The questions
         */
        this.answers = await inquirer.prompt(questionList);
        if (!this.answers.happy) {
            this.quit('Oh, try again I guess!');
        }

        this.format();

    }

    format() {

        if (!('apache' in this.puphpetCustomConfig)) {
            this.puphpetCustomConfig.apache = {};
        }

        if (!('vhosts' in this.puphpetCustomConfig.apache)) {
            this.puphpetCustomConfig.apache.vhosts = {};
        }


        // Add the new vhost
        this.puphpetCustomConfig.apache.vhosts[`av_${randomstring.generate(12)}`] = {
            servername: this.answers.servername,
            docroot: this.answers.docroot,
            port: this.answers.port,
            directories: {
                [`avd_${randomstring.generate(12)}`]: {
                    provider: 'directory',
                    path: this.answers.docroot,
                    directoryindex: 'index.php index.html',
                    options: [
                        'Indexes',
                        'FollowSymlinks',
                        'MultiViews',
                    ],
                    allow_override: [
                        'All',
                    ],
                    require: [
                        'all granted'
                    ],
                },
                [`avd_${randomstring.generate(12)}`]: {
                    provider: 'filesmatch',
                    path: '\\.php$',
                    sethandler: 'proxy:fcgi://127.0.0.1:9000',
                }
            }
        };


        // Write the config
        this.writeConfig();

    }

    writeConfig() {
        const yamlString = yaml.stringify(this.puphpetCustomConfig, Infinity, 4);
        fs.writeFileSync(appPaths.customConfig, yamlString);

        console.log('');
        console.log('Awesome, all done!');

        this.hostfile();
    }

    hostfile() {
        try {
            let vmName = Object.keys(this.puphpetConfig.vagrantfile.vm.provider.local.machines)[0];
            let ip = this.puphpetConfig.vagrantfile.vm.provider.local.machines[vmName].network.private_network;
            if (ip) {
                console.log('');
                console.log('Here\'s the command to add this new vhost to your host file:');
                console.log('');
                console.log(`echo -en "\\n# Added by puphpet-helper \\n${ip} ${this.answers.servername}\\n" | sudo tee -a /etc/hosts > /dev/null`);
                console.log('');

            }
        } catch (e) {

        }

    }


    requirements() {
        // Make sure we have a puphpet folder
        if (!fs.existsSync(appPaths.puphpetFolder)) {
            console.log(`No puphpet folder found, are you sure you're in a PuPHPet+Vagrant directory?`);
            process.exit(0);
        }
    }

    quit(msg) {
        console.log(msg || 'Bye!');
        process.exit(0);
    }
}


new PuphpetHelper;
