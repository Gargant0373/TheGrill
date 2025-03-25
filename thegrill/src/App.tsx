import { useEffect, useState } from 'react';
import './App.css';
import './Mouth.css';
import EventMap from './components/EventMap';
import Rules from './components/Guidelines';

function App() {

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
      <div
        className="mouth"
        style={{ opacity: 1 - lipProgress, transition: "opacity 0.5s ease" }}
      >
        <div className="upper">
          <img
            src="./assets/toplip.png"
            alt="Top lip of The Grill Master"
            style={{ transform: `translateY(-${scrollOffset}px)` }}
          />
        </div>
        <div className="lower">
          <img
            src="./assets/downlip.png"
            alt="Down lip of The Grill Master"
            style={{ transform: `translateY(${scrollOffset}px)` }}
          />
        </div>
      </div>
      <div className="content">
        <img
          src="./assets/insidemouth.png"
          alt="Inside of The Grill Master's mouth"
          style={{ opacity: contentFadeProgress, transition: "opacity 0.5s ease" }}
        />
        <h1>ABOUT THE GRILL!</h1>
        <p>On May 1st, we feast for the 5th time at Delftse Hout.</p>
        <p>The fire will char the meat, and the mere sight of beer will make us salivate.</p>
        <p>Bring your grill, your food, your fire, but most importantly, your thirst.</p>
        <p>If you don’t feed the flames, the flames won’t feed you!</p>
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
