import resource from 'resource-router-middleware';
import path from 'path';
import crypto from 'crypto';
import mime from 'mime';
import multer from 'multer';
import Todo from '../models/todo';

const storage = multer.diskStorage({
	destination(req, file, cb) {
		cb(null, 'uploads/');
	},
	fileFilter(req, file, cb) {
		// upload only if it's an image type
		const allowedFileTypes = /jpeg|jpg|png/;
		const extName = path.extname(file.originalname).toLowerCase();

		if (allowedFileTypes.test(file.mimetype) || allowedFileTypes.test(extName)) {
			return cb(null, true);
		}
		cb(`Error: File upload only supports the following filetypes - ${allowedFileTypes}`);
	},
	filename(req, file, cb) {
		crypto.pseudoRandomBytes(16, (err, raw) => {
			cb(null, `${raw.toString('hex')}${Date.now()}.${mime.extension(file.mimetype)}`);
		});
	}
});

const uploads = multer({ storage });

export default resource({
	middleware: [
		uploads.single('photo')   // any multer upload options
	],
	/** Property name to store preloaded entity on `request`. */
	id: 'todo',

	/** For requests with an `id`, you can auto-load the entity.
	 *  Errors terminate the request, success sets `req[id] = data`.
	 */
	load(req, id, callback) {
		Todo.findById(id)
			.then(todo => {
				callback(null, todo);
			})
			.catch(callback);
	},

	/** GET / - List all entities */
	index({ params }, res) {
		Todo.find({})
			.then(todos => res.json(todos))
			.catch(err => res.status(500).send(err));
	},

	/** POST / - Create a new entity */
	create({ body, file, res }) {
		Todo.create({ ...body, photoPath: file.path })
			.then(() => res.sendStatus(200))
			.catch(err => res.status(500).send(err));
	},

	/** GET /:id - Return a given entity */
	read({ todo }, res) {
		res.json(todo);
	},

	/** PUT /:id - Update a given entity */
	update({ todo, body }, res) {
		todo.update(body, { upsert: true })
			.then(() => res.sendStatus(204))
			.catch(err => res.status(500).send(err));
	},

	/** DELETE /:id - Delete a given entity */
	delete({ todo }, res) {
		todo.remove()
			.then(() => res.sendStatus(204))
			.catch(err => res.status(500).send(err));
	}
});
