import mongoose from 'mongoose'

const scheduleSchema = new mongoose.Schema(
  {
    batch: { type: String, required: true },
    subject: { type: String, required: true },
    trainer: { type: mongoose.Schema.Types.ObjectId, ref: 'Trainer', required: true },
    date: { type: Date, required: true },
    startTime: { type: String, required: true }, // e.g. "10:00 AM"
    endTime: { type: String, required: true }, // e.g. "11:30 AM"
    room: { type: String },
  },
  { timestamps: true }
)

export default mongoose.model('Schedule', scheduleSchema)