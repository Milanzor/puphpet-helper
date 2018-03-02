const path = require('path');

module.exports = {
    puphpetFolder: path.resolve(process.cwd(), 'puphpet'),
    customConfig: path.resolve(process.cwd(), 'puphpet', 'config-custom.yaml'),
    vhostTemplate: path.resolve(__dirname, '..', 'templates', 'vhost.yaml'),
};
