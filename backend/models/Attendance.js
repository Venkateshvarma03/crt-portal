import mongoose from 'mongoose'

const attendanceSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    trainer: { type: mongoose.Schema.Types.ObjectId, ref: 'Trainer', required: true },
    batch: { type: String, required: true }, // e.g. "CSE A - 2026"
    subject: { type: String, required: true }, // e.g. "DSA - Graphs"
    date: { type: Date, required: true, default: Date.now },
    status: { type: String, enum: ['present', 'absent', 'late'], required: true },
  },
  { timestamps: true }
)

// Prevent marking the same student twice for the same subject+date
attendanceSchema.index({ student: 1, subject: 1, date: 1 }, { unique: true })

export default mongoose.model('Attendance', attendanceSchema)