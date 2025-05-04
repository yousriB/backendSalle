const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'yousrii@gmail.com',
    pass: 'your_app_password'
  }
});

const sendApprovalEmail = async (to, bookingTitle, bookingDate) => {
  const mailOptions = {
    from: 'yousrii@gmail.com',
    to,
    subject: '🎉 Your Booking Has Been Approved!',
    html: `
      <h2>Good News!</h2>
      <p>Your booking <strong>${bookingTitle}</strong> scheduled on <strong>${bookingDate}</strong> has been <span style="color:green;">approved</span>.</p>
      <p>Thank you for using our platform.</p>
    `
  };

  return transporter.sendMail(mailOptions);
};

module.exports = { sendApprovalEmail };
