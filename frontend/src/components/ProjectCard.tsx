import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl: string;
  githubLink: string;
  demoLink: string;
  tools: string[];
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  imageUrl,
  githubLink,
  demoLink,
  tools,
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className="flex flex-col md:flex-row items-center bg-gray-900 shadow-lg rounded-lg overflow-hidden border border-gray-700 max-w-5xl mx-auto"
    >
      {/* Image Section */}
      <img
        className="w-full md:w-2/5 h-[19rem] object-cover"
        src={imageUrl}
        alt={title}
      />

      {/* Content Section */}
      <div className="p-6 flex flex-col justify-between w-full md:w-full">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        <p className="mt-2 text-gray-300">{description}</p>

        <div className="flex items-center gap-6 mt-4">
          <a
            href={githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-green-500 font-semibold hover:underline"
          >
            <FaGithub className="mr-2" />
            GitHub
          </a>
          <a
            href={demoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-cyan-500 font-semibold hover:underline"
          >
            <FaExternalLinkAlt className="mr-2" />
            Live Demo
          </a>
        </div>

        <div className="mt-4">
          <h3 className="text-lg font-semibold text-gray-200">Tech Stack</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {tools.map((tool, index) => (
              <span
                key={index}
                className="px-3 py-1 text-sm font-medium bg-gray-800 text-white rounded-full"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
