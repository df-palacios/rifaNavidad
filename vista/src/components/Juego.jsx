import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-coverflow';

import HappyEmoji from '../assets/FotosRetocadas/HappyEmoji.png';
import SadEmoji from '../assets/FotosRetocadas/SadEmoji.png';

const Juego = () => {
    const [showSlider, setShowSlider] = useState(false); // Estado para mostrar el slider
    const images = [HappyEmoji, SadEmoji, HappyEmoji, SadEmoji, HappyEmoji, SadEmoji]; // Extender las imágenes

    const handlePlay = () => {
        setShowSlider(true); // Mostrar el slider al hacer clic en el botón JUGAR
    };

    return (
        <div className="juego-container">
            {!showSlider && (
                <button className="btn-jugar" onClick={handlePlay}>
                    JUGAR
                </button>
            )}
            {showSlider && (
                <div className="slider-container">
                    <Swiper
                        effect={'coverflow'}
                        grabCursor={true}
                        centeredSlides={true}
                        loop={true}
                        slidesPerView={3} // Mostrar 3 slides visibles
                        coverflowEffect={{
                            rotate: 50, // Rotación de las imágenes
                            stretch: -20, // Separación entre las imágenes laterales
                            depth: 150, // Profundidad del efecto 3D
                            modifier: 1, // Intensidad del efecto
                            slideShadows: false, // Sin sombras
                        }}
                        autoplay={{
                            delay: 20, // Cambio automático cada 2 segundos
                            disableOnInteraction: false, // Continuar aunque el usuario interactúe
                        }}
                        modules={[EffectCoverflow, Autoplay]}
                    >
                        {images.map((image, index) => (
                            <SwiperSlide key={index}>
                                <img src={image} alt={`Emoji ${index + 1}`} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            )}
        </div>
    );
};

export default Juego;
