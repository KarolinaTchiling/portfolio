"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from 'next/link'
import CustomAccordion from "../components/CustomAccordion";
import Knot from '../components/TorusKnot';
import Rings from '../components/Rings';
import Globe from '../components/Globe';
import ResearchComp from '../components/ResearchComp';

export default function Home() {
  const [expanded, setExpanded] = useState<string | null>(null);

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
  
  return (
<div className="scrollable min-h-screen flex flex-col justify-center items-center p-8 pb-10 sm:p-20 sm:pb-10 sm:pr-10 font-[family-name:var(--font-geist-sans)]">
  <main className="grid grid-cols-1 sm:grid-cols-2 gap-12 max-w-5xl w-full mx-auto font-[family-name:var(--font-geist-mono)]">
    
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
        Hi, I'm <span className="font-bold text-[var(--accent-color)]">Karolina</span>, an ex-geology graduate
        turned researcher and aspiring software engineer; passionate about GIS and software development.
      </div>
    </div>

  </main>

  <div id="accordion-section" className="flex justify-center sm:justify-evenly w-full mt-8 animate-fade-in delay-400 animate-fade-in opacity-0">
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
  <div className="flex flex-col w-full max-w-7xl mx-auto gap-2 mt-14">
    <CustomAccordion expanded={expanded === 'panel1'} onChange={() => handleChange('panel1')} typographyComponent={ResearchComp} />
    <CustomAccordion expanded={expanded === 'panel2'} onChange={() => handleChange('panel2')} typographyComponent={ResearchComp}/>
    <CustomAccordion expanded={expanded === 'panel3'} onChange={() => handleChange('panel3')} typographyComponent={ResearchComp}/>
  </div>

  <footer className="flex gap-6 flex-wrap items-center justify-center text-sm mt-10 animate-fade-in delay-600">
    <a href="https://nextjs.org/learn" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:underline hover:underline-offset-4">
      <Image aria-hidden src="/file.svg" alt="File icon" width={16} height={16} />
      CV
    </a>
    <a href="https://github.com/KarolinaTchiling" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:underline hover:underline-offset-4">
      <Image aria-hidden src="/window.svg" alt="Window icon" width={16} height={16} />
      GitHub
    </a>
    <a href="https://www.linkedin.com/in/karolina-tchilinguirova/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:underline hover:underline-offset-4">
      <Image aria-hidden src="/globe.svg" alt="Globe icon" width={16} height={16} />
      LinkedIn
    </a>
  </footer>
</div>

);

  
}
