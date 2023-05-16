const mongoose = require('mongoose');
const LanguageClassSchema = new mongoose.Schema({
    userId: {
        type: String,
        required:  [
            true
        ],
        trim: true
    },
    name: {
        type: String,
        required:  [
            true,
            "Class name is required"
        ],
        trim: true,
        minlength:  [
            3,
            "Class name must be 3 characters"
        ],
        unique: [true, "Class name is already in use"]
    },
    teacher: {
        type: String,
        required:  [
            true,
            "Teacher name is required"
        ],
        trim: true,
        minlength:  [
            3,
            "Teacher name must be 3 characters"
        ] 
    }
}, { timestamps: true });
module.exports = mongoose.model('LanguageClass', LanguageClassSchema);

