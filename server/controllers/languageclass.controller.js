const LanguageClass = require('../models/languageclass.model');    /* this is new */
module.exports.index = (request, response) => {
    response.json({
        message: "Hello World"
    });
}
          /* The method below is new */
module.exports.createLanguageClass = (request, response) => {
    request.body.userId = currentUserId; // add userId from JWT
    LanguageClass.create(request.body) //This will use whatever the body of the client's request sends over
        .then(languageclass => response.json(languageclass))
        .catch(err => response.status(400).json(err));
}

module.exports.getLanguageClasses = (req, res) => {
    LanguageClass.find()
        .then((allLanguageClasses) => {
            res.json({ languageclasses: allLanguageClasses })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', error: err })
        });
}

module.exports.getLanguageClassDetails = (req, res) => {
    LanguageClass.findOne({ _id: req.params.id })
        .then(oneSingleLanguageClass => {
            res.json({ languageclass: oneSingleLanguageClass })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', error: err })
        });}

module.exports.updateLanguageClass = (request, response) => {

    let userIdCompare = null;
    
    LanguageClass.findOne({ _id: request.params.id })
        .then(oneSingleLanguageClass => {
            userIdCompare = oneSingleLanguageClass.userId;
            let authError = "Not Authorized";
            if (currentUserId != userIdCompare) { // check userId from JWT
                return response.status(400).json({ message: authError, error: authError });
            }
            LanguageClass.findOneAndUpdate({_id: request.params.id}, request.body, {runValidators: true, new:true})
            .then(updatedLanguageClass => response.json(updatedLanguageClass))
            .catch(err => response.status(400).json(err));
        })
        .catch((err) => {
            response.json({ message: 'Language Class Not Found', error: err })
        });
    
        }
        
module.exports.deleteLanguageClass = (request, response) => {

    let userIdCompare = null;
    
    LanguageClass.findOne({ _id: request.params.id })
        .then(oneSingleLanguageClass => {
            userIdCompare = oneSingleLanguageClass.userId;
            let authError = "Not Authorized";
            if (currentUserId != userIdCompare) { // check userId from JWT
                return response.status(400).json({ message: authError, error: authError });
            }
            LanguageClass.deleteOne({ _id: request.params.id }) //note: "id" here MUST match id in corresponding route
            .then(deleteConfirmation => response.json(deleteConfirmation))
            .catch(err => response.json(err))
        })
        .catch((err) => {
            response.json({ message: 'Language Class Not Found', error: err })
        });
    
        }
        
        