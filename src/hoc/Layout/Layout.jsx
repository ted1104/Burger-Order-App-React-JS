import React, { Component } from "react";
import Aux from "./../Auxiliaire/Auxiliaire";
import classe from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/NavigationItems/SideDrawer/SideDrawer";

class Layout extends Component {
  state = {
    showSideDrawer: false,
  };
  _sideDrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false });
  };
  _sideDrawerOpenHandler = () => {
    this.setState((prevState) => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };
  render() {
    return (
      <Aux>
        <Toolbar drawerClicked={this._sideDrawerOpenHandler} />
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
