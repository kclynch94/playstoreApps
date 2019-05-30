const express = require('express');
const morgan = require('morgan');

const app = express();

const apps = require('./playstoreApps.js');

app.use(morgan('common'));

app.get('/apps', (req, res) => {
    const { sort, genre } = req.query;
    let results = apps;

    if(sort) {
        if(!['Rating', 'App'].includes(sort)) {
            return res
                .status(400)
                .send('Sort must be one of rating or app');
        }
    }

    if(genre) {
        if(!['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'].includes(genre)) {
            return res
                .status(400)
                .send('Genre must be one of Action, Puzzle, Strategy, Casual, Arcade, or Card')
        }
    }

    if(sort) {
        results
            .sort((a, b) => {
                return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
            });
    }

    if(genre) {
        results = results 
            .filter(app =>
                app
                    .Genres
                    .includes(genre));
    }

    res
        .json(results)
            
});

app.listen(8000, () => {
    console.log('Server started on PORT 8000');
});