---
name: 'storybook'
root: 'app/components'
output: '**'
ignore: []
questions:
  name:
    message: 'Component name? (PascalCase, e.g. TodoItem)'
  has_emits:
    confirm: 'Does this component emit events?'
  emit_names:
    if: inputs.has_emits
    message: 'Emit names? (comma-separated, e.g. toggle,remove)'
---

# {{ inputs.name | pascal }}.stories.ts

```typescript
import type { Meta, StoryObj } from '@storybook/vue3-vite'
import {{ inputs.name | pascal }} from './{{ inputs.name | pascal }}.vue'

const meta: Meta<typeof {{ inputs.name | pascal }}> = {
title: 'Components/{{ inputs.name | pascal }}',
  component: {{ inputs.name | pascal }},
  tags: ['autodocs'],
  {{ if inputs.has_emits -}}
  argTypes: {
    {{ for e, i in inputs.emit_names | split "," -}}
      on{{ e | trim | pascal }}: { action: '{{ e | trim }}' },
    {{- end }}
  },
  {{- end }}
}
export default meta

// NOTE: 不要であれば削除してください
type Story = StoryObj<typeof {{ inputs.name | pascal }}>
```
