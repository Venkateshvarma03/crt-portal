import Student from '../models/Student.js'
import Trainer from '../models/Trainer.js'
import Admin from '../models/Admin.js'
import generateToken from '../utils/generateToken.js'

// ---------- STUDENT ----------

export const registerStudent = async (req, res) => {
  try {
    const { name, rollNumber, email, password, branch, section, year } = req.body

    const existing = await Student.findOne({ $or: [{ email }, { rollNumber }] })
    if (existing) {
      return res.status(400).json({ message: 'Student with this email or roll number already exists' })
    }

    const student = await Student.create({ name, rollNumber, email, password, branch, section, year })

    res.status(201).json({
      _id: student._id,
      name: student.name,
      rollNumber: student.rollNumber,
      email: student.email,
      branch: student.branch,
      section: student.section,
      year: student.year,
      token: generateToken(student._id, 'student'),
    })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export const loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body
    const student = await Student.findOne({ email })
    if (!student || !(await student.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }
    res.status(200).json({
      _id: student._id,
      name: student.name,
      rollNumber: student.rollNumber,
      email: student.email,
      branch: student.branch,
      section: student.section,
      year: student.year,
      token: generateToken(student._id, 'student'),
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// ---------- TRAINER ----------

export const registerTrainer = async (req, res) => {
  try {
    const { name, email, password, specialization, batches } = req.body

    const existing = await Trainer.findOne({ email })
    if (existing) {
      return res.status(400).json({ message: 'Trainer with this email already exists' })
    }

    const trainer = await Trainer.create({ name, email, password, specialization, batches })

    res.status(201).json({
      _id: trainer._id,
      name: trainer.name,
      email: trainer.email,
      specialization: trainer.specialization,
      batches: trainer.batches,
      token: generateToken(trainer._id, 'trainer'),
    })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export const loginTrainer = async (req, res) => {
  try {
    const { email, password } = req.body
    const trainer = await Trainer.findOne({ email })
    if (!trainer || !(await trainer.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }
    res.status(200).json({
      _id: trainer._id,
      name: trainer.name,
      email: trainer.email,
      specialization: trainer.specialization,
      batches: trainer.batches,
      token: generateToken(trainer._id, 'trainer'),
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// ---------- ADMIN ----------

export const registerAdmin = async (req, res) => {
  try {
    const { name, email, password, designation } = req.body

    const existing = await Admin.findOne({ email })
    if (existing) {
      return res.status(400).json({ message: 'Admin with this email already exists' })
    }

    const admin = await Admin.create({ name, email, password, designation })

    res.status(201).json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      designation: admin.designation,
      token: generateToken(admin._id, 'admin'),
    })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body
    const admin = await Admin.findOne({ email })
    if (!admin || !(await admin.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }
    res.status(200).json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      designation: admin.designation,
      token: generateToken(admin._id, 'admin'),
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}