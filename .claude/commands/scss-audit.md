# SCSS Audit

Audit all SCSS files for compliance with project conventions and report issues.

## Instructions

Scan every SCSS file in the project and evaluate against the rules in CLAUDE.md.

1. Find all SCSS files: glob `client/src/**/*.scss`.
2. Read `client/src/styles/_tokens.scss` and `client/src/styles/_mixins.scss` to understand available design tokens and mixins.
3. For each SCSS file, check:

   **Rule compliance (from CLAUDE.md):**
   - Are all styles in `.scss` files? Flag any `.css` imports or style blocks in `.tsx` files.
   - Is SCSS nesting used for child selectors, pseudo-classes (`:hover`, `:focus`), and pseudo-elements (`::before`)?
   - Are BEM-style `&` shorthands used (e.g. `&-body`, `&:hover`, `&.active`) instead of writing out full selectors?

   **Token usage:**
   - Are hardcoded hex/rgb color values used instead of `var(--token-name)` CSS custom properties?
   - Are hardcoded pixel font sizes used instead of token variables?
   - Are hardcoded spacing values that should use consistent scale?

   **Mixin usage:**
   - Are interactive cards or buttons styled without using the `interactive-card` or `interactive-btn` mixins from `_mixins.scss`?
   - Are bordered surfaces manually styled when `bordered-surface` mixin could be used?

4. Check for any plain `.css` files in `client/src/` — these violate the project rules.

## Output Format

### Summary
- Total SCSS files audited: N
- Files with issues: N
- Plain CSS files found (violations): list them

### Issues by File
For each file with issues, list:
- File path
- Each issue with line reference where possible (nesting missing, hardcoded value, missing mixin, etc.)

### Quick Wins
The 3–5 easiest fixes to make right now.

### Recommended Next Steps
Prioritized list of improvements, starting with rule violations (must-fix) then token/mixin suggestions (should-fix).
