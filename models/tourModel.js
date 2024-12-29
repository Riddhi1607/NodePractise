const mongoose = require('mongoose')

const tourSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A Tour Must Have a Name'],
        unique: true
    },
    rating: {
        type: Number,
        default: 4.5
    },
    price: {
        type: Number,
        required: [true, 'A Tour must have a price']
    }
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports= Tour;