import type { Meta, StoryObj } from '@storybook/react'

import CodeExample from './code-example'

const meta: Meta<typeof CodeExample> = {
  title: 'UI/CodeExample',
  component: CodeExample as React.ComponentType,
  tags: ['autodocs'],
  args: {
    children: (
      <code className="language-js">
        {"const foo = 'bar'" +
          '\n' +
          "const baz = 'qux'" +
          '\n' +
          'console.log(foo, baz)' +
          '\n' +
          '// Output: bar qux '}
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
