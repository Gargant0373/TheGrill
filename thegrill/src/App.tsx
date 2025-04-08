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
          <div className="beer-drop-container">
            &nbsp;
            <DropletAnimation />
          </div>
          <img src="./assets/beer_grill_top.png" alt="Beer grill" className="beer-image beer" style={{
            zIndex: 10,
          }} />
          <img src="./assets/beer_grill_bot.png" alt="Beer grill bot" className="beer-image beer" />
          <img src="./assets/beer_grill_guy.png" alt="Beer grill guy" className="beer-image guy"/>
        </div>
        <div className="rhs-content">
          <EventMap />
          <Rules />
          <ImageCarousel />
        </div>
      </div>
    </>
  );
}

export default App;
