import type { Config } from 'tailwindcss'

import colors from 'tailwindcss/colors'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  mode: 'jit',
  plugins: [
    require('tailwindcss-animate'),
    require('tailwind-scrollbar'),
    require('@tailwindcss/typography'),
  ],
  theme: {
    borderWidth: {
      '0': '0',
      '0.5': '0.5px',
      '2': '2px',
      '3': '3px',
      '4': '4px',
      '6': '6px',
      '8': '8px',
      DEFAULT: '1px',
    },
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'animate-webgl-scale-in-fade': 'webgl-scale-in-fade 1s ease-in-out',
        'caret-blink': 'caret-blink 1.25s ease-out infinite',
        fifth: 'moveInCircle 20s ease infinite',
        first: 'moveVertical 30s ease infinite',
        fourth: 'moveHorizontal 40s ease infinite',
        'loader-drag': 'loader-drag 1.4s ease-in-out infinite',
        'open-scale-up-fade': 'open-scale-up-fade',
        scroll:
          'scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite',
        second: 'moveInCircle 20s reverse infinite',
        'slide-left': 'slide-left 0.2s ease-out',
        'slide-right': 'slide-right 0.2s ease-out',
        third: 'moveInCircle 40s linear infinite',
      },

      boxShadow: {
        defaultColor: 'rgb(245 158 11) 0px -1px 0px 0px inset, rgb(245 158 11) 0px 1px 0px 0px',
        highlight: 'var(--box-shadow-highlight-soft)',
        'highlight-hard': 'var(--box-shadow-highlight-hard)',
      },
      colors: {
        accent: {
          DEFAULT: colors.stone[500],
          foreground: colors.stone[300],
        },
        background: {
          DEFAULT: colors.stone[900],
          contrast: colors.stone[700],
          secondary: colors.stone[800],
        },
        border: {
          DEFAULT: colors.stone[700],
          accent: colors.stone[500],
          muted: colors.stone[800],
          secondary: colors.stone[600],
        },
        destructive: {
          DEFAULT: colors.rose[600],
        },
        foreground: {
          DEFAULT: colors.stone[200],
        },
        info: {
          DEFAULT: colors.blue[600],
          foreground: colors.blue[300],
        },
        input: {
          DEFAULT: colors.stone[600],
        },
        link: {
          DEFAULT: colors.blue[400],
        },
        muted: {
          DEFAULT: colors.stone[500],
          foreground: colors.stone[400],
          info: colors.blue[400],
        },
        notification: {
          DEFAULT: colors.orange[600],
          foreground: colors.white,
        },
        popover: {
          DEFAULT: colors.stone[800],
          foreground: colors.stone[400],
        },
        primary: {
          DEFAULT: colors.stone[600],
          foreground: colors.stone[300],
        },
        secondary: {
          DEFAULT: colors.stone[600],
        },
        success: {
          DEFAULT: colors.lime[600],
        },
        text: {
          DEFAULT: colors.stone[200],
          muted: colors.stone[400],
        },
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'caret-blink': {
          '0%,70%,100%': { opacity: '1' },
          '20%,50%': { opacity: '0' },
        },
        jiggle: {
          '0%': {
            transform: 'rotate(-4deg)',
          },
          '50%': {
            transform: 'rotate(4deg)',
          },
        },
        'loader-drag': {
          '0%': {
            transform: 'translateX(-100%)',
          },
          '100%': {
            transform: 'translateX(100%)',
          },
        },
        'move-horizontal': {
          '0%': {
            transform: 'translateX(-50%) translateY(-10%)',
          },
          '50%': {
            transform: 'translateX(50%) translateY(10%)',
          },
          '100%': {
            transform: 'translateX(-50%) translateY(-10%)',
          },
        },
        'move-in-circle': {
          '0%': {
            transform: 'rotate(0deg)',
          },
          '50%': {
            transform: 'rotate(180deg)',
          },
          '100%': {
            transform: 'rotate(360deg)',
          },
        },
        'move-vertical': {
          '0%': {
            transform: 'translateY(-50%)',
          },
          '50%': {
            transform: 'translateY(50%)',
          },
          '100%': {
            transform: 'translateY(-50%)',
          },
        },
        'open-scale-up-fade': {
          '0%': {
            opacity: '0',
            transform: 'scale(.98) translateY(5px)',
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1) translateY(0)',
          },
        },
        scroll: {
          to: {
            transform: 'translate(calc(-50% - 0.5rem))',
          },
        },
        'slide-left': {
          from: { width: '100%' },
          to: { width: '0%' },
        },
        'slide-right': {
          from: { width: '0%' },
          to: { width: '100%' },
        },
        'webgl-scale-in-fade': {
          '0%': {
            opacity: '0',
            transform: 'scale(.7)',
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1)',
          },
        },
      },
    },
    fontSize: {
      '2xl': '20px',
      '3xl': '30px',
      base: '14px',
      lg: '16px',
      sm: '13px',
      xl: '18px',
      xs: '10px',
    },
  },
}
export default config
