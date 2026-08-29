import express from 'express'
import {
  createAssignment,
  getAssignments,
  submitAssignment,
  gradeSubmission,
  getMySubmissions,
  getSubmissionsForTrainer,
  getAllSubmissionsAdmin,
} from '../controllers/assignmentController.js'
import { protect, restrictTo } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/', protect, restrictTo('trainer'), createAssignment)
router.get('/', protect, getAssignments)
router.post('/:id/submit', protect, restrictTo('student'), submitAssignment)
router.put('/submissions/:submissionId/grade', protect, restrictTo('trainer'), gradeSubmission)
router.get('/submissions/me', protect, restrictTo('student'), getMySubmissions)
router.get('/submissions/trainer', protect, restrictTo('trainer'), getSubmissionsForTrainer)
router.get('/submissions/all', protect, restrictTo('admin'), getAllSubmissionsAdmin)

export default router