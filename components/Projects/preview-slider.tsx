import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, A11y } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/a11y'
import 'swiper/css/pagination'
import 'swiper/css/autoplay'
import ItemViewer from './preview-item-viewer'

const ProjectPreviewSlider = ({ previews, interval }) => {
  return (
    <Swiper
      loop={true}
      slidesPerView={1}
      spaceBetween={20}
      modules={[Autoplay, Pagination, A11y]}
      autoplay={{ delay: interval }}
      pagination={{ clickable: true }}
      wrapperClass="mb-4"
    >
      {(previews.length == 0
        ? [
            {
              tag_type: 'img',
              url: `/images/blog/0${interval % 7}.jpg`,
            },
          ]
        : previews
      ).map((preview, index) => (
        <SwiperSlide
          className="flex cursor-pointer items-center px-6 py-6 text-center opacity-50  grayscale filter transition hover:opacity-100 hover:grayscale-0 lg:px-10"
          style={{ aspectRatio: 'auto' }}
          key={'preview-' + index}
        >
          <ItemViewer {...preview} />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default ProjectPreviewSlider
