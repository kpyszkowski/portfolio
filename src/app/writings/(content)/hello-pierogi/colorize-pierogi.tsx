'use client'
import { Playground } from '@/components/playground'

const ColorizePierogi = () => (
  <Playground title="Colorize Pierogi">
    {({ registerControl }) => {
      const [hue] = registerControl('Hue', 0)
      return (
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/6e/Pier%C3%B3g_ruski.JPG"
          style={{
            filter: `hue-rotate(${hue}deg)`,
            maxWidth: '512px',
            height: 'auto',
            borderRadius: '8px',
            transition: 'filter 0.3s ease-in-out',
            width: '100%',
            margin: '0 auto',
          }}
        />
      )
    }}
  </Playground>
)
export default ColorizePierogi
