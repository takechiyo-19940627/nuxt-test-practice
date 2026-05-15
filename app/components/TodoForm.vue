<script setup lang="ts">
const emit = defineEmits<{
  (e: 'submit', text: string): void
}>()

const text = ref('')

function submit() {
  const trimmed = text.value.trim()
  if (!trimmed) return
  emit('submit', trimmed)
  text.value = ''
}
</script>

<template>
  <form
    data-testid="todo-form"
    class="flex gap-2"
    @submit.prevent="submit"
  >
    <UInput
      v-model="text"
      name="todo-text"
      placeholder="Add a todo"
      aria-label="New todo text"
      class="flex-1"
    />
    <UButton
      type="submit"
      label="Add"
      aria-label="Add todo"
      :disabled="!text.trim()"
    />
  </form>
</template>
