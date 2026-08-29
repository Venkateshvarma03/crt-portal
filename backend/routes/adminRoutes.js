import express from 'express'
import { getOverviewStats, getBatchPerformance, getAtRiskStudents } from '../controllers/adminController.js'
import { protect, restrictTo } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/overview', protect, restrictTo('admin'), getOverviewStats)
router.get('/batch-performance', protect, restrictTo('admin'), getBatchPerformance)
router.get('/at-risk', protect, restrictTo('admin'), getAtRiskStudents)

export default router