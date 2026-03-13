import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Design System/Typography',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Full type scale using Space Grotesk. Switch themes to see how weights and family adapt.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

const s = (overrides: React.CSSProperties): React.CSSProperties => ({
  fontFamily: 'var(--font-family)',
  color: 'var(--color-fg)',
  margin: 0,
  ...overrides,
});

const divider = (
  <hr style={{ border: 'none', borderTop: '3px solid var(--color-border)', margin: '32px 0' }} />
);

function TypeSpecimen() {
  return (
    <div style={{ padding: '40px', background: 'var(--color-bg)', minHeight: '100vh', maxWidth: 900 }}>

      <h1 style={s({ fontWeight: 900, fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: 8 })}>
        Type Scale
      </h1>
      <p style={s({ fontWeight: 700, fontSize: '1rem', color: 'var(--color-text-muted)', marginBottom: 48 })}>
        Space Grotesk — weights 900 (headings) · 700 (body) · 400 (reading)
      </p>

      {divider}

      {/* Display */}
      <p style={s({ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: 8 })}>Display</p>
      <p style={s({ fontWeight: 900, fontSize: 'clamp(3rem, 8vw, 5.5rem)', letterSpacing: '-0.04em', lineHeight: 0.95 })}>
        Give a dog a home.
      </p>

      {divider}

      {/* Headings */}
      <p style={s({ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: 24 })}>Headings</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {[
          { level: 'H1', size: 'clamp(2.25rem, 5vw, 3.5rem)' },
          { level: 'H2', size: 'clamp(1.75rem, 4vw, 2.5rem)' },
          { level: 'H3', size: 'clamp(1.4rem, 3vw, 2rem)' },
          { level: 'H4', size: '1.25rem' },
        ].map(({ level, size }) => (
          <div key={level} style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
            <span style={s({ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-muted)', width: 28, flexShrink: 0 })}>{level}</span>
            <p style={s({ fontWeight: 900, fontSize: size, letterSpacing: '-0.02em', lineHeight: 1.1 })}>
              Love's Legacy Rescue
            </p>
          </div>
        ))}
      </div>

      {divider}

      {/* Body */}
      <p style={s({ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: 24 })}>Body</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <p style={s({ fontWeight: 700, fontSize: '1.15rem', lineHeight: 1.65, maxWidth: 600 })}>
          Body Large — We rescue huskies, shepherds, and dogs in need across Southern California. Every dog deserves a second chance at a loving home.
        </p>
        <p style={s({ fontWeight: 700, fontSize: '1rem', lineHeight: 1.65, maxWidth: 600 })}>
          Body — We rescue huskies, shepherds, and dogs in need across Southern California. Every dog deserves a second chance at a loving home.
        </p>
        <p style={s({ fontWeight: 400, fontSize: '1rem', lineHeight: 1.75, maxWidth: 600, color: 'var(--color-text-muted)' })}>
          Body Regular — We rescue huskies, shepherds, and dogs in need across Southern California. Every dog deserves a second chance at a loving home.
        </p>
        <p style={s({ fontWeight: 700, fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--color-text-muted)' })}>
          Small — Siberian Husky · Male · 2yr
        </p>
      </div>

      {divider}

      {/* Labels & UI text */}
      <p style={s({ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: 24 })}>Labels &amp; UI Text</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <p style={s({ fontWeight: 700, fontSize: '0.7rem', letterSpacing: '0.14em', textTransform: 'uppercase' })}>
          NAV LINK / BUTTON LABEL — Adopt · Foster · Donate
        </p>
        <p style={s({ fontWeight: 700, fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase' })}>
          BADGE — Featured · In Foster · Dog of the Week
        </p>
        <p style={s({ fontWeight: 700, fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-muted)' })}>
          Table Header — Name · Breed · Status
        </p>
      </div>
    </div>
  );
}

export const Specimen: Story = {
  render: () => <TypeSpecimen />,
};
