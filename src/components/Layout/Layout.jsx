import React from "react";
import Aux from "../../hoc/Auxiliaire";
import classe from "./Layout.module.css";

const layout = (props) => (
  <Aux>
    <div>Toolbar, SideBar, Backdrop</div>
    <main className={classe.content}>{props.children}</main>
  </Aux>
);

export default layout;
