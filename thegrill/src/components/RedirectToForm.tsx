import { useEffect } from 'react';

function RedirectToForm() {
    useEffect(() => {
        window.location.href = "https://docs.google.com/forms/d/e/1FAIpQLSe_KxWWJYUbdxlWC6I2mu9aPuc0GR6jcplxlg0y5p0DKsz-ew/viewform";
    }, []);

    return <>
        <h1 style={{
            marginLeft: 'auto', marginRight: 'auto'
        }}>REDIRECTING...</h1>
    </>
}

export default RedirectToForm;