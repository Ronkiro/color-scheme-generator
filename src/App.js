import Header from "./components/Header";
import Description from "./components/Description";
import ColorMap from "./components/ColorMap";
import "./App.scss";

import { useEffect, useState } from "react";

const App = () => {
  const [rgbs, setRgbs] = useState([]);
  const [clicked, setClicked] = useState(-1);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    const payload = { model: "default" };

    const results = await fetch("http://colormind.io/api/", {
      method: "POST",
      body: JSON.stringify(payload),
    })
      .then((r) => r.json())
      .then((r) => r.result);
    setRgbs(results);
  }, []);

  return (
    <div className="App">
      <Header />
      <Description />

      <div className="colors">
        {rgbs.map((rgb, index) => (
          <ColorMap showBorder={clicked === index} onClick={() => setClicked(index)} bgColor={rgb} />
        ))}
      </div>
      {clicked >= 0 && <div>
        <p>Color information:</p>
        <p><b>RGB:</b> ({rgbs[clicked].join(",")})</p>
      </div>}
    </div>
  );
};

export default App;
