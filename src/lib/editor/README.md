# Editor Configuration Rules

## Rich Text Editor Requirements

IMPORTANT: This project uses TinyMCE EXCLUSIVELY for rich text editing.
- DO NOT use ReactQuill, Quill, or any other rich text editor
- TinyMCE is the only approved rich text editor for this project
- Any existing Quill implementations must be migrated to TinyMCE

## Form Component Guidelines

### TinyMCE Usage
TinyMCE editor should ONLY be used for fields that require rich text formatting and media capabilities:
- Introduction field (supports formatting, images, audio, YouTube embeds)
- Instructions field (supports formatting, images, audio, YouTube embeds)

### Tailwind Form Components
All other form fields MUST use Tailwind form components with consistent styling:

Text Inputs:
```tsx
<input
  type="text"
  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
/>
```

Text Areas:
```tsx
<textarea
  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
  rows={4}
/>
```

Select Dropdowns:
```tsx
<select
  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
>
```

Number Inputs:
```tsx
<input
  type="number"
  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
/>
```

### Form Field Usage
- Title: Tailwind text input
- Duration: Tailwind text input
- Benefits: Tailwind textarea
- Tips: Tailwind textarea
- Order: Tailwind number input
- Category: Tailwind select dropdown

### Styling Requirements
- All form fields should use consistent Tailwind classes
- Use shadow-sm for subtle depth
- Use rounded-md for consistent corner radius
- Use border-gray-300 for default borders
- Use focus:border-indigo-500 and focus:ring-indigo-500 for focus states
- Use sm:text-sm for consistent text size

### Implementation Notes
- @tailwindcss/forms plugin is required and must be included in tailwind.config.js
- Form fields should maintain responsive design principles
- Labels should use consistent styling:
  ```tsx
  <label className="block text-sm font-medium text-gray-700">
  ```
- Form groups should use consistent spacing:
  ```tsx
  <div className="space-y-2">
  ```

## TinyMCE Configuration

When TinyMCE is used, it must support:
- Image uploads (direct, from URL, and gallery selection)
- Audio uploads (direct and from URL)
- YouTube video embeds (direct URL embedding and responsive containers)
- Basic text formatting (bold, italic, lists)

## Form Field Guidelines

1. Introduction field: Use TinyMCE (needs formatting and media)
2. Instructions field: Use TinyMCE (needs formatting and media)
3. Simple fields (use regular inputs):
   - Title: text input
   - Duration: text input
   - Benefits: textarea
   - Tips: textarea
   - Order: number input
   - Category: select input

## Implementation Details

- Maintain shared configuration in `config.ts`
- Consistent toolbar layout across all TinyMCE instances
- Media upload handlers in TinyMCE only
- Mobile-friendly interface

## Usage

Always use the `RichTextEditor` component which implements this configuration:

```typescript
import { RichTextEditor } from '@/components/admin/RichTextEditor'

<RichTextEditor
  value={content}
  onChange={handleChange}
  exerciseId={id}
/>
```

## Media Handling

All media (images, audio, videos) should be managed through the TinyMCE editor:
- NO separate media upload fields
- NO external media management
- All media should be embedded in the content

# Editor Usage Guidelines

## TinyMCE Usage Rules

TinyMCE editor should ONLY be used for the following fields that require rich text formatting and media capabilities:
- Introduction (supports formatting, images, audio, YouTube embeds)
- Instructions (supports formatting, images, audio, YouTube embeds)

## Regular HTML Form Fields

All other fields must use standard HTML form elements:
- Title: `<input type="text">`
- Duration: `<input type="text">`
- Benefits: `<textarea>`
- Tips: `<textarea>`
- Order: `<input type="number">`
- Category: `<select>`

## Rationale
- TinyMCE is reserved for content that requires rich formatting and media embedding
- Regular form fields provide better user experience for simple text input
- Reduces unnecessary complexity and improves performance
- Ensures consistent data format for non-rich text fields

## Implementation Notes
- TinyMCE configuration should be standardized across all instances
- Regular form fields should use appropriate HTML5 validation
- Textareas should have reasonable default dimensions
- All fields should maintain responsive design principles 