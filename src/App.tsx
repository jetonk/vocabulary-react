import { useState, useRef, ChangeEventHandler } from "react";
import { API_URL } from "./config";
import "./App.css";

function App() {
  const search = useRef("");
  const [results, setResults] = useState<object>({});
  const [error, setError] = useState<string>("");

  const handleSearch: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    setError("");
    search.current = event.target.value;
  };

  const submitData = async () => {
    if (search.current === "") {
      setError("Search term is required.");
      return;
    }
    const response = await fetch(`${API_URL}?search=${search.current}`);
    if (response.status === 200) {
      const data = await response.json();
      setResults(data);
    }
  };

  const notFound = Object.keys(results).length === 0 && search.current !== "";

  return (
    <div className="container">
      <div className="form">
        <label>Input Text</label>
        <textarea rows={6} className="inputText" onChange={handleSearch} />
        <label className="error">{error}</label>
      </div>
      <div className="form">
        <label>Results</label>
        <div className="results">
          {Object.entries(results).map(([key, value]) => (
            <li key={key}>
              {key}: {value}
            </li>
          ))}
          {notFound && <li>Not found..</li>}
        </div>
      </div>
      <div className="buttonContainer">
        <button className="button" onClick={submitData}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default App;
