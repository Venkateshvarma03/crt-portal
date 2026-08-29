import mongoose from 'mongoose'

const submissionSchema = new mongoose.Schema(
  {
    assignment: { type: mongoose.Schema.Types.ObjectId, ref: 'Assignment', required: true },
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    submittedAt: { type: Date, default: Date.now },
    status: { type: String, enum: ['submitted', 'pending', 'graded'], default: 'submitted' },
    grade: { type: Number, min: 0, max: 100 }, // set once trainer grades it
    fileUrl: { type: String }, // link to submitted file (optional for now)
  },
  { timestamps: true }
)

// One submission per student per assignment
submissionSchema.index({ assignment: 1, student: 1 }, { unique: true })

export default mongoose.model('Submission', submissionSchema)