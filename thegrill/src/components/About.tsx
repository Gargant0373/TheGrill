import { MotionValue, motion } from "motion/react";
import { useTransform, useSpring } from "motion/react";
import "./About.css"
import { useEffect, useState } from "react";

function AboutSection({ scrollY, viewportHeight }: { scrollY: MotionValue<number>, viewportHeight: number }) {

  const infoScale = useTransform(scrollY, [0, viewportHeight], [0.9, 1.1])
  const smoothedInfoScale = useSpring(infoScale, { stiffness: 1000, damping: 50 })
  const [isFixed, setIsFixed] = useState(true); // ✅ State to track position

  useEffect(() => {
    const updatePosition = () => {
      setIsFixed(scrollY.get() <= viewportHeight);
    };

    const unsubscribe = scrollY.on("change", updatePosition);

    return () => unsubscribe();
  }, [scrollY, viewportHeight]);

  return (
    <div className="about-section">
      <motion.div
        className="about"
        style={{
          position: isFixed ? 'fixed' : 'absolute',
          top: isFixed ? '0' : '100vh',
          scale: smoothedInfoScale,
          zIndex: 1
        }}
      >
        <motion.img
          className="inside-mouth"
          src="./assets/insidemouth.png"
          alt="Inside of The Grill Master's mouth"
        />
        <motion.div
          className="about-content"
          style={{ zIndex: 2 }}
        >
          <h1>Here's what you need to know!</h1>
          <p>On May 1st, we feast for the 5th time at Delftse Hout.</p>
          <p>The fire will char the meat, and the mere sight of beer will make us salivate.</p>
          <p>Bring your grill, your food, your fire, but most importantly, your thirst.</p>
          <p>If you don’t feed the flames, the flames won’t feed you!</p>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default AboutSection;
