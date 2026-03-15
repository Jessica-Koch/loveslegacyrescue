import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Design System/Typography',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Full type scale. Switch themes to see how the font families and weights adapt.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

// Base style — body font by default
const body = (overrides: React.CSSProperties): React.CSSProperties => ({
  fontFamily: 'var(--font-family)',
  color: 'var(--color-fg)',
  margin: 0,
  ...overrides,
});

// Heading font
const heading = (overrides: React.CSSProperties): React.CSSProperties => ({
  fontFamily: 'var(--font-family-heading)',
  color: 'var(--color-fg)',
  margin: 0,
  ...overrides,
});

// Display font
const display = (overrides: React.CSSProperties): React.CSSProperties => ({
  fontFamily: 'var(--font-family-display)',
  color: 'var(--color-fg)',
  margin: 0,
  ...overrides,
});

const divider = (
  <hr style={{ border: 'none', borderTop: '2px solid var(--color-border)', margin: '32px 0', opacity: 0.3 }} />
);

const label = (text: string) => (
  <p style={body({ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: 16 })}>
    {text}
  </p>
);

function TypeSpecimen() {
  return (
    <div style={{ padding: '40px', background: 'var(--color-bg)', minHeight: '100vh', maxWidth: 900 }}>

      <h1 style={display({ fontWeight: 'var(--font-weight-heading)' as any, fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: 1.05, marginBottom: 8 })}>
        Type Scale
      </h1>
      <p style={body({ fontWeight: 400, fontSize: '1rem', color: 'var(--color-text-muted)', marginBottom: 48 })}>
        Display · Heading · Body — switch themes to see each family.
      </p>

      {divider}

      {/* Display */}
      {label('Display — hero & large feature text')}
      <p style={display({ fontWeight: 'var(--font-weight-heading)' as any, fontSize: 'clamp(3rem, 8vw, 5.5rem)', lineHeight: 1 })}>
        Give a dog a home.
      </p>

      {divider}

      {/* Headings */}
      {label('Headings — section titles & card names')}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {[
          { level: 'H1', size: 'clamp(2.25rem, 5vw, 3.5rem)' },
          { level: 'H2', size: 'clamp(1.75rem, 4vw, 2.5rem)' },
          { level: 'H3', size: 'clamp(1.4rem, 3vw, 2rem)' },
          { level: 'H4', size: '1.25rem' },
        ].map(({ level, size }) => (
          <div key={level} style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
            <span style={body({ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-muted)', width: 28, flexShrink: 0 })}>
              {level}
            </span>
            <p style={heading({ fontWeight: 'var(--font-weight-heading)' as any, fontSize: size, lineHeight: 1.1 })}>
              Love's Legacy Rescue
            </p>
          </div>
        ))}
      </div>

      {divider}

      {/* Body */}
      {label('Body — descriptions & reading text')}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <p style={body({ fontWeight: 700, fontSize: '1.15rem', lineHeight: 1.65, maxWidth: 600 })}>
          Body Large — We rescue huskies, shepherds, and dogs in need across Southern California. Every dog deserves a second chance at a loving home.
        </p>
        <p style={body({ fontWeight: 'var(--font-weight-body)' as any, fontSize: '1rem', lineHeight: 1.65, maxWidth: 600 })}>
          Body — We rescue huskies, shepherds, and dogs in need across Southern California. Every dog deserves a second chance at a loving home.
        </p>
        <p style={body({ fontWeight: 400, fontSize: '1rem', lineHeight: 1.75, maxWidth: 600, color: 'var(--color-text-muted)' })}>
          Body Muted — We rescue huskies, shepherds, and dogs in need across Southern California. Every dog deserves a second chance at a loving home.
        </p>
        <p style={body({ fontWeight: 400, fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--color-text-muted)' })}>
          Small — Siberian Husky · Male · 2yr
        </p>
      </div>

      {divider}

      {/* Labels */}
      {label('Labels & UI text')}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <p style={body({ fontWeight: 700, fontSize: '0.7rem', letterSpacing: '0.14em', textTransform: 'uppercase' })}>
          Nav Link / Button — Adopt · Foster · Donate
        </p>
        <p style={body({ fontWeight: 700, fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase' })}>
          Badge — Featured · In Foster · Dog of the Week
        </p>
        <p style={body({ fontWeight: 700, fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-muted)' })}>
          Table Header — Name · Breed · Status
        </p>
      </div>

    </div>
  );
}

export const Specimen: Story = {
  render: () => <TypeSpecimen />,
};
