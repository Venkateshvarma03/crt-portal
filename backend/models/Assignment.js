import mongoose from 'mongoose'

const assignmentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    batch: { type: String, required: true },
    trainer: { type: mongoose.Schema.Types.ObjectId, ref: 'Trainer', required: true },
    dueDate: { type: Date, required: true },
  },
  { timestamps: true }
)

export default mongoose.model('Assignment', assignmentSchema)