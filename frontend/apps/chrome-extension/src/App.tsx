// import { useState } from 'react'
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
const changeColorOnClick = async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id! },
    func: () => {
      document.body.style.backgroundColor = "green";
    },
  });
};
function App() {
  // const [count, setCount] = useState(0)
  // const onClick = async () => {
  //   let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  //   chrome.scripting.executeScript({
  //     target: { tabId: tab.id! },
  //     func: () => {
  //       document.body.style.backgroundColor = "green";
  //     },
  //   });
  // };
  return (
    <>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => changeColorOnClick()}>Change Color</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  );
}

export default App;
