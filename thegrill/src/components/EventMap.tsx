import "./EventMap.css";

function EventMap() {
    return (<>
        <div className="map">
            <h1>LOCATION</h1>
            <iframe
                width="100%"
                src="https://www.google.com/maps/embed?pb=!1m21!1m12!1m3!1d146.06180812122417!2d4.381849020458697!3d52.02005098552107!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m6!3e6!4m0!4m3!3m2!1d52.02005820686467!2d4.381998553612656!5e1!3m2!1sro!2snl!4v1746032547216!5m2!1sro!2snl"
                height="300em"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade">
            </iframe>
        </div>
    </>);
}

export default EventMap;
