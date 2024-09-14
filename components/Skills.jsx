
export default function Skills() {
  return (
    <div className="container mx-auto px-4 py-12 text-center">
      <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 md:mb-8 lg:mb-10 mt-8 sm:mt-12 md:mt-16 lg:mt-20 hover:text-green-600 hover:scale-105 md:hover:scale-110 transform transition-transform duration-300 ease-in-out inline-block">
        SKILLS
      </h2>

      <div className="flex flex-col items-center">
        <ul className="text-base sm:text-lg md:text-xl list-disc list-inside space-y-4 sm:space-y-6 md:space-y-8">
          {[
            {
              title: "Programming Languages",
              icons: [
                {
                  className:
                    "fab fa-js-square text-2xl sm:text-3xl md:text-4xl text-yellow-600",
                  title: "JavaScript",
                },
                {
                  className:
                    "fab fa-python text-2xl sm:text-3xl md:text-4xl text-blue-600",
                  title: "Python",
                },
                {
                  className:
                    "fab fa-cuttlefish text-2xl sm:text-3xl md:text-4xl text-gray-600",
                  title: "C++",
                },
                {
                  className:
                    "fab fa-csharp text-2xl sm:text-3xl md:text-4xl text-blue-700",
                  title: "C#",
                },
              ],
            },
            {
              title: "Web Technologies",
              icons: [
                {
                  className:
                    "fab fa-html5 text-2xl sm:text-3xl md:text-4xl text-orange-600",
                  title: "HTML",
                },
                {
                  className:
                    "fab fa-css3-alt text-2xl sm:text-3xl md:text-4xl text-blue-600",
                  title: "CSS",
                },
                {
                  className:
                    "fab fa-react text-2xl sm:text-3xl md:text-4xl text-blue-400",
                  title: "React.js",
                },
                {
                  className:
                    "fab fa-node text-2xl sm:text-3xl md:text-4xl text-green-600",
                  title: "Node.js",
                },
                {
                  className:
                    "fab fa-tailwindcss text-2xl sm:text-3xl md:text-4xl text-blue-600",
                  title: "Tailwind CSS",
                },
              ],
            },
            {
              title: "Design Tools",
              icons: [
                {
                  className:
                    "fab fa-figma text-2xl sm:text-3xl md:text-4xl text-purple-600",
                  title: "Figma",
                },
                {
                  className:
                    "fab fa-adobe text-2xl sm:text-3xl md:text-4xl text-red-600",
                  title: "Adobe XD",
                },
                {
                  className:
                    "fab fa-photoshop text-2xl sm:text-3xl md:text-4xl text-blue-500",
                  title: "Photoshop",
                },
                {
                  className:
                    "fab fa-lightroom text-2xl sm:text-3xl md:text-4xl text-orange-600",
                  title: "Lightroom",
                },
                {
                  className:
                    "fab fa-illustrator text-2xl sm:text-3xl md:text-4xl text-yellow-600",
                  title: "Illustrator",
                },
              ],
            },
            {
              title: "Productivity Tools",
              icons: [
                {
                  className:
                    "fas fa-file-word text-2xl sm:text-3xl md:text-4xl text-blue-600",
                  title: "MS Word",
                },
                {
                  className:
                    "fas fa-file-powerpoint text-2xl sm:text-3xl md:text-4xl text-orange-600",
                  title: "PowerPoint",
                },
                {
                  className:
                    "fab fa-jira text-2xl sm:text-3xl md:text-4xl text-blue-700",
                  title: "Jira",
                },
              ],
            },
          ].map((category, index) => (
            <li
              key={index}
              className="flex flex-col items-center space-y-4 sm:space-y-6"
            >
              <strong className="font-semibold text-lg sm:text-xl md:text-2xl mb-2">
                {category.title}
              </strong>
              <div className="flex flex-wrap justify-center space-x-4">
                {category.icons.map((icon, idx) => (
                  <i
                    key={idx}
                    className={icon.className}
                    title={icon.title}
                  ></i>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
