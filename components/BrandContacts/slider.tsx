import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, A11y } from 'swiper/modules'
import IconBox from '@/components/small/IconBox'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/a11y'
import 'swiper/css/pagination'
import 'swiper/css/autoplay'

interface Props {
  brands: {
    [key: string]: string
  }
  iconUrls: {
    [key: string]: string
  }
}

const BrandSlider = ({ brands, iconUrls }: Props) => {
  return (
    <Swiper
      loop={true}
      slidesPerView={'auto'}
      // breakpoints={{
      //   992: {
      //     slidesPerView: 4,
      //   },
      //   1280: {
      //     slidesPerView: 5,
      //   }
      // }}
      spaceBetween={20}
      modules={[Autoplay, Pagination, A11y]}
      autoplay={{ delay: 3000 }}
      pagination={{ clickable: true }}
    >
      {Object.keys(iconUrls).map(
        (iconName, index) =>
          iconName in brands && (
            <SwiperSlide
              className="flex h-20 cursor-pointer items-center px-6 py-6 text-center opacity-50  grayscale filter transition hover:opacity-100 hover:grayscale-0 lg:px-10"
              style={{ width: '16rem' }}
              key={'brand-' + index}
            >
              <IconBox name={iconName} size={64} value={brands[iconName]} displayType="name" />
            </SwiperSlide>
          )
      )}
    </Swiper>
  )
}

export default BrandSlider
