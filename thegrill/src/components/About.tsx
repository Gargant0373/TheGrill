import { MotionValue, motion, useTransform } from "motion/react";
import "./About.css";

function AboutSection({ scrollY, viewportHeight }: { scrollY: MotionValue<number>, viewportHeight: number }) {

  const infoScale = useTransform(scrollY, [0, viewportHeight], [1.0, 1.1])

  return (
    <div className="about-wrapper">
      <motion.div
        className="about"
        style={{
          scale: infoScale
        }}
      >
        <motion.img
          className="inside-mouth"
          src="./assets/hanging_guy_optimized.gif"
          alt="Inside of The Grill Master's mouth"
          style={{ zIndex: 1 }}
        />
        <motion.div
          className="about-content"
          style={{ zIndex: 3 }}
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
