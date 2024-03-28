import { useEffect, useRef } from 'react'
import '../styles/GodRays.scss'
function GodRays() {
    //make a scroll event listener that changes:
    // the opacity of the rays (a little bit)
    // the deg of the gradient
    // the blur of the gradient
    const rayDiv = useRef<HTMLDivElement>(null)
    const rayContainer = useRef<HTMLDivElement>(null)
    const handleScroll = () => {
        const scroll = window.scrollY;
        let deg = 100 + (scroll / 75);
        rayContainer.current?.style.setProperty('--gradientDeg', `${deg}deg`);
    }
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, [])
    return (
        <div  ref={rayContainer} className='raysContainer'>
            <div ref={rayDiv} className="rayDiv"></div>
        </div>
    )
}

export default GodRays