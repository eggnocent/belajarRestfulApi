// handler.js

const { nanoid } = require('nanoid');
const notes = require('./notes');

const addNoteHandler = (request, h) => {
    const { title, tags, body } = request.payload;
 
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;
 
    const newNote = {
        title, tags, body, id, createdAt, updatedAt,
    };
 
    notes.push(newNote);
 
    const isSuccess = notes.filter((note) => note.id === id).length > 0;
 
    if (isSuccess) {
        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil ditambahkan',
            data: {
                noteId: id,
            },
        });
        response.code(201);
        return response;
    } else {
        const response = h.response({
            status: 'fail',
            message: 'Catatan gagal ditambahkan',
        });
        response.code(500);
        return response;
    }
};

const getAllNotesHandler = () => ({
    status: 'success',
    data: {
        notes,
    },
});

const getNoteByIdHandler = (request, h) => {
    const { id } = request.params;

    // Dapatkan objek catatan dengan ID yang sesuai dari array notes
    const note = notes.find((n) => n.id === id);

    // Periksa apakah objek catatan tidak bernilai undefined
    if (note !== undefined) {
        return {
            status: 'success',
            data: {
                note,
            },
        };
    }

    // Jika catatan tidak ditemukan, berikan respons 404
    const response = h.response({
        status: 'fail',
        message: 'Catatan tidak ditemukan',
    });
    response.code(404);
    return response;
};

const editNoteByIdHandler = (request, h) => {
    const { id } = request.params;
    const { title, tags, body } = request.payload;

    // Cari catatan berdasarkan ID
    const noteIndex = notes.findIndex((note) => note.id === id);

    // Jika catatan tidak ditemukan, berikan respons 404
    if (noteIndex === -1) {
        const response = h.response({
            status: 'fail',
            message: 'Catatan tidak ditemukan',
        });
        response.code(404);
        return response;
    }

    // Update catatan dengan data baru
    notes[noteIndex] = {
        ...notes[noteIndex],
        title,
        tags,
        body,
        updatedAt: new Date().toISOString(),
    };

    const response = h.response({
        status: 'success',
        message: 'Catatan berhasil diperbarui',
    });
    response.code(200);
    return response;
};

module.exports = { addNoteHandler, getAllNotesHandler, getNoteByIdHandler, editNoteByIdHandler };
