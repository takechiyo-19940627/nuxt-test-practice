import { beforeEach, describe, expect, test } from 'vitest'
import { useTodos } from '~/composables/useTodos'

describe('useTodos', () => {
  beforeEach(() => {
    clearNuxtState()
  })
  describe('addTodo', () => {
    test('空文字の場合はfalseを返す', () => {
      const { addTodo, todos } = useTodos()
      const result = addTodo('')
      expect(result).toBe(false)
      expect(todos.value).toHaveLength(0)
    })
    test('空白文字の場合はfalseを返す', () => {
      const { addTodo, todos } = useTodos()
      const result = addTodo('  ')
      expect(result).toBe(false)
      expect(todos.value).toHaveLength(0)
    })
    test('正常な文字の場合はtrueを返す', () => {
      const { addTodo, todos } = useTodos()
      const result = addTodo('Todo1')
      expect(result).toBe(true)
      expect(todos.value).toHaveLength(1)
      expect(todos.value[0]).toBeDefined()
      expect(todos.value[0]?.id).toBeDefined()
      expect(todos.value[0]?.text).toBe('Todo1')
      expect(todos.value[0]?.done).toBe(false)
      expect(todos.value[0]?.createdAt).toBeDefined()
    })
  })

  describe('removeTodo', () => {
    test('存在しないIDの場合は何もしない', () => {
      const { addTodo, removeTodo, todos } = useTodos()
      addTodo('Todo1')
      addTodo('Todo2')
      addTodo('Todo3')
      removeTodo('non-existent-id')
      expect(todos.value.length).toBe(3)
    })

    test('存在するIDの場合は削除される', () => {
      const { addTodo, removeTodo, todos } = useTodos()
      addTodo('Todo1')
      const removedId = todos.value[0]?.id
      addTodo('Todo2')

      expect(todos.value[0]?.id).toBeDefined()
      removeTodo(todos.value[0]?.id!)

      expect(todos.value.find(t => t.id === removedId)).toBeUndefined()
    })
  })

  describe('toggleTodo', () => {
    test('存在しないIDの場合は何もしない', () => {
      const { addTodo, toggleTodo, todos } = useTodos()
      addTodo('Todo1')
      addTodo('Todo2')
      addTodo('Todo3')
      toggleTodo('non-existent-id')
      expect(todos.value.length).toBe(3)
      expect(todos.value[0]?.done).toBe(false)
      expect(todos.value[1]?.done).toBe(false)
      expect(todos.value[2]?.done).toBe(false)
    })

    test('存在するIDの場合は完了状態が切り替わる', () => {
      const { addTodo, toggleTodo, todos } = useTodos()
      addTodo('Todo1')
      addTodo('Todo2')
      addTodo('Todo3')
      toggleTodo(todos.value[0]?.id!)
      expect(todos.value[0]?.done).toBe(true)
      expect(todos.value[1]?.done).toBe(false)
      expect(todos.value[2]?.done).toBe(false)
      toggleTodo(todos.value[0]?.id!)
      expect(todos.value[0]?.done).toBe(false)
      expect(todos.value[1]?.done).toBe(false)
      expect(todos.value[2]?.done).toBe(false)
    })
  })

  describe('totalCount', () => {
    test('TODOの数を返す', () => {
      const { addTodo, totalCount } = useTodos()
      addTodo('Todo1')
      addTodo('Todo2')
      addTodo('Todo3')
      expect(totalCount.value).toBe(3)
    })
  })

  describe('remainingCount', () => {
    test('未完了のTODOの数を返す', () => {
      const { addTodo, remainingCount, toggleTodo, todos } = useTodos()
      addTodo('Todo1')
      addTodo('Todo2')
      addTodo('Todo3')
      toggleTodo(todos.value[0]?.id!)
      expect(remainingCount.value).toBe(2)
    })
  })

  describe('filteredTodos', () => {
    test('全てのTODOを返す', () => {
      const { addTodo, filteredTodos, setFilter } = useTodos()
      setFilter('all')
      addTodo('Todo1')
      addTodo('Todo2')
      addTodo('Todo3')
      expect(filteredTodos.value).toHaveLength(3)
      expect(filteredTodos.value[0]?.text).toBe('Todo1')
      expect(filteredTodos.value[1]?.text).toBe('Todo2')
      expect(filteredTodos.value[2]?.text).toBe('Todo3')
    })
    
    test('未完了のTODOを返す', () => {
      const { addTodo, filteredTodos, setFilter, toggleTodo, todos } = useTodos()
      addTodo('Todo1')
      addTodo('Todo2')
      addTodo('Todo3')
      toggleTodo(todos.value[0]?.id!)
      toggleTodo(todos.value[1]?.id!)
      setFilter('active')
      expect(filteredTodos.value).toHaveLength(1)
      expect(filteredTodos.value[0]?.text).toBe('Todo3')
    })

    test('完了のTODOを返す', () => {
      const { addTodo, filteredTodos, setFilter, toggleTodo, todos } = useTodos()
      addTodo('Todo1')
      addTodo('Todo2')
      addTodo('Todo3')
      toggleTodo(todos.value[0]?.id!)
      setFilter('completed')
      expect(filteredTodos.value).toHaveLength(1)
      expect(filteredTodos.value[0]?.text).toBe('Todo1')
    })
  })

  describe('setFilter', () => {
    test('filterが変更される', () => {
      const { setFilter, filter } = useTodos()
      setFilter('active')
      expect(filter.value).toBe('active')
      setFilter('completed')
      expect(filter.value).toBe('completed')
      setFilter('all')
      expect(filter.value).toBe('all')
    })
  })
})