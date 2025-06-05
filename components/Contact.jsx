'use client';
import { useState } from 'react';
import { BorderBeam } from './magicui/border-beam';
import { motion } from 'framer-motion';
import SparklesText from './magicui/sparkles-text';

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
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white/10 backdrop-blur-xl border border-white/20 text-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4"
          >
            <div className="text-center">
              <p className="text-lg font-medium">{alertMessage}</p>
              {!isLoading && (
                <button
                  className="mt-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 font-semibold rounded-xl hover:scale-105 transition-all duration-200"
                  onClick={() => setShowAlert(false)}
                >
                  Close
                </button>
              )}
              {isLoading && (
                <div className="mt-6 flex justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}

      <div className="flex justify-center items-center w-full">
        <div className="max-w-6xl w-full mx-auto text-center px-2 sm:px-6 py-16">
          {/* Header */}
          <div className="mb-8">
            <SparklesText text="Contact" />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Have a project in mind or just want to chat? I'd love to hear from
              you.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-stretch justify-center mx-auto max-w-3xl lg:max-w-none">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-8 h-full"
            >
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 shadow-2xl h-full flex flex-col justify-center">
                <BorderBeam />
                <h3 className="text-2xl font-semibold text-white mb-6">
                  Get in Touch
                </h3>

                <div className="space-y-6">
                  <div className="flex items-center space-x-4 group hover:bg-white/5 p-4 rounded-xl transition-all duration-300">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm text-start">Email</p>
                      <p className="text-white font-medium">
                        shohorabhshawon@email.com
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 group hover:bg-white/5 p-4 rounded-xl transition-all duration-300 ">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm text-start">
                        Location
                      </p>
                      <p className="text-white font-medium">
                        Uttara, Dhaka, Bangladesh
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 group hover:bg-white/5 p-4 rounded-xl transition-all duration-300">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm text-start">
                        Response Time
                      </p>
                      <p className="text-white font-medium">Within 24 hours</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              viewport={{ once: true }}
              className="relative h-full"
            >
              <form
                onSubmit={handleSubmit}
                className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 shadow-2xl relative overflow-hidden h-full flex flex-col"
              >
                <BorderBeam />

                {/* Floating particles decoration */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <div className="absolute top-4 right-4 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                  <div className="absolute top-12 left-8 w-1 h-1 bg-purple-400 rounded-full animate-ping"></div>
                  <div className="absolute bottom-8 right-12 w-1.5 h-1.5 bg-pink-400 rounded-full animate-pulse"></div>
                </div>

                <div className="space-y-6 relative z-10 flex-1 flex flex-col justify-center">
                  <div className="grid grid-cols-1 gap-6">
                    <div className="group">
                      <label
                        htmlFor="name"
                        className="block text-white/90 font-medium mb-3 text-sm tracking-wide text-start"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="Your Name Here..."
                        className="w-full px-6 py-4 bg-white/5 text-white border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 focus:bg-white/10 transition-all duration-300 placeholder-gray-400 hover:bg-white/5 hover:border-white/30"
                      />
                    </div>

                    <div className="group">
                      <label
                        htmlFor="email"
                        className="block text-white/90 font-medium mb-3 text-sm tracking-wide text-start"
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        placeholder="name@example.com"
                        className="w-full px-6 py-4 bg-white/5 text-white border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 focus:bg-white/10 transition-all duration-300 placeholder-gray-400 hover:bg-white/5 hover:border-white/30"
                      />
                    </div>

                    <div className="group">
                      <label
                        htmlFor="message"
                        className="block text-white/90 font-medium mb-3 text-sm tracking-wide text-start"
                      >
                        Message
                      </label>
                      <textarea
                        name="message"
                        required
                        rows="5"
                        placeholder="Tell me about your project..."
                        className="w-full px-6 py-4 bg-white/5 text-white border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 focus:bg-white/10 transition-all duration-300 placeholder-gray-400 resize-none hover:bg-white/5 hover:border-white/30"
                      ></textarea>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-blue-500 via-purple-600 to-blue-500 bg-size-200 bg-pos-0 hover:bg-pos-100 text-white font-semibold py-4 px-6 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-500 transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                  >
                    <span className="relative z-10">
                      {isLoading ? 'Sending...' : 'Send Message'}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}
