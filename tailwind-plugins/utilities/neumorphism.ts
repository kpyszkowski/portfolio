import plugin from 'tailwindcss/plugin'

const neumorphismPlugin = plugin(({ addUtilities }) => {
  addUtilities({
    '.neumorphism': {
      '--tw-neumorphism-tr-color': 'rgb(255 255 255 / 6%)',
      '--tw-neumorphism-bl-color': 'rgb(255 255 255 / 10%)',

      boxShadow: `
        inset 1px -1px 1px 0 var(--tw-neumorphism-tr-color), 
        inset -1px 1px 1px 0 var(--tw-neumorphism-bl-color)
      `,
    },
  })
})

export default neumorphismPlugin
