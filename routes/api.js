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

router.get('/api/workouts/range', async (req, res) => {
    try {
        const theWorkouts = await Workout.find({}).limit(7)

        let allWorkout = theWorkouts.map(workout => {
            let totalDuration = 0
            workout.exercises.forEach(exercise => {
                totalDuration += exercise.duration
            })
            return { ...workout._doc, totalDuration }
        })
        res.json(allWorkout)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router