const router = require('express').Router();

const{allThoughts,thoughtCreate, oneThought,deleteThought}= require('../../controllers/thought_controller');

router.route('/')
.get(allThoughts)
.post(thoughtCreate);

router.route('/:Id')
.get(oneThought)
.delete(deleteThought)

module.exports = router;