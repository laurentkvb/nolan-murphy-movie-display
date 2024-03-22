import { useState, useRef } from 'react';

export const useMusicButton = (audioSrc: string) => {
    const [muted, setMuted] = useState(true);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const toggleMute = () => {
        setMuted(!muted);
        if (audioRef.current) {
            if (muted) {
                audioRef.current?.play();
            } else {
                audioRef.current?.pause();
            }
        }
    };

    return { muted, toggleMute, audioRef, audioSrc };
};
