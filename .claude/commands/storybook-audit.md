# Storybook Audit

Audit the component library and report coverage gaps.

## Instructions

Scan the project for components, stories, and quality issues, then produce a structured report.

1. Find all component files: glob `client/src/components/**/*.tsx`, excluding `*.stories.tsx` and `*.test.tsx`.
2. Find all story files: glob `client/src/components/**/*.stories.tsx`.
3. For each component file, check if a corresponding `.stories.tsx` exists.
4. For components that DO have stories, read the story file and check:
   - Does it use CSF3 format (`satisfies Meta`)?
   - Does it have more than just a `Default` story?
   - Does it have `argTypes` or `args` for props?
   - Does it have a `docs` description?
5. Read each component that has no story and note what stories would be most valuable to add.

## Output Format

Print a markdown report with these sections:

### Coverage Summary
- Total components: N
- Components with stories: N
- Coverage: N%

### Missing Stories
For each component without a story, list: component name, file path, and suggested story variants to create.

### Story Quality Issues
For each story file with quality gaps, list the file and specific improvements needed.

### Recommended Next Steps
Prioritized list of the 3–5 highest-value actions (e.g. "Add stories for DogCard — it's the most-used component").
