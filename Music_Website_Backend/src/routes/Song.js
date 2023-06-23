const express = require('express');
const router = express.Router();
const songController = require('../app/controllers/SongController');
const bodyParser = require('body-parser');

router.use(bodyParser.json());
router.get('/get-all', songController.findAllSong);
router.post('/find-by-name', songController.findByName);

module.exports = router;
