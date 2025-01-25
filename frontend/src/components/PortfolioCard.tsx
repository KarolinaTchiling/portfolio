import React from "react";
import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";

const ProjectCard: React.FC = () => {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className="flex flex-col md:flex-row items-center bg-black shadow-lg rounded-lg overflow-hidden border border-gray-700 max-w-5xl mx-auto"
    >
      {/* Content Section */}
      <div className="p-6 flex flex-col justify-between w-full md:w-full">
        <h2 className="text-2xl font-bold text-white text-center">My Portfolio - Your looking at it!</h2>
        <p className="mt-2 text-gray-300 text-center">
        A personal portfolio created to highlight my diverse projects, where I delved into interactive web design and 3D web modeling. Through this portfolio, I aimed to explore innovative design techniques and experiment with various tools and frameworks to enhance user engagement and visual storytelling.
        </p>

        <div className="flex flex-row justify-between">
            <div className="mt-1">
              <h3 className="text-lg font-semibold text-gray-200">Tech Stack</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="px-3 py-1 text-sm font-medium bg-gray-800 text-white rounded-full">Next.js</span>
                <span className="px-3 py-1 text-sm font-medium bg-gray-800 text-white rounded-full">Three.js</span>
                <span className="px-3 py-1 text-sm font-medium bg-gray-800 text-white rounded-full">TypeScript</span>
                <span className="px-3 py-1 text-sm font-medium bg-gray-800 text-white rounded-full">Tailwind CSS</span>
              </div>
            </div>

            <div className="flex items-center gap-6 mt-4 self-end">
              <a
                href="https://github.com/KarolinaTchiling/portfolio"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-green-500 font-semibold hover:underline"
              >
                <FaGithub className="mr-2" />
                GitHub
              </a>
            </div>
        </div>

      </div>
    </motion.div>
  );
};

export default ProjectCard;