/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
      extend: {
        fontFamily:{
          'poppins': ['Poppins', 'sans-serif'],
        },
        colors:{
          "danger":"#e74o3c",
          "success":"#2ecc71",
      },
    },
  },
    plugins: [],
  };
