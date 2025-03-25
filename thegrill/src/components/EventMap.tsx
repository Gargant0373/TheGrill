import "./EventMap.css";

function EventMap() {
    return (<>
        <div className="map">
            <h1>LOCATION</h1>
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d78565.40670640864!2d4.231897197265621!3d52.02201960000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c5b531460f260b%3A0x2e7f2d9b4e705156!2sPark%20Delftse%20Hout!5e0!3m2!1sro!2snl!4v1742151280530!5m2!1sro!2snl"
                width="100%"
                height="300em"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade">
            </iframe>
        </div>
    </>);
}

export default EventMap;
