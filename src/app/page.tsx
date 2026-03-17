import { getWritingsMetadata } from '~/lib/writings'
import {
  HeroSection,
  AboutSection,
  StrengthsSection,
  ProjectsSection,
  ExperienceSection,
  WritingsSection,
  ContactSection,
} from '~/components/home'

export default async function Home() {
  const writings = await getWritingsMetadata()
  const latestWriting = writings.sort(
    (a, b) => b.publishedAt.getTime() - a.publishedAt.getTime(),
  )[0]

  return (
    <main>
      <HeroSection />
      <AboutSection />
      <StrengthsSection />
      <ProjectsSection />
      <ExperienceSection />
      <WritingsSection latestWriting={latestWriting} />
      <ContactSection />
    </main>
  )
}
