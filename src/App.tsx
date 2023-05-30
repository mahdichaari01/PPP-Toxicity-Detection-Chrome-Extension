import { useEffect, useState } from "react";
import { getThreshold, setThreshold as setStorageThreshold } from "./Common/PersistedValues/Threshold";
import "./assets/css/App.css";
function App() {
  const [threshold, setThreshold] = useState(75);
  const [text, setText] = useState<string>("");
  useEffect(() => {
    getThreshold().then((x) => setThreshold(x));
  }, []);
  useEffect(() => {
    setStorageThreshold(threshold);
  }, [threshold]);
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div>
        Welcome to <span>Levitate</span>
      </div>

      <div>
        change threshold
        <input
          type="range"
          min="1"
          max="100"
          value={threshold}
          onChange={(e) => { setThreshold(Number(e.target.value))}}
          className="slider"
          id="myRange"
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="enter a word"
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
        <button>add</button>
      </div>
    </div>
  );
}

export default App;
