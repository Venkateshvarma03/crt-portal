import dns from 'dns'
dns.setServers(['8.8.8.8', '8.8.4.4'])

import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import studentRoutes from './routes/studentRoutes.js'
import authRoutes from './routes/authRoutes.js'
import trainerRoutes from './routes/trainerRoutes.js'
import attendanceRoutes from './routes/attendanceRoutes.js'
import assignmentRoutes from './routes/assignmentRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
import scheduleRoutes from './routes/scheduleRoutes.js'
import notificationRoutes from './routes/notificationRoutes.js'

dotenv.config()
connectDB()

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('CRT Portal API is running...')
})

app.use('/api/students', studentRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/trainers', trainerRoutes)
app.use('/api/attendance', attendanceRoutes)
app.use('/api/assignments', assignmentRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/schedule', scheduleRoutes)
app.use('/api/notifications', notificationRoutes)

const PORT = process.env.PORT || 5000

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ message: 'Something went wrong on the server' })
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))