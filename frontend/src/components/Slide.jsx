import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-coverflow';

// Dynamically import all images matching the pattern
const importAll = (r) =>
  r.keys()
    .filter((fileName) => /^\.\/item-\d{2}\.jpg$/.test(fileName)) // Match files like item-01.jpg
    .map(r);

const images = importAll(require.context('../assets/FotosRetocadas', false, /\.(png|jpe?g|svg)$/));

const Slide = () => {
  return (
    <div className="slider-container">
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        loopAdditionalSlides={3}
        slidesPerView={3}
        coverflowEffect={{
          rotate: 0,
          stretch: -75,
          depth: 250,
          modifier: 3.5,
          slideShadows: false,
        }}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        modules={[EffectCoverflow, Autoplay]}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img src={image} alt={`Slide ${index + 1}`} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slide;
