import { MuteButton } from "./MusicButton.styles.ts";
import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import oppenheimerMP3 from "../../assets/oppenheimer.mp3";
import { useMusicButton } from "../../hooks/useMusicButton.ts";

export const MusicButton = () => {
  const { muted, toggleMute, audioRef, audioSrc } =
    useMusicButton(oppenheimerMP3);

  return (
    <>
      <audio ref={audioRef} loop>
        <source src={audioSrc} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>

      <MuteButton onClick={toggleMute}>
        <h2>Click this button!</h2>
        {muted ? <FaVolumeMute size={24} /> : <FaVolumeUp size={24} />}
      </MuteButton>
    </>
  );
};
