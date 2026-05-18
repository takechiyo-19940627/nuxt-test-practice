import type { Todo, TodoFilter } from '~/types/todo'

export function useTodos() {
  const todos = useState<Todo[]>('todos', () => [])
  const filter = useState<TodoFilter>('todos:filter', () => 'all')

  const filteredTodos = computed(() => {
    switch (filter.value) {
      case 'active':
        return todos.value.filter(t => !t.done)
      case 'completed':
        return todos.value.filter(t => t.done)
      default:
        return todos.value
    }
  })

  const remainingCount = computed(
    () => todos.value.filter(t => !t.done).length,
  )

  const totalCount = computed(() => todos.value.length)

  function addTodo(text: string): boolean {
    const trimmed = text.trim()
    if (!trimmed) return false
    todos.value.push({
      id: crypto.randomUUID(),
      text: trimmed,
      done: false,
      createdAt: Date.now(),
    })
    return true
  }

  function toggleTodo(id: string): void {
    const target = todos.value.find(t => t.id === id)
    if (target) target.done = !target.done
  }

  function removeTodo(id: string): void {
    todos.value = todos.value.filter(t => t.id !== id)
  }

  function setFilter(next: TodoFilter): void {
    filter.value = next
  }

  return {
    todos,
    filter,
    filteredTodos,
    remainingCount,
    totalCount,
    addTodo,
    toggleTodo,
    removeTodo,
    setFilter,
  }
}
