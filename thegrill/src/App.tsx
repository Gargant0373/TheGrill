import { useEffect, useRef, useState } from 'react';
import './App.css';
import EventMap from './components/EventMap';
import Rules from './components/Guidelines';
import { useScroll } from "motion/react"
import ImageCarousel from './components/ImageCarousel';
import Mouth from './components/Mouth'
import AboutSection from './components/About';
import DropletAnimation from './components/DropletAnimation';
import BottleAndGuy from './assets/beer_grill_guy.svg?react';

function App() {

  const { scrollY } = useScroll();
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);
  const beerRef = useRef<SVGElement>(null);

  // Update viewport height on resize -- I chatGPTd this :)
  useEffect(() => {
    const updateHeight = () => setViewportHeight(window.innerHeight);
    window.addEventListener("resize", updateHeight);

    // Set z-index of bottle-top 
    if (beerRef.current) {
      const beerTop = beerRef.current.querySelector("#bottle-top") as SVGElement | null;
      if (beerTop) {
        beerTop.style.zIndex = "1000";
      }
    }

    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  return (
    <>
      <Mouth scrollY={scrollY} viewportHeight={viewportHeight} />
      <AboutSection scrollY={scrollY} viewportHeight={viewportHeight} />

      <div style={{ height: 2 * viewportHeight }} />

      <div className="content">
        <div className="lhs-content">
          <BottleAndGuy
            ref={beerRef}
            className="beer-image" />
          <DropletAnimation />
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
