const nodemailer = require('nodemailer'); // npm install nodemailer

module.exports.handler = async (event) => {
  try {
    const { to, subject, text } = JSON.parse(event.body);

    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'your-email@gmail.com',
        pass: 'your-app-password',
      },
    });

    await transporter.sendMail({
      from: 'your-email@gmail.com',
      to,
      subject,
      text,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email sent successfully' }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
