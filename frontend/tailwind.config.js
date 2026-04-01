/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        'trust-green': '#10B981',
        'trust-green-light': '#D1FAE5',
        'trust-amber': '#F59E0B',
        'trust-amber-light': '#FEF3C7',
        'trust-red': '#EF4444',
        'trust-red-light': '#FEE2E2',
        'trust-blue': '#3B82F6',
        'trust-blue-light': '#DBEAFE',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        serif: ['Georgia', 'Cambria', 'serif'],
      },
      boxShadow: {
        'soft':        '0 2px 8px -2px rgba(0,0,0,0.05), 0 4px 16px -4px rgba(0,0,0,0.08)',
        'soft-lg':     '0 4px 16px -4px rgba(0,0,0,0.08), 0 8px 32px -8px rgba(0,0,0,0.12)',
        'soft-xl':     '0 8px 24px -6px rgba(0,0,0,0.10), 0 16px 48px -12px rgba(0,0,0,0.14)',
        'inner-soft':  'inset 0 2px 4px 0 rgba(0,0,0,0.04)',
        'green-glow':  '0 4px 14px -2px rgba(16,185,129,0.25)',
        'green-glow-lg':'0 6px 20px -4px rgba(16,185,129,0.35)',
        'blue-glow':   '0 4px 14px -2px rgba(59,130,246,0.25)',
      },
      transitionTimingFunction: {
        'ease-spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      transitionDuration: {
        '250': '250ms',
      },
      keyframes: {
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-up': {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        'shimmer': {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'fade-in':  'fade-in 0.3s ease-out forwards',
        'slide-up': 'slide-up 0.4s ease-out forwards',
        'shimmer':  'shimmer 1.6s linear infinite',
      },
    }
  },
  plugins: [require("tailwindcss-animate")],
}
