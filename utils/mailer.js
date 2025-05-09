const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'bks927680@gmail.com',
    pass: 'trlupxhhvywwoqjt' // Use Gmail App Password
  }
});

const templates = {
  registration: ({ name }) => ({
    subject: 'Welcome to Elegant Events!',
    html: `
      <div style="font-family:Arial,sans-serif;line-height:1.6">
        <h2>Welcome, ${name}!</h2>
        <p>Thank you for registering with <strong>Elegant Events</strong>.</p>
        <p>We're excited to help you create unforgettable memories.</p>
        <p style="margin-top:20px;">Need help? Just reply to this email.</p>
      </div>
    `
  }),

  bookingApproval: ({ bookingTitle, bookingDate }) => ({
    subject: 'Your Booking Has Been Approved!',
    html: `
      <div style="font-family:Arial,sans-serif;line-height:1.6">
        <h2>Good News!</h2>
        <p>Your booking <strong>${bookingTitle}</strong> scheduled on <strong>${bookingDate}</strong> has been <span style="color:green;">approved</span>.</p>
        <p>We look forward to serving you.</p>
      </div>
    `
  }),

  bookingRejection: ({ bookingTitle, bookingDate }) => ({
    subject: 'Your Booking Was Rejected',
    html: `
      <div style="font-family:Arial,sans-serif;line-height:1.6">
        <h2>We're Sorry</h2>
        <p>Your booking <strong>${bookingTitle}</strong> scheduled on <strong>${bookingDate}</strong> has been <span style="color:red;">rejected</span>.</p>
        <p>If you believe this was a mistake or want to modify your booking, please get in touch with us.</p>
      </div>
    `
  })
};

const sendEmail = async (to, type, data = {}) => {
  if (!templates[type]) throw new Error(`Unknown email type: ${type}`);

  const { subject, html } = templates[type](data);

  const mailOptions = {
    from: '"Elegant Events" <bks927680@gmail.com>', // ✅ Add display name
    to,
    subject,
    html
  };

  return transporter.sendMail(mailOptions);
};

module.exports = { sendEmail };
