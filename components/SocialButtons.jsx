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
    icon: <FaLinkedin className="text-xl sm:text-2xl md:text-3xl" />,
  },
  {
    name: "GitHub",
    url: "https://github.com/shohorabhshawon",
    icon: <FaGithub className="text-xl sm:text-2xl md:text-3xl" />,
  },
  {
    name: "Email",
    url: "mailto:shohorabhshawon@gmail.com",
    icon: <FaEnvelope className="text-xl sm:text-2xl md:text-3xl" />,
  },
  {
    name: "Behance",
    url: "https://www.behance.net/shohorabhshawon",
    icon: <FaBehanceSquare className="text-xl sm:text-2xl md:text-3xl" />,
  },
];

export default function SocialButtons() {
  return (
    <div className="flex justify-center space-x-4 sm:space-x-6 md:space-x-8">
      {socialLinks.map(({ name, url, icon }) => (
        <a
          key={name}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="transform hover:scale-150 transition-transform duration-300 ease-in-out"
          aria-label={name}
        >
          {icon}
        </a>
      ))}
    </div>
  );
}
