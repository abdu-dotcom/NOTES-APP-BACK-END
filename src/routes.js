/** Memuat kode konfigurasi routing server seperti menentukan path, method, dan handler *
 * yang digunakan. *
 * */

const {
	addNoteHandler,
	getAllnotesHandler,
	editNoteByIdHandler,
	getNoteByIdHandler,
	deleteNoteByIdHandler,
} = require('./handler');

const routes = [
	{
		method: 'POST',
		path: '/notes',
		handler: addNoteHandler,
	},
	{
		method: 'GET',
		path: '/notes',
		handler: getAllnotesHandler,
	},
	{
		method: 'GET',
		path: '/notes/{id}',
		handler: getNoteByIdHandler,
	},
	{
		method: 'PUT',
		path: '/notes/{id}',
		handler: editNoteByIdHandler,
	},
	{
		method: 'DELETE',
		path: '/notes/{id}',
		handler: deleteNoteByIdHandler,
	},
];

module.exports = routes;
