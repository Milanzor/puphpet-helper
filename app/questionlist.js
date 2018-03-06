module.exports = [
    {
        type: 'input',
        name: 'servername',
        message: 'Domain?',
        default: 'example.local',
        filter: function (val) {
            return val.toLowerCase();
        }
    },
    {
        type: 'input',
        name: 'docroot',
        message: 'Document root?',
        default: function (response) {
            return `/var/www/${response.servername}/public_html`;
        },
        filter: function (val) {
            return val.toLowerCase();
        }
    },
    {
        type: 'input',
        name: 'port',
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
