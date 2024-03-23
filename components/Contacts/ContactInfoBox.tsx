// const contactIcons = (await getEntry("icons", "contact")).data;
// const socialIcons = (await getEntry("icons", "social")).data;
import IconBox from '@/components/small/IconBox'
import { allMetadata, Icon } from 'contentlayer/generated'

interface Props {
  contacts: {
    [key: string]: string
  }
}

const ContactInfoBox = ({ contacts }: Props) => {
  const contactIcons = allMetadata[0].icons.contacts
  const socialIcons = allMetadata[0].icons.socials
  console.log(contactIcons)
  return (
    <div className="aos-init aos-animate" data-aos="fade-left">
      <div className="rounded-2xl bg-slate-50 p-8 pb-10 shadow-lg dark:bg-gray-700">
        <ul className="space-y-3 sm:px-5 lg:px-10">
          {Object.keys(contactIcons).map(
            (contactMethod) =>
              contactMethod in contacts && (
                <li key={contactMethod}>
                  <IconBox
                    name={contactMethod}
                    value={contacts[contactMethod]}
                    displayType="value"
                  />
                </li>
              )
          )}
          <li className="flex justify-between space-x-4">
            {Object.keys(socialIcons).map(
              (socialPlatform) =>
                socialPlatform in contacts && (
                  <IconBox
                    key={socialPlatform}
                    name={socialPlatform}
                    value={contacts[socialPlatform]}
                    displayType="none"
                  />
                )
            )}
          </li>
        </ul>
      </div>
    </div>
  )
}

export default ContactInfoBox
