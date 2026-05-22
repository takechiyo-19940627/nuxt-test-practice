import { fileURLToPath } from 'node:url'
import type { StorybookConfig } from '@storybook/vue3-vite'
import vue from '@vitejs/plugin-vue'
import ui from '@nuxt/ui/vite'

const appDir = fileURLToPath(new URL('../app', import.meta.url))
const nuxtRuntimeMockPath = fileURLToPath(
  new URL('./mocks/nuxt-runtime', import.meta.url),
)

const config: StorybookConfig = {
  stories: ['../app/components/**/*.stories.@(ts|js|mdx)'],
  addons: [],
  framework: {
    name: '@storybook/vue3-vite',
    options: {},
  },
  async viteFinal(vite) {
    vite.plugins = [
      vue(),
      ui({
        autoImport: {
          dts: false,
          imports: [
            'vue',
            { [nuxtRuntimeMockPath]: ['useState'] },
          ],
        },
        components: {
          dts: false,
          dirs: [`${appDir}/components`],
        },
      }),
      ...(vite.plugins ?? []),
    ]
    vite.resolve = vite.resolve ?? {}
    vite.resolve.alias = {
      ...(vite.resolve.alias as Record<string, string> | undefined),
      '~': appDir,
      '@': appDir,
    }
    return vite
  },
}

export default config
