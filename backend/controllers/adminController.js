import Student from '../models/Student.js'

export const getOverviewStats = async (req, res) => {
  try {
    const students = await Student.find()
    const total = students.length

    if (total === 0) {
      return res.status(200).json({
        totalStudents: 0,
        avgAttendance: 0,
        avgAssignments: 0,
        avgCodingActivity: 0,
        atRiskCount: 0,
      })
    }

    const avg = (key) => Math.round(students.reduce((sum, s) => sum + s[key], 0) / total)
    const atRiskCount = students.filter((s) => s.readiness < 40).length

    res.status(200).json({
      totalStudents: total,
      avgAttendance: avg('attendance'),
      avgAssignments: avg('assignments'),
      avgCodingActivity: avg('codingActivity'),
      atRiskCount,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getBatchPerformance = async (req, res) => {
  try {
    const students = await Student.find()

    const batches = {}
    students.forEach((s) => {
      const key = `${s.branch} ${s.section} - ${s.year}`
      if (!batches[key]) batches[key] = []
      batches[key].push(s)
    })

    const result = Object.entries(batches).map(([batchName, list]) => {
      const count = list.length
      const avg = (key) => Math.round(list.reduce((sum, s) => sum + s[key], 0) / count)
      const atRisk = list.filter((s) => s.readiness < 40).length

      return {
        batch: batchName,
        students: count,
        attendance: avg('attendance'),
        assignments: avg('assignments'),
        codingActivity: avg('codingActivity'),
        readiness: avg('readiness'),
        atRisk: `${atRisk} (${count > 0 ? ((atRisk / count) * 100).toFixed(1) : 0}%)`,
      }
    })

    res.status(200).json(result)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getAtRiskStudents = async (req, res) => {
  try {
    const students = await Student.find({ readiness: { $lt: 40 } })
      .select('name rollNumber readiness attendance updatedAt')
      .sort({ readiness: 1 })
    res.status(200).json(students)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}