const mongoose = require('mongoose');
const StudentGradeSchema = new mongoose.Schema({
    userId: {
        type: String,
        required:  [
            true
        ],
        trim: true
    },
    languageClassId: {
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
            "Student Name is required"
        ],
        trim: true,
        minlength:  [
            3,
            "Student Name must be 3 characters"
        ] 
    },
    grade: {
        type: Number,
        required:  [
            true,
            "Grade is required"
        ],
        min:  [
            0,
            "Grade must be at least 0"
        ],
        max:  [
            100,
            "Grade must be at most 100"
        ] 
    }
}, { timestamps: true });
module.exports = mongoose.model('StudentGrade', StudentGradeSchema);

