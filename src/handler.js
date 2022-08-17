// Memuat seluruh fungsi handler yang digunakan pada berkas routes

const { nanoid } = require('nanoid');
const notes = require('./notes');

const addNoteHandler = (request, h) => {
	const { title, tags, body } = request.payload;

	const id = nanoid(16);
	const createAt = new Date().toISOString();
	const updateAt = createAt;

	const newNote = {
		title, tags, body, id, createAt, updateAt,
	};
	notes.push(newNote);

	const isSuccess = notes.filter((note) => note.id === id).length > 0;

	// response jika berhasil
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
	}

	// response jika tidak berhasil
	const response = h.response({
		status: 'fail',
		message: 'Catatan gagal ditambahkan',
	});
	response.code(500);
	return response;
};

const getAllnotesHandler = () => ({
	status: 'success',
	data: {
		notes,
	},
});

const getNoteByIdHandler = (request, h) => {
	const { id } = request.params;

	const note = notes.filter((n) => n.id === id)[0];

	if (note !== undefined) {
		return {
			status: 'success',
			data: {
				note,
			},
		};
	}
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
	const updatedAt = new Date().toISOString();

	// dapatkan index array pada object catatan sesuai id pada file notes.js
	const index = notes.findIndex((note) => note.id === id);

	if (index !== -1) {
		/**
		 * Spread operator pada kode di bawah digunakan untuk mempertahankan nilai notes[index] *
		 * yang tidak perlu diubah. Jika Anda butuh mengingat kembali bagaimana spread operator *
		 * bekerja, silakan simak pada dokumentasi yang dijelaskan MDN: Spread Syntax.
		 */
		notes[index] = {
			...notes[index], // spread operator
			title,
			tags,
			body,
			updatedAt,
		};
		const response = h.response({
			status: 'success',
			message: 'Catat',
		});
		response.code(200);
		return response;
	}

	const response = h.response({
		status: 'fail',
		message: 'Gagal memperbarui catatan. Id tidak ditemukan',
	});
	return response.code(404);
};

const deleteNoteByIdHandler = (request, h) => {
	const { id } = request.params;

	const index = notes.findIndex((note) => note.id === id);

	if (index !== -1) {
		notes.splice(index, 1);
		const response = h.response({
			status: 'success',
			message: 'Catatan berhasil dihapus',
		});
		response.code(200);
		return response;
	}

	const response = h.response({
		status: 'fail',
		message: 'Catatan gagal dihapus. Id tidak ditemukan',
	});
	response.code(404);
	return response;
};
module.exports = {
	addNoteHandler,
	getAllnotesHandler,
	getNoteByIdHandler,
	editNoteByIdHandler,
	deleteNoteByIdHandler,
};
