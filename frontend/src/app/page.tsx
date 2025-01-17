"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from 'next/link'
import CustomAccordion from "../components/CustomAccordion";


export default function Home() {
  const [expanded, setExpanded] = useState<string | null>(null);

  const handleChange = (panel: string) => {
    if (expanded === panel) {
      // If the current panel is already open, just close it
      setExpanded(null);
    } else {
      // Close any open accordion first, then open the new one
      setExpanded(null); // Close all accordions
      setTimeout(() => setExpanded(panel), 300); // Delay opening the new one for smooth animation
    }
  };
  
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start font-[family-name:var(--font-geist-mono)]">
        <div>
          Hi, Welcome to my portfolio
        </div>
        <div className="flex justify-evenly w-full">
          <button onClick={() => handleChange('panel1')}>Research Projects</button>
          <button onClick={() => handleChange('panel2')}>Software Dev Projects</button>
          <button onClick={() => handleChange('panel3')}>GIS Projects</button>
        </div>
        {/* Accordions */}
        <div className="flex flex-col w-full gap-0">
        <CustomAccordion
          expanded={expanded === 'panel1'}
          onChange={() => handleChange('panel1')}
        />
        <CustomAccordion
          expanded={expanded === 'panel2'}
          onChange={() => handleChange('panel2')}
        />
        <CustomAccordion
          expanded={expanded === 'panel3'}
          onChange={() => handleChange('panel3')}
        />
        </div>
  
        {/* <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">
            <Link href="/software_dev">Software Dev</Link>
          </li> 
          <li className="mb-2">
            <Link href="/research">Research</Link>
          </li>
          <li className="mb-2">
            <Link href="/gis">GIS</Link>
          </li>
        </ol> */}


      </main>

      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          CV
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/KarolinaTchiling"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          GitHub
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://www.linkedin.com/in/karolina-tchilinguirova/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          LinkedIn
        </a>
      </footer>
    </div>
  );
}
