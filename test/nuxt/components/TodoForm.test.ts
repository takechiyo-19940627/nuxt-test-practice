import { describe, expect, test } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import TodoForm from '~/components/TodoForm.vue'


describe('TodoForm', () => {
  test('フォームの初期状態ではテキストボックスが空で、クリックイベントは発火しない', async () => {
    const wrapper = await mountSuspended(TodoForm)
    const input = wrapper.find('input')
    expect(input.element.value).toBe('')

    await wrapper.find('form').trigger('submit')
    expect(wrapper.emitted('submit')).toBeUndefined()
  })

  test('空文字を入力しても送信できない', async () => {
    const wrapper = await mountSuspended(TodoForm)
    const input = wrapper.find('input')
    await input.setValue(' ')

    await wrapper.find('form').trigger('submit')
    expect(wrapper.emitted('submit')).toBeUndefined()
  })

  test('フォームの送信に成功する', async () => {
    const wrapper = await mountSuspended(TodoForm)
    const input = wrapper.find('input')
    await input.setValue('Todo1')
    await wrapper.find('form').trigger('submit')
    const submitEvent = wrapper.emitted('submit')
    expect(submitEvent).toHaveLength(1)
    expect(submitEvent?.[0]?.[0]).toBe('Todo1')
  })

  test('フォームの送信に成功する(入力値の前後の空白をtrimする)', async () => {
    const wrapper = await mountSuspended(TodoForm)
    const input = wrapper.find('input')
    await input.setValue(' Todo1 ')
    await wrapper.find('form').trigger('submit')
    const submitEvent = wrapper.emitted('submit')
    expect(submitEvent).toHaveLength(1)
    expect(submitEvent?.[0]?.[0]).toBe('Todo1')
  })
})