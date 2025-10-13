# Flexible CSS Grid System Documentation

## Overview
This CSS grid system allows creating responsive layouts with 12-column flexibility. It includes utility classes for margin, padding, text alignment, flexbox, and basic components like cards.

## Folder Structure
Hacktoberfest-2025/
    frontend/
        css/
            grid.css
        index.html
    docs/
        grid-docs.md


## Container
- `.container` – grid container class
- `gap` and `padding` are included by default.

## Columns
- `.col-1` to `.col-12` – span 1 to 12 columns
- Example: `<div class="col-4">Content</div>`

## Responsive Breakpoints
- **≤600px:** 2 columns  
- **601px–1024px:** 4 columns  
- **>1024px:** 12 columns  

## Utility Classes

### Text Alignment
- `.text-left`, `.text-center`, `.text-right`

### Margin
- `.m-0` → 0px, `.m-1` → 8px, `.m-2` → 16px, `.m-3` → 24px

### Padding
- `.p-0` → 0px, `.p-1` → 8px, `.p-2` → 16px, `.p-3` → 24px

### Flexbox
- `.d-flex` – display flex  
- `.justify-start`, `.justify-center`, `.justify-end`  
- `.align-start`, `.align-center`, `.align-end`

### Cards & Hover Effects
- `.card` – simple card with padding and border-radius  
- `.hover-shadow:hover` – adds shadow on hover  

### Background Utilities
- `.bg-light`, `.bg-primary`, `.bg-secondary`

## Example Usage
```html
<div class="container">
  <div class="col-4 card bg-primary">Column 1</div>
  <div class="col-4 card bg-secondary">Column 2</div>
  <div class="col-4 card bg-light">Column 3</div>
</div>


---

✅ Now the **documentation is complete** and consistent with your folder structure.  

Next, we can **stage, commit, and push all your changes** so your PR is ready.  

Do you want me to guide you step by step for that?
