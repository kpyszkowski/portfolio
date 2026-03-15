# folio-25 — Component Authoring Guidelines

Reference for creating components that are consistent with the existing
codebase. All rules are derived from reading the actual source.

---

## Before Creating Any Component — Fetch Live Docs First

A `context7` MCP server is wired into this project. Before writing any component
code, resolve and fetch documentation for the libraries you will use:

1. Call `resolve-library-id` with the package name to get its Context7 ID
2. Call `get-library-docs` with that ID and a topic (e.g. the specific primitive
   or API surface)

Libraries to fetch when relevant:

| Library                   | When to fetch                                                         |
| ------------------------- | --------------------------------------------------------------------- |
| `@base-ui-components/react` | Any component that wraps a base-ui primitive                        |
| `tailwind-variants`       | Any time you use `createStyles` / slots / compoundSlots               |
| `motion/react`            | Any component that has animation (`motion.create`, `AnimatePresence`) |
| `@storybook/react`        | When creating or modifying story files                                |

Always fetch docs **before** writing code, not after encountering an error.

---

## Stack & Key Imports

| What                | How                                                                                     |
| ------------------- | --------------------------------------------------------------------------------------- |
| Headless primitives | `@base-ui-components/react/<name>` (tooltip, checkbox, select, scroll-area, …)         |
| Styling             | `createStyles`, `StylesProps` from `~/utils`                                            |
| Animation           | `motion`, `AnimatePresence` from `motion/react`                                         |
| Icons               | `Icon` type + individual icons from `react-feather`                                     |
| Path alias          | `~/` → `src/`                                                                           |

```ts
import { createStyles, type StylesProps } from '~/utils'
import { Foo as FooPrimitive } from '@base-ui-components/react/foo'
import { motion, AnimatePresence } from 'motion/react'
import { type Icon } from 'react-feather'
```

---

## File & Directory Structure

```text
src/components/
├── ui/
│   ├── button.tsx               ← single-file component
│   ├── button.stories.tsx       ← colocated story
│   ├── tooltip.tsx
│   ├── tooltip.stories.tsx
│   ├── tabs-menu/               ← compound component (multiple files)
│   │   ├── tabs-menu.tsx
│   │   ├── tabs-menu-item.tsx
│   │   ├── tabs-menu.stories.tsx
│   │   └── index.ts             ← barrel only for compound components
│   └── …
├── header.tsx
├── header.stories.tsx
└── …
```

Rules:

- **Single-file component** → flat `kebab-case.tsx` file directly in the category folder (no subdirectory)
- **Compound component** (multiple `.tsx` files, e.g. uses context or has sub-parts) → `kebab-case/` folder with sub-files named `<name>-<part>.tsx` and an `index.ts` barrel
- Barrel `index.ts` files exist **only** for compound components
- Story files are **colocated** alongside the component (`component.stories.tsx`)

---

## Naming Conventions

| Thing              | Pattern                               | Example                                         |
| ------------------ | ------------------------------------- | ----------------------------------------------- |
| File               | `kebab-case.tsx`                      | `radio-button.tsx`                              |
| Folder             | `kebab-case/`                         | `multi-select/`                                 |
| Component function | `PascalCase` full name                | `RadioButton`, `TooltipContent`                 |
| Props type         | `<ComponentName>Props`                | `RadioButtonProps`                              |
| Styles object      | `<componentName>Styles`               | `buttonStyles`, `tooltipStyles`                 |
| Context value type | `<ComponentName>ContextValue`         | `PopoverRootContextValue`                       |
| Context object     | `<ComponentName>Context`              | `PopoverRootContext`                            |
| Context hook       | `use<ComponentName>Context`           | `usePopoverRootContext`                         |
| `displayName`      | Always set on `forwardRef` components | `Tooltip.displayName = 'Tooltip'`               |

---

## Component Shape

Interactive components start with `'use client'`. Pure presentational
components that contain no hooks or event handlers do not need it.

```ts
'use client'
import { createStyles, type StylesProps } from '~/utils'
import { Foo as FooPrimitive } from '@base-ui-components/react/foo'

const fooStyles = createStyles({
  slots: {
    container: 'base classes here',
  },
  variants: {
    variant: { primary: { container: '...' } },
  },
  defaultVariants: { variant: 'primary' },
})

export interface FooProps
  extends StylesProps<typeof fooStyles> {
  className?: string
}

function Foo(props: FooProps) {
  const { className, variant, ...restProps } = props
  const styles = fooStyles({ variant })
  return (
    <FooPrimitive.Root
      className={styles.container({ className })}
      {...restProps}
    />
  )
}

export { Foo, fooStyles, type FooProps }
```

Key rules:

- **First line of the body must destructure `props`** — `const { ... } = props`
  must be the very first statement
- Destructure all variant props **explicitly** before spreading `...restProps`
- Instantiate styles _inside_ the function (`const styles = fooStyles(...)`)
- Use named exports only — no `export default`. Export the component, styles, and props type together at the bottom: `export { Foo, fooStyles, type FooProps }`

---

## Props Type Patterns

```ts
// Simple wrapper — extend primitive props directly
type ScrollAreaRootProps = ScrollAreaPrimitive.Root.Props &
  StylesProps<typeof scrollAreaRootStyles> & {
    className?: string
  }

// Remove primitive props that are handled internally
type ButtonProps = Omit<ButtonPrimitive.Props, 'nativeButton'> &
  StylesProps<typeof buttonStyles> & {
    icon?: Icon
  }

// Pick only the props you expose
type PopoverRootProps = Pick<
  PopoverPrimitive.Root.Props,
  'defaultOpen' | 'open' | 'onOpenChange'
> & {
  className?: string
  children: ReactNode
}
```

---

## Styling with `createStyles`

```ts
const componentStyles = createStyles({
  slots: {
    container: 'block transition-all',  // one slot per semantic element
    wrapper: 'flex items-center',
    label: 'whitespace-nowrap antialiased',
    icon: 'stroke-[1.5]',
  },
  variants: {
    variant: {
      outline: { container: 'border-elevated border-2' },
      ghost:   { container: 'hover:bg-elevated' },
    },
    size: {
      sm: { container: 'px-3 py-1', label: 'text-sm/none' },
      md: { container: 'px-4 py-2.5', label: 'text-base/none' },
    },
  },
  defaultVariants: { variant: 'outline', size: 'md' },
  compoundVariants: [
    // Apply classes to variants when a specific combination is active
    {
      variant: 'outline',
      size: 'sm',
      class: { container: 'rounded-lg' },
    },
  ],
  compoundSlots: [
    // Apply classes to specific slots when a combination is active
    {
      slots: ['label', 'icon'],
      variant: 'ghost',
      class: 'opacity-60',
    },
  ],
})
```

Rules:

- One slot per meaningful DOM element — `container`, `wrapper`, `label`, `icon`,
  `indicator`, etc.
- Variants describe **real visual states** — never add placeholder/unused variants
- `compoundVariants` — target base or variant-level classes based on a combination
- `compoundSlots` — target specific **slots** based on a combination
- Apply in JSX: `styles.slotName({ className })`
- When `className` may be a function (base-ui render state callbacks):
  ```ts
  className={(state) =>
    styles.container({
      className: typeof className === 'function' ? className(state) : className,
    })
  }
  ```

---

## Compound Component Pattern

### Root file (`<name>-root.tsx`)

```ts
'use client'
import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import { Foo as FooPrimitive } from '@base-ui-components/react/foo'

type FooRootContextValue = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const FooRootContext = createContext<FooRootContextValue | null>(null)

const useFooRootContext = () => {
  const context = useContext(FooRootContext)
  if (!context) throw new Error('useFooRootContext must be used within a FooRoot')
  return useMemo(() => context, [context])
}

type FooRootProps = Pick<
  FooPrimitive.Root.Props,
  'open' | 'onOpenChange' | 'defaultOpen'
> & {
  children: ReactNode
}

function FooRoot(props: FooRootProps) {
  const {
    open: controlledOpen,
    onOpenChange: controlledOnOpenChange,
    defaultOpen = false,
    ...restProps
  } = props

  const [_open, _onOpenChange] = useState(defaultOpen)
  const open = controlledOpen !== undefined ? controlledOpen : _open
  const onOpenChange =
    controlledOnOpenChange !== undefined ? controlledOnOpenChange : _onOpenChange

  return (
    <FooRootContext.Provider value={{ open, onOpenChange }}>
      <FooPrimitive.Root open={open} onOpenChange={onOpenChange} {...restProps} />
    </FooRootContext.Provider>
  )
}

export { FooRoot, fooRootStyles, type FooRootProps, useFooRootContext, type FooRootContextValue }
```

### Passing variant defaults via context

```ts
// Group context holds StylesProps so children can inherit defaults
const RadioGroupContext = createContext<StylesProps<typeof radioGroupStyles> | null>(null)
const useRadioGroupContext = () => useContext(RadioGroupContext) // nullable — no error guard

// In RadioGroup:
<RadioGroupContext.Provider value={{ orientation, variant }}>

// In RadioButton — prop wins over context:
const { variant: contextVariant } = useRadioGroupContext() ?? {}
const styles = radioButtonStyles({ variant: propsVariant ?? contextVariant })
```

---

## `forwardRef`

Use `forwardRef` whenever external code needs a ref to the underlying DOM
element (e.g. for positioning, focus management, or measurements).

```ts
const Foo = forwardRef<HTMLButtonElement, FooProps>((props, ref) => {
  // ...
})
Foo.displayName = 'Foo'
```

Always set `displayName` on every `forwardRef` component.

---

## Animation

Create motion-wrapped primitives **at module scope** (never inside render):

```ts
import { AnimatePresence, motion } from 'motion/react'

const MotionFooPopup = motion.create(FooPrimitive.Popup)
```

Drive visibility through state, not CSS display:

```tsx
<AnimatePresence>
  {open && (
    <MotionFooPopup
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{
        type: 'spring',
        stiffness: 240,
        damping: 16,
        mass: 0.8,
        opacity: { type: 'tween', ease: [0.16, 1, 0.3, 1] },
      }}
    />
  )}
</AnimatePresence>
```

Shared layout animations use `layoutId`:

```tsx
<motion.span layoutId="foo-indicator" />
```

---

## Barrel / Export Files

Barrel `index.ts` files are **only used for compound components** (those with multiple `.tsx` files in a directory).

### `<compound-component>/index.ts`

```ts
export { TabsMenu, tabsMenuStyles, type TabsMenuProps } from './tabs-menu'
export { TabsMenuItem, tabsMenuItemStyles, type TabsMenuItemProps } from './tabs-menu-item'
```

Single-file components do **not** have a barrel. Import them directly from the file:

```ts
// ✅ correct — resolves to ui/tooltip.tsx
import { Tooltip } from '~/components/ui/tooltip'

// ✅ correct — compound component via barrel
import { TabsMenu, TabsMenuItem } from '~/components/ui/tabs-menu'
```

---

## Theme Tokens

Use **semantic CSS tokens** defined in `src/app/globals.css`. **Never use raw
colour or neutral palette tokens** (`text-neutral-900`, `bg-neutral-50`, etc.)
directly in component styles.

| Category   | Tokens                                               |
| ---------- | ---------------------------------------------------- |
| Text       | `text-main` `text-elevated` `text-highlight`      |
| Background | `bg-main` `bg-elevated` `bg-highlight`            |
| Dark mode  | `dark:text-main` `dark:bg-elevated` etc.         |

Dark mode is driven by the `[data-theme=dark]` attribute via the `@custom-variant dark`
declaration — use `dark:` Tailwind variants as usual.

CSS custom properties injected by base-ui primitives: `var(--transform-origin)`,
`var(--positioner-height)`, `var(--positioner-width)`.

---

## Storybook Stories

File: `src/components/<category>/<name>.stories.tsx` (colocated with the component file)

```ts
import type { Meta, StoryObj } from '@storybook/react'
import { ComponentName } from '~/components/ui/component-name'

const meta: Meta<typeof ComponentName> = {
  title: 'UI/ComponentName',
  component: ComponentName,
  tags: ['autodocs'],
  argTypes: {
    variant: { options: ['outline', 'ghost'], control: { type: 'radio' } },
    size:    { options: ['sm', 'md', 'lg'],   control: { type: 'radio' } },
  },
  args: {
    children: 'Label',
    variant: 'outline',
    size: 'md',
  },
}

export default meta
type Story = StoryObj<typeof ComponentName>

// Object form — for simple variant overrides
export const Default: Story = { args: {} }
export const Outline: Story = { args: { variant: 'outline' } }

// Render function form — for compound or stateful components
export const WithTooltip: Story = {
  render: (args) => (
    <ComponentName {...args}>
      <ComponentName.Trigger>Open</ComponentName.Trigger>
    </ComponentName>
  ),
}
```

Rules:

- `title`: `UI/<PascalCase>` for ui components; `Components/<PascalCase>` for
  layout/page-level components
- Always include `tags: ['autodocs']`
- `argTypes` for every variant/size/boolean prop
- Object form (`StoryObj`) for simple overrides; render function for complex
  compositions
- Story export names: `PascalCase` (`Default`, `Outline`, `Ghost`, `AsLink`)

---

## Checklist for a New Component

- [ ] `'use client'` only on interactive/stateful components
- [ ] Styles declared with `createStyles` (imported from `~/utils`) and exported
- [ ] Props type intersects primitive props + `StylesProps<typeof styles>` +
      `{ className?: string }`
- [ ] Function signature uses `props` param; first line of body destructures it
- [ ] Variant props destructured explicitly; non-variant props spread via
      `...restProps`
- [ ] Single-file component is a flat `.tsx` file (no subdirectory); compound component uses a directory + `index.ts` barrel
- [ ] `motion.create()` called at module scope (never inside render)
- [ ] `forwardRef` used when DOM ref is needed; `displayName` always set
- [ ] Only semantic theme tokens used (`text-main`, `bg-elevated`, etc.) —
      no raw palette values
- [ ] Story file colocated at `<component>/<component>.stories.tsx`
