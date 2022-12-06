const router = require('express').Router();

const{allThoughts}= require('../../controllers/thought_controller');

router.route('/')
.get(allThoughts)
.post(createThought);