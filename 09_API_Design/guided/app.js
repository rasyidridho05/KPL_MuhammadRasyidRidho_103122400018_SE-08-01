const express = require('express');
const { swaggerUi, specs } = require('./swagger');

const app = express();

app.use(express.json());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));

/**
    * @swagger
* /:get:
    *   summary: Hello Word 
    *   responses:
    * 200:
    *  description: Success
*/

const PORT = 8000;
const HOSTNAME = "localhost";

const DataMovie = [];

app.get('/movies', (req, res) => {
    return res.status(200).json({
        data: DataMovie
    });
});

app.post('/movies', (req, res) => {
    const newMovie = {
        id: DataMovie.length + 1,
        title: req.body.title,
        genre: req.body.genre,
        year: req.body.year
    };

    DataMovie.push(newMovie);

    return res.status(201).json({
        message: "Movie created successfully",
        data: newMovie
    });
});

app.get('/', (req, res) => {
    return res.status(200).send('Hello World!');
});

app.listen(PORT, HOSTNAME, () => {
    console.log(`Server is running on http://${HOSTNAME}:${PORT}`);
});