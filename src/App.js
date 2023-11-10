import "./App.css";
import { VideoInput } from "./components/VideoInput";

function App() {
  return (
    <div className="App flex flex-col items-center bg-purple-50 min-h-screen">
      <h1 className="text-center text-[44px] font-extrabold my-[30px] text-purple-700">
        Video Library
      </h1>
      <VideoInput />
    </div>
  );
}

export default App;
