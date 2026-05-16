import mongoose from "mongoose";

const dogSchema = new mongoose.Schema(
{
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
        enum: ["Male", "Female"],
        required: true,
    },

    city: {
        type: String,
        required: true,
    },

    image: {
        type: String,
        default: "",
    },

    available: {
        type: Boolean,
        default: true,
    },

    vaccinated: {
        type: Boolean,
        default: false,
    },

    neutered: {
        type: Boolean,
        default: false,
    },

    latitude: {
        type: Number,
        required: true,
    },

    longitude: {
        type: Number,
        required: true,
    },

    description: {
        type: String,
        default: "",
    }
},
{
    timestamps: true,
}
);

const Dog = mongoose.model("Dog", dogSchema);

export default Dog;
