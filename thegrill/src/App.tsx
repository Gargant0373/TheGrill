import { useEffect, useState } from 'react';
import './App.css';
import EventMap from './components/EventMap';
import Rules from './components/Guidelines';
import { useScroll } from "motion/react"
import ImageCarousel from './components/ImageCarousel';
import Mouth from './components/Mouth'
import AboutSection from './components/About';

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

      <div className="content">
        <div className="lhs-content">
          <img
            src="./assets/beergrill.png"
            alt="Beer and Grill on top of it"
            className="beer-image"
          />
          <img
            src="./assets/droplet.svg"
            alt="Beer drop"
            className="beer-drop" />
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
