import { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";
import { motion, spring } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./ImageCarousel.css";

const imagesObj = import.meta.glob("../assets/images/*.{png,jpg,jpeg,svg,webp}", { eager: true });

const images = Object.values(imagesObj).map((mod) => (mod as { default: string }).default);

const shuffleArray = (arr: string[]) => arr.sort(() => Math.random() - 0.5);

function ImageCarousel() {
  const navigate = useNavigate();
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

  {/* <button */ }
  {/*   className="nav-button left" */ }
  {/*   onClick={prevImage} */ }
  {/* > */ }
  {/*   ‹ */ }
  {/* </button> */ }
  return (
    <div className="carousel">
      <h1>SOME PICTURES FROM LAST YEARS</h1>
      <div className="carousel-container" {...handlers}>
        <motion.button
          initial={{ y: "-50%" }}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.95 }}
          onClick={prevImage}
          className="nav-button left"
        >
          <img
            src='./assets/arrow-left.svg'
            alt="<-"
          />
        </motion.button>
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

        <motion.button
          initial={{ y: "-50%" }}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.95 }}
          onClick={nextImage}
          className="nav-button right"
        >
          <img
            src='./assets/arrow-right.svg'
            alt="<-"
          />
        </motion.button>

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
      <div className="gallery-button-container" style={{ position: 'relative', zIndex: 100 }}>
        <button
          className="gallery-button"
          onClick={() => navigate('/gallery')}
          style={{ position: 'relative', zIndex: 101 }}
        >
          View Full Gallery
        </button>
      </div>
    </div>
  );
}

export default ImageCarousel;
