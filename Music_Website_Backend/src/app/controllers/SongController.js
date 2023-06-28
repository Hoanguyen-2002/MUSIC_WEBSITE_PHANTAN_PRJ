const songModel = require('../models/SongModel');

class songController {
    getAllSong(req, res) {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
    
        songModel.countDocuments({}, function (err, count) {
            if (err) {
                return res.status(500).json({ error: 'Error!!!' });
            }
    
            songModel
                .find({})
                .skip(skip)
                .limit(limit)
                .exec(function (err, songModels) {
                    if (err) {
                        return res.status(500).json({ error: 'Error!!!' });
                    }
    
                    const totalPages = Math.ceil(count / limit);
    
                    res.json({
                        songModels,
                        currentPage: page,
                        totalPages,
                    });
                });
        });
    }

    findByName(req, res) {
        const songName = req.body.name;
        songModel.find({ songName }, (err, items) => {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            } else if (items.length === 0) {
                res.status(404).send('No items found');
            } else {
                res.json(items);
            }
        });
    }

    addSong(req, res) {
        console.log(req.body);
        const songData = req.body;
        const newSong = new songModel({
            id: String(songData?.id),
            thumb: String(songData?.thumb),
            artist: String(songData?.artist),
            testName: String(songData?.testName),
            primaryTissue: String(songData?.primaryTissue),
            avaliable: false,
        });
        console.log(newSong);
        newSong
            .save()
            .then((test) => {
                console.log('Added new test case to database:', test);
                res.status(201).json({
                    message: 'Test case added successfully',
                    test,
                });
            })
            .catch((err) => {
                console.error('Error adding test case to database:', err);
                res.status(500).json({ error: 'Failed to add test case' });
            });
    }
}

module.exports = new songController();
