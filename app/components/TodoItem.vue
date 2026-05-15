<script setup lang="ts">
import type { Todo } from '~/types/todo'

defineProps<{
  todo: Todo
}>()

defineEmits<{
  (e: 'toggle', id: string): void
  (e: 'remove', id: string): void
}>()
</script>

<template>
  <li
    :data-testid="`todo-item-${todo.id}`"
    class="flex items-center gap-3 py-2"
  >
    <UCheckbox
      :model-value="todo.done"
      :aria-label="`Toggle ${todo.text}`"
      :data-testid="`todo-checkbox-${todo.id}`"
      @update:model-value="$emit('toggle', todo.id)"
    />
    <span
      data-testid="todo-text"
      class="flex-1"
      :class="{ 'line-through opacity-60': todo.done }"
    >
      {{ todo.text }}
    </span>
    <UButton
      :data-testid="`todo-delete-button-${todo.id}`"
      color="error"
      variant="ghost"
      icon="i-lucide-trash-2"
      :aria-label="`Delete ${todo.text}`"
      @click="$emit('remove', todo.id)"
    />
  </li>
</template>
