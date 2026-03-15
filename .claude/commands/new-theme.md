# New Theme

Create a new named theme for the site by defining all design tokens as a `[data-theme]` SCSS block.

## Instructions

The user will describe the theme they want. If no argument is given, ask for a name and a rough direction (color palette, mood, style).

**Argument:** `$ARGUMENTS` (theme name and optional description, e.g. `midnight — dark navy background, teal accent, soft glows`)

1. Read `client/src/styles/_tokens.scss` to get the full list of CSS custom properties that must be defined.
2. Read `client/src/styles/themes/_neo-brutalism.scss` and `client/src/styles/themes/_default.scss` to understand the two existing themes and what design decisions each one makes (shadows, radius, border width, typography, etc.).
3. Read `client/src/index.scss` to see how themes are imported.
4. Read `client/index.html` to see which theme is currently active via `data-theme` on `<html>`.

5. Design the theme based on `$ARGUMENTS`. Decide on:
   - **Palette**: `--color-bg`, `--color-fg`, `--color-surface`, `--color-accent` (+hover/fg), `--color-secondary` (+hover/fg), `--color-muted` (+fg), `--color-brand`, `--color-border`, `--color-text-muted`
   - **Shadows**: Decide between hard offset (neo-brutalist), soft diffused (default dark), or no shadows. Define all 9 shadow tokens (`--shadow-xs` through `--shadow-xl` + hover variants).
   - **Borders**: `--border-width` (1px = subtle, 3px = bold), `--border`, `--radius` (0px = sharp, 4–12px = rounded, 9999px not used here)
   - **Typography**: `--font-family`, `--font-weight-body`, `--font-weight-heading`
   - **Layout**: Keep `--gutter`, `--max-width`, `--header-height` the same as existing themes unless there's a reason to change.
   - **Header**: `--header-bg`, `--header-backdrop` (use `blur(8px)` for dark/glass themes)
   - **Components**: `--btn-press-offset` (match shadow x/y offset for neo-brutalist, 0px for soft themes), `--heading-border`, `--input-focus-bg`, `--hero-pattern`, `--hero-pattern-size`, `--duration-*`, `--ease`

6. Create the theme file at `client/src/styles/themes/_{kebab-name}.scss`:
   - Use the selector `[data-theme='{kebab-name}']`
   - Include all token sections with comments matching the existing pattern (`// ── Section ──`)
   - Comment on non-obvious color choices (why this value, what it conveys)

7. Add the theme import to `client/src/index.scss` after the existing theme imports:
   ```scss
   @use 'styles/themes/{kebab-name}';
   ```

8. Report:
   - The file created and its key design decisions (palette summary, shadow style, border style)
   - The command to preview it: change `data-theme` on `<html>` in `client/index.html` to the new theme name
   - Any Google Fonts to add to `client/index.html` if a new font family is used
