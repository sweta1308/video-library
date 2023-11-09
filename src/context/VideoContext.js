import { createContext, useContext, useRef, useState } from "react";

const VideoContext = createContext();

export const VideoProvider = ({ children }) => {
  const [videoState, setVideoState] = useState({
    videoUrl: "",
    isPlaying: false,
    duration: 0,
    currentTime: 0
  });

  const videoEl = useRef();
  const canvasEl = useRef()

  const value = { videoState, setVideoState, videoEl, canvasEl };

  return (
    <VideoContext.Provider value={value}>{children}</VideoContext.Provider>
  );
};

export const useVideo = () => useContext(VideoContext);
