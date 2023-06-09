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
            artistIds: String(songData?.artistIds),
            artist: String(songData?.artist),
            duration: String(songData?.duration),
            block: String(songData?.block),
            hasVideo: false,
            videoLink: String(songData?.videoLink),
            name: String(songData?.name),
            genre: String(songData?.genre),
        });
        console.log(newSong);
        newSong
            .save()
            .then((song) => {
                console.log('Added new song to database:', song);
                res.status(201).json({
                    message: 'song added successfully',
                    song,
                });
            })
            .catch((err) => {
                console.error('Error adding song to database:', err);
                res.status(500).json({ error: 'Failed to add song' });
            });
    }
    deleteSong(req, res, next) {
        songModel
            .deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    findByName(req, res) {
        const name = req.params.songName;
        songModel.find({ name }, (err, item) => {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            } else if (!item) {
                res.status(404).send('Item not found');
            } else {
                res.send(item);
            }
        });
    }

    updateSong(req, res) {
        const SongDataBody = req.body;
        const updatedSongData = {
            id: String(SongDataBody?.id),
            thumb: String(SongDataBody?.thumb),
            artist: String(SongDataBody?.artist),
            artistIds: String(SongDataBody?.artistIds),
            block: String(SongDataBody?.block),
            hasVideo: Boolean(SongDataBody?.hasVideo),
            videoLink: String(SongDataBody?.videoLink),
            name: String(SongDataBody?.name),
            genre: String(SongDataBody?.genre),
            
        };
  
        songModel
        .findOneAndUpdate(
            { patientID: SongDataBody.patientID },
            updatedSongData,
            { new: true },
        )
        .then((test) => {
            if (test) {
                console.log('Updated song in the database:', test);
                res.status(200).json({
                    message: 'Test case updated successfully',
                    test,
                });
            } else {
                console.log('Song not found');
                res.status(404).json({ error: 'Song not found' });
            }
        })
        .catch((err) => {
            console.error(
                'Error updating song in the database:',
                err,
            );
            res.status(500).json({
                error: 'Failed to update song',
            });
        });
    }
}

module.exports = new songController();
