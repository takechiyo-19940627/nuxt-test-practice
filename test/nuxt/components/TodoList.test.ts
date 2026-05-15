import { describe, expect, test } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import TodoList from '~/components/TodoList.vue'

describe('TodoList', () => {
  test('空のリストを出力する', async () => {
    const list = await mountSuspended(TodoList, {
      props: {
        todos: [],
      },
    })

    expect(list.find('[data-testid="empty-state"]').exists()).toBeTruthy()
    expect(list.find('[data-testid="empty-state"]').text()).toContain('No todos')
    expect(list.find('[data-testid="todo-list"]').exists()).toBeFalsy()
  })

  test('todoのリストを出力する', async () => {
    const todos = [
      {
        id: '1',
        text: 'Buy groceries',
        done: false,
        createdAt: new Date('2021-01-01').getTime(),
      },
      {
        id: '2',
        text: 'Buy vegetables',
        done: true,
        createdAt: new Date('2021-01-02').getTime(),
      },
    ]
    const list = await mountSuspended(TodoList, {
      props: { todos },
    })

    expect(list.find('[data-testid="empty-state"]').exists()).toBeFalsy()
    expect(list.find('[data-testid="todo-list"]').exists()).toBeTruthy()
    expect(list.find('[data-testid="todo-list"]').findAll('li').length).toBe(todos.length)
  })

  test('todoの未完了から完了への切り替えのテスト', async () => {
    const todos = [
      {
        id: '1',
        text: 'Buy groceries',
        done: false,
        createdAt: new Date('2021-01-01').getTime(),
      },
      {
        id: '2',
        text: 'Buy vegetables',
        done: true,
        createdAt: new Date('2021-01-02').getTime(),
      },
    ]
    const list = await mountSuspended(TodoList, {
      props: { todos },
    })
    await list.find('[data-testid="todo-checkbox-1"]').trigger('click')
    const toggleEvent = list.emitted('toggle')
    expect(toggleEvent).toHaveLength(1)
    expect(toggleEvent?.[0]?.[0]).toBe(todos[0]?.id)
  })

  test('todoの未完了から完了への切り替えのテスト', async () => {
    const todos = [
      {
        id: '1',
        text: 'Buy groceries',
        done: true,
        createdAt: new Date('2021-01-01').getTime(),
      },
      {
        id: '2',
        text: 'Buy vegetables',
        done: false,
        createdAt: new Date('2021-01-02').getTime(),
      },
    ]
    const list = await mountSuspended(TodoList, {
      props: { todos },
    })
    await list.find('[data-testid="todo-checkbox-1"]').trigger('click')
    const toggleEvent = list.emitted('toggle')
    expect(toggleEvent).toHaveLength(1)
    expect(toggleEvent?.[0]?.[0]).toBe(todos[0]?.id)
  })
})