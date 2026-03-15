import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Design System/Colors',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Full palette of CSS custom property tokens. Switch themes via the toolbar to see how the palette adapts.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

const tokens: { name: string; var: string; label: string }[] = [
  { name: 'Background',    var: '--color-bg',             label: 'color-bg' },
  { name: 'Foreground',    var: '--color-fg',             label: 'color-fg' },
  { name: 'Surface',       var: '--color-surface',        label: 'color-surface' },
  { name: 'Accent',        var: '--color-accent',         label: 'color-accent' },
  { name: 'Accent Hover',  var: '--color-accent-hover',   label: 'color-accent-hover' },
  { name: 'Accent FG',     var: '--color-accent-fg',      label: 'color-accent-fg' },
  { name: 'Secondary',     var: '--color-secondary',      label: 'color-secondary' },
  { name: 'Secondary FG',  var: '--color-secondary-fg',   label: 'color-secondary-fg' },
  { name: 'Muted',         var: '--color-muted',          label: 'color-muted' },
  { name: 'Muted FG',      var: '--color-muted-fg',       label: 'color-muted-fg' },
  { name: 'Brand Gold',    var: '--color-brand',          label: 'color-brand' },
  { name: 'Border',        var: '--color-border',         label: 'color-border' },
  { name: 'Text Muted',    var: '--color-text-muted',     label: 'color-text-muted' },
];

function Swatch({ name, cssVar, label }: { name: string; cssVar: string; label: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, minWidth: 140 }}>
      <div
        style={{
          width: '100%',
          height: 80,
          background: `var(${cssVar})`,
          border: 'var(--border-width, 2px) solid var(--color-border)',
          boxShadow: 'var(--shadow-sm)',
        }}
      />
      <div>
        <p style={{ fontWeight: 900, fontSize: '0.85rem', fontFamily: 'var(--font-family)', margin: 0 }}>{name}</p>
        <p style={{ fontWeight: 700, fontSize: '0.72rem', fontFamily: 'var(--font-family)', opacity: 0.6, margin: 0 }}><code>{`var(${label})`}</code></p>
      </div>
    </div>
  );
}

function ColorPalette() {
  return (
    <div style={{ padding: '40px', background: 'var(--color-bg)', minHeight: '100vh' }}>
      <h1 style={{
        fontFamily: 'var(--font-family)',
        fontWeight: 900,
        fontSize: 'clamp(2rem, 5vw, 3rem)',
        letterSpacing: '-0.02em',
        marginBottom: 8,
        borderBottom: '3px solid var(--color-accent)',
        display: 'inline-block',
        paddingBottom: 4,
      }}>
        Color Tokens
      </h1>
      <p style={{ fontFamily: 'var(--font-family)', fontWeight: 700, color: 'var(--color-text-muted)', marginBottom: 40 }}>
        All swatches are live CSS custom properties. Switch themes in the toolbar above.
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
        {tokens.map((t) => (
          <Swatch key={t.var} name={t.name} cssVar={t.var} label={t.label} />
        ))}
      </div>
    </div>
  );
}

export const Palette: Story = {
  render: () => <ColorPalette />,
};
