import { useEffect, useState } from 'react';
import './App.css';
import EventMap from './components/EventMap';
import Rules from './components/Guidelines';
import { motion, useScroll, useTransform, useSpring } from "framer-motion"

function App() {

  const { scrollY } = useScroll();
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);

  // Update viewport height on resize -- I chatGPTd this :)
  useEffect(() => {
    const updateHeight = () => setViewportHeight(window.innerHeight);
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  // TODO this is very taxing for the cpu :') idk what to do abt it
  const topLipOffset = useTransform(scrollY, [0, viewportHeight], [0, -0.01 * viewportHeight])
  const bottomLipOffset = useTransform(scrollY, [0, viewportHeight], [0, -1.65 * viewportHeight])
  //  const lipOpacity = useTransform(scrollY, [0, 1 * viewportHeight], [1, 1])
  const lipTransitionOpacity = useTransform(scrollY, [0, 0.5 * viewportHeight], [0.8, 0])
  const roofOffset = useTransform(scrollY, [0, viewportHeight], [0, viewportHeight])
  const infoScale = useTransform(scrollY, [0, viewportHeight], [1, 1.1])
  const mouthScale = useTransform(scrollY, [0, viewportHeight], [1, 1.3])

  const smoothedTopLipOffset = useSpring(topLipOffset, { stiffness: 5, damping: 10 });
  const smoothedBottomLipOffset = useSpring(bottomLipOffset, { stiffness: 100, damping: 20 });
  const smoothedRoofOffset = useSpring(roofOffset, { stiffness: 800, damping: 100 });
  const smoothedMouthScale = useSpring(mouthScale, { stiffness: 800, damping: 30 })
  const smoothedInfoScale = useSpring(infoScale, { stiffness: 1000, damping: 50 })

  // Function to scroll smoothly to 100vh - chatGPT
  const scrollTo100vh = () => {
    //    animate(scrollY, 2 * viewportHeight, { type: "tween", duration: 0.8, ease: "easeInOut" });
    window.scrollTo({ top: viewportHeight, behavior: "smooth" });
  };

  // Make mouth dissapear completely instead of fading, cause it makes the mouth opening look nicer
  // TODO this does cause some visual glitches when scrolling really fast
  const [isMouthVisible, setIsMouthVisible] = useState(true);
  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      setIsMouthVisible(latest < 1.1 * viewportHeight);
    });

    return () => unsubscribe();
  }, [scrollY, viewportHeight]);

  return (
    <>

      <div className="start-page" style={{ height: '250vh' }} >
        <motion.button
          onClick={scrollTo100vh}
          style={{
            position: "fixed",
            top: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            padding: "10px 20px",
            background: "black",
            color: "white",
            border: "none",
            cursor: "pointer",
            zIndex: 10,
            borderRadius: "5px",
            opacity: lipTransitionOpacity
          }}
        >
          Scroll to 100vh
        </motion.button>

        {isMouthVisible && (
          <>
            <motion.div
              className="mouth"
              style={{ position: 'absolute', width: '100%', height: '100vh', zIndex: 5, scale: smoothedMouthScale }}
            >
              <motion.img
                className="upper"
                src="./assets/toplip.png"
                alt="Top lip of The Grill Master"
                style={{ width: '100%', position: 'absolute', zIndex: 5, top: smoothedTopLipOffset }}
              />
              <motion.img
                className="lower"
                src="./assets/downlip.png"
                alt="Bottom lip of The Grill Master"
                style={{ width: '100%', position: 'absolute', zIndex: 4, bottom: smoothedBottomLipOffset }}
              />
              <motion.div
                className="mouth-transition"
                style={{ zIndex: 3, position: 'absolute', width: '100%', height: '100vh', opacity: lipTransitionOpacity, backgroundColor: 'black' }}
              />
            </motion.div>
          </>
        )}
        <motion.div className="info-section" style={{ zIndex: 1, position: 'absolute', width: '100%', top: smoothedRoofOffset, scale: smoothedInfoScale }}>
          <motion.img
            src="./assets/insidemouth.png"
            alt="Inside of The Grill Master's mouth"
            style={{ position: 'absolute', width: '100%' }}
          />
          <motion.div
            className="content"
            style={{ zIndex: 2, position: 'absolute', width: '100%', transform: 'translateY(50%)'}}
          >
            <h1>Here's what you need to know!</h1>
            <p>On May 1st, we feast for the 5th time at Delftse Hout.</p>
            <p>The fire will char the meat, and the mere sight of beer will make us salivate.</p>
            <p>Bring your grill, your food, your fire, but most importantly, your thirst.</p>
            <p>If you don’t feed the flames, the flames won’t feed you!</p>
         </motion.div>
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
    </>
  )
}

export default App
