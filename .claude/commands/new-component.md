# New Component

Create a new React component and its Storybook story file together.

## Instructions

The user will provide a component name and optionally a description or props. If no argument is given, ask the user for the component name.

**Argument:** `$ARGUMENTS` (the component name, e.g. `Button` or `DogCard`)

1. Determine the component name from `$ARGUMENTS`. PascalCase it if needed.
2. Read existing components in `client/src/components/` for style conventions (CSS class names, TypeScript patterns, prop interface naming).
3. Create the component file at `client/src/components/{Name}.tsx`:
   - Export a typed props interface named `{Name}Props`
   - Use a named default export function
   - Use CSS class names following the existing kebab-case convention (e.g. `dog-card`, `dog-card-body`)
   - No inline styles
4. Create a SCSS file at `client/src/components/{Name}.scss` if the component needs styles, following the patterns in `client/src/App.scss` and `client/src/styles/_tokens.scss`. Use SCSS nesting and BEM-style `&` shorthand as required by CLAUDE.md. Import the SCSS file inside the `.tsx` component file.
5. Create the story file at `client/src/components/{Name}.stories.tsx`:
   - Use Storybook CSF3 format (`satisfies Meta<typeof {Name}>`)
   - Include a `Default` story and at least 2–3 meaningful variant stories that reflect real use cases for this rescue org (e.g. featured dogs, dogs with/without photos, etc.)
   - Use `args` for all controllable props so they appear in the Controls panel
   - Add `parameters.docs.description.component` with a one-sentence description
6. Report the files created and note any props the user should wire up.
