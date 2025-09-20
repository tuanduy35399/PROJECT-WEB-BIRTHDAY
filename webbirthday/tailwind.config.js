// tailwind.config.js
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  safelist: [
    "w-[5rem]",
    "w-[10rem]",
    "w-[15rem]",
    "w-[20rem]",
    "w-[25rem]",
    "w-[30rem]",
    "w-[35rem]",
    "w-[40rem]",
    "w-[45rem]",
    "w-[50rem]",
    "w-[55rem]",
    "w-[60rem]",
    "w-[65rem]",
    "w-[70rem]",
    "w-[75rem]",
    "w-[80rem]",
    "w-[85rem]",
    "w-[90rem]",
    "w-[95rem]",
    "w-[100rem]",
  ],
  boxShadow: {
        '3xl': '0 20px 25px -5px rgba(0,0,0,0.3), 0 10px 10px -5px rgba(0,0,0,0.04)',
        'soft': '0 8px 30px rgba(0,0,0,0.12)',
        'hard': '0 4px 15px rgba(0,0,0,0.5)',
      },
  theme: {
    extend: {
      fontFamily: {
        k2d: ['"K2D"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
