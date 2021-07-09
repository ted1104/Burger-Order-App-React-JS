import React from "react";
import Aux from "../../hoc/Auxiliaire";

const layout = (props) => (
  <Aux>
    <div>Toolbar, SideBar, Backdrop</div>
    <main>{props.children}</main>
  </Aux>
);

export default layout;
