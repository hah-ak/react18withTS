import ReactDom from "react-dom";
import React from "react";
import { App } from "./App";
import axios from "axios";

const rootElement:Element = document.querySelector("#root")!;
const root = ReactDom.createRoot(rootElement);
axios.defaults.baseURL = "http://localhost:8085"
root.render(<App/>)