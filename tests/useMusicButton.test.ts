import { renderHook, act } from '@testing-library/react-hooks';
import { useMusicButton } from '../src/hooks/useMusicButton';

describe('useMusicButton', () => {
    const audioSrc = 'test-audio.mp3';

    it('initializes with muted state', () => {
        const { result } = renderHook(() => useMusicButton(audioSrc));
        expect(result.current.muted).toBe(true);
    });

    it('toggles mute state', () => {
        const { result } = renderHook(() => useMusicButton(audioSrc));
        expect(result.current.muted).toBe(true);

        act(() => {
            result.current.toggleMute();
        });
        expect(result.current.muted).toBe(false);
    });

    it('audio element ref is initialized', () => {
        const { result } = renderHook(() => useMusicButton(audioSrc));
        act(() => {
            setTimeout(() => {
                expect(result.current.audioRef.current).not.toBeNull();
            }, 1000);
        });
    });
});
