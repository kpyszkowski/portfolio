import plugin from 'tailwindcss/plugin'

const holographicPlugin = plugin(({ addUtilities, theme }) => {
  addUtilities({
    // NOTE: The parent element must have solid white-ish background for mix-blend-mode to work
    '.holographic': {
      '--tw-holographic-rainbow': `repeating-linear-gradient(
        calc(115deg + (var(--tw-holographic-my) * 8deg)),
        ${theme('colors.red.200')},
        ${theme('colors.yellow.300')},
        ${theme('colors.green.300')},
        ${theme('colors.cyan.300')},
        ${theme('colors.blue.200')},
        ${theme('colors.fuchsia.600')},
        ${theme('colors.red.200')}
      )`,

      '--tw-holographic-stripes': `repeating-linear-gradient(
        calc(315deg + (var(--tw-holographic-my) * 8deg)),
        ${theme('colors.black')} 6.66%,
        ${theme('colors.white')} 13.33%,
        ${theme('colors.black')} 20%
      )`,

      backgroundImage:
        'var(--tw-holographic-stripes), var(--tw-holographic-rainbow)',
      backgroundBlendMode: 'screen',
      backgroundSize: '600%, 150%',
      backgroundPosition: `
            calc(40% + var(--tw-holographic-mx) * 20%) 50%,
            calc(45% + var(--tw-holographic-my) * 10%) 50%
        `,
      filter: 'saturate(150%)',
      mixBlendMode: 'exclusion',
    },
    '.holographic::after': {
      content: '""',
      position: 'absolute',
      inset: '0',
      backgroundImage:
        'var(--tw-holographic-stripes), var(--tw-holographic-rainbow)',
      backgroundBlendMode: 'screen',
      backgroundSize: '250%, 200%',
      backgroundPosition: `
            calc(60% + var(--tw-holographic-mx) * 20%) 50%,
            calc(55% + var(--tw-holographic-my) * 10%) 50%
        `,
      mixBlendMode: 'difference',
    },
  })
})

export default holographicPlugin
