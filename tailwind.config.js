module.exports = {
    content: [
        './pages/**/*.tsx',
        './components/**/*.tsx',
        './layouts/**/*.tsx',
        './data/blogs/**/*.mdx'
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {},
    },
    variants: {
        extend: {},
    },
    plugins: [require('@tailwindcss/typography')],
}
