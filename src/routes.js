const addNoteHandler = require('./handler');

const routes = [
    {
        method: 'POST',
        path: '/notes',
        handler: addNoteHandler,
    },
    {
        method: 'GET',
        path: '/notes',
        handler: () => {}, // Handler kosong untuk sementara waktu
    },
];

module.exports = routes;
