const router = require('express').Router();

const{allThoughts,thoughtCreate, oneThought,deleteThought,updateThought, addreaction, deletereaction}= require('../../controllers/thought_controller');

router.route('/')
.get(allThoughts)
.post(thoughtCreate);

router.route('/:Id')
.get(oneThought)
.delete(deleteThought)
.put(updateThought);

router.route('/:Id/reactions')
.post(addreaction)

router.route('/:Id/reactions/:reactionId')
.delete(deletereaction)


module.exports = router;