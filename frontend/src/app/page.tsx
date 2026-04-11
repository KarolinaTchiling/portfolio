"use client";

import React, { useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { IoDocumentTextOutline } from "react-icons/io5";
import CustomAccordion from "../components/CustomAccordion";
import Knot from '../components/TorusKnot';
import Rings from '../components/Rings';
import Globe from '../components/Globe';
import ResearchComp from '../components/ResearchComp';
import DevComp from '../components/DevComp';
import GisComp from '../components/GisComp';

export default function Home() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<"projects" | "about">("projects");

  const handleChange = (panel: string) => {
    if (expanded === panel) {
      setExpanded(null);
    } else {
      setExpanded(panel);
      
      // Hardcoded scrolling to the accordion section
      setTimeout(() => {
        const element = document.getElementById("accordion-section");
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 500);
    }
  };

  const handlePage = (page: "projects" | "about") => {
    setActiveSection(page);
  };
  
return (
<div className="scrollable min-h-screen flex flex-col justify-between items-center p-8 pb-10 sm:p-14 sm:pb-10 sm:pr-10 font-[family-name:var(--font-geist-sans)]">
  
  <main className="flex-grow">

      {/* HEADER */}
      <div className="flex flex-row gap-4 max-w-5xl w-full mx-auto font-[family-name:var(--font-geist-mono)]">
            <button
              onClick={() => handlePage("projects")}
              className="px-4 py-1 border border-gray-700 text-white font-semibold rounded-lg hover:bg-green-600 transition"
            >
              Projects
            </button>

            <button
              onClick={() => handlePage("about")}
              className="px-4 py-1 border border-gray-700 text-white font-semibold rounded-lg hover:bg-green-600 transition"
            >
              About Me
            </button>
      </div>

      {/* CONTENT */}
      {activeSection === "projects" && (
        <div id="projects">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 max-w-5xl w-full mx-auto font-[family-name:var(--font-geist-mono)] mt-5">
                {/* Column 1 */}
                <div className="flex flex-col gap-6 text-center sm:text-left">
                  <div className="text-4xl font-bold tracking-tight leading-tight animate-fade-in">
                    <span className="opacity-80 block sm:inline">From mapping landscapes</span> <br className="hidden sm:block" />
                    <span className="opacity-100 font-extrabold text-[var(--accent-color)]">to building digital ones —</span>
                  </div>
                </div>

                {/* Column 2 */}
                <div className="flex flex-col gap-6 text-center sm:text-left sm:justify-center">
                  <div className="text-2xl font-medium leading-snug animate-fade-in delay-200">
                    Hi, I'm <span className="font-bold text-[var(--accent-color)]">Karolina</span>, an ex-geology graduate turned computer science student, researcher and data scientist; passionate about ML, geo-spatial data, data-driven insights, and software solutions.
                  </div>
                </div>
          </div>

            <div id="accordion-section" className="gap-24 flex justify-center sm:justify-center w-full mt-8 animate-fade-in delay-400 animate-fade-in opacity-0">
              <button onClick={() => handleChange('panel1')} className="flex flex-col items-center group">
              <div className="animate-fade-in opacity-0">
              <Rings />
              </div>
                <span className="transform transition-transform duration-300 group-hover:scale-x-125">Research Projects</span>
              </button>

              <button onClick={() => handleChange('panel2')} className="flex flex-col items-center group mx-6">
              <div className="animate-fade-in opacity-0">
              <Knot />
              </div>
                <span className="transform transition-transform duration-300 group-hover:scale-x-125">Software Dev Projects</span>
              </button>

              <button onClick={() => handleChange('panel3')} className="flex flex-col items-center group">
              <div className="animate-fade-in opacity-0">
              <Globe />
              </div>
                <span className="transform transition-transform duration-300 group-hover:scale-x-125">GIS Projects</span>
              </button>
            </div>

            {/* Full-Width Accordions */}
            <div className="flex flex-col w-full max-w-7xl mx-auto gap-2 mt-1">
              <CustomAccordion expanded={expanded === 'panel1'} onChange={() => handleChange('panel1')} typographyComponent={ResearchComp} />
              <CustomAccordion expanded={expanded === 'panel2'} onChange={() => handleChange('panel2')} typographyComponent={DevComp}/>
              <CustomAccordion expanded={expanded === 'panel3'} onChange={() => handleChange('panel3')} typographyComponent={GisComp}/>
            </div>

      </div>
      )}

      {activeSection === "about" && (
        
         
         <div id="about" className="max-w-5xl w-full animate-fade-in delay-400">

                    
          <div className="flex flex-row items-center gap-8 mt-8">

                  <div className="basis-1/5">
                    <img src="/headshot.jpg" alt="Picture of Karolina" className="rounded-full" />
                  </div>
                  <div className="basis-5/6 text-right md:text-justify leading-relaxed text-lg font-thin font-[family-name:var(--font-geist-mono)]">
                    I strive to apply data science and computational thinking to improve the reliability and efficiency of large-scale systems. I’m particularly interested in building AI and automation solutions that support human decision-making and allow teams to focus more on innovation and creative problem solving. I’m especially interested in industries such as natural resources, utilities, infrastructure, and space.
                  </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl mt-3 w-full mx-auto">

                  <div>
                          <div className="flex flex-col">
                                  <div className="text-xl font-bold">
                                    Co-op and Work Experience
                                  </div>

                                  <div className="mt-4 grid grid-cols-[auto_1fr] gap-3 gap-x-4 text-base font-medium text-white">

                                    <div>Hydro One Networks </div>
                                    <div>
                                      <div> Data Analyst </div>
                                      <div className="font-thin italic text-sm">16-month Co-op</div>
                                    </div>

                                    <div>DARE! Lab @ YorkU </div>
                                    <div>
                                      <div> Data Scientist & Full-Stack Web Developer</div>
                                      <div className="font-thin italic text-sm">4-month Co-op; 8-month part-time Research Assistant</div>
                                    </div>

                                    <div>GNSS Lab @ YorkU </div>
                                    <div>
                                      <div> Geospatial Machine Learning Developer</div>
                                      <div className="font-thin italic text-sm">4-month Internship; 8-month part-time Research Assistant</div>
                                    </div>

                                  </div>

                                  <p className="mt-4 text-sm text-gray-300">
                                    The most rewarding part of my co-op experiences has been seeing my work translate into tangible impact. In research, this has meant contributing to published work that advances the scientific community. In industry, it has meant building automated pipelines that replace repetitive tasks—work computers are better suited for—allowing people to focus on creative thinking, problem solving, and innovation.
                                  </p>
                            </div> 
                  </div>
                <div>
                      <div className="flex flex-col">
                        <div className="text-xl font-bold">BSc Computer Science @ York University</div>
                        <div className="text-gray-30 italic">4th Year | 20-Month Co-op Program</div>

                        <div className="mt-2 text-sm text-gray-300">
                          What I love most about computer science is the way it teaches you to think in algorithms. I enjoy decomposing complex problems into structured, logical steps and translating those solutions into processes a computer can execute.
                        </div>
                      </div>


                      <div className="w-full h-[270px] overflow-hidden flex items-center justify-center rounded-xl mt-5">
                        <iframe
                          src="https://drive.google.com/file/d/1bC7u19YoPts-HNPvWI20h7S1SA8T29Sd/preview"
                          className="w-full h-[298px]"
                          allow="autoplay"
                        />
                      </div>
                </div>

              </div>
          </div>
      )}
  
    </main>

    <footer className="flex gap-6 flex-wrap items-center justify-center text-sm mt-6 animate-fade-in delay-600">
      <a href="/KarolinaTchilinguirovaCV.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:underline hover:underline-offset-4">
        <IoDocumentTextOutline className="text-xl" />
        CV
      </a>
      <a href="https://github.com/KarolinaTchiling" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:underline hover:underline-offset-4">
        <FaGithub className="text-xl" />
        GitHub
      </a>
      <a href="https://www.linkedin.com/in/karolina-tchilinguirova/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:underline hover:underline-offset-4">
        <FaLinkedin className="text-xl"/>
        LinkedIn
      </a>
      <a href="mailto:k.tchiling@gmail.com?subject=Inquiry&body=Hi Karolina, I would like to connect with you." target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:underline hover:underline-offset-4">
        <IoIosMail className="text-2xl" />
        Contact Me
      </a>
    </footer>
</div>

);

  
}
