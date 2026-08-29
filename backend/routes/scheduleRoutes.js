import express from 'express'
import { createSchedule, getUpcomingClasses, getTodayClasses } from '../controllers/scheduleController.js'
import { protect, restrictTo } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/', protect, restrictTo('trainer'), createSchedule)
router.get('/upcoming', protect, restrictTo('student'), getUpcomingClasses)
router.get('/today', protect, restrictTo('trainer'), getTodayClasses)

export default router