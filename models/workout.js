const mongoose = require('mongoose')

const Schema = mongoose.Schema

const WorkoutSchema = new Schema({
    day: {
        type: Date,
        required: "Please enter a date.",
        default: Date.now
    },
    exercises: [
        {
            "_id": false,
            type: {
                type: String
            },
            name: {
                type: String
            },
            duration: {
                type: Number
            },
            distance: {
                type: Number
            },
            weight: {
                type: Number
            },
            reps: {
                type: Number
            },
            sets: {
                type: Number
            }
        }
    ]
})

WorkoutSchema.virtual("Duration").get(function () {
    let totalDuration = 0
    this.exercises.forEach((exercise) => {

        totalDuration += exercise.duration
    })
    return totalDuration
})

const Workout = mongoose.model("Workout", WorkoutSchema)

module.exports = Workout