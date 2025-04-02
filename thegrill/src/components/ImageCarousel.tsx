import { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";
import { motion, spring } from "framer-motion";
import "./ImageCarousel.css";

const imagesObj = import.meta.glob("../assets/images/*.{png,jpg,jpeg,svg}", { eager: true });

const images = Object.values(imagesObj).map((mod) => (mod as { default: string }).default);

const shuffleArray = (arr: string[]) => arr.sort(() => Math.random() - 0.5);

function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [shuffledImages, setShuffledImages] = useState<string[]>([]);
  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    setShuffledImages(shuffleArray([...images]));
  }, []);

  const nextImage = () =>
    setCurrentIndex((prevIndex) => (prevIndex + 1) % shuffledImages.length);

  const prevImage = () =>
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? shuffledImages.length - 1 : prevIndex - 1
    );

  const handlers = useSwipeable({
    onSwipedLeft: nextImage,
    onSwipedRight: prevImage,
  });

  if (!shuffledImages.length) return null;

  return (
    <div className="carousel">
      <h1>SOME PICTURES FROM LAST YEARS</h1>
      <div className="carousel-container" {...handlers}>
        <button
          className="nav-button left"
          onClick={prevImage}
        >
          ‹
        </button>

        {(
          <>
            <motion.div
              key={`image ${currentIndex + 1 >= shuffledImages.length ? 0 : currentIndex + 1}`}
              layout
              transition={spring}
              className="carousel-image-wrapper under"
            >
              <img
                src={shuffledImages[currentIndex + 1] || shuffledImages[0]}
                alt="carousel"
              />
            </motion.div>
            <motion.div
              key={`image ${currentIndex}`}
              layout
              transition={spring}
              className="carousel-image-wrapper"
            >
              <img
                src={shuffledImages[currentIndex]}
                alt="carousel"
                onClick={() => setFullscreen(true)}
              />
            </motion.div>
            <motion.div
              key={`image ${currentIndex - 1 < 0 ? shuffledImages.length - 1 : currentIndex - 1}`}
              layout
              transition={spring}
              className="carousel-image-wrapper over"
            >
              <img
                src={shuffledImages[currentIndex - 1] || shuffledImages[shuffledImages.length - 1]}
                alt="carousel"
              />
            </motion.div>
          </>
        )}

        <button
          className="nav-button right"
          onClick={nextImage}
        >
          ›
        </button>

        <div
          className="fullscreen-container"
          onClick={() => setFullscreen(false)}
          style={{
            display: fullscreen ? "block" : "none",
          }}
        >
          <img src={shuffledImages[currentIndex]} alt="carousel" className="carousel-image" />
        </div>
      </div>
    </div>
  );
};

export default ImageCarousel;
