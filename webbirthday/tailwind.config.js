module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  safelist: [
    "w-[64px]",
    "w-[128px]",
    "w-[192px]",
    "w-[256px]",
    "w-[320px]",
    "w-[384px]",
    "w-[448px]",
    "w-[512px]",
    "w-[576px]",
    "w-[640px]",
  ],
  theme: {
    extend: {
      fontFamily: {
        k2d: ['"K2D"', 'sans-serif'],
      },
      boxShadow: {
        '3xl': '0 20px 25px -5px rgba(0,0,0,0.3), 0 10px 10px -5px rgba(0,0,0,0.04)',
        'soft': '0 8px 30px rgba(0,0,0,0.12)',
        'hard': '0 4px 15px rgba(0,0,0,0.5)',
      },
    },
  },
  plugins: [],
}
