import { mountSuspended } from "@nuxt/test-utils/runtime";
import { describe, expect, test } from "vitest";
import TodoFilter from "~/components/TodoFilter.vue";

describe('TodoFilter', () => {
  test('RemainigCount が表示されている', async() => {
    const wrapper = await mountSuspended(TodoFilter, {
      props: { remainingCount: 1, modelValue: 'all' },
    })
    expect(wrapper.find('[data-testid="remaining-count"]').text()).toBe('Remaining: 1')
  })

  test('RadioGroup選択時に update:modelValue がemitされる', async () => {
    const wrapper = await mountSuspended(TodoFilter, {
      props: { remainingCount: 1, modelValue: 'all' },
    })

    const radioGroup = wrapper.findComponent({ name: 'URadioGroup' })
    radioGroup.vm.$emit('update:modelValue', 'active')

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['active'])
  })
})