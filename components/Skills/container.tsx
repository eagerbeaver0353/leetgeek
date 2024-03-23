import IconBox from '@/components/small/IconBox'

export interface Props {
  name?: string
  items?: string[]
  description?: string
}

export default function Page({ name, items = [], description }: Props) {
  return (
    <div className="aos-init aos-animate relative" data-aos="fade-up">
      <div className="mb-6 h-full rounded-2xl  bg-primary/5 bg-slate-50 p-4 px-4 py-8 text-center shadow-[0_10px_34px_rgb(0,0,0,0.05)] dark:bg-gray-700">
        <h4 className="h4 mb-2 font-semibold text-black dark:text-white">{name}</h4>
        <h6 className="mb-4 text-h6 text-txt-dark dark:text-txt-light">{description}</h6>
        <div className="flex flex-wrap items-center justify-center gap-4 justify-self-center text-base font-semibold text-primary">
          {items.map((item, i) => (
            <div
              data-aos="fade-up"
              data-aos-easing="ease-out-cubic"
              data-aos-delay={(i + 1) * 100}
              data-aos-duration={200}
              key={i}
            >
              <IconBox name={item} value="" displayType="none" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
