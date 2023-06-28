const userRouter = require('./User');
const songRouter = require('./Song');
const artistRouter = require('./Artist');

function routes(app) {
    app.use('/user', userRouter);
    app.use('/song', songRouter);
    app.use('/artist', artistRouter);

    app.get('/', (req, res) => {
        res.send('Hello World!');
    });
}

module.exports = routes;
