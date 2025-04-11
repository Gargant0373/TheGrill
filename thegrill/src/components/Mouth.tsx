import { motion, useTransform, useSpring, MotionValue } from "motion/react"
import "./Mouth.css"
import { useState, useEffect } from "react"
function Mouth({ scrollY, viewportHeight }: { scrollY: MotionValue<number>, viewportHeight: number }) {
  const lipOffset = useTransform(scrollY, [0, viewportHeight], [0, -1 * viewportHeight])
  const lipTransitionOpacity = useTransform(scrollY, [0, 0.5 * viewportHeight], [1, 0])
  const mouthScale = useTransform(scrollY, [0, viewportHeight], [1, 2])

  const smoothedLipOffset = useSpring(lipOffset, { stiffness: 150, damping: 30 });

  const topImg = window.innerWidth <= 768 ? "./assets/toplip_ms3.png" : "./assets/toplip.png"
  const botImg = window.innerWidth <= 768 ? "./assets/downlip_m.png" : "./assets/downlip.png"

  // Function to scroll smoothly to 100vh - chatGPT
  const scrollTo100vh = () => {
    window.scrollTo({ top: viewportHeight, behavior: "smooth" });
  };

  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY < 0.9 * viewportHeight); // adjust threshold here
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.button
        onClick={scrollTo100vh}
        className="scroll-button"
        style={{ opacity: lipTransitionOpacity, display: isVisible ? 'block' : 'none' }}
      >
        <img
          src='./assets/arrow-down.svg'
          alt="Scroll down!"
        />
      </motion.button>

      <>
        <motion.div
          className="mouth"
          style={{ zIndex: 5, scale: mouthScale }}
        >
          <motion.img
            className="upper"
            src={topImg}
            alt="Top lip of The Grill Master"
            style={{ zIndex: 5, top: smoothedLipOffset }}
          />
          <motion.img
            className="lower"
            src={botImg}
            alt="Bottom lip of The Grill Master"
            style={{ zIndex: 4, bottom: smoothedLipOffset }}
          />
          <motion.div
            className="mouth-transition"
            style={{ zIndex: 3, opacity: lipTransitionOpacity }}
          />
        </motion.div>
      </>
    </>
  );
}

export default Mouth;
