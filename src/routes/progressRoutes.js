const express = require('express');
const router = express.Router();
const progressController = require('../controllers/progressController');

router.get('/:userId', progressController.getProgressByUserId);
router.post('/', progressController.upsertProgress);

module.exports = router;
