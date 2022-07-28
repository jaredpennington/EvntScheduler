/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // app
    "./src/App.js",
    "./src/index.js",

    // components
    "./src/components/PartyForm/index.jsx",
    "./src/components/EventForm/index.jsx",
    "./src/components/NavBar/index.jsx",

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
  theme: {
    extend: {},
  },
  plugins: [],
}
