import { useState, useEffect } from 'react';

const frames = [
    './assets/droplet/DespanBereDroplet0001.svg',
    './assets/droplet/DespanBereDroplet0002.svg',
    './assets/droplet/DespanBereDroplet0003.svg',
    './assets/droplet/DespanBereDroplet0004.svg',
    './assets/droplet/DespanBereDroplet0005.svg',
    './assets/droplet/DespanBereDroplet0006.svg',
    './assets/droplet/DespanBereDroplet0007.svg',
    './assets/droplet/DespanBereDroplet0008.svg',
];

const FRAME_INTERVAL = 150; // milliseconds

export default function DropletAnimation() {
    const [currentFrame, setCurrentFrame] = useState(0);

    useEffect(() => {
        frames.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentFrame(prev => (prev + 1) % frames.length);
        }, FRAME_INTERVAL);
        return () => clearInterval(interval);
    }, []);

    return <img src={frames[currentFrame]} alt="Animated droplet" className="beer-drop" />;
}