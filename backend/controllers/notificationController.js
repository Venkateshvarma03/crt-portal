import Notification from '../models/Notification.js'

// @desc   Get logged-in user's notifications
// @route  GET /api/notifications/me
// @access Any logged-in user
export const getMyNotifications = async (req, res) => {
  try {
    const roleModelMap = { student: 'Student', trainer: 'Trainer', admin: 'Admin' }
    const notifications = await Notification.find({
      recipient: req.user._id,
      recipientModel: roleModelMap[req.role],
    })
      .sort({ createdAt: -1 })
      .limit(10)
    res.status(200).json(notifications)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}