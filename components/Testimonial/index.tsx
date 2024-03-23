import NextImage from 'next/image'
import TestimonialSlider from './slider'

export default function Page({ testimonial }) {
  const { title, subtitle, description, left_thumbnail, right_thumbnail, list } = testimonial
  return (
    <section className="section testimonials pt-0">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className=" text-center" data-aos="fade-up">
              <p className="text-uppercase text-txt-dark dark:text-txt-light">{subtitle}</p>
              <h2 className="section-title text-black dark:text-primary-light">{title}</h2>
              <p className="text-txt-dark dark:text-txt-light">{description}</p>
            </div>
          </div>
        </div>
        <div className="row items-center justify-center ">
          <div className="hidden md:col-3 xl:col-4 lg:block" data-aos="fade-up" data-aos-delay="50">
            <NextImage
              src={left_thumbnail}
              height={553}
              width={445}
              className="max-w-full"
              alt={title}
            />
          </div>
          <div className="sm:col-10 md:col-8 lg:col-5 xl:col-4 " data-aos="fade-up">
            <div className="relative z-30 ">
              <TestimonialSlider list={list} />
              <svg
                className="absolute left-0 top-0 -z-10 h-auto w-full text-primary"
                viewBox="0 0 462 458"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M36.9901 53.2939C8.66553 90.8729-.680565 197.569.0380893 247.72 3.02596 456.228 136.937 460.573 283.124 457.125 406.681 454.211 459.969 401.82 461.426 261.777 462.591 149.742 432.9 78.8779 413.134 60.3019 326.242-21.359 89.5954-16.4987 36.9901 53.2939z"
                  fill="currentcolor"
                ></path>
              </svg>
            </div>
          </div>
          <div
            className="xl:col-4 md:col-3 hidden lg:block"
            data-aos="fade-up"
            data-aos-delay="150"
          >
            <NextImage
              src={right_thumbnail}
              height={553}
              width={445}
              className="max-w-full"
              alt={title}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
