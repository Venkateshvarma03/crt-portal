export const adminStats = [
  { label: 'Total Students', value: '216', trend: { direction: 'up', value: '100%' } },
  { label: 'Avg. Attendance', value: '82.4%', trend: { direction: 'up', value: '4.7%' } },
  { label: 'Avg. Assignment', value: '76.1%', trend: { direction: 'up', value: '6.3%' } },
  { label: 'Avg. Coding Activity', value: '68.7%', trend: { direction: 'up', value: '8.1%' } },
  { label: 'At Risk Students', value: '28', trend: { direction: 'up', value: '12.8%' }, valueColor: 'text-red-500' },
]

export const readinessDistribution = {
  present: 130, // >=80
  good: 67,     // 60-79
  average: 40,  // 40-59
  atRisk: 20,   // 20-39
  behind: 0,    // <20
  total: 216,
}

export const trendOverTime = [
  { date: 'Jul 01', attendance: 79, assignments: 68, coding: 60 },
  { date: 'Jul 08', attendance: 80, assignments: 70, coding: 63 },
  { date: 'Jul 15', attendance: 81, assignments: 73, coding: 65 },
  { date: 'Jul 22', attendance: 80, assignments: 74, coding: 67 },
  { date: 'Jul 29', attendance: 82, assignments: 75, coding: 68 },
  { date: 'Aug 05', attendance: 82.4, assignments: 76.1, coding: 68.7 },
]

export const batchPerformance = [
  { batch: 'CSE A - 2026', students: 72, attendance: '85.3%', assignments: '78.6%', coding: '71.2%', readiness: 79, atRisk: '6 (8.3%)' },
  { batch: 'CSE B - 2026', students: 68, attendance: '80.1%', assignments: '73.2%', coding: '64.5%', readiness: 72, atRisk: '11 (16.2%)' },
  { batch: 'CSE C - 2026', students: 76, attendance: '81.8%', assignments: '74.1%', coding: '66.3%', readiness: 74, atRisk: '9 (11.8%)' },
]

export const studentsAtRisk = [
  { name: 'Vikram Joshi', id: '21CS5005', readiness: 34, attendance: '52%', lastActive: '3 days ago' },
  { name: 'Karan Mehta', id: '21CS5006', readiness: 28, attendance: '48%', lastActive: '5 days ago' },
  { name: 'Pooja Sharma', id: '21CS5045', readiness: 32, attendance: '55%', lastActive: '4 days ago' },
  { name: 'Mohit Singh', id: '21CS5078', readiness: 35, attendance: '58%', lastActive: '6 days ago' },
]

export const quickActions = [
  'Export Attendance Report',
  'Send Reminder to At Risk Students',
  'Sync Coding Profiles',
  'Generate CRT Progress Report',
]