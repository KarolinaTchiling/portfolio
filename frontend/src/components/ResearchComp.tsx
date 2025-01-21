import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';

export default function ResearchTimeline() {
  return (
    <Timeline position="left">
      {/* Citation Biases in Computing Literature */}
      <TimelineItem className="mt-8">
        <TimelineOppositeContent className="text-gray-400">

          <h4 className="text-xl font-bold text-blue-400 pb-4 pt-11 border-b border-blue-500">Tools & Technologies</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white pt-4">
            <ul className="space-y-2">
              <li><strong>Languages:</strong> R, Python, JavaScript, TypeScript</li>
              <li><strong>Front-end:</strong> React, Tailwind CSS</li>
              <li><strong>Back-end:</strong> Node.js, Express.js</li>
            </ul>
            <ul className="space-y-2">
              <li><strong>Databases:</strong> MongoDB, Google Firebase</li>
              <li><strong>APIs:</strong> CrossRef, Gender-API, OpenAlex, Semantic Scholar</li>
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
              <a href="https://arxiv.org/abs/2410.02801" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-blue-500 transition">
                <strong>Preprint</strong>
              </a>
            </li>
            <li>
              <a href="https://github.com/KarolinaTchiling/gender-citations-swe-public" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-blue-500 transition">
                <strong>GitHub</strong>
              </a>
            </li>
            <li>
              <a href="/figs/BiasPoster.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-blue-500 transition">
                <strong>Research Poster</strong>
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
            Conducted a large-scale analysis of more than 90,000 papers from the top 100 software engineering journals to investigate gender-based citation bias. My research uncovered a consistent pattern of under-citation of women and over-citation of men, with this disparity steadily increasing since 2009.
          </p>
          <p className="pb-14">
            Building on these findings, I am leading the development of CiteFairly, an innovative online tool aimed at helping researchers analyze citation biases and promote equitable referencing practices. CiteFairly integrates various external APIs to streamline the analysis process and provides actionable insights to encourage more balanced and inclusive citation habits.
          </p>
        </TimelineContent>
      </TimelineItem>

      {/* AI Applications in GNSS */}
      <TimelineItem>
        <TimelineOppositeContent className="text-gray-400">

          <h4 className="text-xl font-bold text-green-300 pb-4 pt-11 border-b border-green-500">Tools & Technologies</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white pt-4">
            <ul className="space-y-2">
              <li><strong>Language:</strong> Python</li>
              <li><strong>Machine Learning:</strong> Scikit-learn</li>
            </ul>
            <ul className="space-y-2">
              <li><strong>Data Visualization:</strong> Python (Matplotlib, Pandas)</li>
            </ul>
          </div>

          <h4 className="text-xl font-bold text-green-300 pb-4 pt-8 border-b border-green-500">Research Contributions</h4>
          <ul className="list-disc list-inside text-white space-y-3 pt-4">
            <li>
              Presented at the <strong>2024 Lassonde Undergraduate Research Conference</strong>
            </li>
            <li>
              Co-authored research focused on improving smartphone positioning accuracy using machine learning techniques. Published findings at ION GNSS+ 2024
            </li>
          </ul>

          <ul className="flex items-center justify-start space-x-8 text-lg text-white pt-4">
            <li>
              <a href="https://doi.org/10.33012/2024.19761" target="_blank" rel="noopener noreferrer" className="text-green-300 hover:text-green-500 transition">
                <strong>Publication</strong>
              </a>
            </li>
            <li>
              <a href="https://github.com/KarolinaTchiling/gnss-ml-2.0" target="_blank" rel="noopener noreferrer" className="text-green-300 hover:text-green-500 transition">
                <strong>GitHub</strong>
              </a>
            </li>
            <li>
              <a href="/figs/GnssPoster.pdf" target="_blank" rel="noopener noreferrer" className="text-green-300 hover:text-green-500 transition">
                <strong>Research Poster</strong>
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
            Conducted research on AI applications in Global Navigation Satellite Systems (GNSS), achieving a 92% accuracy rate
            in classifying smartphone positioning data using machine learning techniques. Collaborated with a research team to
            co-author a conference paper and presented findings at the Lassonde Undergraduate Research Conference.
          </p>
          <p>
            The research contributed to the development of advanced positioning techniques, leading to improved accuracy in real-world applications. Findings were published in top-tier venues, emphasizing the impact of AI in GNSS technology.
          </p>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  );
}
