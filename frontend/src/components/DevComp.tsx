import ProjectCard from "./ProjectCard"
import PortfolioCard from "./PortfolioCard"

const MyProjects = () => {
  const projects = [
    {
      title: "DJ WAMP's Merch Store",
      description: "An online merch store for DJ WAMP with features like product filtering, cart management, checkout, account management, and an admin panel.",
      imageUrl: "/figs/store.png",
      githubLink: "https://github.com/KarolinaTchiling/DJ-Wamp-merch-store",
      demoLink: "https://dj-wamp-merch-store.vercel.app",
      tools: ["TypeScript", "Python","React", "Tailwind CSS", "Flask", "MongoDB Atlas", "AWS S3 Bucket", "DALL-E"],
    },
    {
      title: "Roll Call",
      description: "A web application designed to streamline daily planning by automatically generating personalized daily reports based on a user's Google Calendar.",
      imageUrl: "/figs/rollcall.png",
      githubLink: "https://github.com/KarolinaTchiling/project-roll-call",
      demoLink: "https://project-roll-call.vercel.app",
      tools: ["TypScript", "Python", "Tailwind CSS", "Flask", "MongoDB Atlas", "Google Calendar API", "Google Email API"],
    },
    {
      title: "Evolutionary Rochambeau",
      description: "A fun twist on the classic rock-paper-scissors game, where you embody a Common Side-Blotched Lizard vying to outsmart rivals and secure a mate in a lively and competitive environment.",
      imageUrl: "/figs/EvolutionaryRochambeau.png",
      githubLink: "https://github.com/KarolinaTchiling/rock-paper-scissors?tab=readme-ov-file",
      demoLink: "https://karolinatchiling.github.io/rock-paper-scissors/",
      tools: ["JavaScript", "HTML", "CSS"],
    },
    {
      title: "Lite-Brite Square",
      description: "A simple Sketch Pad web game with a nostalgic Lite Brite theme, bringing back the joy of creating colorful, glowing designs just like in childhood.",
      imageUrl: "/figs/litebrite.png",
      githubLink: "https://github.com/KarolinaTchiling/etch-a-sketch?tab=readme-ov-file",
      demoLink: "https://karolinatchiling.github.io/etch-a-sketch/",
      tools: ["JavaScript", "HTML", "CSS"],
    },
    
  ];

  return (
    <div className="flex flex-col gap-8 p-8">
      <PortfolioCard/>
      {projects.map((project, index) => (
        <ProjectCard key={index} {...project} />
      ))}
    </div>
  );
};

export default MyProjects;
