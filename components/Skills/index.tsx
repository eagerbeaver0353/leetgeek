import { allMetadata } from 'contentlayer/generated'
import SkillContainer, { Props as SkillItemsProps } from './container'
import Circle from '@/components/small/Circle'
import { Play } from 'react-feather'

interface SkillsProps {
  [key: string]: SkillItemsProps
}

export default function Page({ skills }: SkillsProps) {
  const { title, subtitle, description } = allMetadata[0].userLabels.skills
  return (
    <section>
      <div className="container relative text-center">
        <div className="justify-center">
          <div className="relative z-30 py-8">
            <div data-aos="fade-down" className="mb-3">
              <p className="mb-4 text-[0.9rem] uppercase  text-txt-dark dark:text-txt-light">
                {subtitle}
              </p>
              <h2 className=" section-title uppercase text-black dark:text-primary-light">
                {title}
              </h2>
              <p className="text-[.9rem] text-txt-dark dark:text-txt-light">{description}</p>
            </div>
            <div className="relative grid grid-cols-1 gap-4 px-10 text-center md:grid-cols-2 lg:grid-cols-3">
              {Object.keys(skills).map((fieldName) => (
                <SkillContainer {...skills[fieldName]} key={fieldName} />
              ))}
              <button className="play-button">
                <Play />
              </button>
              {/* <Image
            width={700}
            height={370}
            src={intro.thumbnail}
            alt={intro.title}
            className="inline h-auto max-w-full rounded-2xl"
          /> */}
            </div>
          </div>
        </div>
        <div className="has-circle has-bg-animate h-full" data-aos="fade-in">
          <Circle classes={'circle-1 ratio-32 rellax rellax'} />
          <Circle classes={'circle-2 ratio-85 fill rellax'} />
          <Circle classes={'circle-3 ratio-20 fill'} />
          <Circle classes={'circle-4 ratio-47 rellax'} />
          <Circle classes={'circle-5 ratio-62 rellax'} />
          <Circle classes={'circle-6 ratio-20 fill rellax'} />
          <Circle classes={'circle-7 ratio-73 rellax'} />
          <Circle classes={'circle-8 ratio-37 rellax'} />
          <Circle classes={'circle-9 ratio-20 fill rellax'} />
          <Circle classes={'circle-10 ratio-65 fill rellax'} />
          <svg
            className="text-primary"
            style={{ opacity: 0.15 }}
            width="100%"
            height="100%"
            viewBox="0 0 1401 613"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 580C35.1785 462.015 166.359 247.408 425.652 332.866 749.767 439.688 890.318 302.84 946.338 181.583 1002.36 60.3256 1149.41-52.8479 14e2 35.4968"
              stroke="currentcolor"
              strokeWidth="4"
              strokeDasharray="10 10"
            ></path>
            <path
              d="M1398 .999977C1364.87 125.95 1233.88 353.224 974.955 262.722 651.302 149.594 510.953 294.52 455.013 422.935S252.231 671.203 2.00002 577.644"
              stroke="currentcolor"
              strokeWidth="4"
              strokeDasharray="10 10"
            ></path>
          </svg>
        </div>
      </div>
    </section>
  )
}
