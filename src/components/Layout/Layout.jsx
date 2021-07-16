import React, { Component } from "react";
import Aux from "../../hoc/Auxiliaire";
import classe from "./Layout.module.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/NavigationItems/SideDrawe/SideDrawe";

class Layout extends Component {
  state = {
    showSideDrawer: true,
  };
  _sideDrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false });
  };
  render() {
    return (
      <Aux>
        <Toolbar />
        <SideDrawer
          closed={this._sideDrawerClosedHandler}
          open={this.state.showSideDrawer}
        />
        <main className={classe.content}>{this.props.children}</main>
      </Aux>
    );
  }
}

export default Layout;
