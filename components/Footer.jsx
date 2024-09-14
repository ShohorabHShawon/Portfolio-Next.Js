import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-black text-white py-6">
      <div className="container mx-auto flex flex-col items-center px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm sm:text-base md:text-lg font-medium mb-2">
            {" "}
            <a
              href="mailto:ShohorabHShawon@gmail.com"
              className="text-blue-400 hover:underline"
            >
              ShohorabHShawon@gmail.com
            </a>
          </p>
          <p className="text-sm sm:text-base md:text-lg font-medium">
            Uttara, Dhaka, Bangladesh
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer