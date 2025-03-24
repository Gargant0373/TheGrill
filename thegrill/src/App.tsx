import { useEffect, useState } from 'react';
import './App.css';
import EventMap from './components/EventMap';
import Rules from './components/Guidelines';
import { motion, useScroll, useTransform } from "motion/react"

function App() {

  const { scrollY } = useScroll();
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);

  // Update viewport height on resize -- I chatGPTd this :)
  useEffect(() => {
    const updateHeight = () => setViewportHeight(window.innerHeight);
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  const lipOffset = useTransform(scrollY, [0, viewportHeight], [0, -2 * viewportHeight])
  const lipOpacity = useTransform(scrollY, [0, 1.3 * viewportHeight], [1, 0])

  const lipThreshold = 500;
  const contentFadeStart = 500;
  const contentFadeDuration = 200;
  const [scrollOffset, setScrollOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollOffset(window.scrollY);
    }
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const lipProgress = Math.min(scrollOffset / lipThreshold, 1);
  const contentFadeProgress = Math.min(
    Math.max((scrollOffset - contentFadeStart) / contentFadeDuration, 0),
    1
  );

  return (
    <>

      <div className="start-page" >
        <motion.div
          className="mouth"
          style={{ position: 'absolute', width: '100%', height: '100vh', zIndex: 5 }}
        >
          <motion.img
            className="upper"
            src="./assets/toplip.png"
            alt="Top lip of The Grill Master"
            style={{ width: '100%', position: 'absolute', zIndex: 5, top: lipOffset, opacity: lipOpacity }}
          />
          <motion.img
            className="lower"
            src="./assets/downlip.png"
            alt="Bottom lip of The Grill Master"
            style={{ width: '100%', position: 'absolute', zIndex: 4, bottom: lipOffset, opacity: lipOpacity }}
          />
        </motion.div>
        <div className="info-section" style={{ zIndex: 2, position: 'absolute', width: '100%', backgroundColor: 'blue' }}>
          <div className="roof-of-mouth" style={{ position: 'absolute', width: '100%', top: '0vh' }}>
            <img
              src="./assets/insidemouth.png"
              alt="Inside of The Grill Master's mouth"
              style={{ position: 'absolute', width: '100%' }}
            />
          </div>
        </div>
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
