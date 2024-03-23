'use client'

import { useEffect } from 'react'
import { User, allUsers } from 'contentlayer/generated'
import MetaComponent from '@/components/Meta'
import Banner from '@/components/Banner'
import Skills from '@/components/Skills'
import BrandContacts from '@/components/BrandContacts'
import Experiences from '@/components/Experiences'
import Projects from '@/components/Projects'
import Testimonial from '@/components/Testimonial'

export default function Page({ params }: { params: { slug: string } }) {
  const userData: User | undefined = allUsers.filter((user) =>
    user._raw.sourceFileName.includes(params.slug)
  )[0]
  if (userData == undefined) throw new Error(`no such user - ${params.slug}`)
  const { name, role, summary, photo, skills, contacts, experiences, projects, testimonials } =
    userData
  const banner = { title: name, subtitle: role, image: photo, summary }

  useEffect(() => {
    localStorage.setItem('me', params.slug)
  }, [params.slug])
  return (
    <>
      <MetaComponent
        title={name}
        meta_title={`${name} | ${role}`}
        description={summary}
        image={photo}
      />
      <Banner banner={banner} contacts={contacts} />
      <Skills skills={skills} />
      <BrandContacts contacts={contacts} />
      <Experiences experiences={experiences} />
      <BrandContacts contacts={contacts} />
      <Projects projects={projects} />
      <Testimonial testimonial={testimonials} />
    </>
  )
}
