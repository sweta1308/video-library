import { createContext, useContext, useState } from "react";

const VideoContext = createContext();

export const VideoProvider = ({ children }) => {
  const [videoState, setVideoState] = useState({
    videoUrl: "",
    isPlaying: false,
    duration: null,
  });

  const [wavesurfer, setWavesurfer] = useState({
    surfer: null,
    hasAudio: true,
  });

  const value = { videoState, setVideoState, wavesurfer, setWavesurfer };

  return (
    <VideoContext.Provider value={value}>{children}</VideoContext.Provider>
  );
};

export const useVideo = () => useContext(VideoContext);
