import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { IoDocumentTextOutline } from "react-icons/io5";

export default function ResearchTimeline() {
  return (
    <Timeline position="left">
      {/* Citation Biases in Computing Literature */}
      <TimelineItem className="mt-8">
        <TimelineOppositeContent className="text-gray-400">

          <h4 className="text-xl font-bold text-blue-400 pb-4 pt-20 border-b border-blue-500">Tools & Technologies</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white pt-4">
            <ul className="space-y-2 ">
              <li className="flex flex-wrap gap-2 mt-2"><strong>Languages:</strong>
                <span className="px-3 py-1 text-sm font-medium bg-gray-800 text-white rounded-full">R</span>
                <span className="px-3 py-1 text-sm font-medium bg-gray-800 text-white rounded-full">Python</span>
                <span className="px-3 py-1 text-sm font-medium bg-gray-800 text-white rounded-full">JavaScript</span></li>
              <li className="flex flex-wrap gap-2 mt-2"><strong>Front-end:</strong> 
              <span className="px-3 py-1 text-sm font-medium bg-gray-800 text-white rounded-full">React</span>
              <span className="px-3 py-1 text-sm font-medium bg-gray-800 text-white rounded-full">Tailwind CSS</span></li>
              <li className="flex flex-wrap gap-2 mt-2"><strong>Back-end:</strong> 
              <span className="px-3 py-1 text-sm font-medium bg-gray-800 text-white rounded-full">Node.js</span>
              <span className="px-3 py-1 text-sm font-medium bg-gray-800 text-white rounded-full">Express.js</span></li>
            </ul>
            <ul className="space-y-2">
              <li className="flex flex-wrap gap-2 mt-2"><strong>Databases:</strong> 
              <span className="px-3 py-1 text-sm font-medium bg-gray-800 text-white rounded-full">MongoDB</span>
              <span className="px-3 py-1 text-sm font-medium bg-gray-800 text-white rounded-full">Google Firebase</span></li>
              <li className="flex flex-wrap gap-2 mt-2"><strong>APIs:</strong>
              <span className="px-3 py-1 text-sm font-medium bg-gray-800 text-white rounded-full">CrossRef</span>
              <span className="px-3 py-1 text-sm font-medium bg-gray-800 text-white rounded-full">Gender-API</span>
              <span className="px-3 py-1 text-sm font-medium bg-gray-800 text-white rounded-full">OpenAlex</span>
              <span className="px-3 py-1 text-sm font-medium bg-gray-800 text-white rounded-full">Semantic Scholar</span> </li>
            </ul>
          </div>

          <h4 className="text-xl font-bold text-blue-400 pb-4 pt-8 border-b border-blue-500">Research Contributions</h4>
          <ul className="list-disc list-inside text-white space-y-3 pt-4">
            <li>
              Presented at the <strong>2024 Lassonde Undergraduate Research Conference</strong> and the <strong>2024 Canadian Celebration of Women in Computing Conference</strong>
            </li>
          </ul>

          <ul className="flex items-center justify-start space-x-8 text-lg text-white pt-4">
            <li>
              <a href="https://arxiv.org/abs/2410.02801" target="_blank" rel="noopener noreferrer" className="flex items-center text-teal-400 font-semibold hover:underline">
                <FaExternalLinkAlt className="mr-2" />
                Preprint
              </a>
            </li>
            <li>
              <a href="https://github.com/KarolinaTchiling/gender-citations-swe-public" target="_blank" rel="noopener noreferrer" className="flex items-center text-purple-400 font-semibold hover:underline">
                <FaGithub className="mr-2"/>
                GitHub
              </a>
            </li>
            <li>
              <a href="/figs/BiasPoster.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center text-pink-400 font-semibold hover:underline">
                <IoDocumentTextOutline className="mr-2" />
                Research Poster
              </a>
            </li>
          </ul>

        </TimelineOppositeContent>

        <TimelineSeparator>
          <TimelineDot color="primary" />
          <TimelineConnector />
        </TimelineSeparator>

        <TimelineContent className="text-white">
          <h3 className="text-4xl font-bold text-blue-500 pb-3">Citation Biases in Computing Literature</h3>
          <p className="text-xl">DARE! Lab at York University</p>
          <p className="text-lg pb-2">May 2024 - Current</p>
          <p className="pb-4">
            Over the summer of 2024 I conducted a large-scale analysis of more than 90,000 papers from the top 100 software engineering journals to investigate gender-based citation bias. My research uncovered a consistent pattern of under-citation of women and over-citation of men, with this disparity steadily increasing since 2009.
          </p>
          <p className="pb-14">
          Building on the identification of biases in computing literature, I am leading the development of CiteFairly, an innovative online tool designed to help researchers analyze and address citation biases. CiteFairly is a web tool built with Node.js, Express.js, Google Firebase, and React, allowing researchers to input their reference lists and receive an analysis of gender biases. The tool generates a citation diversity statement and leverages the Semantic Scholar API to suggest related research that can help balance biases and diversify references. CiteFairly aims to tackle the citation biases identified in academic literature by providing actionable solutions that promote equitable referencing practices and encourage more balanced and inclusive citation habits.
          </p>
        </TimelineContent>
      </TimelineItem>

      {/* AI Applications in GNSS */}
      <TimelineItem>
        <TimelineOppositeContent className="text-gray-400">

          <h4 className="text-xl font-bold text-green-300 pb-4 pt-20 border-b border-green-500">Tools & Technologies</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white pt-4">
            <ul className="space-y-2">
              <li><strong>Language:</strong> <span className="px-3 py-1 text-sm font-medium bg-gray-800 text-white rounded-full">Python</span></li>
              <li><strong>Machine Learning:</strong> <span className="px-3 py-1 text-sm font-medium bg-gray-800 text-white rounded-full">Scikit-learn</span></li>
            </ul>
            <ul className="space-y-2">
              <li><strong>Data Visualization:</strong> <span className="px-3 py-1 text-sm font-medium bg-gray-800 text-white rounded-full">Matplotlib</span></li>
            </ul>
          </div>

          <h4 className="text-xl font-bold text-green-300 pb-4 pt-8 border-b border-green-500">Research Contributions</h4>
          <ul className="list-disc list-inside text-white space-y-3 pt-4">
            <li>
              Presented at the <strong>2023 Lassonde Undergraduate Research Conference</strong>
            </li>
            <li>
              Co-authored conference paper on improving smartphone positioning accuracy using machine learning techniques. Published findings at ION GNSS+ 2024
            </li>
          </ul>

          <ul className="flex items-center justify-start space-x-8 text-lg text-white pt-4">
            <li>
              <a href="https://doi.org/10.33012/2024.19761" target="_blank" rel="noopener noreferrer" className="flex items-center text-teal-400 font-semibold hover:underline">
                <FaExternalLinkAlt className="mr-2" />
                Publication
              </a>
            </li>
            <li>
              <a href="https://github.com/KarolinaTchiling/gnss-ml-2.0" target="_blank" rel="noopener noreferrer" className="flex items-center text-purple-400 font-semibold hover:underline">
              <FaGithub className="mr-2"/>
                GitHub
              </a>
            </li>
            <li>
              <a href="/figs/GnssPoster.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center text-pink-400 font-semibold hover:underline">
              <IoDocumentTextOutline className="mr-2" />
                Research Poster
              </a>
            </li>
          </ul>

        </TimelineOppositeContent>

        <TimelineSeparator>
          <TimelineDot color="success" />
          <TimelineConnector />
        </TimelineSeparator>

        <TimelineContent className="text-white">
          <h3 className="text-4xl font-bold text-green-500 pb-3 -mt-1">AI Applications in GNSS</h3>
          <p className="text-xl">GNSS Lab at York University</p>
          <p className="text-lg pb-2">May 2023 – April 2024</p>
          <p className="pb-4">
            I started this research project in the summer of 2023 with goal of investigating the feasibility of using machine learning techniques to enhance the accuracy of smartphone positioning data for driving navigation. Using a predetermined test track, I explored various algorithms and found that the k-nearest neighbors (KNN) algorithm achieved a 92% accuracy rate in classifying the quality of positioning data. 
          </p>
          <p>
            Following the initial success of the project, I collaborated with my research team to explore more advanced machine learning techniques, such as Random Forest models, to classify GNSS signals into line-of-sight (LOS) and non-line-of-sight (NLOS) categories. By leveraging GNSS signal features such as carrier-to-noise density ratio (C/No), elevation angle, residuals, innovations, and pseudorange consistency along side ML we aimed to scale the measurement covariance matrix to enhance precise point positioning (PPP) accuracy. Our findings demonstrated that machine-learning-assisted PPP methods could significantly improve positioning accuracy, with root mean square (RMS) error reductions of up to 69% at the 95th percentile across various datasets.
          </p>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  );
}
