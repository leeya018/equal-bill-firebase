/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./util/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      gray: "#D9D9D9",
      green: "#40cea8",
      gray_dark: "#6A7268",
      blue: "#18A0FB",
      blue_dark: "#2b12ce",
      white: "#FFFFFF",
      black: "#000000",

      grayb2: "#E0D0BC",
      red: "#db2727",
      yellow: "#e8ef23",
      blueL_bank: "#2697FF",
    },
    borderColor: {
      "custom-blue": "#4B6DCF",
    },
    extend: {
      backgroundImage: {
        zebra: "url('/zebra.png')",
        equal_bill: "url('/equal_bill.png')",
        google: "url('/google.png')",
      },
    },
  },
  plugins: [],
  // plugins: [require("tailwind-scrollbar")({ nocompatible: true })],
};
