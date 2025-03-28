import { motion, useTransform, useSpring, MotionValue } from "motion/react"
import "./Mouth.css"

function Mouth({ scrollY, viewportHeight }: { scrollY: MotionValue<number>, viewportHeight: number }) {
  const lipOffset = useTransform(scrollY, [0, viewportHeight], [0, -1 * viewportHeight])
  const lipTransitionOpacity = useTransform(scrollY, [0, 0.5 * viewportHeight], [1, 0])
  const mouthScale = useTransform(scrollY, [0, viewportHeight], [1, 2])

  const smoothedLipOffset = useSpring(lipOffset, { stiffness: 150, damping: 30 });

  // Function to scroll smoothly to 100vh - chatGPT
  const scrollTo100vh = () => {
    window.scrollTo({ top: viewportHeight, behavior: "smooth" });
  };

  return (
    <>
      <motion.button
        onClick={scrollTo100vh}
        style={{
          position: "absolute",
          top: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          padding: "10px 20px",
          background: "black",
          color: "white",
          border: "none",
          cursor: "pointer",
          zIndex: 10,
          borderRadius: "5px",
          opacity: lipTransitionOpacity
        }}
      >
        Scroll to 100vh
      </motion.button>


      <>
        <motion.div
          className="mouth"
          style={{ zIndex: 5, scale: mouthScale }}
        >
          <motion.img
            className="upper"
            src="./assets/toplip.png"
            alt="Top lip of The Grill Master"
            style={{ zIndex: 5, top: smoothedLipOffset }}
          />
          <motion.img
            className="lower"
            src="./assets/downlip.png"
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
