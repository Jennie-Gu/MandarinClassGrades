const StudentGradeController = require('../controllers/studentgrade.controller');
const { authenticate } = require('../config/jwt.config');
module.exports = (app) => {
    // this route now has to be authenticated
    app.post('/api/student/:id', authenticate, StudentGradeController.createStudentGrade);     /* This is new */
    app.get('/api/students/:id', authenticate, StudentGradeController.getStudentGrades); 
    app.get('/api/student/:id', authenticate, StudentGradeController.getStudentGradeDetails); 
    app.put('/api/student/edit/:id', authenticate, StudentGradeController.updateStudentGrade);
    app.delete('/api/student/delete/:id', authenticate, StudentGradeController.deleteStudentGrade);

}

