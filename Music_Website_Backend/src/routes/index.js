const userRouter = require('./User');
const songRouter = require('./Song');

function routes(app) {
    app.use('/user', userRouter);
    app.use('/song', songRouter);
    
    app.get('/', (req, res) => {
        res.send('Hello World!');
    });
}

module.exports = routes;
