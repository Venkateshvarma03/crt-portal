import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import RegisterTrainer from './pages/RegisterTrainer'
import RegisterAdmin from './pages/RegisterAdmin'
import NotFound from './pages/NotFound'

import StudentDashboard from './pages/student/StudentDashboard'
import MyProfile from './pages/student/MyProfile'
import MyAttendance from './pages/student/MyAttendance'
import MyAssignments from './pages/student/MyAssignments'
import ManageCodingProfiles from './pages/student/ManageCodingProfiles'
import StudentSettings from './pages/student/StudentSettings'
import MyProgress from './pages/student/MyProgress'
import Leaderboard from './pages/student/Leaderboard'
import StudentNotifications from './pages/student/StudentNotifications'
import Resources from './pages/student/Resources'

import TrainerDashboard from './pages/trainer/TrainerDashboard'
import CreateAssignment from './pages/trainer/CreateAssignment'
import TrainerAssignments from './pages/trainer/TrainerAssignments'
import TrainerSubmissions from './pages/trainer/TrainerSubmissions'
import MarkAttendance from './pages/trainer/MarkAttendance'
import TrainerStudents from './pages/trainer/TrainerStudents'
import CreateSchedule from './pages/trainer/CreateSchedule'
import MyBatches from './pages/trainer/MyBatches'
import TrainerReports from './pages/trainer/TrainerReports'
import TrainerNotifications from './pages/trainer/TrainerNotifications'
import TrainerSettings from './pages/trainer/TrainerSettings'

import AdminDashboard from './pages/admin/AdminDashboard'
import AdminStudents from './pages/admin/AdminStudents'
import AdminTrainers from './pages/admin/AdminTrainers'
import AdminBatches from './pages/admin/AdminBatches'
import AdminAttendance from './pages/admin/AdminAttendance'
import AdminAssignments from './pages/admin/AdminAssignments'
import AdminCodingProfiles from './pages/admin/AdminCodingProfiles'
import AdminReports from './pages/admin/AdminReports'
import AdminAnalytics from './pages/admin/AdminAnalytics'
import AdminNotifications from './pages/admin/AdminNotifications'
import AdminSettings from './pages/admin/AdminSettings'

import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register/trainer" element={<RegisterTrainer />} />
        <Route path="/register/admin" element={<RegisterAdmin />} />

        {/* Student routes */}
        <Route
          path="/student"
          element={
            <ProtectedRoute allowedRole="student">
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/profile"
          element={
            <ProtectedRoute allowedRole="student">
              <MyProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/attendance"
          element={
            <ProtectedRoute allowedRole="student">
              <MyAttendance />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/assignments"
          element={
            <ProtectedRoute allowedRole="student">
              <MyAssignments />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/coding"
          element={
            <ProtectedRoute allowedRole="student">
              <ManageCodingProfiles />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/settings"
          element={
            <ProtectedRoute allowedRole="student">
              <StudentSettings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/progress"
          element={
            <ProtectedRoute allowedRole="student">
              <MyProgress />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/leaderboard"
          element={
            <ProtectedRoute allowedRole="student">
              <Leaderboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/notifications"
          element={
            <ProtectedRoute allowedRole="student">
              <StudentNotifications />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/resources"
          element={
            <ProtectedRoute allowedRole="student">
              <Resources />
            </ProtectedRoute>
          }
        />

        {/* Trainer routes */}
        <Route
          path="/trainer"
          element={
            <ProtectedRoute allowedRole="trainer">
              <TrainerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/trainer/assignments"
          element={
            <ProtectedRoute allowedRole="trainer">
              <TrainerAssignments />
            </ProtectedRoute>
          }
        />
        <Route
          path="/trainer/assignments/new"
          element={
            <ProtectedRoute allowedRole="trainer">
              <CreateAssignment />
            </ProtectedRoute>
          }
        />
        <Route
          path="/trainer/submissions"
          element={
            <ProtectedRoute allowedRole="trainer">
              <TrainerSubmissions />
            </ProtectedRoute>
          }
        />
        <Route
          path="/trainer/attendance"
          element={
            <ProtectedRoute allowedRole="trainer">
              <MarkAttendance />
            </ProtectedRoute>
          }
        />
        <Route
          path="/trainer/students"
          element={
            <ProtectedRoute allowedRole="trainer">
              <TrainerStudents />
            </ProtectedRoute>
          }
        />
        <Route
          path="/trainer/schedule/new"
          element={
            <ProtectedRoute allowedRole="trainer">
              <CreateSchedule />
            </ProtectedRoute>
          }
        />
        <Route
          path="/trainer/batches"
          element={
            <ProtectedRoute allowedRole="trainer">
              <MyBatches />
            </ProtectedRoute>
          }
        />
        <Route
          path="/trainer/reports"
          element={
            <ProtectedRoute allowedRole="trainer">
              <TrainerReports />
            </ProtectedRoute>
          }
        />
        <Route
          path="/trainer/notifications"
          element={
            <ProtectedRoute allowedRole="trainer">
              <TrainerNotifications />
            </ProtectedRoute>
          }
        />
        <Route
          path="/trainer/settings"
          element={
            <ProtectedRoute allowedRole="trainer">
              <TrainerSettings />
            </ProtectedRoute>
          }
        />

        {/* Admin routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/students"
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminStudents />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/trainers"
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminTrainers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/batches"
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminBatches />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/attendance"
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminAttendance />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/assignments"
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminAssignments />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/coding"
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminCodingProfiles />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/reports"
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminReports />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/analytics"
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminAnalytics />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/notifications"
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminNotifications />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/settings"
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminSettings />
            </ProtectedRoute>
          }
        />

        {/* 404 - must stay last */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App