'use client';
import { useState } from 'react';
import { BorderBeam } from './magicui/border-beam';
import { motion } from 'framer-motion';

export function Contact() {
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Email validation function
  function isValidEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const email = e.target.email.value;

    // Validate email format
    if (!isValidEmail(email)) {
      setAlertMessage('Please enter a valid email address.');
      setShowAlert(true);
      return;
    }

    // Show "Sending..." message instantly
    setAlertMessage('Sending your message...');
    setShowAlert(true);
    setIsLoading(true);

    // Send the form data
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        access_key: process.env.NEXT_PUBLIC_MAIL_KEY,
        name: e.target.name.value,
        email,
        message: e.target.message.value,
      }),
    });

    const result = await response.json();

    // Update the alert message based on success or failure
    if (result.success) {
      setAlertMessage('Thank you for your message!');
      e.target.reset(); // Reset the form fields
    } else {
      setAlertMessage(
        'There was an error sending your message. Please try again.',
      );
    }

    setIsLoading(false); // Stop the loading state
  }

  return (
    <>
      {/* Custom Alert Modal with Glass Effect */}
      {showAlert && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white/10 backdrop-blur-lg border border-white/30 text-white rounded-lg shadow-lg p-6 max-w-md w-full">
            <p>{alertMessage}</p>
            {!isLoading && (
              <button
                className="mt-4 bg-white text-black px-4 py-2 font-bold rounded-lg"
                onClick={() => setShowAlert(false)}
              >
                Close
              </button>
            )}
          </div>
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 200 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true, amount: 0.1 }}
      >
        <form
          onSubmit={handleSubmit}
          className="max-w-lg mx-auto p-6 bg-white/0 backdrop-blur-lg rounded-lg shadow-lg border border-white/20 my-20"
        >
          <BorderBeam />
          <div className="mb-4">
            <label htmlFor="name" className="block text-white font-medium mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              required
              placeholder="Your name"
              className="w-full px-4 py-2 bg-white/5 text-white border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-white font-medium mb-2"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="email@example.com"
              className="w-full px-4 py-2 bg-white/5 text-white border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="message"
              className="block text-white font-medium mb-2"
            >
              Message
            </label>
            <textarea
              name="message"
              required
              rows="3"
              placeholder="Enter Message"
              className="w-full px-4 py-2 bg-white/5 text-white border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-white/80 hover:bg-black hover:text-white text-black font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
          >
            Send
          </button>
        </form>
      </motion.div>
    </>
  );
}
