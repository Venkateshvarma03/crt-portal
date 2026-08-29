import Attendance from '../models/Attendance.js'
import Student from '../models/Student.js'

// @desc   Trainer marks attendance for multiple students at once
// @route  POST /api/attendance/mark
// @access Trainer only
export const markAttendance = async (req, res) => {
  try {
    const { batch, subject, date, records } = req.body
    // records = [{ studentId, status }, { studentId, status }, ...]

    const trainerId = req.user._id

    const entries = await Promise.all(
      records.map(async (r) => {
        return Attendance.findOneAndUpdate(
          { student: r.studentId, subject, date },
          {
            student: r.studentId,
            trainer: trainerId,
            batch,
            subject,
            date,
            status: r.status,
          },
          { upsert: true, new: true, setDefaultsOnInsert: true }
        )
      })
    )

    // Recalculate attendance % for each affected student
    await Promise.all(records.map((r) => recalculateAttendance(r.studentId)))

    res.status(201).json({ message: 'Attendance marked successfully', entries })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// @desc   Get attendance records for a specific batch + date (trainer view)
// @route  GET /api/attendance/batch?batch=CSE A - 2026&date=2025-05-10
// @access Trainer only
export const getBatchAttendance = async (req, res) => {
  try {
    const { batch, date } = req.query
    const query = { batch }
    if (date) {
      const start = new Date(date)
      const end = new Date(date)
      end.setDate(end.getDate() + 1)
      query.date = { $gte: start, $lt: end }
    }
    const records = await Attendance.find(query).populate('student', 'name rollNumber')
    res.status(200).json(records)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc   Get logged-in student's own attendance history
// @route  GET /api/attendance/me
// @access Student only
export const getMyAttendance = async (req, res) => {
  try {
    const records = await Attendance.find({ student: req.user._id }).sort({ date: -1 })
    res.status(200).json(records)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Helper: recalculates and saves a student's attendance percentage
const recalculateAttendance = async (studentId) => {
  const records = await Attendance.find({ student: studentId })
  if (records.length === 0) return

  const presentCount = records.filter((r) => r.status === 'present' || r.status === 'late').length
  const percentage = Math.round((presentCount / records.length) * 100)

  await Student.findByIdAndUpdate(studentId, { attendance: percentage })
}

// @desc   Get all attendance records (admin view, optional filters)
// @route  GET /api/attendance?batch=CSE A - 2026&date=2026-08-15
// @access Admin
export const getAllAttendance = async (req, res) => {
  try {
    const { batch, date } = req.query
    const query = {}
    if (batch) query.batch = batch
    if (date) {
      const start = new Date(date)
      const end = new Date(date)
      end.setDate(end.getDate() + 1)
      query.date = { $gte: start, $lt: end }
    }
    const records = await Attendance.find(query)
      .populate('student', 'name rollNumber')
      .populate('trainer', 'name')
      .sort({ date: -1 })
      .limit(100)
    res.status(200).json(records)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}