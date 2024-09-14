// components/Skills.js
export default function Skills() {
  return (
    <div className="container mx-auto px-6 py-12 text-center">
      <h2 className="text-4xl font-bold mb-10 mt-16 hover:text-green-600 hover:scale-110 transform transition-transform duration-300 ease-in-out inline-block">
        SKILLS
      </h2>
      <div className="flex flex-col items-center">
        <ul className="text-xl list-disc list-inside space-y-8">
          <li className="flex flex-col items-center space-y-2">
            <strong className="font-semibold text-2xl mb-2">
              Programming Languages
            </strong>
            <div className="flex space-x-4">
              <i className="fab fa-js-square text-3xl text-yellow-600"> Js</i>
              <i className="fab fa-python text-3xl text-blue-600"> Python</i>
              <i className="fab fa-cuttlefish text-3xl text-gray-600">++</i>
              <i className="fab fa-csharp text-3xl text-blue-700"> C#</i>
            </div>
          </li>
          <li className="flex flex-col items-center space-y-2">
            <strong className="font-semibold text-2xl mb-2">Web Technologies</strong>
            <div className="flex space-x-4">
              <i className="fab fa-html5 text-3xl text-orange-600"> HTML</i>
              <i className="fab fa-css3-alt text-3xl text-blue-600"> CSS</i>
              <i className="fab fa-react text-3xl text-blue-400"> React</i>
              <i className="fab fa-node text-3xl text-green-600"> Nodejs</i>
              <i className="fab fa-tailwind text-3xl text-blue-600"> TailwindCSS</i>
            </div>
          </li>
          <li className="flex flex-col items-center space-y-2">
            <strong className="font-semibold text-2xl mb-2">Design Tools</strong>
            <div className="flex space-x-4">
              <i className="fab fa-figma text-3xl text-purple-600"> Figma</i>
              <i className="fab fa-adobe text-3xl text-red-600"> adobe xD</i>
              <i className="fab fa-photoshop text-3xl text-blue-500"> Photoshop</i>
              <i className="fab fa-lightroom text-3xl text-orange-600"> Lightroom</i>
              <i className="fab fa-illustrator text-3xl text-yellow-600"> Illustrator</i>
            </div>
          </li>
          <li className="flex flex-col items-center space-y-2">
            <strong className="font-semibold text-2xl mb-2">
              Productivity Tools
            </strong>
            <div className="flex space-x-4">
              <i className="fas fa-file-word text-3xl text-blue-600"> Word</i>
              <i className="fas fa-file-powerpoint text-3xl text-orange-600"> PowerPoint</i>
              <i className="fab fa-jira text-3xl text-blue-700"> Jira</i>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
