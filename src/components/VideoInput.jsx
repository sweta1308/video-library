import WaveSurfer from "wavesurfer.js";
import { useVideo } from "../context/VideoContext";
import { Video } from "./Video";

export const VideoInput = () => {
  const { videoState, setVideoState, setWavesurfer, wavesurfer } = useVideo();

  const handleChange = (e) => {
    const video = e.target.files?.[0];
    if (video) {
      const videoUrl = URL.createObjectURL(video);
      setVideoState({ ...videoState, videoUrl, isPlaying: false });

      const surfer = WaveSurfer.create({
        container: "#waveform",
        waveColor: "#c084fc",
        progressColor: "#a855f7",
      });
      surfer.load(videoUrl);
      setWavesurfer({ ...wavesurfer, surfer });
    }
  };

  return (
    <>
      <div className="mb-[30px] text-[20px] flex flex-col items-center">
        <input
          type="file"
          accept="video/*"
          onChange={handleChange}
          className="block mx-auto w-[300px] mb-[30px] text-md text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-[16px] file:font-bold file:bg-purple-100 file:text-purple-700 file:cursor-pointer hover:file:bg-purple-200"
        />
        <Video />
        <h3 className="font-extrabold underline">Audio Waveform</h3>
        <div
          className="border-2 border-gray-400 w-full m-5 rounded-sm"
          id="waveform"
        ></div>
      </div>
    </>
  );
};
