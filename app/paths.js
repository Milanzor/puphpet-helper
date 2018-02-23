const path = require('path');

module.exports = {
    puphpetFolder: path.resolve(process.cwd(), 'puphpet'),
    customConfig: path.join(this.puphpetFolder, 'config-custom.yaml'),
    vhostTemplate: path.resolve(__dirname, '..', 'templates', 'vhost.yaml'),
};
