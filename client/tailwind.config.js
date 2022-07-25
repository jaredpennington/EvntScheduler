module.exports = {
  content: [
    // app
    "./src/App.js",
    "./src/index.js",

    // components
    "./src/components/PartyForm/index.jsx",
    "./src/components/EventForm/index.jsx",

    // pages
    "./src/pages/CreateEvent.jsx",
    "./src/pages/Dashboard.jsx",
    "./src/pages/Event.jsx",
    "./src/pages/Guest.jsx",
    "./src/pages/Guests.jsx",
    "./src/pages/Home.jsx",
    "./src/pages/Login.jsx",
    "./src/pages/NoMatch.jsx",
    "./src/pages/Password.jsx",
    "./src/pages/Passwords.jsx",
    "./src/pages/Signup.jsx",
    "./src/pages/Survey.jsx",
    "./src/pages/SurveyLink.jsx",
  ],
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        cream: {
          100: "#fdf6e7",
          200: "#fdf2db",
          300: "#fceecf",
          400: "#fbeac4",
          500: "#fae5b8",
        },
        saltwater: {
          100: "#b2d4d8",
          200: "#a5cdd2",
          300: "#99c5cb",
          400: "#8cbec5",
          500: "#7FB7BE",
        },
        moss: {
          100: "#8ca081",
          200: "#79906c",
          300: "#658157",
          400: "#527142",
          500: "#3F612D",
        },
        dark: {
          100: "#666666",
          200: "#4d4d4d",
          300: "#333333",
          400: "#1a1a1a",
          500: "#000000",
        },
      },
    },
    variants: {
      extend: {},
    },
    plugins: [],
  },
};
