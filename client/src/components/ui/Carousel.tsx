import { useState, useEffect, useCallback } from 'react';
import './Carousel.scss';

export interface CarouselSlide {
  src: string;
  alt: string;
  caption?: string;
}

export interface CarouselProps {
  slides: CarouselSlide[];
  autoPlay?: boolean;
  interval?: number;
  showCaptions?: boolean;
}

export default function Carousel({
  slides,
  autoPlay = false,
  interval = 4000,
  showCaptions = false,
}: CarouselProps) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');

  const go = useCallback(
    (index: number, dir: 'next' | 'prev') => {
      setDirection(dir);
      setCurrent((index + slides.length) % slides.length);
    },
    [slides.length],
  );

  const next = useCallback(() => go(current + 1, 'next'), [current, go]);
  const prev = useCallback(() => go(current - 1, 'prev'), [current, go]);

  useEffect(() => {
    if (!autoPlay || slides.length <= 1) return;
    const id = setInterval(next, interval);
    return () => clearInterval(id);
  }, [autoPlay, interval, next, slides.length]);

  if (slides.length === 0) return null;

  return (
    <div className="carousel" aria-roledescription="carousel" aria-label="Image gallery">
      {/* Track */}
      <div className="carousel__viewport" aria-live="polite">
        <div
          className={`carousel__track carousel__track--${direction}`}
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {slides.map((slide, i) => (
            <div
              key={i}
              className="carousel__slide"
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${slides.length}`}
              aria-hidden={i !== current}
            >
              <img src={slide.src} alt={slide.alt} className="carousel__img" />
              {showCaptions && slide.caption && (
                <div className="carousel__caption">{slide.caption}</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Prev / Next */}
      {slides.length > 1 && (
        <>
          <button
            className="carousel__btn carousel__btn--prev"
            onClick={prev}
            aria-label="Previous slide"
          >
            ←
          </button>
          <button
            className="carousel__btn carousel__btn--next"
            onClick={next}
            aria-label="Next slide"
          >
            →
          </button>
        </>
      )}

      {/* Dot indicators */}
      {slides.length > 1 && (
        <div className="carousel__dots" role="tablist" aria-label="Slides">
          {slides.map((_, i) => (
            <button
              key={i}
              role="tab"
              className={`carousel__dot${i === current ? ' carousel__dot--active' : ''}`}
              onClick={() => go(i, i > current ? 'next' : 'prev')}
              aria-label={`Go to slide ${i + 1}`}
              aria-selected={i === current}
            />
          ))}
        </div>
      )}
    </div>
  );
}
