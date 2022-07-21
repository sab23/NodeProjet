//Import
const { validationResult } = require('express-validator/check');
const MessageSchema = require('../models/message');

exports.sendMessage = (req, res, next) => {
    // erreur
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            message: 'Erreur',
            errors: errors.array()
        });
    }
    const title = req.body.title;
    const message = req.body.message;
    const messageSchema = new MessageSchema({
        title: title,
        message: message
    });
    messageSchema
        .save()
        .then(result => {
            res.status(201).json({
                message: 'Succés',
                post: result
            });
        })
        .catch(err => {
            console.log(err);
        });
}

exports.getMessages = (req, res, next) => {
    MessageSchema.find().select(['title', 'message'])
        .then(messages => {
            res
            .status(200)
            .json({ messages: messages });
        })
        .catch(err => {
            if (!err.statusCode) {
            err.statusCode = 500;
            }
            next(err);
        });
}
