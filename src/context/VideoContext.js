import { createContext, useContext, useState } from "react";

const VideoContext = createContext();

export const VideoProvider = ({ children }) => {
  const [videoState, setVideoState] = useState({
    videoUrl: "",
    isPlaying: false,
    duration: 0,
    currentTime: 0
  });

  const value = { videoState, setVideoState };

  return (
    <VideoContext.Provider value={value}>{children}</VideoContext.Provider>
  );
};

export const useVideo = () => useContext(VideoContext);
