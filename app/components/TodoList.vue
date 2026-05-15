<script setup lang="ts">
import type { Todo } from '~/types/todo'

defineProps<{
  todos: Todo[]
}>()

defineEmits<{
  (e: 'toggle', id: string): void
  (e: 'remove', id: string): void
}>()
</script>

<template>
  <div>
    <p
      v-if="todos.length === 0"
      data-testid="empty-state"
      class="text-center text-gray-500 py-4"
    >
      No todos
    </p>
    <ul
      v-else
      aria-label="Todo list"
      data-testid="todo-list"
      class="divide-y"
    >
      <TodoItem
        v-for="todo in todos"
        :key="todo.id"
        :data-testid="`todo-item-${todo.id}`"
        :todo="todo"
        @toggle="(id) => $emit('toggle', id)"
        @remove="(id) => $emit('remove', id)"
      />
    </ul>
  </div>
</template>
