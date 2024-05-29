const mongoose = require('mongoose');
const {
  model,
  Schema
} = mongoose;

let categorySchema = Schema({
  name: {
    type: String,
    minLength: [3, 'Category name length at least 3 characters'],
    maxLength: [20, 'Category name length maximum 3 characters'],
    required: [true, 'Category name must be filled in'],
  },
  organizer: {
    type: mongoose.Types.ObjectId,
    ref: 'Organizer',
    required: true,
  },
}, {
  timestamps: true
});

module.exports = model('Category', categorySchema);