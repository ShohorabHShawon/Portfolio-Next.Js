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
      {/* Alert Modal */}
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
            className="bg-white/10 dark:bg-gray-900/20 backdrop-blur-xl border border-white/20 dark:border-gray-700 text-gray-800 dark:text-white rounded-2xl shadow-xxl p-8 max-w-md w-full mx-4"
          >
            <div className="text-center">
              <p className="text-lg font-medium">{alertMessage}</p>
              {!isLoading ? (
                <button
                  onClick={() => setShowAlert(false)}
                  className="mt-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 font-semibold rounded-xl hover:scale-105 transition-all duration-200"
                >
                  Close
                </button>
              ) : (
                <div className="mt-6 flex justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Contact Section */}
      <section className="w-full min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-white flex justify-center items-center px-4 sm:px-6 py-20">
        <div className="max-w-6xl w-full mx-auto text-center">
          <div className="mb-8">
            <SparklesText text="Contact" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <p className="text-xl text-gray-500 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
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
              <div className="bg-gradient-to-br from-white/10 to-white/5 dark:from-gray-700/20 dark:to-gray-700/10 backdrop-blur-2xl rounded-3xl border border-white/20 dark:border-gray-700 shadow-xl h-full flex flex-col">
                <BorderBeam />

                {/* Terminal Header */}
                <div className="flex bg-gray-200 dark:bg-gray-700 items-center justify-between px-6 py-2 rounded-t-3xl border-b border-white/20 dark:border-gray-700">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 font-mono">
                    contact-info.sh
                  </div>
                  <div className="w-16"></div>
                </div>

                <div className="p-8 flex-1 flex flex-col justify-center">
                  <h3 className="text-2xl font-semibold mb-6">Get in Touch</h3>

                  <div className="space-y-6">
                    {/* Email */}
                    <div className="flex items-center space-x-4 group hover:bg-white/5 dark:hover:bg-gray-700/30 p-4 rounded-xl transition-all duration-300">
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
                        <p className="text-sm text-start text-gray-500 dark:text-gray-400">
                          Email
                        </p>
                        <p className="font-medium">shohorabhshawon@gmail.com</p>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-center space-x-4 group hover:bg-white/5 dark:hover:bg-gray-700/30 p-4 rounded-xl transition-all duration-300">
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
                        <p className="text-sm text-start text-gray-500 dark:text-gray-400">
                          Location
                        </p>
                        <p className="font-medium">Uttara, Dhaka, Bangladesh</p>
                      </div>
                    </div>

                    {/* Response Time */}
                    <div className="flex items-center space-x-4 group hover:bg-white/5 dark:hover:bg-gray-700/30 p-4 rounded-xl transition-all duration-300">
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
                        <p className="text-sm text-start text-gray-500 dark:text-gray-400">
                          Response Time
                        </p>
                        <p className="font-medium">Within 24 hours</p>
                      </div>
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
                className="bg-gradient-to-br from-white/10 to-white/5 dark:from-gray-700/20 dark:to-gray-700/10 backdrop-blur-2xl rounded-3xl border border-white/20 dark:border-gray-700 shadow-xl relative overflow-hidden h-full flex flex-col"
              >
                <BorderBeam />

                {/* Terminal Header */}
                <div className="flex bg-gray-200 dark:bg-gray-700 items-center justify-between px-6 py-2 border-b border-white/20 dark:border-gray-700">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 font-mono">
                    contact-form.jsx
                  </div>
                  <div className="w-16"></div>
                </div>

                <div className="p-8 flex-1 flex flex-col">
                  <h3 className="text-3xl font-bold mb-6">Email Me</h3>

                  {/* Floating particles */}
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-4 right-4 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                    <div className="absolute top-12 left-8 w-1 h-1 bg-purple-400 rounded-full animate-ping"></div>
                    <div className="absolute bottom-8 right-12 w-1.5 h-1.5 bg-pink-400 rounded-full animate-pulse"></div>
                  </div>

                  <div className="space-y-6 relative z-10 flex-1 flex flex-col justify-center">
                    {/* Name */}
                    <div className="group">
                      <label
                        htmlFor="name"
                        className="block font-semibold mb-3 text-sm tracking-wide text-start"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="Your Name Here..."
                        className="w-full px-6 py-4 
                                        bg-white dark:bg-gray-900 
                                        text-gray-900 dark:text-gray-100 
                                        border border-gray-300 dark:border-gray-700 
                                        rounded-2xl 
                                        focus:outline-none 
                                        focus:ring-2 focus:ring-blue-500/60 dark:focus:ring-purple-500/60
                                        transition-all duration-300 
                                        placeholder-gray-400 
                                        hover:bg-blue-50 dark:hover:bg-gray-800 
                                        hover:border-blue-400 dark:hover:border-purple-400"
                      />
                    </div>

                    {/* Email */}
                    <div className="group">
                      <label
                        htmlFor="email"
                        className="block font-semibold mb-3 text-sm tracking-wide text-start"
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        placeholder="name@example.com"
                        className="w-full px-6 py-4 
                                        bg-white dark:bg-gray-900 
                                        text-gray-900 dark:text-gray-100 
                                        border border-gray-300 dark:border-gray-700 
                                        rounded-2xl 
                                        focus:outline-none 
                                        focus:ring-2 focus:ring-blue-500/60 dark:focus:ring-purple-500/60
                                        transition-all duration-300 
                                        placeholder-gray-400 
                                        hover:bg-blue-50 dark:hover:bg-gray-800 
                                        hover:border-blue-400 dark:hover:border-purple-400"
                      />
                    </div>

                    {/* Message */}
                    <div className="group">
                      <label
                        htmlFor="message"
                        className="block font-semibold mb-3 text-sm tracking-wide text-start"
                      >
                        Message
                      </label>
                      <textarea
                        name="message"
                        required
                        rows="5"
                        placeholder="Tell me about your project..."
                        className="w-full px-6 py-4 
                                        bg-white dark:bg-gray-900 
                                        text-gray-900 dark:text-gray-100 
                                        border border-gray-300 dark:border-gray-700 
                                        rounded-2xl 
                                        focus:outline-none 
                                        focus:ring-2 focus:ring-blue-500/60 dark:focus:ring-purple-500/60
                                        transition-all duration-300 
                                        placeholder-gray-400 
                                        hover:bg-blue-50 dark:hover:bg-gray-800 
                                        hover:border-blue-400 dark:hover:border-purple-400"
                      ></textarea>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full 
                                        bg-gradient-to-r from-blue-500 via-purple-600 to-blue-500 
                                        text-white font-semibold py-4 px-6 rounded-2xl 
                                        transition-all duration-500 transform 
                                        hover:scale-105 hover:shadow-xl 
                                        disabled:opacity-50 relative overflow-hidden group
                                        focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-purple-400"
                    >
                      <span className="relative z-10">
                        {isLoading ? 'Sending...' : 'Send Message'}
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    </button>
                  </div>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
