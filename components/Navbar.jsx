import Link from "next/link";

function Navbar() {
  return (
    <nav
      className="text-white fixed top-4 left-1/2 transform -translate-x-1/2 h-[60px] w-[90%]
     bg-gray-400 rounded-full bg-clip-padding backdrop-filter backdrop-blur-sm 
     bg-opacity-10 border border-gray-100 shadow-lg mx-auto flex justify-between items-center px-6 z-50"
    >
      <Link href="#home" className="font-bold">
        SHOHORAB
      </Link>
      <ul className="flex space-x-6">
        <li>
          <Link href="#about">ABOUT</Link>
        </li>
        <li>
          <Link href="#skills">SKILLS</Link>
        </li>
        <li>
          <Link href="#projects">PROJECTS</Link>
        </li>
        <li>
          <Link href="#contact">CONTACT</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
