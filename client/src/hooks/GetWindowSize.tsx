import { useEffect, useState } from 'react';

export default function GetWindowSize() {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);

    useEffect(() => {
        window.addEventListener('resize', () => {
          setWindowWidth(window.innerWidth);
        });
        window.addEventListener('resize', () => {
          setWindowHeight(window.innerHeight);
        });
    });

    return { windowWidth, windowHeight};
}