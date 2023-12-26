const express = require('express');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.elasticemail.com',
  secure: true,
  port: 465,
  auth: {
    user: "",
    pass: "",
  },
});

const emailChatController = {
  sendEmail: async (req, res) => {
    const { subject, text, Category } = req.body; // Assuming Category is passed in the request body

    let email = ''; // Variable to hold the email based on user type
    let pass = ''; 
    // Set the email based on user type
    console.log(Category);
    if (Category === 'agent') {
        pass = 'E137188013EC0A823E8A71BC9FEB1B850E4A';
        email = 'helpdeskgiu@hotmail.com';
    } else if (Category === 'user') {
        email = 'gergesdanial11@outlook.com';
        email2 = 'vaskosoftware@gmail.com';
        pass2 = 'D6B97A09A987E56831D375A541DD761A5DB3'
        pass = '62570D26394379E422156E0CE6EDDCC89CD1';
    }

    try {
      console.log('sending email.');
      await transporter.sendMail({
        from: email,
        to: req.params.email,
        subject: subject,
        text: text,
        auth: {
          user: email, // Set the user email based on user type
          pass: pass,
        },
      });
      await transporter.sendMail({
        from: email2,
        to: req.params.email,
        subject: subject,
        text: text,
        auth: {
          user: email2, // Set the user email based on user type
          pass: pass2,
        },
      });
      res.send('Email sent successfully.');
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).send('Failed to send email.');
    }
  },
};

module.exports = emailChatController;