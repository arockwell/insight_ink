# Insight Ink Style Guide

## CSS Architecture

This style guide outlines the CSS approach for Insight Ink, using Tailwind CSS with component classes via the `@apply` directive to reduce utility class soup in markup.

## Directory Structure

```
styles/
├── globals.css           /* Main file that imports all modules */
├── components/
│   ├── layout.css        /* Layout components */
│   ├── navigation.css    /* Navigation components */
│   ├── buttons.css       /* Button components */
│   ├── cards.css         /* Card components */
│   ├── forms.css         /* Form components */
│   └── typography.css    /* Typography components */
```

## Usage

Each component's styles are defined in a dedicated CSS file, organized by functionality. The component classes use Tailwind's `@apply` directive to bundle utility classes into semantic, reusable class names.

## Component Classes

### Layout Components

| Class Name | Description |
|------------|-------------|
| `.container-app` | Main app container with flex layout |
| `.content-area` | Content area with sidebar consideration |
| `.main-content` | Main content with padding |
| `.content-container` | Content container with max width |
| `.page-footer` | Footer styling |

### Navigation Components

| Class Name | Description |
|------------|-------------|
| `.sidebar` | Main sidebar container |
| `.sidebar-content` | Sidebar content with styling |
| `.sidebar-header` | Header section of sidebar |
| `.app-title` | App title styling |
| `.title-gradient` | Gradient text effect for titles |
| `.nav-container` | Navigation container |
| `.nav-items` | Navigation items container |
| `.nav-item` | Base navigation item |
| `.nav-item-active` | Active navigation item |
| `.nav-item-inactive` | Inactive navigation item |
| `.nav-icon` | Icon in navigation |
| `.nav-icon-active` | Active navigation icon |
| `.nav-icon-inactive` | Inactive navigation icon |
| `.sidebar-footer` | Footer section of sidebar |

### Button Components

| Class Name | Description |
|------------|-------------|
| `.btn` | Base button |
| `.btn-primary` | Primary action button |
| `.btn-secondary` | Secondary action button |
| `.btn-icon` | Icon button |
| `.btn-icon-edit` | Edit icon button |
| `.btn-icon-delete` | Delete icon button |
| `.btn-new-note` | New note action button |

### Card Components

| Class Name | Description |
|------------|-------------|
| `.card` | Base card container |
| `.card-primary` | Primary card style |
| `.card-header` | Card header section |
| `.card-title` | Card title |
| `.card-content` | Card content section |
| `.card-empty` | Empty state card |
| `.card-footer` | Card footer section |
| `.feature-card` | Feature card on home page |
| `.feature-card-primary` | Primary feature card |
| `.feature-card-success` | Success feature card |
| `.feature-icon-container` | Feature icon container |
| `.feature-icon-primary` | Primary feature icon |
| `.feature-icon-success` | Success feature icon |
| `.feature-title` | Feature title |
| `.feature-title-primary` | Primary feature title |
| `.feature-title-success` | Success feature title |
| `.feature-description` | Feature description |

### Form Components

| Class Name | Description |
|------------|-------------|
| `.input` | Form input |
| `.label` | Form label |
| `.form-hint` | Helper text for form fields |
| `.form-group` | Group of form elements |
| `.form-actions` | Container for form action buttons |
| `.form-error` | Error message container |
| `.api-key-button` | Button for API key management |
| `.api-key-form` | API key form container |
| `.api-form-success` | Success message for API key form |
| `.api-form-hint` | Helper text for API key form |

### Typography Components

| Class Name | Description |
|------------|-------------|
| `.page-title` | Main page title |
| `.section-title` | Section title |
| `.hero-title` | Hero section title |
| `.hero-subtitle` | Hero section subtitle |
| `.tag-badge` | Tag badge |
| `.tag-container` | Container for tags |
| `.category-badge` | Category badge |

## Best Practices

1. **Use component classes over utility classes**: Instead of writing utility classes directly in markup, use the predefined component classes.

   ```jsx
   // ❌ Not recommended
   <button className="px-4 py-2 rounded-md font-medium text-sm bg-blue-600 text-white hover:bg-blue-700">
     Click me
   </button>

   // ✅ Recommended
   <button className="btn btn-primary">
     Click me
   </button>
   ```

2. **Extend component classes in CSS, not in markup**: When you need to modify a component's style, extend it in CSS rather than adding utility classes in markup.

   ```css
   /* In your CSS file */
   .btn-large {
     @apply py-3 px-6 text-base;
   }
   ```

3. **Maintain organization**: Keep related styles in their appropriate component CSS files.

4. **Document changes**: When creating new component classes, update this style guide accordingly.

## Tools & Dependencies

- **Tailwind CSS**: Utility-first CSS framework
- **@tailwindcss/forms**: Tailwind plugin for form styling
