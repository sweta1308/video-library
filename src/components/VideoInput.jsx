import { useVideo } from "../context/VideoContext";

export const VideoInput = () => {
  const { videoState, setVideoState } = useVideo();

  const handleChange = (e) => {
    const video = e.target.files?.[0];
    if (video) {
      const videoUrl = URL.createObjectURL(video);
      setVideoState({ ...videoState, videoUrl, isPlaying: false });
    }
  };

  return (
    <>
      <div className="mb-[30px] text-[20px]">
        <input
          type="file"
          accept="video/*"
          onChange={handleChange}
          className="block w-full text-md text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-[16px] file:font-bold file:bg-purple-50 file:text-purple-700 file:cursor-pointer hover:file:bg-purple-100"
        />
      </div>
    </>
  );
};
