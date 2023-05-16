const LanguageClassController = require('../controllers/languageclass.controller');
const { authenticate } = require('../config/jwt.config');
module.exports = (app) => {
    // this route now has to be authenticated
    app.get('/api/class/:id', authenticate, LanguageClassController.getLanguageClassDetails);   
    app.post('/api/classes', authenticate, LanguageClassController.createLanguageClass);     /* This is new */
    app.get('/api/classes', authenticate, LanguageClassController.getLanguageClasses); 
    app.put('/api/class/edit/:id', authenticate, LanguageClassController.updateLanguageClass);
    app.delete('/api/class/delete/:id', authenticate, LanguageClassController.deleteLanguageClass);

}

