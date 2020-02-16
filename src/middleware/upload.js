const helper = require('../helper/');
const path = require('path');
const os = require('os');
const multer = require('multer');

const multerOptions = {
	storage: multer.diskStorage({
		destination: function (req, file, cb) {
			cb(null, os.tmpdir());
		},
		filename: function (req, file, cb) {
			cb(null, Date.now() + path.extname(file.originalname));
		}
	}),
	fileFilter: (req, file, cb) => {
		var filters = [];
		if (process.env.UPLOAD_FILTEREXT) {
			filters = process.env.UPLOAD_FILTEREXT.toLowerCase().split('|');
		}
		if (filters.includes(path.extname(file.originalname).toLowerCase()) == false) {
			return cb(new Error('File not supported'), false);
		}
		cb(null, true);
	},
	limits: { fileSize: process.env.UPLOAD_SIZELIMIT }
};

module.exports = {
	uploadMiddleware: (field) => {
		return (request, response, next) => {
			const upload = multer(multerOptions).single(field);
			upload(request, response, (error) => {
				if (error instanceof multer.MulterError) {
					return helper.response(response, 400, error);
				} else if (error) {
					return helper.response(response, 400, error);
				}
				//check image
				if (request.file) {
					request.body[field] = request.file.filename;
				}
				next();
			});
		};
	}
};
