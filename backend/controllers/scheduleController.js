import Schedule from '../models/Schedule.js'

// @desc   Trainer creates a class schedule entry
// @route  POST /api/schedule
// @access Trainer
export const createSchedule = async (req, res) => {
  try {
    const { batch, subject, date, startTime, endTime, room } = req.body
    const schedule = await Schedule.create({
      batch,
      subject,
      date,
      startTime,
      endTime,
      room,
      trainer: req.user._id,
    })
    res.status(201).json(schedule)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// @desc   Get upcoming classes for a batch (student view)
// @route  GET /api/schedule/upcoming?batch=CSE A - 2026
// @access Student
export const getUpcomingClasses = async (req, res) => {
  try {
    const { batch } = req.query
    const query = { date: { $gte: new Date() } }
    if (batch) query.batch = batch

    const classes = await Schedule.find(query).sort({ date: 1 }).limit(5)
    res.status(200).json(classes)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc   Get today's classes for a trainer's batch
// @route  GET /api/schedule/today?batch=CSE A - 2026
// @access Trainer
export const getTodayClasses = async (req, res) => {
  try {
    const { batch } = req.query
    const start = new Date()
    start.setHours(0, 0, 0, 0)
    const end = new Date()
    end.setHours(23, 59, 59, 999)

    const query = { date: { $gte: start, $lte: end } }
    if (batch) query.batch = batch

    const classes = await Schedule.find(query).sort({ date: 1 })
    res.status(200).json(classes)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}