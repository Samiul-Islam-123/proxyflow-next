// src/app/api/signup.js

import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb'; // Ensure this import is correct
import sendEmail from '@/lib/sendEmail';

export async function POST(req) {
  try {
    const { username, email } = await req.json();
    if (!username || !email) {
      return NextResponse.json({ error: 'Username and email are required.' }, { status: 400 });
    }

    const db = await connectToDatabase();
    const collection = db.collection('userDatabase');
    const result = await collection.insertOne({ username, email, 
      role : "user"
     });

     await sendEmail(
      email,
      'Welcome to Our Service!',
      'Thank you for signing up!',
      `
      <html>
        <body style="font-family: Arial, sans-serif; background-color: #f6f6f6; margin: 0; padding: 20px;">
          <div style="max-width: 600px; margin: auto; background: #fff; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
            <div style="padding: 20px;">
              <h1 style="color: #333;">Welcome to Our Service!</h1>
              <p style="font-size: 16px; line-height: 1.5; color: #555;">
                Thank you for signing up, <strong>${username}</strong>! We're excited to have you on board. 
                You can now start exploring all the features we offer.
              </p>
              <p style="font-size: 16px; line-height: 1.5; color: #555;">
                If you have any questions, feel free to <a href="mailto:support@yourservice.com">contact our support team</a>.
              </p>
              <p style="font-size: 16px; line-height: 1.5; color: #555;">Happy exploring!</p>
              <footer style="margin-top: 20px; font-size: 12px; color: #999;">
                &copy; ${new Date().getFullYear()} Your Service. All rights reserved.<br>
                <a href="https://yourservice.com/privacy-policy" style="color: #999;">Privacy Policy</a> | 
                <a href="https://yourservice.com/terms-of-service" style="color: #999;">Terms of Service</a>
              </footer>
            </div>
          </div>
        </body>
      </html>
      `
  );

   // Send a notification to admin
await sendEmail(
  'isamiul099@gmail.com',
  'New User Signed Up',
  'Hurray! A new user has signed up.',
  `
  <html>
    <body style="font-family: Arial, sans-serif; background-color: #f6f6f6; margin: 0; padding: 20px;">
      <div style="max-width: 600px; margin: auto; background: #fff; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
        <div style="padding: 20px;">
          <h1 style="color: #333;">New User Notification</h1>
          <p style="font-size: 16px; line-height: 1.5; color: #555;">
            Hurray! <strong>${username}</strong> has signed up with the email <strong>${email}</strong>.
          </p>
          <p style="font-size: 16px; line-height: 1.5; color: #555;">
            Please log in to the admin panel to review the new user details.
          </p>
          <footer style="margin-top: 20px; font-size: 12px; color: #999;">
            &copy; ${new Date().getFullYear()} Your Service. All rights reserved.<br>
            <a href="https://yourservice.com/privacy-policy" style="color: #999;">Privacy Policy</a> | 
            <a href="https://yourservice.com/terms-of-service" style="color: #999;">Terms of Service</a>
          </footer>
        </div>
      </div>
    </body>
  </html>
  `
);

    return NextResponse.json({ message: 'User saved successfully', result }, { status: 201 });
  } catch (error) {
    console.error('Error saving user:', error); // Logs the error
    return NextResponse.json({ error: 'Failed to save user', details: error.message }, { status: 500 });
  }
}
