import NextImage from 'next/image'
import { useRef, useState } from 'react'
import { Swiper, SwiperSlide, SwiperClass } from 'swiper/react'
import SwiperCore from 'swiper'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/bundle'

const TestimonialSlider = ({ list }) => {
  SwiperCore.use([Pagination])
  // const [swiper, setSwiper] = useState<SwiperClass | null>(null)
  const paginationRef = useRef(null)

  return (
    <>
      <Swiper
        pagination={{
          type: 'bullets',
          el: paginationRef.current,
          clickable: true,
          dynamicBullets: true,
        }}
        onActiveIndexChange={(swiper) => {
          console.log('active index is', swiper.activeIndex)
        }}
        // onSwiper={(swiper) => {
        //   setSwiper(swiper)
        // }}
        loop={true}
        centeredSlides={true}
        modules={[Pagination, Autoplay]}
        spaceBetween={20}
        autoplay={{ delay: 3000 }}
        // controller={{ control: swiper }}
      >
        {list.map((item, index) => {
          return (
            <SwiperSlide key={'testimonial-' + index}>
              <div className="testimonial-content px-8 py-10 text-center text-white">
                {/* <FaQuoteLeft /> */}
                <p className="text-xl">{item.content}</p>
                <span className="author">
                  <NextImage src={item.avatar} alt={item.author} width={0} height={0} />

                  <h5>{item.author}</h5>
                  <p className="text-txt-light">{item.profession}</p>
                </span>
              </div>
            </SwiperSlide>
          )
        })}
      </Swiper>
      <div className="relative mt-9 flex justify-center pt-4">
        <div className="pagination absolute" ref={paginationRef}></div>
      </div>
    </>
  )
}

export default TestimonialSlider
