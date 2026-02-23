import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'ns-yellow': '#FFC917',
        'ns-blue': '#003082',
        'ns-dark': '#001847',
        'ns-light-blue': '#0066CC',
      },
    },
  },
  plugins: [],
}

export default config
