/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            screens: {
                xs: "480px", // Now you can use `tablet:` as a prefix
            },
        },
    },
    plugins: [],
}