import Student from '../models/Student.js'

export const createStudent = async (req, res) => {
  try {
    const student = await Student.create(req.body)
    res.status(201).json(student)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export const getStudents = async (req, res) => {
  try {
    const students = await Student.find()
    res.status(200).json(students)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id)
    if (!student) return res.status(404).json({ message: 'Student not found' })
    res.status(200).json(student)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getMyProfile = async (req, res) => {
  try {
    res.status(200).json(req.user)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const upsertCodingProfile = async (req, res) => {
  try {
    const { platform, username, stat, extra } = req.body
    const student = await Student.findById(req.user._id)

    const existingIndex = student.codingProfiles.findIndex((p) => p.platform === platform)
    if (existingIndex >= 0) {
      student.codingProfiles[existingIndex] = { platform, username, stat, extra }
    } else {
      student.codingProfiles.push({ platform, username, stat, extra })
    }

    await student.save()
    res.status(200).json(student.codingProfiles)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export const getCodingProfiles = async (req, res) => {
  try {
    const student = await Student.findById(req.user._id)
    res.status(200).json(student.codingProfiles)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getStudentsByBatch = async (req, res) => {
  try {
    const { branch, section, year } = req.query
    const query = {}
    if (branch) query.branch = branch
    if (section) query.section = section
    if (year) query.year = year

    const students = await Student.find(query).select('-password')
    res.status(200).json(students)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc   Get leaderboard for logged-in student's batch, ranked by readiness
// @route  GET /api/students/leaderboard
// @access Student
export const getLeaderboard = async (req, res) => {
  try {
    const { branch, section, year } = req.user
    const students = await Student.find({ branch, section, year })
      .select('name rollNumber readiness attendance assignments codingActivity')
      .sort({ readiness: -1 })
    res.status(200).json(students)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}