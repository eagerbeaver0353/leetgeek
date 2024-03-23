import BrandContactSlider from './slider'
import { allMetadata, Icon } from 'contentlayer/generated'

export interface Props {
  contacts: {
    [key: string]: string
  }
}

export default function Page({ contacts }: Props) {
  const socialIcons = allMetadata[0].icons.socials
  return (
    <section className="mt-14 pb-8">
      <div className="overflow-hidden">
        <div className="container">
          <div className="row ">
            <div className="col-md-12 animate from-right " data-aos="fade-right">
              <div className="border-y border-[#dee2e6] py-5">
                <BrandContactSlider brands={contacts} iconUrls={socialIcons} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
