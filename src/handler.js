const { nanoid } = require('nanoid');
const notes = require('./notes');

const addNoteHandler = (request, h) => {
    try {
        const { title, tags, body } = request.payload;
        const id = nanoid(16);
        const createdAt = new Date().toISOString();
        const updatedAt = createdAt;
        const newNote = { title, tags, body, id, createdAt, updatedAt };
        notes.push(newNote);
        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil ditambahkan',
            data: { noteId: id },
        }).code(201);
        return response;
    } catch {
        const response = h.response({
            status: 'fail',
            message: 'Catatan gagal ditambahkan',
        }).code(500);
        return response;
    }
};

const getAllNotesHandler = () => ({
    status: 'success',
    data: { notes },
});

const getNoteByIdHandler = (request, h) => {
    try {
        const { id } = request.params;
        const note = notes.find((n) => n.id === id);
        if (!note) {
            throw new Error('Catatan tidak ditemukan');
        }
        return { status: 'success', data: { note } };
    } catch {
        const response = h.response({
            status: 'fail',
            message: 'Catatan tidak ditemukan',
        }).code(404);
        return response;
    }
};

const editNoteByIdHandler = (request, h) => {
    const { id } = request.params;
    const { title, tags, body } = request.payload;
    const updatedAt = new Date().toISOString();

    const index = notes.findIndex((note) => note.id === id);

    if (index !== -1) {
        notes[index] = {
            ...notes[index],
            title,
            tags,
            body,
            updatedAt,
        };

        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil diperbarui',
        }).code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui catatan. Id tidak ditemukan',
    }).code(404);
    return response;
};

const deleteNoteByIdHandler = (request, h) => {
    const { id } = request.params;
    const index = notes.findIndex((note) => note.id === id);

    if (index !== -1) {
        notes.splice(index, 1);
        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil dihapus',
        }).code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Catatan gagal dihapus. Id tidak ditemukan',
    }).code(404);
    return response;
};

module.exports = {
    addNoteHandler,
    getAllNotesHandler,
    getNoteByIdHandler,
    editNoteByIdHandler,
    deleteNoteByIdHandler,
};
