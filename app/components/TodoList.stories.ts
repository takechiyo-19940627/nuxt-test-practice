import type { Meta, StoryObj } from '@storybook/vue3-vite'
import TodoList from './TodoList.vue'

const meta: Meta<typeof TodoList> = {
  title: 'Components/TodoList',
  component: TodoList,
  tags: ['autodocs'],
  argTypes: {
    onToggle: { action: 'toggle' },
    onRemove: { action: 'remove' },
  },
}
export default meta

type Story = StoryObj<typeof TodoList>

export const List: Story = {
  args: {
    todos: [
      {
        id: '1',
        text: 'Buy groceries1',
        done: false,
        createdAt: new Date('2025-01-01').getTime(),
      },
      {
        id: '2',
        text: 'Buy groceries2',
        done: false,
        createdAt: new Date('2025-01-01').getTime(),
      },
      {
        id: '3',
        text: 'Buy groceries3',
        done: false,
        createdAt: new Date('2025-01-01').getTime(),
      }
    ]
  }
}

export const Empty: Story = {
  args: {
    todos: []
  }
}

export const Mixed: Story = {
  args: {
    todos: [
      {
        id: '1',
        text: 'Done item',
        done: true,
        createdAt: new Date('2025-01-01').getTime(),
      },
      {
        id: '2',
        text: 'Active item',
        done: false,
        createdAt: new Date('2025-01-02').getTime(),
      },
    ]
  }
}