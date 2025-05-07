const sendEmail = async (name, email) => {
  try {
    console.log('sendEmail', name, email);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Email sending failed');
  }
};

export default sendEmail;
