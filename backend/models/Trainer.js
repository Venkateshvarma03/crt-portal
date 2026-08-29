import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const trainerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    specialization: { type: String }, // e.g. "DSA & Problem Solving"
    batches: [{ type: String }], // e.g. ["CSE A - 2026", "CSE B - 2026"]
  },
  { timestamps: true }
)

trainerSchema.pre('save', async function () {
  if (!this.isModified('password')) return
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

trainerSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

export default mongoose.model('Trainer', trainerSchema)