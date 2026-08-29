import Assignment from '../models/Assignment.js'
import Submission from '../models/Submission.js'
import Student from '../models/Student.js'

export const createAssignment = async (req, res) => {
  try {
    const { title, description, batch, dueDate } = req.body
    const assignment = await Assignment.create({
      title,
      description,
      batch,
      dueDate,
      trainer: req.user._id,
    })
    res.status(201).json(assignment)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export const getAssignments = async (req, res) => {
  try {
    const { batch } = req.query
    const query = batch ? { batch } : {}
    const assignments = await Assignment.find(query).sort({ dueDate: 1 })
    res.status(200).json(assignments)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const submitAssignment = async (req, res) => {
  try {
    const assignmentId = req.params.id
    const studentId = req.user._id

    const submission = await Submission.findOneAndUpdate(
      { assignment: assignmentId, student: studentId },
      { assignment: assignmentId, student: studentId, status: 'submitted', submittedAt: new Date(), fileUrl: req.body.fileUrl },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    )

    res.status(201).json(submission)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export const gradeSubmission = async (req, res) => {
  try {
    const { grade } = req.body
    const submission = await Submission.findByIdAndUpdate(
      req.params.submissionId,
      { grade, status: 'graded' },
      { new: true }
    )
    if (!submission) return res.status(404).json({ message: 'Submission not found' })

    await recalculateAssignmentScore(submission.student)

    res.status(200).json(submission)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export const getMySubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find({ student: req.user._id }).populate('assignment')
    res.status(200).json(submissions)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getSubmissionsForTrainer = async (req, res) => {
  try {
    const trainerAssignments = await Assignment.find({ trainer: req.user._id }).select('_id')
    const assignmentIds = trainerAssignments.map((a) => a._id)

    const submissions = await Submission.find({ assignment: { $in: assignmentIds } })
      .populate('student', 'name rollNumber')
      .populate('assignment', 'title dueDate')

    res.status(200).json(submissions)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const recalculateAssignmentScore = async (studentId) => {
  const submissions = await Submission.find({ student: studentId, status: 'graded' })
  if (submissions.length === 0) return

  const avg = submissions.reduce((sum, s) => sum + s.grade, 0) / submissions.length
  await Student.findByIdAndUpdate(studentId, { assignments: Math.round(avg) })
}

// @desc   Get all submissions across all trainers (admin view)
// @route  GET /api/assignments/submissions/all
// @access Admin
export const getAllSubmissionsAdmin = async (req, res) => {
  try {
    const submissions = await Submission.find()
      .populate('student', 'name rollNumber')
      .populate('assignment', 'title dueDate batch')
      .sort({ submittedAt: -1 })
      .limit(200)
    res.status(200).json(submissions)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}