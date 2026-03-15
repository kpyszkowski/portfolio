import { createStyles, type StylesProps } from '~/utils/create-styles'
import { aboutContent } from '~/content/home'

const aboutSectionStyles = createStyles({
  slots: {
    container: 'px-5 py-24 lg:py-32',
    inner: 'mx-auto max-w-3xl',
    heading:
      'mb-6 text-xs font-medium tracking-widest text-highlight uppercase',
    body: 'text-xl leading-relaxed font-extralight text-elevated lg:text-2xl',
  },
})

interface AboutSectionProps extends StylesProps<typeof aboutSectionStyles> {
  className?: string
}

function AboutSection(props: AboutSectionProps) {
  const { className, ...restProps } = props
  const styles = aboutSectionStyles()

  return (
    <section
      id="about"
      className={styles.container({ className })}
      {...restProps}
    >
      <div className={styles.inner()}>
        <h2 className={styles.heading()}>{aboutContent.heading}</h2>
        <p className={styles.body()}>{aboutContent.body}</p>
      </div>
    </section>
  )
}

export { AboutSection, aboutSectionStyles, type AboutSectionProps }
