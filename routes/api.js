const Workout = require('../models/Workout')
const router = require('express').Router()


router.get('/api/workouts', async (req, res) => {
    const workoutData = await Workout.find()
    let aggWorkout = workoutData.map(workout => {
        let duration = 0
        workout.exercises.forEach(exercise => {
            duration += exercise.duration
        })
        return { ...workout._doc, duration }
    })
    res.json(aggWorkout)
})

module.exports = router