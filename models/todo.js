const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const TodoSchema = mongoose.schema({
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

TodoSchema.plugin(AutoIncrement, {inc_field: 'id'});

var TodoModel = mongoose.model('Todo', TodoSchema);
module.exports = {TodoModel};
