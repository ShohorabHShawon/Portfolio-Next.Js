"use client";
import { useState } from "react";
import { BorderBeam } from "./magicui/border-beam";
import { motion } from "framer-motion";


export function Contact() {
  async function handleSubmit(e) {
    e.preventDefault();

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: "60f7ed60-14b3-40e2-96d5-20ca49570508",
        name: e.target.name.value,
        email: e.target.email.value,
        message: e.target.message.value,
      }),
    });

    const result = await response.json();

    if (result.success) {
      alert("Thank you for your message!");
      e.target.reset();
    } else {
      alert("There was an error sending your message. Please try again.");
    }
  }

  return (
    <>
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
              className="w-full px-4 py-2 bg-white/20 text-white border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              required
              placeholder="email@example.com"
              className="w-full px-4 py-2 bg-white/20 text-white border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="w-full px-4 py-2 bg-white/20 text-white border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-white hover:bg-black hover:text-white text-black font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Send
          </button>
        </form>
      </motion.div>
    </>
  );
}
