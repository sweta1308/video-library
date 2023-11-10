import { useEffect, useRef } from "react";
import { Pause, PlayArrow } from "@mui/icons-material";
import { useVideo } from "../context/VideoContext";

export const Video = () => {
  const { videoState, setVideoState, setWavesurfer, wavesurfer } = useVideo();

  const videoEl = useRef();
  const canvasEl = useRef();

  const handlePlay = () => {
    const video = videoEl.current;
    if (videoState.isPlaying) {
      video.pause();
      setVideoState({ ...videoState, isPlaying: false });
    } else {
      video.play();
      setVideoState({ ...videoState, isPlaying: true });
    }
  };

  const updateCanvas = () => {
    const ctx = canvasEl?.current?.getContext("2d");
    ctx.drawImage(
      videoEl?.current,
      0,
      0,
      canvasEl?.current?.width,
      canvasEl?.current?.height
    );
    if (!videoState.isPlaying) return;
    requestAnimationFrame(updateCanvas);
  };

  useEffect(() => {
    const videoRef = videoEl?.current;

    const handleMetadata = (e) => {
      setVideoState({
        ...videoState,
        duration: e.target.duration,
      });

      setWavesurfer({
        ...wavesurfer,
        hasAudio:
          e.target.mozHasAudio ||
          Boolean(e.target.webkitAudioDecodedByteCount) ||
          Boolean(e.target.audioTracks && e.target.audioTracks.length > 0),
      });
    };

    const updateCanvas = () => {
      const ctx = canvasEl?.current?.getContext("2d");
      ctx?.drawImage(
        videoEl?.current,
        0,
        0,
        canvasEl?.current?.width,
        canvasEl?.current?.height
      );
      if (!videoState.isPlaying) return;
      requestAnimationFrame(updateCanvas);
    };

    updateCanvas();

    if (videoState.videoUrl) {
      videoRef.src = videoState.videoUrl;
      videoRef.addEventListener("loadedmetadata", handleMetadata);
    }

    return () => {
      if (videoRef) {
        videoRef.removeEventListener("loadedmetadata", handleMetadata);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoState.videoUrl]);

  return (
    <>
      <div>
        {videoState.videoUrl ? (
          <div>
            <div className="relative">
              <canvas
                ref={canvasEl}
                width={videoEl?.current?.videoWidth}
                height={videoEl?.current?.videoHeight}
                className="bg-black"
              />
              <video
                ref={videoEl}
                src={videoState.videoUrl}
                onPlay={updateCanvas}
                className="hidden"
              />
              <button
                onClick={handlePlay}
                className="absolute z-20 top-0 bottom-0 left-0 right-0"
              >
                {videoState.isPlaying ? (
                  <div className="bg-white w-[100px] mx-auto opacity-50 rounded-xl hover:bg-gray-300 hover:opacity-70">
                    <Pause sx={{ fontSize: 70 }} />
                  </div>
                ) : (
                  <div className="bg-white w-[100px] mx-auto opacity-50 rounded-xl hover:bg-gray-300 hover:opacity-70">
                    <PlayArrow sx={{ fontSize: 70 }} />
                  </div>
                )}
              </button>
            </div>

            <p className="text-[22px] text-center my-[40px]">
              <span className="font-bold">Duration:</span>{" "}
              {videoState.duration ? videoState.duration.toFixed() : "-"}{" "}
              seconds
            </p>
            <h3 className="font-extrabold underline text-center">Audio Waveform</h3>
          </div>
        ) : (
          <h2 className="text-[32px] text-center font-semibold my-[20px] mb-[50px]">
            Select a video to continue
          </h2>
        )}
      </div>
    </>
  );
};
