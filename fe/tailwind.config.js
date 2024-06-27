/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // primary: "#594545",
        // secondary: "#815B5B",
        // tertiary: "#9E7676",
        // quaternary: "#FFF8EA",
        primary: "#4F6F52",
        secondary: "#739072",
        quaternary: "#739072",
        tertiary: "#ECE3CE",
        // quinary: "#F9EA83",
      },
      boxShadow: {
        // toast: "0px 4px 18px 0px #4B465C1A",
      },
      animation: {
        "go-up": "go-up 0.2s ease-in-out",
        "update-form-close": "update-form-close 0.4s ",
        "update-form-open": "update-form-open 0.4s ",
        "film-form-open": "film-form-open 0.5s ",
        "film-form-close": "film-form-close 0.5s ",
        spin: "spin 1s linear infinite",
      },
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require("tailwindcss-animate")],
};
