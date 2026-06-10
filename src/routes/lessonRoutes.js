const express = require('express');
const router = express.Router();
const unitController = require('../controllers/unitController');
const questionController = require('../controllers/questionController');

router.get('/', unitController.getLessons);
router.post('/', unitController.createLesson);
router.put('/:id', unitController.updateLesson);
router.delete('/:id', unitController.deleteLesson);
router.get('/:id/questions', questionController.getQuestionsByLessonId);

module.exports = router;
