# Custom Select Component - Technical Assessment

## Overview
This project implements a custom select component in TypeScript with React 18, featuring both single and multiple selection modes. The component is built without external UI libraries and is showcased through an Ice Cream Order form implementation.

## Tech Stack
- React 18
- TypeScript 
- Vite 
- Jest 
- React Testing Library
- ESLint

## Features

### Select Component
- Single and multiple selection modes
- Checkbox-based multiple selection with select/deselect all functionality
- Text-based filtering/search capability
- Collapsible dropdown interface
- Customizable placeholder text
- Click-outside handling for dropdown closure
- Full keyboard accessibility
- CSS Modules for styles isolation

### Demo Implementation: Ice Cream Order Form
The component is demonstrated in a practical ice cream ordering form that includes:
- Flavor selection (single/multiple mode toggle)
- Size selection (radio buttons)
- Toppings selection (multiple selection)
- Customer details (name, special notes)

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run development server:
```bash
npm run dev
```

3. Run tests:
```bash
npm test
```

4. Run tests in watch mode:
```bash
npm run test:watch
```

## Component Usage

```typescript
import Select from "./components/Select/Select"

interface OptionProps {
    label: string
    value: string
}

// Example options
const options: OptionProps[] = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' }
]

// Single Select Mode
<Select
    isMultiSelect={false}
    options={options}
    onSelectionChange={(selected) => console.log(selected)}
    placeholder="Select an option"
/>

// Multi Select Mode
<Select
    isMultiSelect={true}
    options={options}
    onSelectionChange={(selected) => console.log(selected)}
    placeholder="Select options"
/>
```

## Component API

### Props
```typescript
interface SelectProps {
    isMultiSelect: boolean          // Toggle between single/multi select modes
    options: OptionProps[]          // Array of options to display
    onSelectionChange: (selected: string[]) => void  // Selection change handler
    placeholder?: string           // Optional placeholder text
}

interface OptionProps {
    label: string                  // Display text for the option
    value: string                 // Value of the option
}
```

## Implementation Details

### Single Select Mode Features
- Text input with dropdown
- Real-time filtering of options
- Automatic dropdown closure on selection
- Click-outside handling

### Multiple Select Mode Features
- Checkbox interface for each option
- Select All/Deselect All buttons
- Collapsible option list
- Maintains selection state during collapse/expand

## Testing

The component includes comprehensive unit tests using Jest and React Testing Library, covering:

```bash
npm test        # Run all tests
npm test:watch  # Run tests in watch mode
```

Test coverage includes:
- Single select mode functionality
- Multiple select mode operations
- Filter/search capabilities
- Collapse/expand behavior
- Click-outside handling
- Selection state management

## Project Structure
```
src/
  ├── components/
  │   ├── Select/
  │   │   ├── Select.tsx
  │   │   ├── Select.module.css
  │   │   └── Select.test.tsx
  ├── data/
  │   └── data.tsx
  ├── App.tsx
  └── App.css
```

## Performance Considerations
- Controlled inputs for predictable behavior
- useRef for click-outside detection
- State updates optimized for re-renders
- CSS Modules for scoped styling

## Notes
- The component is built without external UI libraries as per requirements
- CSS Modules are used for style isolation
- Full TypeScript implementation with proper type definitions
- Comprehensive test suite included
- Practical demonstration through an ice cream order form

---

This implementation fulfills all requirements while maintaining clean code practices, type safety, and thorough testing coverage. The component is ready for review and production use.