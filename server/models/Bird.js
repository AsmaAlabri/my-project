import mongoose from "mongoose";

const birdSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    breed: {
        type: String,
        required: true,
    },

    age: {
        type: Number,
        required: true,
    },

    gender: {
        type: String,
        required: true,
    },

    city: {
        type: String,
        required: true,
    },

    image: {
        type: String,
        required: true,
    },

    vaccinated: {
        type: Boolean,
        default: false,
    },

    neutered: {
        type: Boolean,
        default: false,
    },

    available: {
        type: Boolean,
        default: true,
    },

    latitude: {
        type: Number,
        required: true,
    },

    longitude: {
        type: Number,
        required: true,
    }
});

const Bird = mongoose.model("Bird", birdSchema);

export default Bird;