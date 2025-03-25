import { useEffect, useRef, useState } from 'react';
import './App.css';
import EventMap from './components/EventMap';
import Rules from './components/Guidelines';
import { motion, useScroll, useTransform, useSpring } from "motion/react"

function App() {

  const { scrollY } = useScroll();
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);

  // Update viewport height on resize -- I chatGPTd this :)
  useEffect(() => {
    const updateHeight = () => setViewportHeight(window.innerHeight);
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  const topLipOffset = useTransform(scrollY, [0, viewportHeight], [0, -0.5 * viewportHeight])
  const bottomLipOffset = useTransform(scrollY, [0, viewportHeight], [0, -1.7 * viewportHeight])
  const lipOpacity = useTransform(scrollY, [0, 1.3 * viewportHeight], [1, 0])
  const lipTransitionOpacity = useTransform(scrollY, [0, 0.5 * viewportHeight], [1, 0])
  const roofOffset = useTransform(scrollY, [0, viewportHeight], [0, viewportHeight])

  const smoothedTopLipOffset = useSpring(topLipOffset, { stiffness: 170, damping: 23 });
  const smoothedBottomLipOffset = useSpring(bottomLipOffset, { stiffness: 170, damping: 23 });
  const smoothedRoofOffset = useSpring(roofOffset, { stiffness: 400, damping: 80 });

  return (
    <>

      <div className="start-page" style={{ height: '250vh' }} >
        <motion.div
          className="mouth"
          style={{ position: 'absolute', width: '100%', height: '100vh', zIndex: 5 }}
        >
          <motion.img
            className="upper"
            src="./assets/toplip.png"
            alt="Top lip of The Grill Master"
            style={{ width: '100%', position: 'absolute', zIndex: 5, top: smoothedTopLipOffset, opacity: lipOpacity }}
          />
          <motion.img
            className="lower"
            src="./assets/downlip.png"
            alt="Bottom lip of The Grill Master"
            style={{ width: '100%', position: 'absolute', zIndex: 4, bottom: smoothedBottomLipOffset, opacity: lipOpacity }}
          />
        </motion.div>
        <motion.div
          className="mouth-transition"
          style={{ zIndex: 3, position: 'absolute', width: '100%', height: '100vh', opacity: lipTransitionOpacity, backgroundColor: 'black' }}
        />
        <motion.div className="info-section" style={{ zIndex: 2, position: 'absolute', width: '100%', top: smoothedRoofOffset }}>
          <img
            src="./assets/insidemouth.png"
            alt="Inside of The Grill Master's mouth"
            style={{ position: 'absolute', width: '100%' }}
          />
        </motion.div>
      </div >




      <div className="content2">
        <img
          src="./assets/beergrill.png"
          alt="Beer and Grill on top of it"
        />
        <div className="rhs-content">
          <EventMap />
          <Rules />
        </div>
      </div>
      <div className="content2">
        <img
          src="./assets/beergrill.png"
          alt="Beer and Grill on top of it"
        />
        <div className="rhs-content">
          <EventMap />
          <Rules />
        </div>
      </div>
    </>
  )
}

export default App
