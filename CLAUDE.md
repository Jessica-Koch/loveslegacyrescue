# Project Rules

## Components & Pages

- Every component lives in its **own folder** named after the component, e.g. `Button/Button.tsx`, `DogCard/DogCard.tsx`.
- Use **named arrow function exports** — never `export default function`. Example:
  ```tsx
  export const Button = ({ children }: ButtonProps) => { ... };
  ```
- Every reusable component must have a paired **SCSS file** and a **Storybook story** (`*.stories.tsx`).
- Export the component and its types from the folder's `index.ts` barrel where one exists.
- Pages (under `src/pages/`) follow the same folder rule but do **not** need Storybook stories.

## CSS

- All styles are written in **SCSS** (`.scss` files). Never create plain `.css` files.
- Use SCSS nesting to scope child selectors, pseudo-classes, and pseudo-elements within their parent block.
- Use the `&` BEM-style shorthand (e.g. `&-body`, `&:hover`, `&.active`) to keep related styles co-located.

**Example:**
```scss
.dog-card {
  background: var(--dark-gray);

  &:hover {
    transform: translateY(-4px);
  }

  &-photo {
    aspect-ratio: 4/3;
  }

  &-body {
    padding: 20px;
  }
}
```
