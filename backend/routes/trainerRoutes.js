import express from 'express'
import { getMyTrainerProfile } from '../controllers/trainerController.js'
import { protect, restrictTo } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/me', protect, restrictTo('trainer'), getMyTrainerProfile)

export default router