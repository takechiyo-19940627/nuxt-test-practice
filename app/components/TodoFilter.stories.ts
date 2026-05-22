import type { Meta, StoryObj } from '@storybook/vue3-vite'
import TodoFilter from './TodoFilter.vue'

const meta: Meta<typeof TodoFilter> = {
title: 'Components/TodoFilter',
  component: TodoFilter,
  tags: ['autodocs'],
  
}
export default meta

// NOTE: 不要であれば削除してください
type Story = StoryObj<typeof TodoFilter>

export const Default: Story = {
  args: { remainingCount: 0 },
}
