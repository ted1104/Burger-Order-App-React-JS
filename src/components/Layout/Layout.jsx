import React from "react";
import Aux from "../../hoc/Auxiliaire";
import classe from "./Layout.module.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/NavigationItems/SideDrawe/SideDrawe";

const layout = (props) => (
  <Aux>
    <Toolbar />
    <SideDrawer />
    <main className={classe.content}>{props.children}</main>
  </Aux>
);

export default layout;
