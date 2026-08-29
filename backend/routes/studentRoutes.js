import express from 'express'
import {
  createStudent,
  getStudents,
  getStudentById,
  getMyProfile,
  upsertCodingProfile,
  getCodingProfiles,
  getStudentsByBatch,
  getLeaderboard,
} from '../controllers/studentController.js'
import { protect, restrictTo } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/', createStudent)
router.get('/', getStudents)
router.get('/me', protect, getMyProfile)
router.get('/coding-profiles', protect, restrictTo('student'), getCodingProfiles)
router.post('/coding-profiles', protect, restrictTo('student'), upsertCodingProfile)
router.get('/batch', protect, restrictTo('trainer', 'admin'), getStudentsByBatch)
router.get('/:id', getStudentById)
router.get('/leaderboard', protect, restrictTo('student'), getLeaderboard)

export default router