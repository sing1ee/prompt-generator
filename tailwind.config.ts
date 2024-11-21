import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: 'hsl(var(--foreground))',
            h1: {
              color: 'hsl(var(--foreground))',
              fontWeight: '700',
              marginBottom: '1em',
            },
            h2: {
              color: 'hsl(var(--foreground))',
              fontWeight: '600',
              marginBottom: '0.8em',
            },
            h3: {
              color: 'hsl(var(--foreground))',
              fontWeight: '600',
              marginBottom: '0.6em',
            },
            'h4,h5,h6': {
              color: 'hsl(var(--foreground))',
              fontWeight: '600',
              marginBottom: '0.4em',
            },
            pre: {
              backgroundColor: 'hsl(var(--muted))',
              color: 'hsl(var(--muted-foreground))',
              borderRadius: '0.5rem',
            },
            code: {
              color: 'hsl(var(--primary))',
              backgroundColor: 'hsl(var(--muted))',
              padding: '0.2em 0.4em',
              borderRadius: '0.25rem',
              fontWeight: '500',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            a: {
              color: 'hsl(var(--primary))',
              textDecoration: 'underline',
              fontWeight: '500',
            },
            'ul > li': {
              position: 'relative',
              paddingLeft: '1.5em',
            },
            'ul > li::before': {
              content: '""',
              width: '0.5em',
              height: '0.5em',
              borderRadius: '50%',
              backgroundColor: 'hsl(var(--foreground))',
              position: 'absolute',
              left: 0,
              top: '0.5em',
            },
            'ol > li': {
              position: 'relative',
              paddingLeft: '1.5em',
            },
            hr: {
              borderColor: 'hsl(var(--border))',
              marginTop: '2em',
              marginBottom: '2em',
            },
            strong: {
              color: 'hsl(var(--foreground))',
              fontWeight: '600',
            },
            blockquote: {
              fontWeight: '500',
              fontStyle: 'italic',
              color: 'hsl(var(--foreground))',
              borderLeftWidth: '0.25rem',
              borderLeftColor: 'hsl(var(--border))',
              paddingLeft: '1em',
              marginTop: '1.6em',
              marginBottom: '1.6em',
            },
            table: {
              width: '100%',
              tableLayout: 'auto',
              textAlign: 'left',
              marginTop: '2em',
              marginBottom: '2em',
            },
            thead: {
              borderBottomWidth: '1px',
              borderBottomColor: 'hsl(var(--border))',
            },
            'thead th': {
              color: 'hsl(var(--foreground))',
              fontWeight: '600',
              verticalAlign: 'bottom',
              paddingBottom: '0.5em',
            },
            'tbody tr': {
              borderBottomWidth: '1px',
              borderBottomColor: 'hsl(var(--border))',
            },
            'tbody td': {
              verticalAlign: 'top',
              paddingTop: '0.5em',
              paddingBottom: '0.5em',
            },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('tailwindcss-animate')],
};

export default config;
