import type { Meta, StoryObj } from '@storybook/vue3-vite'
import TodoItem from './TodoItem.vue'

const meta: Meta<typeof TodoItem> = {
  title: 'Components/TodoItem',
  component: TodoItem,
  tags: ['autodocs'],
  argTypes: {
    onToggle: { action: 'toggle' },
    onRemove: { action: 'remove' },
  },
}
export default meta

type Story = StoryObj<typeof TodoItem>

const baseTodo = {
  id: '1',
  text: 'Buy groceries',
  done: false,
  createdAt: new Date('2025-01-01').getTime(),
}

export const Active: Story = {
  args: { todo: { ...baseTodo, done: false } },
}

export const Completed: Story = {
  args: { todo: { ...baseTodo, done: true } },
}

export const LongText: Story = {
  args: {
    todo: {
      ...baseTodo,
      text: 'A very long todo item that should wrap or truncate gracefully across the row',
    },
  },
}
