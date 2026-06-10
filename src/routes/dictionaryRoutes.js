const express = require('express');
const router = express.Router();
const dictionaryController = require('../controllers/dictionaryController');

router.get('/', dictionaryController.getWords);
router.post('/', dictionaryController.createWord);
router.put('/:id', dictionaryController.updateWord);
router.delete('/:id', dictionaryController.deleteWord);

module.exports = router;
