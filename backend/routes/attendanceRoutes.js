import express from 'express'
import { markAttendance, getBatchAttendance, getMyAttendance, getAllAttendance } from '../controllers/attendanceController.js'
import { protect, restrictTo } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/mark', protect, restrictTo('trainer'), markAttendance)
router.get('/batch', protect, restrictTo('trainer', 'admin'), getBatchAttendance)
router.get('/me', protect, restrictTo('student'), getMyAttendance)
router.get('/', protect, restrictTo('admin'), getAllAttendance)

export default router