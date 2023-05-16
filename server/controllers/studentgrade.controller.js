const StudentGrade = require('../models/studentgrade.model');    /* this is new */
module.exports.index = (request, response) => {
    response.json({
        message: "Hello World"
    });
}
          /* The method below is new */
module.exports.createStudentGrade = (request, response) => {
    request.body.userId = currentUserId; // add userId from JWT
    StudentGrade.create(request.body) //This will use whatever the body of the client's request sends over
        .then(studentgrade => response.json(studentgrade))
        .catch(err => response.status(400).json(err));
}

module.exports.getStudentGrades = (req, res) => {
    StudentGrade.find({ languageClassId: req.params.id })
        .then((allStudentGrades) => {
            res.json({ studentgrades: allStudentGrades })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', error: err })
        });
}

module.exports.getStudentGradeDetails = (req, res) => {
    StudentGrade.findOne({ _id: req.params.id })
        .then(oneSingleStudentGrade => {
            res.json({ studentgrade: oneSingleStudentGrade })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', error: err })
        });}

module.exports.updateStudentGrade = (request, response) => {

    let userIdCompare = null;
    
    StudentGrade.findOne({ _id: request.params.id })
        .then(oneSingleStudentGrade => {
            userIdCompare = oneSingleStudentGrade.userId;
            let authError = "Not Authorized";
            if (currentUserId != userIdCompare) { // check userId from JWT
                return response.status(400).json({ message: authError, error: authError });
            }
            StudentGrade.findOneAndUpdate({_id: request.params.id}, request.body, {runValidators: true, new:true})
            .then(updatedStudentGrade => response.json(updatedStudentGrade))
            .catch(err => response.status(400).json(err))
        })
        .catch((err) => {
            response.json({ message: 'Student Not Found', error: err })
        });
    
        }
        
module.exports.deleteStudentGrade = (request, response) => {

    let userIdCompare = null;
    
    StudentGrade.findOne({ _id: request.params.id })
        .then(oneSingleStudentGrade => {
            userIdCompare = oneSingleStudentGrade.userId;
            let authError = "Not Authorized";
            if (currentUserId != userIdCompare) { // check userId from JWT
                return response.status(400).json({ message: authError, error: authError });
            }
            StudentGrade.deleteOne({ _id: request.params.id }) //note: "id" here MUST match id in corresponding route
            .then(deleteConfirmation => response.json(deleteConfirmation))
            .catch(err => response.json(err))
        })
        .catch((err) => {
            response.json({ message: 'Student Not Found', error: err })
        });
    
        }
        
        