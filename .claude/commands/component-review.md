# Component Review

Review a component for code quality, accessibility, and Storybook story completeness.

## Instructions

The user will provide a component name or file path. If no argument is given, ask for it.

**Argument:** `$ARGUMENTS` (component name or path, e.g. `DogCard`)

1. Read the component file at `client/src/components/{Name}.tsx`.
2. Read its story file if it exists at `client/src/components/{Name}.stories.tsx`.
3. Read relevant CSS (component-specific or `App.css`/`index.css`).
4. Read `client/src/types.ts` for any types the component uses.

Evaluate across these dimensions and report findings:

### Props & TypeScript
- Is the props interface exported (needed for stories and consumers)?
- Are all props typed (no `any`)?
- Are optional props marked with `?` and handled in the JSX?
- Are there props that should have defaults?

### Accessibility
- Do images have meaningful `alt` text?
- Are interactive elements (`<a>`, `<button>`) reachable by keyboard?
- Are there missing ARIA roles or labels?
- Is heading hierarchy correct (`h1` → `h2` → etc.)?
- Does color/badge information rely solely on color (needs text alternative)?

### Component Design
- Does the component do one thing well, or is it doing too much?
- Are there magic strings or hardcoded values that should be props?
- Is the component unnecessarily coupled to global state or API calls?

### Story Coverage
- Does a story exist?
- Are all visual states covered (loading, empty, error, variants)?
- Are args/argTypes set up for Controls panel interactivity?

## Output Format

For each dimension, list:
- **Issues** (things to fix)
- **Suggestions** (nice-to-haves)

End with a prioritized list of the top 3 changes to make, and offer to implement them.
