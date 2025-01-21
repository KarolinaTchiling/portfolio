import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      // fontFamily: {
      //   geistSans: 'var(--font-geist-sans)',
      // },
    },
    animation: {
      'fade-in': 'fadeIn 2s ease-out forwards',
    },
    keyframes: {
      fadeIn: {
        '0%': { opacity: "0" },
        '100%': { opacity: "1" },
      },
    },
    listStyleType: {
      star: '"✦ "',
  },
  
  },
  
  plugins: [
    require('tailwind-scrollbar'),
  ],
} satisfies Config;
