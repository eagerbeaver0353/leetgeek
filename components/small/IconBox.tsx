import NextImage from 'next/image'
import { allMetadata } from 'contentlayer/generated'
import { useEffect } from 'react'

export interface Props {
  name: string
  size?: number
  value?: string
  displayType?: 'value' | 'name' | 'none'
}

const IconBox = ({ name, size = 64, value = '', displayType }) => {
  const allIcons = allMetadata[0].icons

  const iconUrl = Object.keys(allIcons)
    .filter((subfield) => typeof allIcons[subfield] === 'object')
    .map((subfield) => allIcons[subfield])
    .reduce((result, data) => (name in data ? data[name] : result), 'html')

  const Element = value == '' ? 'div' : 'a'

  return (
    <Element href={value} target="_blank" className="flex items-center justify-around gap-3">
      <NextImage src={iconUrl} width={size} height={size} alt={name} />
      <p
        className="h5 flex-1 break-all text-center font-semibold"
        style={{ fontSize: Math.min(size - 4, 16) }}
      >
        {displayType == 'value' && value}
        {displayType == 'name' && name.toUpperCase()}
      </p>
    </Element>
  )
}

export default IconBox
