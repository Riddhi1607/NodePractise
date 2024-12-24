const express = require('express')
const fs = require('fs');
const morgan = require('morgan');


const app = express();
app.use(express.json())

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/tours-simple.json`))

const getAllTours = (req, res) => {
    res.status(200).json({
        status: 'success',
        requestedAt: req.requestedAt,
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
        requestedAt: req.requestedAt,
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
                requestedAt: req.requestedAt,
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

const getAllUsers = (req, res) => {
    res.status(500).json({
        status: "Error",
        message: "Api is not developed yet"
    });
};
const createUser = (req, res) => {
    res.status(500).json({
        status: "Error",
        message: "Api is not developed yet"
    });
};
const getUserById = (req, res) => {
    res.status(500).json({
        status: "Error",
        message: "Api is not developed yet"
    });
};
const patchUser = (req, res) => {
    res.status(500).json({
        status: "Error",
        message: "Api is not developed yet"
    });
};
const deleteUser = (req, res) => {
    res.status(500).json({
        status: "Error",
        message: "Api is not developed yet"
    });
};

// Custom Middlewares
app.use((req, res, next) => {
    //console.log(req);
    if (req.body) {
        console.log(req.body);
    };
    if (req.params) {
        console.log(req.params);
    };
    next();
});

app.use((req, res, next) => {
    req.requestedAt = new Date().toISOString();
    next();
});

app.use(morgan('dev'));
////////////////////////////////////////

const tourRouter = express.Router();
tourRouter.route('/').get(getAllTours).post(createTour)
tourRouter.route('/:id').get(getTourById).patch(patchTour).delete(deleteTour)

const userRouter = express.Router();
userRouter.route('/').get(getAllUsers).post(createUser)
userRouter.route('/:id').get(getUserById).patch(patchUser).delete(deleteUser)

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

const port = 3000;
app.listen(port, () => {
    console.log('app is listening on port 3000')
})

