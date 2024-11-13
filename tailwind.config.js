/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        black: ["GIP-Black", "sans-serif"],
        bold: ["GIP-Bold", "sans-serif"],
        blackItalic: ["GIP-BlackItalic", "sans-serif"],
        boldItalic: ["GIP-BoldItalic", "sans-serif"],
        extraBold: ["GIP-ExtraBold", "sans-serif"],
        extraBoldItalic: ["GIP-ExtraBoldItalic", "sans-serif"],
        heavy: ["GIP-Heavy", "sans-serif"],
        heavyItalic: ["GIP-HeavyItalic", "sans-serif"],
        light: ["GIP-Light", "sans-serif"],
        lightItalic: ["GIP-LightItalic", "sans-serif"],
        medium: ["GIP-Medium", "sans-serif"],
        mediumItalic: ["GIP-MediumItalic", "sans-serif"],
        regular: ["GIP-Regular", "sans-serif"],
        regularItalic: ["GIP-RegularItalic", "sans-serif"],
        semiBold: ["GIP-SemiBold", "sans-serif"],
        semiBoldItalic: ["GIP-SemiBoldItalic", "sans-serif"],
        thin: ["GIP-Thin", "sans-serif"],
        thinItalic: ["GIP-ThinItalic", "sans-serif"],
        ultraLight: ["GIP-UltraLight", "sans-serif"],
        ultraLightItalic: ["GIP-UltraLightItalic", "sans-serif"],
      },
    },
  },
  plugins: [],
};
