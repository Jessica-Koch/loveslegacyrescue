# New Story

Add a Storybook story file for an existing component that doesn't have one yet.

## Instructions

The user will provide a component name or file path. If no argument is given, run the storybook-audit to find components missing stories and ask which one to document.

**Argument:** `$ARGUMENTS` (component name or path, e.g. `Header` or `client/src/components/Header.tsx`)

1. Locate the component file in `client/src/components/`.
2. Read the component thoroughly — understand every prop, conditional render branch, and visual state.
3. Check `client/src/types.ts` for any relevant data shapes used by the component.
4. Create `client/src/components/{Name}.stories.tsx` using Storybook CSF3:
   - `Meta` with `title`, `component`, and `argTypes` for all props
   - `parameters.docs.description.component` with a clear description of the component's purpose
   - A `Default` story
   - Stories for every meaningful visual variant (e.g. loading states, empty states, with/without optional props, featured vs normal)
   - For data-heavy components, provide realistic mock data drawn from the `Dog` type in `client/src/types.ts`
   - Use `play` functions for interactive stories where it adds value (e.g. button clicks, form interactions)
5. Do not modify the component itself unless a prop type needs to be exported for the story.
6. Report each story added and what state/variant it covers.
