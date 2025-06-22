import plugin from 'tailwindcss/plugin'

const proseInlineCode = plugin(function ({ addVariant }) {
  addVariant(
    'prose-inline-code',
    '&.prose :where(:not(pre)>code):not(:where([class~="not-prose"] *))',
  )
})

export default proseInlineCode
