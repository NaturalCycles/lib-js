import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    global: true,
    include: ['src/**/*.test.ts'],
    exclude: [
      // '**/app.error.*',
      // '**/retry.decorator.*',
      '**/http.error.*',
      // '**/pDefer.*',
      // '**/pQueue.*',
      // '**/p*',
      '**/leak.test.*',
    ],
  },
})
