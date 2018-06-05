const router = require('express').Router();

const Friend = require('./friendModel');

router
    .route('/')
    .get((req, res) => {
        Friend.find()
        .then(friends => {
            res.status(200).json(bears);
        })
        .catch(error => {
            res.status(500).json({ error: error })
        })
    })
    .post((req, res) => {
        const { firstName, lastName, age, createdOn } = req.body;
        const newFriend = new Friend({ firstName, lastName, age, createdOn });
        newFriend
        .save()
        .then(savedFriend => {
            res.status(201).json(savedFriend);
        })
        .catch(error => {
            res.status(422).json({ error: error })
        });
    });

    router
        .route('/:id')
        .get(( req, res) => {
            const { id } = req.params;
            Friend.findById(id)
                .then(foundFriend => {
                    res.status(200).json(foundFriend);
                })
                .catch(error => {
                    res.status(500).json({ error: error })
                })
        })
        .delete((req, res) => {
            const { id } = req.params;
            Friend.findByIdAndRemove(id)
            .then(deleteFriend => {
                res.status(200).json(deleteFriend);
            })
            .catch(error => {
                res.status(500).json({ error: error });
            })
        })

        .put((req, res) => {
            const { id } = req.params;
            
        })
        