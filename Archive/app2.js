const { count } = require('console');
const express = require('express')
const fs = require('fs');

const app = express();
app.use(express.json())

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/tours-simple.json`))

const getAllTours = (req, res) => {
    res.status(200).json({
        status: 'success',
        count: tours.length,
        data: {
            tours: tours
        }
    })
};

const getTourById = (req, res) => {
    console.log(req.params);
    reqParamId = req.params.id * 1;

    const tour = tours.find(el => el.id === reqParamId);

    if (!tour) {
        return res.status(404).json({
            status: 'not found'
        })
    };
    res.status(200).json({
        status: 'success',
        data: {
            tour
        }
    })
};

const createTour = (req, res) => {
    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({ id: newId }, req.body);

    tours.push(newTour);

    fs.writeFile(`${__dirname}/dev-data/tours-simple.json`, JSON.stringify(tours), (err) => {
        if (!err) {
            res.status(201).json({
                status: 'success',
                data: {
                    tour: newTour
                }
            })
        }
    })
};

const patchTour = (req, res) => {
    console.log(req.params);
    reqParamId = req.params.id * 1;

    const tour = tours.find(el => el.id === reqParamId);

    if (!tour) {
        return res.status(404).json({
            status: 'not found'
        })
    };
    res.status(200).json({
        status: 'success',
        data: {
            tour: '<updated tour here>..'
        }
    })
};

const deleteTour = (req, res) => {
    console.log(req.params);
    reqParamId = req.params.id * 1;

    const tour = tours.find(el => el.id === reqParamId);

    if (!tour) {
        return res.status(404).json({
            status: 'not found',
            message: 'Invalid Id'
        })
    };
    res.status(200).json({
        status: 'success',
        data: null
    })
};

app.get('/api/v1/tours', getAllTours);
app.post('/api/v1/tours', createTour);
app.get('/api/v1/tours/:id', getTourById);
app.patch('/api/v1/tours/:id', patchTour);
app.delete('/api/v1/tours/:id',deleteTour);

const port = 3000;
app.listen(port, () => {
    console.log('app is listening on port 3000')
})

