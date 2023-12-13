/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./components/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            gridTemplateColumns: {
                3: 'repeat(3, minmax(0, 1fr))',
            },
        },
    },
    daisyui: {
        themes: ['dark'],
    },
    plugins: [require('@tailwindcss/typography'), require('daisyui')],
};
