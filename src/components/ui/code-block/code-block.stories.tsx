import type { Meta, StoryObj } from '@storybook/react'

import CodeBlock from './code-block'

const meta: Meta<typeof CodeBlock> = {
  title: 'UI/CodeBlock',
  component: CodeBlock as React.ComponentType,
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
type Story = StoryObj<typeof CodeBlock>

export const Default: Story = {
  args: {},
}

export const WithTitle: Story = {
  args: {
    title: 'Example',
  },
}
