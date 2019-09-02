const mongoose = require('mongoose');

const Todo = mongoose.model('Todo', {
	text: {
		type: String,
		required: false,
		minlength: 1,
		trim: true
	},
	completed: {
		type: Boolean,
		default: false
	}
});

module.exports = {Todo};
