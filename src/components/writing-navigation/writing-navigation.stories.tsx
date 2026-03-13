import type { Meta, StoryFn } from '@storybook/react'

import {
  WritingNavigation,
  WritingNavigationTrigger,
} from '~/components/writing-navigation'

const items = [
  { id: 'item-1', title: 'Item 1' },
  { id: 'item-2', title: 'Item 2 longer title asd asd as das d asd asd as' },
  { id: 'item-3', title: 'Item 3' },
  { id: 'item-4', title: 'Item 4' },
]

const content = (
  <>
    <h1>Example content</h1>

    <WritingNavigationTrigger>
      <h2 id="item-1">Item 1</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi neque
        labore delectus necessitatibus eaque quibusdam esse, placeat, totam quia
        cumque tenetur laboriosam! Maiores distinctio neque repudiandae qui
        repellat pariatur reiciendis. Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Animi neque labore delectus necessitatibus eaque
        quibusdam esse, placeat, totam quia cumque tenetur laboriosam! Maiores
        distinctio neque repudiandae qui repellat pariatur reiciendis. Lorem
        ipsum dolor sit amet consectetur adipisicing elit. Animi neque labore
        delectus necessitatibus eaque quibusdam esse, placeat, totam quia cumque
        tenetur laboriosam! Maiores distinctio neque repudiandae qui repellat
        pariatur reiciendis. Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Animi neque labore delectus necessitatibus eaque quibusdam esse,
        placeat, totam quia cumque tenetur laboriosam! Maiores distinctio neque
        repudiandae qui repellat pariatur reiciendis. Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Animi neque labore delectus necessitatibus
        eaque quibusdam esse, placeat, totam quia cumque tenetur laboriosam!
        Maiores distinctio neque repudiandae qui repellat pariatur reiciendis.
      </p>
    </WritingNavigationTrigger>

    <WritingNavigationTrigger>
      <h2 id="item-2">Item 2</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi neque
        labore delectus necessitatibus eaque quibusdam esse, placeat, totam quia
        cumque tenetur laboriosam! Maiores distinctio neque repudiandae qui
        repellat pariatur reiciendis. Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Animi neque labore delectus necessitatibus eaque
        quibusdam esse, placeat, totam quia cumque tenetur laboriosam! Maiores
        distinctio neque repudiandae qui repellat pariatur reiciendis. Lorem
        ipsum dolor sit amet consectetur adipisicing elit. Animi neque labore
        delectus necessitatibus eaque quibusdam esse, placeat, totam quia cumque
        tenetur laboriosam! Maiores distinctio neque repudiandae qui repellat
        pariatur reiciendis. Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Animi neque labore delectus necessitatibus eaque quibusdam esse,
        placeat, totam quia cumque tenetur laboriosam! Maiores distinctio neque
        repudiandae qui repellat pariatur reiciendis. Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Animi neque labore delectus necessitatibus
        eaque quibusdam esse, placeat, totam quia cumque tenetur laboriosam!
        Maiores distinctio neque repudiandae qui repellat pariatur reiciendis.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi neque
        labore delectus necessitatibus eaque quibusdam esse, placeat, totam quia
        cumque tenetur laboriosam! Maiores distinctio neque repudiandae qui
        repellat pariatur reiciendis.
      </p>
    </WritingNavigationTrigger>

    <WritingNavigationTrigger>
      <h2 id="item-3">Item 3</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi neque
        labore delectus necessitatibus eaque quibusdam esse, placeat, totam quia
        cumque tenetur laboriosam! Maiores distinctio neque repudiandae qui
        repellat pariatur reiciendis. Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Animi neque labore delectus necessitatibus eaque
        quibusdam esse, placeat, totam quia cumque tenetur laboriosam! Maiores
        distinctio neque repudiandae qui repellat pariatur reiciendis. Lorem
        ipsum dolor sit amet consectetur adipisicing elit. Animi neque labore
        delectus necessitatibus eaque quibusdam esse, placeat, totam quia cumque
        tenetur laboriosam! Maiores distinctio neque repudiandae qui repellat
        pariatur reiciendis. Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Animi neque labore delectus necessitatibus eaque quibusdam esse,
        placeat, totam quia cumque tenetur laboriosam! Maiores distinctio neque
        repudiandae qui repellat pariatur reiciendis. Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Animi neque labore delectus necessitatibus
        eaque quibusdam esse, placeat, totam quia cumque tenetur laboriosam!
        Maiores distinctio neque repudiandae qui repellat pariatur reiciendis.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi neque
        labore delectus necessitatibus eaque quibusdam esse, placeat, totam quia
        cumque tenetur laboriosam! Maiores distinctio neque repudiandae qui
        repellat pariatur reiciendis.
      </p>
    </WritingNavigationTrigger>

    <WritingNavigationTrigger>
      <h2 id="item-4">Item 4</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi neque
        labore delectus necessitatibus eaque quibusdam esse, placeat, totam quia
        cumque tenetur laboriosam! Maiores distinctio neque repudiandae qui
        repellat pariatur reiciendis. Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Animi neque labore delectus necessitatibus eaque
        quibusdam esse, placeat, totam quia cumque tenetur laboriosam! Maiores
        distinctio neque repudiandae qui repellat pariatur reiciendis. Lorem
        ipsum dolor sit amet consectetur adipisicing elit. Animi neque labore
        delectus necessitatibus eaque quibusdam esse, placeat, totam quia cumque
        tenetur laboriosam! Maiores distinctio neque repudiandae qui repellat
        pariatur reiciendis. Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Animi neque labore delectus necessitatibus eaque quibusdam esse,
        placeat, totam quia cumque tenetur laboriosam! Maiores distinctio neque
        repudiandae qui repellat pariatur reiciendis. Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Animi neque labore delectus necessitatibus
        eaque quibusdam esse, placeat, totam quia cumque tenetur laboriosam!
        Maiores distinctio neque repudiandae qui repellat pariatur reiciendis.
      </p>
    </WritingNavigationTrigger>
  </>
)

const meta: Meta<typeof WritingNavigation> = {
  title: 'WritingNavigation',
  component: WritingNavigation,
  tags: ['autodocs'],
  args: {
    items,
    className: 'not-prose',
  },
}

export default meta
type Story = StoryFn<typeof WritingNavigation>

export const Default: Story = (props) => {
  return (
    <div className="mx-auto prose prose-neutral dark:prose-invert">
      <WritingNavigation {...props}>{content}</WritingNavigation>
    </div>
  )
}
