const { count } = require('console');
const express = require('express')
const fs = require('fs');

const app = express();
app.use(express.json())

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/tours-simple.json`))

app.get('/api/v1/tours', (req, res) => {
    res.status(200).json({
        status: 'success',
        count: tours.length,
        data: {
            tours: tours
        }
    })
});

app.post('/api/v1/tours', (req, res) => {
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
})

app.get('/api/v1/tours/:id',(req,res)=>{
    console.log(req.params);
    reqParamId= req.params.id * 1;

    const tour = tours.find(el=>el.id === reqParamId);

    if(!tour){
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
})

app.patch('/api/v1/tours/:id',(req,res)=>{
    console.log(req.params);
    reqParamId= req.params.id * 1;

    const tour = tours.find(el=>el.id === reqParamId);

    if(!tour){
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
})

app.delete('/api/v1/tours/:id',(req,res)=>{
    console.log(req.params);
    reqParamId= req.params.id * 1;

    const tour = tours.find(el=>el.id === reqParamId);

    if(!tour){
        return res.status(404).json({
            status: 'not found',
            message: 'Invalid Id'
        })
    };
    res.status(200).json({
        status: 'success',
        data: null
    })
})

const port = 3000;
app.listen(port, () => {
    console.log('app is listening on port 3000')
})

