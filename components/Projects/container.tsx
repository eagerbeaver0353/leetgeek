import React, { useEffect, useState } from 'react'
import ProjectBox, { ProjectProps } from './box'

export interface Props {
  type: 'query' | 'id'
  data: string[] | string
  pageSize?: number
  pageNumber?: number
}

export default function Page({
  type = 'query',
  data = '.*',
  pageSize = 12,
  pageNumber = 0,
}: Props) {
  const [projects, setProjects] = useState<ProjectProps[]>([])
  useEffect(() => {
    fetch(`/api/projects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type,
        data,
        pageSize,
        pageNumber,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        const _projects = data as ProjectProps[]
        setProjects(_projects)
      }, console.error)
  }, [])
  return (
    <div className="aos-init aos-animate relative" data-aos="fade-up">
      <div className="xl::grid-cols-4 mb-6 grid h-full grid-cols-1 rounded-2xl bg-slate-50 px-4 py-8 text-center shadow-[0_10px_34px_rgb(0,0,0,0.05)] dark:bg-gray-700 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => {
          return (
            <div
              data-aos="fade-up"
              data-aos-easing="ease-out-cubic"
              data-aos-delay={(i + 1) * 100}
              data-aos-duration={200}
              data-aos-offset="-1000"
              key={i}
            >
              <ProjectBox {...project} />
            </div>
          )
        })}
      </div>
    </div>
  )
}
