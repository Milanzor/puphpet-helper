const path = require('path');

module.exports = {
    puphpetFolder: path.resolve(process.cwd(), 'puphpet'),
    customConfig: path.resolve(process.cwd(), 'puphpet', 'config-custom.yaml'),
    config: path.resolve(process.cwd(), 'puphpet', 'config.yaml')
};
