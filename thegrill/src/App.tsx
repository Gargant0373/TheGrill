import { useEffect, useState } from 'react';
import './App.css';
import EventMap from './components/EventMap';
import Rules from './components/Guidelines';
import { useScroll } from "motion/react"
import ImageCarousel from './components/ImageCarousel';
import Mouth from './components/Mouth'
import AboutSection from './components/About';
import DropletAnimation from './components/DropletAnimation';

function App() {

  const { scrollY } = useScroll();
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);

  // Update viewport height on resize -- I chatGPTd this :)
  useEffect(() => {
    const updateHeight = () => setViewportHeight(window.innerHeight);
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  return (
    <>
      <Mouth scrollY={scrollY} viewportHeight={viewportHeight} />
      <AboutSection scrollY={scrollY} viewportHeight={viewportHeight} />

      <div style={{ height: 2 * viewportHeight }} />

      <div className="content">
        <div className="lhs-content">
          <img
            src="./assets/beergrill.png"
            alt="Beer and Grill on top of it"
            className="beer-image"
          />
          <DropletAnimation />
          <img id="guy" src="./assets/guydrinking.png" alt="Guy waiting to drink" />
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
