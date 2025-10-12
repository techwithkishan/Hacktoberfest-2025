# Theme Documentation

This repository now includes multiple theme options for various projects to enhance user experience.

## Available Themes

### 1. Dark Theme (Default)
- **Description**: A dark theme with blue-grey backgrounds and cyan/purple accents
- **Best for**: Low-light environments, reducing eye strain
- **Colors**: Dark blue backgrounds with teal and purple gradient accents

### 2. Light Theme
- **Description**: A bright, clean theme with light backgrounds
- **Best for**: Well-lit environments, high contrast preference
- **Colors**: Light grey/white backgrounds with blue and green accents

### 3. Autumn Theme 🍂
- **Description**: A warm theme with brown, orange, and golden tones inspired by autumn
- **Best for**: Users who prefer warm color palettes
- **Colors**: Brown backgrounds with golden and orange gradient accents

## Projects with Theme Support

### React/TypeScript Projects
- **Himanshu/maitri-connect-track-main**: Uses Tailwind CSS with CSS variables
  - Themes are applied using CSS classes: `:root` (default light), `.dark`, `.autumn`
  - Configure theme by adding the appropriate class to the root element

### HTML/JavaScript Projects

#### JayNarayan/ToDoList
- **Theme Switcher**: Located at the top of the left panel
- **Buttons**: 🌙 Dark, ☀️ Light, 🍂 Autumn
- **Persistence**: Selected theme is saved in localStorage

#### JayNarayan/AttendanceTracker
- **Theme Switcher**: Located at the top of the left panel
- **Buttons**: 🌙 Dark, ☀️ Light, 🍂 Autumn
- **Persistence**: Selected theme is saved in localStorage

## How Themes Work

### CSS Variables Approach
All themes use CSS custom properties (variables) that are dynamically changed:
- Background colors (`--bg1`, `--bg2`)
- Accent colors (`--accent1`, `--accent2`)
- Text colors (`--text-color`)
- UI element backgrounds (`--glass`, `--panel-bg`, etc.)

### Theme Persistence
Themes are saved in the browser's localStorage:
- **ToDoList**: `todo-theme` key
- **AttendanceTracker**: `attendance-theme` key

## Adding Themes to Other Projects

To add theme support to a new project:

1. Define CSS variables in `:root` for the default theme
2. Create theme classes (e.g., `.light`, `.autumn`) with overridden variables
3. Add theme switcher buttons to the UI
4. Implement JavaScript to toggle theme classes and save preference
5. Load saved theme on page load

## Screenshots

### ToDoList Themes
- **Dark Theme**: Professional dark blue interface
- **Light Theme**: Clean white/grey interface  
- **Autumn Theme**: Warm brown/orange interface

### AttendanceTracker Themes
- **Dark Theme**: Navy blue professional interface
- **Light Theme**: Sky blue light interface
- **Autumn Theme**: Warm brown autumn palette

## Future Enhancements

Potential theme additions:
- Spring theme (pastel greens and pinks)
- Winter theme (cool blues and whites)
- High contrast theme (for accessibility)
- Custom theme builder
