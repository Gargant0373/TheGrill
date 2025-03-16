import { useState, useEffect } from 'react';
import './App.css'

function App() {

  const lipThreshold = 500;
  const contentFadeStart = 600;
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
        <p>Lorem ipsum dolores mama masii </p>
        <p>Consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.</p>
        <p>Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris.</p>
        <p>Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla.</p>
        <p>Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
      </div>
    </>
  )
}

export default App
