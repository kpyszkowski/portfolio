'use client'
import { Playground } from '@/components/playground'
import Image from 'next/image'

const ColorizePierogi = () => (
  <Playground
    title="Colorize pierożek"
    content={({ registerControl }) => {
      const [hue] = registerControl('hue', 0, {
        min: 0,
        max: 360,
        label: 'Hue',
        valueLabel: ['0°', '360°'],
      })
      const [name] = registerControl('name', '', {
        withClearButton: true,
        label: 'Name your pierożek',
        placeholder: 'You gave me color, now give me name',
      })
      const [isRotated] = registerControl('isRotated', false, {
        label: 'Rotate pierożek',
      })

      return (
        <div style={{ position: 'relative' }}>
          <Image
            width={320}
            alt="Pieróg ruski"
            src="https://upload.wikimedia.org/wikipedia/commons/6/6e/Pier%C3%B3g_ruski.JPG"
            style={{
              filter: `hue-rotate(${hue}deg)`,
              transform: isRotated ? 'rotate(180deg)' : 'none',
            }}
          />
          <span
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: 'black',
              fontSize: '4rem',
              textAlign: 'center',
              lineHeight: 1,
            }}
          >
            {name}
          </span>
        </div>
      )
    }}
    sourceCode={({ hue, name, isRotated }) => [
      '<img',
      '  src="..." // image source',
      '  style={{',
      `    filter: 'hue-rotate(${hue}deg)',`,
      `    transform: '${isRotated ? 'rotate(180deg)' : 'none'}',`,
      '  }}',
      '/>',
      '<span>',
      `  {"${name}"}`,
      '</span>',
    ]}
  />
)
export default ColorizePierogi
