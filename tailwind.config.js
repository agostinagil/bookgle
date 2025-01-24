/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        "main-color": "#fc9945",
        "second-color": "#ff2a83",
        "second-color-darker": "#f12379",
        "third-color": "#fd725b",
        "btn-color": "#fe4475",
        "btn-color-darker": "#ee4571",
        "title-black": "#242424",
        "subtitle-black": "#2a2a2a",
        "card-bg": "#fffafa",
      },
      backgroundImage: {
        "main-gradient":
          "linear-gradient(0deg, rgba(255,224,197,1) 0%, rgba(255,155,94,1) 100%)",
      },
      borderRadius: {
        "main-bg": "75px",
      },
      boxShadow: {
        book: "4px 4px 9px 3px #CBCBCB",
        card: " 1px 1px 8px 1px #C2C2C2  ",
      },
      spacing: {
        card: "18rem",
        cardsm: "22rem",
      },
    },
  },
  plugins: [],
};
