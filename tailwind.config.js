/**
 * Every color resolves to a CSS variable holding space-separated RGB
 * channels, which keeps Tailwind's alpha modifiers working (`bg-surface/60`)
 * while letting `.dark` swap the whole palette in one place. Components
 * therefore carry no `dark:` variants for color.
 */
const rgb = (v) => `rgb(var(${v}) / <alpha-value>)`;

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ground: rgb('--ground'),
        surface: rgb('--surface'),
        sunken: rgb('--sunken'),
        line: {
          DEFAULT: rgb('--line'),
          strong: rgb('--line-strong'),
        },
        ink: {
          DEFAULT: rgb('--ink'),
          body: rgb('--ink-body'),
          muted: rgb('--ink-muted'),
          faint: rgb('--ink-faint'),
        },
        accent: {
          DEFAULT: rgb('--accent'),
          hover: rgb('--accent-hover'),
          tint: rgb('--accent-tint'),
          on: rgb('--accent-on'),
        },
      },

      fontFamily: {
        display: ['Fraunces', 'Iowan Old Style', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },

      // Fluid at the top of the scale, fixed from h3 down.
      fontSize: {
        display: ['clamp(2.75rem, 1.6rem + 4.6vw, 5rem)', { lineHeight: '1.02', letterSpacing: '-0.022em', fontWeight: '600' }],
        h1: ['clamp(2rem, 1.3rem + 2.6vw, 3.25rem)', { lineHeight: '1.08', letterSpacing: '-0.018em', fontWeight: '600' }],
        h2: ['clamp(1.75rem, 1.2rem + 1.8vw, 2.5rem)', { lineHeight: '1.12', letterSpacing: '-0.015em', fontWeight: '600' }],
        h3: ['1.375rem', { lineHeight: '1.28', letterSpacing: '-0.01em', fontWeight: '600' }],
        h4: ['1.0625rem', { lineHeight: '1.4', fontWeight: '600' }],
        lede: ['1.1875rem', { lineHeight: '1.65', letterSpacing: '-0.005em' }],
        body: ['1.0625rem', { lineHeight: '1.75' }],
        small: ['0.875rem', { lineHeight: '1.6' }],
        meta: ['0.8125rem', { lineHeight: '1.5', letterSpacing: '0.01em', fontWeight: '500' }],
        eyebrow: ['0.6875rem', { lineHeight: '1', letterSpacing: '0.16em', fontWeight: '600' }],
      },

      borderRadius: {
        sm: 'var(--r-sm)',
        md: 'var(--r-md)',
        lg: 'var(--r-lg)',
      },

      boxShadow: {
        xs: 'var(--shadow-xs)',
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
        xl: 'var(--shadow-xl)',
      },

      maxWidth: {
        content: 'var(--container)',
        measure: 'var(--measure)',
        wide: '84ch',
      },

      spacing: {
        section: 'var(--section-y)',
        header: 'var(--header-h)',
      },

      transitionTimingFunction: {
        smooth: 'var(--ease)',
      },

      transitionDuration: {
        fast: 'var(--dur-fast)',
        base: 'var(--dur-base)',
        slow: 'var(--dur-slow)',
      },
    },
  },
  plugins: [],
};
