import { Config } from 'tailwindcss';
import { rose, fuchsia } from 'tailwindcss/colors';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: rose,
        secondary: fuchsia
      }
    }
  },
  plugins: []
};
export default config;
