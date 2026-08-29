import express from 'express'
import {
  registerStudent,
  loginStudent,
  registerTrainer,
  loginTrainer,
  registerAdmin,
  loginAdmin,
} from '../controllers/authController.js'

const router = express.Router()

router.post('/student/register', registerStudent)
router.post('/student/login', loginStudent)

router.post('/trainer/register', registerTrainer)
router.post('/trainer/login', loginTrainer)

router.post('/admin/register', registerAdmin)
router.post('/admin/login', loginAdmin)

export default router