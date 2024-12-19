import plugin from 'tailwindcss/plugin'

// TODO: Add variable colors

const neumorphismPlugin = plugin(({ addUtilities }) => {
  addUtilities({
    '.neumorphism': {
      '--tw-neumorphism-tr-color': 'rgb(255 255 255 / 10%)',
      '--tw-neumorphism-bl-color': 'rgb(255 255 255 / 16%)',

      boxShadow: `
        inset 1px -1px 0 0px var(--tw-neumorphism-tr-color), 
        inset -1px 1px 0 0px var(--tw-neumorphism-bl-color)
      `,
    },
  })
})

export default neumorphismPlugin
