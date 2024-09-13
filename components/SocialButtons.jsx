// components/SocialButtons.js

import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaGithub,
  FaEnvelope,
  FaBehanceSquare,
} from "react-icons/fa";

const socialLinks = [
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/shohorabhshawon/",
    icon: <FaLinkedin className="text-3xl" />,
  },
  {
    name: "GitHub",
    url: "https://github.com/shohorabhshawon",
    icon: <FaGithub className="text-3xl" />,
  },
  {
    name: "Email",
    url: "mailto:shohorabhshawon@gmail.com",
    icon: <FaEnvelope className="text-3xl" />,
  },
  {
    name: "Behance",
    url: "https://www.behance.net/shohorabhshawon",
    icon: <FaBehanceSquare className="text-3xl" />,
  },
];

export default function SocialButtons() {
  return (
    <div className="flex">
      {socialLinks.map(({ name, url, icon }) => (
        <a
          key={name}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white bg-opacity-20 rounded-full backdrop-blur-md text-white px-5 py-3 text-lg hover:bg-opacity-30 m-5 md:px-9 border border-white border-opacity-40 shadow-lg transition duration-300 ease-in-out"
          aria-label={name}
        >
          {icon}
        </a>
      ))}
    </div>
  );
}
