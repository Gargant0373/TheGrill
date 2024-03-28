import { useEffect, useState } from "react";
import "../styles/Countdown.css";

function CountDown() {
    const eventDate = new Date(2024, 4, 1, 15);

    const [timeLeft, setTimeLeft] = useState(getTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(getTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    function getTimeLeft() {
        const now = new Date();
        const diff = eventDate.getTime() - now.getTime();

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        return { days, hours, minutes, seconds };
    }

    return (
        <div className="countdown">
            <CountdownText {...timeLeft} />
        </div>
    );
}

function CountdownText(props: { days: number, hours: number, minutes: number, seconds: number }) {
    const renderNode = (value: number, label: string) => (
        <div className="inner">
            <div className="node top">{value}</div>
            <div className="node bot">{label}</div>
        </div>
    );

    return (
        <div className="outer secondary bold">
            {renderNode(props.days, 'days')}
            {renderNode(props.hours, 'hours')}
            {renderNode(props.minutes, 'minutes')}
            {renderNode(props.seconds, 'seconds')}
        </div>
    );
}

export default CountDown;
