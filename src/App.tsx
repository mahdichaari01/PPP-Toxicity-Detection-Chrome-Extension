import { useEffect, useMemo, useState } from "react";
import {
  getThreshold,
  setThreshold as setStorageThreshold,
} from "./Common/PersistedValues/Threshold";
import "./assets/css/App.css";
import { FakeBackendFactory, BackendFactory } from "./Common/Backend";
function App() {
  const [threshold, setThreshold] = useState(75);
  const [text, setText] = useState<string>("");
  const [toxicity, setToxicity] = useState<number>(-1);
  const Backend = useMemo(
    () =>
      BackendFactory<
        { id: string; content: string }[],
        { id: string; result: number }[]
      >(
        "https://64qpd7ydus2yhhv4yvmnlrw35y0unhuj.lambda-url.us-east-1.on.aws/"
      ),
    []
  );
  const [loading, setLoading] = useState(false);
  const handleUserInput = () => {
    if (text.length === 0) return;
    setLoading(true);
    Backend.sendMessage([{ id: text, content: text }]).then((x) => {
      setLoading(false);
      setToxicity((x as any)[0].result);
    });
  };
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
          onChange={(e) => {
            setThreshold(Number(e.target.value));
          }}
          className="slider"
          id="myRange"
        />
        <span>{toxicity === -1 ? "" : toxicity}</span>
      </div>
      <div>
        <input
          type="text"
          disabled={loading}
          placeholder="enter a word"
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
        <button onClick={handleUserInput}>add</button>
      </div>
    </div>
  );
}

export default App;
