import React from "react";
import Aux from "../../hoc/Auxiliaire";
import classe from "./Layout.module.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";

const layout = (props) => (
  <Aux>
    <Toolbar />
    <main className={classe.content}>{props.children}</main>
  </Aux>
);

export default layout;
