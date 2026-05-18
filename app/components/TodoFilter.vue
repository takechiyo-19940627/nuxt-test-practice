<script setup lang="ts">
import type { TodoFilter } from '~/types/todo'

defineProps<{
  modelValue: TodoFilter
  remainingCount: number
}>()

defineEmits<{
  (e: 'update:modelValue', value: TodoFilter): void
}>()

const items = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
]
</script>

<template>
  <div class="flex items-center justify-between gap-4 py-3">
    <URadioGroup
      :model-value="modelValue"
      :items="items"
      orientation="horizontal"
      legend="Filter todos"
      name="todo-filter"
      @update:model-value="(v) => $emit('update:modelValue', v as TodoFilter)"
    />
    <span
      data-testid="remaining-count"
      class="text-sm text-gray-600"
    >
      Remaining: {{ remainingCount }}
    </span>
  </div>
</template>
