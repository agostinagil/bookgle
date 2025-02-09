/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        "main-color": "#ff9b5e",
        "second-color": "#fd725b",
        "third-color": "#ffe0c5",
        "fourth-color": "#f12379",
        "btn-color": "#fe4475",
        "btn-color-darker": "#ee4571",
        "title-black": "#242424",
        "subtitle-black": "#2a2a2a",
        "card-bg": "#fffafa",
        "bg-color": "#FEF3E7",
        divisor: "#eeeeee",
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
      borderWidth: {
        "divisor-w": "0.8px",
      },
      spacing: {
        card: "18rem",
        cardsm: "22rem",
      },
    },
  },
  plugins: [],
};
