/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: [
    "./App.tsx",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        dm: ["DMSans_400Regular"],
        dmMedium: ["DMSans_500Medium"],
        dmBold: ["DMSans_700Bold"],

        caveat: ["Caveat_400Regular"],
        caveatMedium: ["Caveat_500Medium"],
        caveatSemi: ["Caveat_600SemiBold"],
        caveatBold: ["Caveat_700Bold"],
      },
    },
  },
  plugins: [],
};
