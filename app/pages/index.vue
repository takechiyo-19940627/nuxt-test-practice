<script setup lang="ts">
const {
  filter,
  filteredTodos,
  remainingCount,
  addTodo,
  toggleTodo,
  removeTodo,
  setFilter,
} = useTodos()

useHead({ title: 'Todos' })
</script>

<template>
  <UContainer class="py-8">
    <h1 class="text-2xl font-bold mb-4">
      Todos
    </h1>
    <UCard>
      <TodoForm @submit="addTodo" />
      <TodoFilter
        :model-value="filter"
        :remaining-count="remainingCount"
        @update:model-value="setFilter"
      />
      <TodoList
        :todos="filteredTodos"
        @toggle="toggleTodo"
        @remove="removeTodo"
      />
    </UCard>
  </UContainer>
</template>