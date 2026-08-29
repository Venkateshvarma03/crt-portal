import jwt from 'jsonwebtoken'
import Student from '../models/Student.js'
import Trainer from '../models/Trainer.js'
import Admin from '../models/Admin.js'

const roleModels = {
  student: Student,
  trainer: Trainer,
  admin: Admin,
}

export const protect = async (req, res, next) => {
  let token

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1]

      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      const Model = roleModels[decoded.role]

      if (!Model) {
        return res.status(401).json({ message: 'Invalid token role' })
      }

      req.user = await Model.findById(decoded.id).select('-password')
      req.role = decoded.role

      if (!req.user) {
        return res.status(401).json({ message: 'User not found' })
      }

      next()
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' })
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' })
  }
}

export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.role)) {
      return res.status(403).json({ message: `Access denied for role: ${req.role}` })
    }
    next()
  }
}