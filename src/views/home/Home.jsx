import React, { useState, useEffect } from 'react';
import "../../styless/home/Home.css"

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const slides = [
    {
      id: 1,
      images: [
        { src: "/slideimage/slide1.png" },
        { src: "/slideimage/slide2.png" },
        { src: "/slideimage/slide3.png" }
      ]
    },
    {
      id: 2,
      images: [
        { src: "/slideimage/slide4.png" },
        { src: "/slideimage/slide5.png" },
        { src: "/slideimage/slide6.png" }
      ]
    },
    {
      id: 3,
      images: [
        { src: "/slideimage/slide7.png" },
        { src: "/slideimage/slide8.png" },
        { src: "/slideimage/slide9.png" }
      ]
    },
    {
      id: 4,
      images: [
        { src: "/slideimage/slide10.png" },
        { src: "/slideimage/slide11.png" },
        { src: "/slideimage/slide12.png" }
      ]
    },
    {
      id: 5,
      images: [
        { src: "/slideimage/slide13.png" },
        { src: "/slideimage/slide14.png" },
        { src: "/slideimage/slide15.png" }
      ]
    }
  ];

  useEffect(() => {
    if (isPlaying) {
      const timer = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % slides.length);
      }, 4000);

      return () => clearInterval(timer);
    }
  }, [isPlaying, slides.length]);

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
      <div className="home">
        <div className="slider-container">
          <div className="slider-wrapper" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
            {slides.map((slide, index) => (
                <div key={slide.id} className="slide">
                  <div className="slide-images">
                    {slide.images.map((image, imgIndex) => (
                        <div key={imgIndex} className="image-container">
                          <img
                              src={image.src}
                              alt={image.alt}
                              className="slide-image"
                          />
                        </div>
                    ))}
                  </div>
                </div>
            ))}
          </div>

          <button className="slider-btn prev-btn" onClick={prevSlide}>
            &#8249;
          </button>
          <button className="slider-btn next-btn" onClick={nextSlide}>
            &#8250;
          </button>

          <div className="slider-indicators">
            {slides.map((_, index) => (
                <button
                    key={index}
                    className={`indicator ${index === currentSlide ? 'active' : ''}`}
                    onClick={() => goToSlide(index)}
                />
            ))}
          </div>
        </div>
      </div>
  );
};

export default Home;
