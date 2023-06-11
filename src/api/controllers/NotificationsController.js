import dayjs from 'dayjs';

import {
  findAllRemindersByDate,
  updateBirthdayById,
} from '../services/BirthdayServices';

const nodemailer = require('nodemailer');

const { db } = require('../../utils/db');

async function sendReminderEmail(email, birthdayName) {
  // Create a transporter using your email service provider's SMTP configuration
  const transporter = nodemailer.createTransport({
    // SMTP configuration goes here
  });

  // Define the email content
  const mailOptions = {
    from: 'sender@example.com',
    to: email,
    subject: 'Birthday Reminder',
    text: `Don't forget to celebrate ${birthdayName}'s birthday!`,
  };

  // Send the email
  await transporter.sendMail(mailOptions);
}

async function processBirthdays() {
  try {
    const started_at = dayjs().subtract(1, 'day').format('YYYY-MM-DD');
    const ended_at = dayjs().add(1, 'day').format('YYYY-MM-DD');

    const birthdays = findAllRemindersByDate(started_at, ended_at);

    for (const birthday of birthdays) {
      const {
        name,
        User: { email },
      } = birthday;

      await sendReminderEmail(email, name);
      await updateBirthdayById(birthday.id, birthday);
    }
  } catch (error) {
    console.error('Error processing birthdays:', error);
  }
}

module.exports = {
  sendReminderEmail,
  processBirthdays,
};
