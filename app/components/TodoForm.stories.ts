import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { within, userEvent, expect } from '@storybook/test'
import TodoForm from './TodoForm.vue'

const meta: Meta<typeof TodoForm> = {
  title: 'Components/TodoForm',
  component: TodoForm,
  tags: ['autodocs'],
  argTypes: {
    onSubmit: { action: 'submit' },
  },
}
export default meta

type Story = StoryObj<typeof TodoForm>

export const Default: Story = {
}

export const WithInput: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.type(
      canvas.getByRole('textbox', { name: 'New todo text' }),
      'Todo1'
    )
  }
}

export const AfterSubmit: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.type(
      canvas.getByRole('textbox', { name: 'New todo text' }),
      'Todo1'
    )
    await userEvent.click(
      canvas.getByRole('button', { name: 'Add todo' })
    )
    await expect(
      canvas.getByRole('textbox', { name: 'New todo text' })
    ).toHaveValue('')
  }
}
