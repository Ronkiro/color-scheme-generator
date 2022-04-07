import Header from "./components/Header";
import Description from "./components/Description";
import ColorMap from "./components/ColorMap";
import "./App.scss";
import ColorScheme from "color-scheme";
import { useEffect, useState } from "react";
import cConvert from "color-convert";
import copyToClipboard from "./utils/copy";
import Footer from "./components/Footer";
import Toastr from 'toastr';

const App = () => {
  const [hexs, setHexs] = useState([]);
  const [colorNames, setColorNames] = useState([]);
  const [convertedColors, setConvertedColors] = useState([]);
  const [copied, setCopied] = useState(false);

  const [clicked, setClicked] = useState(-1);

  const cbCopy = () => {
    copyToClipboard(hexs[clicked]).then(
      () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      },
      () => {
        setCopied(false);
      }
    );
  };

  const newColorScheme = (tryToRecover=false) => {
    let hue; 
    let getNewHue = true;
    if (tryToRecover) {
      hue = window.localStorage.getItem("hue")
      if (hue) {
        getNewHue = false;
        Toastr.success("We have recovered your last schema.", "Recovered!", {
          timeOut: 3000,
          progressBar: true,
          closeButton: true,
        });
      }
    }

    if (getNewHue) {
      hue = Math.floor(Math.random() * 256);
      window.localStorage.setItem("hue", hue);
    }

    const scheme = new ColorScheme();
    scheme
      .from_hue(hue) // Start the scheme
      .scheme("tetrade")
      .variation("soft"); // Use the 'soft' color variation
    setHexs(scheme.colors());

    if (!tryToRecover) {
      Toastr.success("New schema generated.", "Generated!", {
        timeOut: 3000,
        progressBar: true,
        closeButton: true,
        preventDuplicates: true,
      });
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    newColorScheme(true);
  }, []);

  useEffect(() => {
    // Do naming conversion
    const _colorNames = [];
    const _colorConvert = [];

    hexs.forEach((hex) => {
      _colorNames.push(window.ntc.name("#" + hex)[1]);
      _colorConvert.push({
        hsl: cConvert.hex.hsl(hex),
        rgb: cConvert.hex.rgb(hex),
        cmyk: cConvert.hex.cmyk(hex),
        hsv: cConvert.hex.hsv(hex),
        hwb: cConvert.hex.hwb(hex),
        ansi16: cConvert.hex.ansi16(hex),
      });
    });

    setConvertedColors(_colorConvert);
    setColorNames(_colorNames);
  }, [hexs]);

  return (
    <>
    <div className="App">
      <Header />
      <Description />

      <div className="colors">
        {hexs.map((rgb, index) => (
          <ColorMap
            key={index}
            showBorder={clicked === index}
            onClick={() => setClicked(index)}
            bgColor={rgb}
          />
        ))}
      </div>
      <div><button className="copy auto" onClick={() => newColorScheme()}>&#62; Generate new color scheme &#60;</button></div>
      {clicked < 0 && <p>Click above to get color information.</p>}
      {clicked >= 0 && (
        <div className="descript">
          <div>
            <p>
              Color <b>{colorNames[clicked]}</b>
            </p>
            <p>
              <b>HEX:</b> #{hexs[clicked]}
              <br />
              <b>HSL:</b> {convertedColors[clicked].hsl.join(', ')}
              <br />
              <b>RGB:</b> {convertedColors[clicked].rgb.join(', ')}
              <br />
              <b>CMYK:</b> {convertedColors[clicked].cmyk.join(', ')}
              <br />
              <b>HSV:</b> {convertedColors[clicked].hsv.join(', ')}
              <br />
            </p>
          </div>
          <div className="copy-ctn">
            <button
              className="copy"
              onClick={() => cbCopy(`#${hexs[clicked]}`)}
            >
              {copied ? "Copied!" : "Copy HEX to Clipboard"}
            </button>
          </div>
        </div>
      )}
    </div>
    <Footer />
    </>
  );
};

export default App;
