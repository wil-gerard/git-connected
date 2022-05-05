import { useEffect, useState } from 'react';

export default function GetWindowSize() {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        window.addEventListener('resize', (event) => {
          setWindowWidth(window.innerWidth);
        });
    });

    return windowWidth;
}