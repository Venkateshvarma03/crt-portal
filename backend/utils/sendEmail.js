import { Resend } from 'resend'

export const sendWelcomeEmail = async (toEmail, name, role) => {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    await resend.emails.send({
      from: 'CRT Portal <onboarding@resend.dev>',
      to: toEmail,
      subject: 'Welcome to CRT Portal!',
      html: '<h2>Welcome, ' + name + '!</h2><p>Your ' + role + ' account has been created successfully on CRT Portal.</p><p>You can now log in and start using your dashboard.</p><p>- CRT Portal Team</p>',
    })
  } catch (error) {
    console.error('Failed to send welcome email:', error.message)
  }
}