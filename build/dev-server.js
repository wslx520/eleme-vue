const express = require('express')

const appData = require('../data.json')

const {seller, goods, ratings} = appData;

const Router = express.Router();
const app = express();
const port = 8000;


Router.get('/seller', (req, res) => {
    res.json({
        errno: 0,
        data: seller
    });
});

Router.get('/goods', (req, res) => {
    res.json({
        errno: 0,
        data: goods
    });
});

Router.get('/ratings', (req, res) => {
    res.json({
        errno: 0,
        data: ratings
    });
});


app.use('/api', Router);


app.listen(port, (err) =>{
    if (err) {
        return console.error(err);

    }
    console.log(`Listening at http://localhost:${port}`);
})

// "dev": "webpack-dev-server --inline --progress --config build/webpack.dev.conf.js",