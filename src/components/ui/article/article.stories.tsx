import type { Meta, StoryObj } from '@storybook/react'

import Article from './article'

const meta: Meta<typeof Article> = {
  title: 'UI/Article',
  component: Article,
  tags: ['autodocs'],
  args: {
    content: () => (
      <>
        <h1>Welcome to Tailwind Typography</h1>
        <p>
          Tailwind Typography is a plugin designed to make it easier to style
          rich content like blog posts or articles with beautiful, responsive
          typography.
        </p>

        <h2>Headings</h2>
        <h3>This is an H3 Heading</h3>
        <h4>This is an H4 Heading</h4>
        <h5>This is an H5 Heading</h5>
        <h6>This is an H6 Heading</h6>

        <p>
          Lorem ipsum dolor sit amet, <strong>consectetur</strong> adipisicing
          elit. <em>Eligendi</em>, repellendus! Quos, veritatis.
        </p>

        <blockquote>
          "This is a blockquote. Use it to highlight important quotes or ideas."
        </blockquote>

        <ul>
          <li>First item</li>
          <li>Second item</li>
          <li>Third item</li>
        </ul>

        <ol>
          <li>First item</li>
          <li>Second item</li>
          <li>Third item</li>
        </ol>

        <pre>
          <code>{'const greet = () => console.log("Hello, World!");'}</code>
        </pre>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>City</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>John</td>
              <td>30</td>
              <td>New York</td>
            </tr>
            <tr>
              <td>Jane</td>
              <td>25</td>
              <td>San Francisco</td>
            </tr>
          </tbody>
        </table>

        <p>
          You can also include links like{' '}
          <a href="https://tailwindcss.com">this one</a> to direct users to
          external resources.
        </p>

        <h3>Images</h3>
        <p>Below is an example of an image:</p>
        <img
          src="https://via.placeholder.com/400x200"
          alt="Placeholder image"
        />

        <hr />

        <p>
          That's all for now! Experiment with the <code>prose</code> class and
          see how it works for your content.
        </p>
      </>
    ),
  },
}

export default meta
type Story = StoryObj<typeof Article>

export const Default: Story = {
  args: {},
}
