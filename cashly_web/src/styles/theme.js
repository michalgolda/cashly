import { Lato } from '@next/font/google'

// const openSansFont = Open_Sans({
//     subsets: ['latin', 'latin-ext'],
//     weight: ['700'],
// })

const latoFont = Lato({
    subsets: ['latin', 'latin-ext'],
    weight: ['400', '700', '900'],
})

const theme = {
    colors: {
        primary500: '#2f2f2f',
        primary400: '#000',
        primary300: '#4d4d4d',
        gray600: '#a5a5a5',
        gray400: '#eeeeee',
        gray300: '#f0f0f0',
        gray200: '#f5f5f5',
        gray100: '#f9f9f9',
        blue500: '#4f29e6',
        blue400: '#582eff',
        blue300: '#7958ff',
        red500: '#e60053',
        red400: '#ff4848',
        red300: '#ff337d',
    },
    fontFamily: latoFont.style.fontFamily,
    fontSizes: {
        h1: '2.488rem',
        h2: '2.074rem',
        h3: '1.728rem',
        h4: '1.44rem',
        h5: '1.2rem',
        h6: '.833rem',
    },
    fontWeights: {
        regular: 400,
        bold: 700,
        black: 900,
    },
    defaultTransition: 'all .25s',
}

export default theme
