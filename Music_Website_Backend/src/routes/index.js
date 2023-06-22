const userRouter = require('./User');


function routes(app) {
    app.use('/user', userRouter);
    
    app.get('/', (req, res) => {
        res.send('Hello World!');
    });
}

module.exports = routes;
