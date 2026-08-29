import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    rollNumber: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    branch: { type: String, required: true },
    section: { type: String, required: true },
    year: { type: String, required: true },
    attendance: { type: Number, default: 0 },
    assignments: { type: Number, default: 0 },
    codingActivity: { type: Number, default: 0 },
    readiness: { type: Number, default: 0 },
    codingProfiles: [
      {
        platform: { type: String, required: true },
        username: { type: String, required: true },
        stat: { type: String },
        extra: { type: String },
      },
    ],
  },
  { timestamps: true }
)

studentSchema.pre('save', async function () {
  if (!this.isModified('password')) return
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

studentSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

export default mongoose.model('Student', studentSchema)