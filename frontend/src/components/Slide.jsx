import React, { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, EffectFade, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/effect-fade';

// Dynamically import all images matching the pattern
const importAll = (r) =>
  r.keys()
    .filter((fileName) => /^\.\/item-\d{2}\.jpg$/.test(fileName)) // Match files like item-01.jpg
    .map(r);

const images = importAll(require.context('../assets/FotosRetocadas', false, /\.(png|jpe?g|svg)$/));

const MOBILE_BREAKPOINT = 768;

const useIsMobile = (breakpoint = MOBILE_BREAKPOINT) => {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < breakpoint : false
  );

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const mediaQuery = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const handleChange = (event) => setIsMobile(event.matches);

    handleChange(mediaQuery);

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }

    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, [breakpoint]);

  return isMobile;
};

// --- Carrusel circular manual ("barrel shifter") -----------------------
// El modo `loop` nativo de Swiper (con centeredSlides + slidesPerView
// enteros/fraccionarios) generaba saltos visibles al reciclar los slides
// duplicados, sobre todo justo en el reinicio. En vez de pelear con eso,
// armamos nuestro propio buffer circular: el set de imágenes se repite
// varias veces en un solo array, y avanzamos un índice que solo crece.
// Cuando se acerca al final del array duplicado, "rebasamos" la posición
// de forma instantánea (sin transición) hacia una copia anterior que
// muestra exactamente la misma imagen — invisible para el ojo, como un
// registro de desplazamiento circular.
const REAL_COUNT = images.length;
const COPIES = 12;
const LOOPED_IMAGES = Array.from({ length: COPIES }, () => images).flat();
const START_POSITION = Math.floor(COPIES / 2) * REAL_COUNT;
const REBASE_THRESHOLD = (COPIES - 2) * REAL_COUNT;
const REBASE_STEP = Math.floor(COPIES / 2) * REAL_COUNT;

const MobilePrizeShowcase = () => {
  const featuredRef = useRef(null);
  const secondaryRef = useRef(null);
  const positionRef = useRef(START_POSITION);
  const SLIDE_SPEED = 700;

  const goToPosition = (pos, speed) => {
    const featured = featuredRef.current;
    const secondary = secondaryRef.current;

    if (featured && !featured.destroyed) {
      featured.slideTo(pos, speed);
    }
    if (secondary && !secondary.destroyed) {
      secondary.slideTo(pos, speed);
    }
  };

  // Si nos acercamos al final del array duplicado, saltamos de vuelta a
  // una copia equivalente (misma imagen real) sin animación: es
  // matemáticamente el mismo contenido, así que el salto no se percibe.
  const maybeRebase = () => {
    if (positionRef.current >= REBASE_THRESHOLD) {
      const rebased = positionRef.current - REBASE_STEP;
      positionRef.current = rebased;
      goToPosition(rebased, 0);
    }
  };

  useEffect(() => {
    if (REAL_COUNT <= 1) return undefined;

    const interval = setInterval(() => {
      const next = positionRef.current + 1;
      positionRef.current = next;
      goToPosition(next, SLIDE_SPEED);
    }, 2400);

    return () => clearInterval(interval);
  }, []);

  // Al tocar una miniatura, saltamos a la copia más cercana a la posición
  // actual que corresponda a ese premio (recorrido corto, sin dar la
  // vuelta a todo el set).
  const handleThumbTap = (realIndex) => {
    const current = positionRef.current;
    const currentCopy = Math.floor(current / REAL_COUNT);

    let target = currentCopy * REAL_COUNT + realIndex;
    for (const candidateCopy of [currentCopy - 1, currentCopy, currentCopy + 1]) {
      if (candidateCopy < 0 || candidateCopy >= COPIES) continue;
      const candidate = candidateCopy * REAL_COUNT + realIndex;
      if (Math.abs(candidate - current) < Math.abs(target - current)) {
        target = candidate;
      }
    }

    positionRef.current = target;
    goToPosition(target, SLIDE_SPEED);
  };

  return (
    <div className="prize-showcase-mobile">
      <div className="featured-prize">
        <Swiper
          className="featured-prize__slider"
          modules={[EffectFade]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          loop={false}
          initialSlide={START_POSITION}
          speed={SLIDE_SPEED}
          allowTouchMove={false}
          onSwiper={(swiper) => {
            featuredRef.current = swiper;
          }}
          onSlideChangeTransitionEnd={maybeRebase}
        >
          {LOOPED_IMAGES.map((image, idx) => (
            <SwiperSlide key={idx}>
              <img
                src={image}
                alt={`Premio ${(idx % REAL_COUNT) + 1}`}
                className="featured-prize__image"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {images.length > 1 && (
        <Swiper
          className="secondary-prizes"
          loop={false}
          initialSlide={START_POSITION}
          centeredSlides={true}
          speed={SLIDE_SPEED}
          slidesPerView={3}
          spaceBetween={10}
          allowTouchMove={false}
          onSwiper={(swiper) => {
            secondaryRef.current = swiper;
          }}
        >
          {LOOPED_IMAGES.map((image, idx) => (
            <SwiperSlide key={idx}>
              <img
                src={image}
                alt={`Miniatura premio ${(idx % REAL_COUNT) + 1}`}
                onClick={() => handleThumbTap(idx % REAL_COUNT)}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

const DesktopSlide = () => (
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

const Slide = () => {
  const isMobile = useIsMobile();

  return isMobile ? <MobilePrizeShowcase /> : <DesktopSlide />;
};

export default Slide;
