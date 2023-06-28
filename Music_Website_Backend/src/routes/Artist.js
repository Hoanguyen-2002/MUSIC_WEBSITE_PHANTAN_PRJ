const express = require('express');
const router = express.Router();
const artistController = require('../app/controllers/ArtistController');
const bodyParser = require('body-parser');

router.use(bodyParser.json());
router.get('/get-all', artistController.getAllArtist);
router.post('/find-by-name', artistController.findByName);
router.post('/update-artist', artistController.updateArtist);
router.post('/add-artist', artistController.addArtist);
router.delete('/delete/:id', artistController.deleteArtist);

module.exports = router;
