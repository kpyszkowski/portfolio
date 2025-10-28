import type { Meta, StoryObj } from '@storybook/react'

import CodeExample from './code-example'

const normalizeCodeIndentation = (code: string) =>
  code
    .split('\n')
    .map((line) =>
      line.slice(
        Math.min(
          ...code
            .split('\n')
            .filter((l) => l.trim())
            .map((l) => l.match(/^(\s*)/)![1].length),
        ),
      ),
    )
    .join('\n')
    .trimEnd()

const meta: Meta<typeof CodeExample> = {
  title: 'UI/CodeExample',
  component: CodeExample as React.ComponentType,
  tags: ['autodocs'],
  args: {
    children: (
      <code className="language-ts">
        {normalizeCodeIndentation(`
          const foo = 'bar'
          const baz = 'qux'

          function dupa(hehe: boolean) {
            if (hehe) {
              return 'dupa hehe'
            }

            return 'dupa'
          }
          console.log('foo baz')

          // Output: bar qux
        `)}
      </code>
    ),
  },
}

export default meta
type Story = StoryObj<typeof CodeExample>

export const Default: Story = {
  args: {},
}

export const WithTitle: Story = {
  args: {
    title: 'Example',
  },
}
