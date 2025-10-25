# Theme System Documentation

## Overview

This document describes the theme switching system implemented for the Indie Comments lightweight widget. The system allows users to switch between different visual themes for the comment widget, with themes saved to localStorage and support for URL parameters.

## Features

- **Multiple Predefined Themes**: Dark, Matrix, and NeoCities themes included
- **Theme Selector**: Dropdown menu in the widget header for easy theme selection
- **Persistence**: Theme preferences saved to localStorage
- **URL Parameters**: Support for setting themes via URL parameter
- **Shadow DOM Compatible**: Properly handles theming within the widget's shadow DOM
- **Pico.css Integration**: Maintains compatibility with Pico.css while applying custom themes
- **Easy Extension**: Simple system for adding new themes

## Themes Included

### 1. Dark Theme
- Dark background (#1a1a1a)
- Light text (#f0f0f0)
- Green accent colors
- Subtle borders and controls

### 2. Matrix Theme
- Black background with green text (#0f0)
- Matrix-style terminal font (Courier New)
- Glowing effects and grid background
- Green color scheme reminiscent of the Matrix movie

### 3. NeoCities Theme
- Bright yellow/light pink background
- Purple/pink borders and accents
- Retro web design elements
- Grid pattern and star decorations
- Dotted and dashed borders for vintage look

## Implementation Details

### File Structure
```
widget/
├── css/
│   ├── themes/
│   │   ├── dark.css
│   │   ├── matrix.css
│   │   └── neocities.css
│   └── widget.css
├── src/
│   ├── comment-widget.js
│   ├── template.js
│   └── ...
```

### Components Updated

#### 1. Template System (`src/template.js`)
- Added theme parameter to `createTemplate` function
- Conditional CSS injection based on selected theme
- Theme selector dropdown added to widget header
- Flex layout for header to accommodate theme selector

#### 2. Widget Logic (`src/comment-widget.js`)
- Added theme management methods
- Event listeners for theme selector
- Dynamic CSS loading/removal
- URL parameter handling
- localStorage integration
- Shadow DOM re-rendering when themes change

#### 3. Theme CSS Files
- Global page styles that integrate with Pico.css
- CSS variable overrides for Pico.css properties
- Page-level theming that extends beyond the widget

#### 4. Main Widget CSS
- Updated to use CSS variables for theming support
- Default styles that can be overridden by themes

### API Integration

The system integrates with the existing widget attributes:

```html
<comment-widget thread-id="123" page-title="Sample Article"></comment-widget>
```

## Usage

### Basic Usage
1. Users see a "Tema:" dropdown in the widget header
2. Select desired theme from the dropdown
3. Theme is applied immediately and saved to localStorage
4. URL updates to reflect the selected theme

### URL Parameters
Set the theme via URL:
```
https://example.com/page?theme=dark
https://example.com/page?theme=matrix
https://example.com/page?theme=neocities
```

### LocalStorage
The selected theme is saved to localStorage as `indie_comments_theme`.

## Extending the System

### Adding New Themes

To add a new theme:

1. Create a new CSS file in `css/themes/` (e.g., `solarized.css`)
2. Define CSS variables and styles for the theme
3. Add the theme option to the dropdown in `template.js`
4. Add conditional styles in the template function

Example theme file structure:
```css
/* Solarized Theme - Global styles for the page */
:root {
  /* Pico CSS variables override */
  --pico-background-color: #fdf6e3;
  --pico-text-color: #586e75;
  --pico-border-color: #93a1a1;
  --pico-form-element-background-color: #eee8d5;
  --pico-form-element-border-color: #93a1a1;
  --pico-form-element-color: #586e75;
  --pico-card-background-color: #fdf6e3;
}

/* Page-level solarized theme */
body {
  background-color: #fdf6e3;
  color: #586e75;
}
```

### Customization Points

1. **CSS Variables**: Each theme defines CSS variables that integrate with Pico.css
2. **Shadow DOM Styles**: Template-based styles for the widget internals
3. **Global Styles**: Document-level styles in theme CSS files
4. **Animation Effects**: Themes can include custom animations and transitions

## Technical Notes

### Shadow DOM Considerations
- Shadow DOM isolates widget styles from external CSS
- Theme styles for the widget are injected via template conditionals
- External CSS files affect global page styling outside the widget

### Performance
- Themes are loaded dynamically only when selected
- Previous themes are removed from the DOM when switching
- URL updates use `history.replaceState` to avoid browser history pollution

### Compatibility
- Maintains full compatibility with existing widget functionality
- Pico.css integration preserved for default styling
- Responsive design maintained across all themes

## Future Enhancements

1. **User-Defined Themes**: Allow users to create and upload custom themes
2. **Theme API**: Provide an API for dynamic theme loading from external sources
3. **Automatic Theme Detection**: Detect system theme preference (light/dark mode)
4. **Theme Editor**: In-browser theme customization tools
5. **Theme Sharing**: Easy sharing of custom themes via URL