import { useEffect, useRef } from "react";
import { useVideo } from "../context/VideoContext";
import { Pause, PlayArrow } from "@mui/icons-material";

export const Video = () => {
  const { videoState, setVideoState } = useVideo();
  const videoEl = useRef();
  const canvasEl = useRef();

  const togglePlay = () => {
    const video = videoEl.current;
    if (videoState.isPlaying) {
      video.pause();
      setVideoState({ ...videoState, isPlaying: false });
    } else {
      video.play();
      setVideoState({ ...videoState, isPlaying: true });
    }
  };

  useEffect(() => {
    const video = videoEl?.current;
    const ctx = canvasEl?.current?.getContext("2d");

    video?.addEventListener("loadedmetadata", () =>
      setVideoState({ ...videoState, duration: video.duration })
    );
    video?.addEventListener("timeupdate", () =>
      setVideoState({ videoState, currentTime: video.currentTime })
    );

    const drawFrame = () => {
      ctx?.drawImage(
        video,
        0,
        0,
        canvasEl?.current?.width,
        canvasEl?.current?.height
      );
      requestAnimationFrame(drawFrame);
    };

    drawFrame();

    return () => {
      video?.removeEventListener("loadedmetadata", () =>
        setVideoState({ ...videoState, duration: video.duration })
      );
      video?.removeEventListener("timeupdate", () =>
        setVideoState({ videoState, currentTime: video.currentTime })
      );
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div>
        {videoState.videoUrl ? (
          <div>
            <div className="relative">
              <video
                ref={videoEl}
                src={videoState.videoUrl}
                className="w-[1000px] h-[500px]"
              />
              <canvas ref={canvasEl} />
              <button
                onClick={togglePlay}
                className="absolute z-20 top-0 bottom-0 left-0 right-0"
              >
                {videoState.isPlaying ? (
                  <div className="bg-white w-[60px] mx-auto mb-[100px] opacity-50 rounded-md hover:bg-gray-300 hover:opacity-70">
                    <Pause sx={{ fontSize: 50 }} />
                  </div>
                ) : (
                  <div className="bg-white w-[60px] mx-auto mb-[100px] opacity-50 rounded-md hover:bg-gray-300 hover:opacity-70">
                    <PlayArrow sx={{ fontSize: 50 }} />
                  </div>
                )}
              </button>
            </div>

            <p className="text-[22px] text-center my-[40px]">
              <span className="font-bold">Duration:</span>{" "}
              {videoEl?.current?.duration.toFixed()} seconds
            </p>
          </div>
        ) : (
          <h2 className="text-[32px] font-semibold">No video selected!</h2>
        )}
      </div>
    </>
  );
};
