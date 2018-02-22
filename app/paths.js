const path = require('path');

module.exports = {
    config: path.resolve(process.cwd(), 'puphpet', 'config-custom.yaml'),
    vhostTemplate: path.resolve(__dirname, '..', 'templates', 'vhost.yaml'),
};
