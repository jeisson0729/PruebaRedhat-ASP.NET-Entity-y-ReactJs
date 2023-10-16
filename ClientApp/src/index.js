import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App"

//vamos a crear un root / elemento raiz donde deseamos que se
//renderize / pinte nuestros componentes
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <App />
)
