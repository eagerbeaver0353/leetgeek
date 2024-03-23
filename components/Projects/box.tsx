import { useRef, useState } from 'react'
import { Modal } from 'react-responsive-modal'
import 'react-responsive-modal/styles.css'
import ProjectPreviewSlider from './preview-slider'

interface PreviewType {
  tag_type: string
  url: string
}

export interface ProjectProps {
  freelancerId: string
  portfolioId: string
  title: string
  previews: PreviewType[]
  skills: string[]
  description?: string
  url: string
}

export default function ProjectBox({
  title,
  url,
  description = '',
  previews = [],
  skills = [],
}: ProjectProps) {
  const [show, setShow] = useState(false)
  const intervalRef = useRef(Math.floor((Math.random() * 4 + 4) * 1000))

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <>
      <button
        className="features-card btn btn-primary group z-30 flex h-[28rem] w-full cursor-pointer flex-col items-center dark:bg-gray-300 bg-slate-50"
        onClick={handleShow}
      >
        <div className="primary flex w-full items-center justify-center group-hover:bottom-0 group-hover:top-auto  group-hover:duration-300 group-hover:ease-linear group-hover:after:h-full">
          <ProjectPreviewSlider
            previews={previews.filter((preview) => preview.tag_type !== 'a')}
            interval={intervalRef.current}
          />
        </div>
        <h5 className="mb-5 overflow-hidden text-ellipsis whitespace-pre-wrap text-center text-h5">
          {title}
        </h5>
      </button>
      <Modal open={show} onClose={handleClose} classNames={{ modal: 'scroll-smooth' }} center>
        <h3 className="mt-4 text-h3">{title}</h3>
        <ProjectPreviewSlider
          previews={previews.filter((preview) => preview.tag_type !== 'a')}
          interval={intervalRef.current}
        />
        <h5 className="mt-5 text-h5">Skills</h5>
        <ul className="mt-2 flex flex-wrap gap-2">
          {skills.map((skill, i) => (
            <li className="rounded-md bg-[#faf1ed] px-2 py-1 text-center text-[#fe6019]" key={i}>
              {skill}
            </li>
          ))}
        </ul>
        <h5 className="mt-5 text-h5">
          Reference Links{' '}
          {url !== '' && (
            <a
              href={url}
              className="rounded-full border-[1px] border-black bg-[#e6f1ff] px-2 py-1 text-center"
            >
              🔗
            </a>
          )}
        </h5>
        <ul className="mt-2 flex flex-wrap gap-2">
          {previews
            .filter((preview) => preview.tag_type === 'a')
            .map((item, index) => (
              <li className="rounded-md bg-[#e6f1ff] px-2 py-1 text-center" key={index}>
                <a href={item.url} className="text-blue-600">
                  ({index + 1})
                </a>
              </li>
            ))}
        </ul>
        <p
          className="mb-10 mt-5 text-h6"
          dangerouslySetInnerHTML={{
            __html: description.replaceAll('\n', '<br />'),
          }}
        />
      </Modal>
    </>
  )
}
