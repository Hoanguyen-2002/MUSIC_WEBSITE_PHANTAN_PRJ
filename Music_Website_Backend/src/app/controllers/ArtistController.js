const artistModel = require('../models/ArtistModel');

class artistController {
    getAllArtist(req, res) {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
    
        artistModel.countDocuments({}, function (err, count) {
            if (err) {
                return res.status(500).json({ error: 'Error!!!' });
            }
    
            artistModel
                .find({})
                .skip(skip)
                .limit(limit)
                .exec(function (err, artistModels) {
                    if (err) {
                        return res.status(500).json({ error: 'Error!!!' });
                    }
    
                    const totalPages = Math.ceil(count / limit);
    
                    res.json({
                        artistModels,
                        currentPage: page,
                        totalPages,
                    });
                });
        });
    }

    findByName(req, res) {
        const artistName = req.body.name;
        artistModel.find({ artistName }, (err, items) => {
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

    addArtist(req, res) {
        console.log(req.body);
        const artistData = req.body;
        const newArtist = new artistModel({
            id: String(artistData?.id),
            name: String(artistData?.name),
            link: String(artistData?.link),
            cover: String(artistData?.cover),
            thumbnail: String(artistData?.thumbnail),
        });
        console.log(newArtist);
        newArtist
            .save()
            .then((test) => {
                console.log('Added new artist to database:', test);
                res.status(201).json({
                    message: 'Artist added successfully',
                    test,
                });
            })
            .catch((err) => {
                console.error('Error adding Artist to database:', err);
                res.status(500).json({ error: 'Failed to add Artist' });
            });
    }
    deleteArtist(req, res, next) {
        artistModel
            .deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    findByName(req, res) {
        const name = req.params.songName;
        artistModel.find({ name }, (err, item) => {
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

    updateArtist(req, res) {
        const artistDataBody = req.body;
        const updatedartistData = {
            id: String(artistDataBody?.id),
            name: String(artistDataBody?.name),
            link: String(artistDataBody?.link),
            cover: String(artistDataBody?.cover),
            thumbnail: String(artistDataBody?.thumbnail),
        };
  
        artistModel
        .findOneAndUpdate(
            { name: artistDataBody.name },
            updatedartistData,
            { new: true },
        )
        .then((test) => {
            if (test) {
                console.log('Updated song in the database:', test);
                res.status(200).json({
                    message: 'Artist updated successfully',
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

module.exports = new artistController();
