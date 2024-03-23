import IconBox from '@/components/small/IconBox'

export interface Props {
  role: string
  details?: string[]
  skillsUsed?: string[]
  employer: string
  date?: string
  location?: string
  index?: number
  className?: string
}

export default function Page({
  role,
  details = [],
  skillsUsed = [],
  employer,
  date,
  location,
  index = 0,
  className = '',
}: Props) {
  return (
    <div className={'[:nth-child(2n+1)_&]:translate-y-[30px] ' + className}>
      <div
        className="aos-init aos-animate relative"
        data-aos={index % 2 == 0 ? 'fade-right' : 'fade-left'}
      >
        <div className="mb-6 h-full rounded-2xl bg-slate-50 px-4 py-8 text-center shadow-[0_10px_34px_rgb(0,0,0,0.05)] dark:bg-gray-700 lg:px-10">
          <div className="flex">
            <IconBox name={'company'} value="" displayType="none" />
            <div className="flex flex-col justify-center text-left">
              <h5 className="h5 mb-[3px] font-semibold text-txt-dark dark:text-txt-light">
                {role} | {employer}
              </h5>
              <h6 className="text-h6 text-txt-dark dark:text-txt-light">
                {date} | {location}
              </h6>
            </div>
          </div>

          <ul className="mt-3 px-10 text-left">
            {details.map((detail, index) => (
              <li className="text-md list-disc" key={index}>
                {detail}
              </li>
            ))}
          </ul>

          <div className="mt-4 flex flex-wrap items-center justify-start gap-4 text-base font-semibold text-primary">
            {skillsUsed.map((skill, index) => (
              <IconBox name={skill} value="" displayType="name" size={20} key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
