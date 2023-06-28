const express = require('express');
const router = express.Router();
const songController = require('../app/controllers/SongController');
const bodyParser = require('body-parser');

router.use(bodyParser.json());
router.get('/get-all', songController.getAllSong);
router.post('/find-by-name', songController.findByName);
router.post('/update-song', songController.updateSong);
router.delete('/delete/:id', songController.deleteSong);

module.exports = router;
