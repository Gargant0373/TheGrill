import { motion, useTransform, useSpring, MotionValue } from "motion/react"

function Mouth({ scrollY, viewportHeight }: { scrollY: MotionValue<number>, viewportHeight: number }) {
  // TODO this is very taxing for the cpu :') idk what to do abt it
  const topLipOffset = useTransform(scrollY, [0, viewportHeight], [0, -0.01 * viewportHeight])
  const bottomLipOffset = useTransform(scrollY, [0, viewportHeight], [0, -1.65 * viewportHeight]) //  const lipOpacity = useTransform(scrollY, [0, 1 * viewportHeight], [1, 1])
  const lipTransitionOpacity = useTransform(scrollY, [0, 0.5 * viewportHeight], [0.8, 0])
  const mouthScale = useTransform(scrollY, [0, viewportHeight], [1, 1.3])

  const smoothedTopLipOffset = useSpring(topLipOffset, { stiffness: 5, damping: 10 });
  const smoothedBottomLipOffset = useSpring(bottomLipOffset, { stiffness: 100, damping: 20 });
  const smoothedMouthScale = useSpring(mouthScale, { stiffness: 800, damping: 30 })

  // Function to scroll smoothly to 100vh - chatGPT
  const scrollTo100vh = () => {
    //    animate(scrollY, 2 * viewportHeight, { type: "tween", duration: 0.8, ease: "easeInOut" });
    window.scrollTo({ top: viewportHeight, behavior: "smooth" });
  };

  return (
    <>
      <motion.button
        onClick={scrollTo100vh}
        style={{
          position: "fixed",
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
          style={{ position: 'absolute', width: '100%', height: '100vh', zIndex: 5, scale: smoothedMouthScale }}
        >
          <motion.img
            className="upper"
            src="./assets/toplip.png"
            alt="Top lip of The Grill Master"
            style={{ width: '100%', position: 'absolute', zIndex: 5, top: smoothedTopLipOffset }}
          />
          <motion.img
            className="lower"
            src="./assets/downlip.png"
            alt="Bottom lip of The Grill Master"
            style={{ width: '100%', position: 'absolute', zIndex: 4, bottom: smoothedBottomLipOffset }}
          />
          <motion.div
            className="mouth-transition"
            style={{ zIndex: 3, position: 'absolute', width: '100%', height: '100vh', opacity: lipTransitionOpacity, backgroundColor: 'black' }}
          />
        </motion.div>
      </>
    </>
  );
}

export default Mouth;
