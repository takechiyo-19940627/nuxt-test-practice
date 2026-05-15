import { describe, expect, test } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import TodoItem from '~/components/TodoItem.vue'

// NOTE: テスト観点
// 1. コンポーネントがレンダリングされること
// 2. Propsで渡した値が表示されていること
// 3. 期待しているイベントが発火された時に期待した動作が行われること
describe('TodoItem', () => {
  test('未完了Todoのレンダリングのテスト', async () => {
    const todo = {
      id: '1',
      text: 'Buy groceries',
      done: false,
      createdAt: new Date('2021-01-01').getTime(),
    }
    const listItem = await mountSuspended(TodoItem, {
      props: { todo },
    })

    expect(listItem.find('[data-testid="todo-text"]').text()).toContain(todo.text)
    expect(listItem.find('[data-testid="todo-text"]').classes()).not.toContain('line-through')
    expect(listItem.find('[data-testid="todo-text"]').classes()).not.toContain('opacity-60')
  })

  test('完了済Todoのレンダリングのテスト', async () => {
    const todo = {
      id: '1',
      text: 'Buy groceries',
      done: true,
      createdAt: new Date('2021-01-01').getTime(),
    }
    const listItem = await mountSuspended(TodoItem, {
      props: { todo },
    })

    expect(listItem.find('[data-testid="todo-text"]').text()).toContain(todo.text)
    expect(listItem.find('[data-testid="todo-text"]').classes()).toContain('line-through')
    expect(listItem.find('[data-testid="todo-text"]').classes()).toContain('opacity-60')
  })

  test('未完了から完了への切り替えのテスト', async () => {
    const todo = {
      id: '1',
      text: 'Buy groceries',
      done: false,
      createdAt: new Date('2021-01-01').getTime(),
    }
    const listItem = await mountSuspended(TodoItem, {
      props: { todo },
    })
    await listItem.find('[data-testid="todo-checkbox-1"]').trigger('click')
    const toggleEvent = listItem.emitted('toggle')
    expect(toggleEvent).toHaveLength(1)
    expect(toggleEvent?.[0]?.[0]).toBe(todo.id)
  })

  test('完了から未完了への切り替えのテスト', async () => {
    const todo = {
      id: '1',
      text: 'Buy groceries',
      done: true,
      createdAt: new Date('2021-01-01').getTime(),
    }
    const listItem = await mountSuspended(TodoItem, {
      props: { todo },
    })
    await listItem.find('[data-testid="todo-checkbox-1"]').trigger('click')
    const toggleEvent = listItem.emitted('toggle')
    expect(toggleEvent).toHaveLength(1)
    expect(toggleEvent?.[0]?.[0]).toBe(todo.id)
  })

  test('削除ボタンのクリックのテスト', async () => {
    const todo = {
      id: '1',
      text: 'Buy groceries',
      done: false,
      createdAt: new Date('2021-01-01').getTime(),
    }
    const listItem = await mountSuspended(TodoItem, {
      props: { todo },
    })
    await listItem.find('[data-testid="todo-delete-button-1"]').trigger('click')
    const removeEvent = listItem.emitted('remove')
    expect(removeEvent).toHaveLength(1)
    expect(removeEvent?.[0]?.[0]).toBe(todo.id)
  })
})