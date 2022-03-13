module.exports = {
  darkMode: "media",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "mt-dark-0": "#CACBCF",
        "mt-dark-1": "#A6A7AB",
        "mt-dark-2": "#909296",
        "mt-dark-3": "#5c5f66",
        "mt-dark-4": "#373A40",
        "mt-dark-5": "#2C2E33",
        "mt-dark-6": "#25262b",
        "mt-dark-7": "#1A1B1E",
        "mt-dark-8": "#141517",
        "mt-dark-9": "#101113",
        "mt-gray-0": "#f8f9fa",
        "mt-gray-1": "#f1f3f5",
        "mt-gray-2": "#e9ecef",
        "mt-gray-3": "#dee2e6",
        "mt-gray-4": "#ced4da",
        "mt-gray-5": "#adb5bd",
        "mt-gray-6": "#868e96",
        "mt-gray-7": "#495057",
        "mt-gray-8": "#343a40",
        "mt-gray-9": "#212529",
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [],
};
