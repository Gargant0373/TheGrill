import { useEffect, useState } from 'react';
import './App.css';
import EventMap from './components/EventMap';
import Rules from './components/Guidelines';
import { motion, useScroll, useTransform, useSpring } from "motion/react"
import ImageCarousel from './components/ImageCarousel';
import Mouth from './components/Mouth'

function App() {

  const { scrollY } = useScroll();
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);

  // Update viewport height on resize -- I chatGPTd this :)
  useEffect(() => {
    const updateHeight = () => setViewportHeight(window.innerHeight);
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  const roofOffset = useTransform(scrollY, [0, viewportHeight], [0, viewportHeight])
  const infoScale = useTransform(scrollY, [0, viewportHeight], [1, 1.1])
  const smoothedRoofOffset = useSpring(roofOffset, { stiffness: 800, damping: 100 });
  const smoothedInfoScale = useSpring(infoScale, { stiffness: 1000, damping: 50 })


  return (
    <>
      <div className="start-page" style={{ height: '250vh' }} >
        <Mouth scrollY={scrollY} viewportHeight={viewportHeight} />
        <motion.div style={{ zIndex: 1, position: 'absolute', width: '100%', top: smoothedRoofOffset, scale: smoothedInfoScale }}>
          <motion.img
            src="./assets/insidemouth.png"
            alt="Inside of The Grill Master's mouth"
            style={{ position: 'absolute', width: '100%' }}
          />
          <motion.div
            className="info"
            style={{ zIndex: 2, position: 'absolute', width: '100%', transform: 'translateY(50%)' }}
          >
            <h1>Here's what you need to know!</h1>
            <p>On May 1st, we feast for the 5th time at Delftse Hout.</p>
            <p>The fire will char the meat, and the mere sight of beer will make us salivate.</p>
            <p>Bring your grill, your food, your fire, but most importantly, your thirst.</p>
            <p>If you don’t feed the flames, the flames won’t feed you!</p>
          </motion.div>
        </motion.div>
      </div >

      <div className="content">
        <div className="lhs-content">
          <img
            src="./assets/beergrill.png"
            alt="Beer and Grill on top of it"
            className="beer-image"
          />
        </div>
        <div className="rhs-content">
          <EventMap />
          <Rules />
          <ImageCarousel />
        </div>
      </div>
    </>
  )
}

export default App
