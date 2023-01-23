import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import "toastr/build/toastr.min.css";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <a className="moar-tools" href="https://ronkiro.github.io/tools" target="__blank">
      <div>
        <div>
          <i className="fa fa-bolt"></i>
        </div>
        <div>More Tools!</div>
      </div>
    </a>

    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
