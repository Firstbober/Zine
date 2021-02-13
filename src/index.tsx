/*
import { Renderer } from "@nodegui/react-nodegui";
import React from "react";
import App from "./ui/app";

process.title = "Zine";
Renderer.render(<App />);

// This is for hot reloading (this will be stripped off in production by webpack)
if (module.hot) {
  module.hot.accept(["./ui/app"], function() {
    Renderer.forceUpdate();
  });
}
*/

import Backends from "./backends/backends";
const backends = new Backends();