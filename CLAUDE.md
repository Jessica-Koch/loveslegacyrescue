# Project Rules

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
