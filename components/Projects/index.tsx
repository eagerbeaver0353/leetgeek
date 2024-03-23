import { allMetadata } from 'contentlayer/generated'
import ProjectsContainer from './container'

export default function Page({ projects }) {
  const { title, subtitle, description } = allMetadata[0].userLabels.projects

  return (
    <section className="section">
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center" data-aos="fed-up">
            <p className="mb-4 text-[0.9rem] uppercase text-txt-dark dark:text-txt-light">
              {subtitle}
            </p>
            <h2 className="section-title text-black dark:text-primary-light">{title}</h2>
            <p className="text-[.9rem] text-txt-dark dark:text-txt-light">{description}</p>
            <ProjectsContainer data={projects} type="id" />
          </div>
        </div>
      </div>
    </section>
  )
}
