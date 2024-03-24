import { useEffect, useState } from "react";

function CountDown() {
    const eventDate = new Date();
    eventDate.setFullYear(2024);
    eventDate.setMonth(5);
    eventDate.setDate(1);
    eventDate.setHours(15);

    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const diff = eventDate.getTime() - now.getTime();

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            setDays(days);
            setHours(hours);
            setMinutes(minutes);
            setSeconds(seconds);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <div>The time left is: {days} days, {hours} hours, {minutes} minutes, {seconds} seconds.</div>

        </>
    );
}

export default CountDown;
