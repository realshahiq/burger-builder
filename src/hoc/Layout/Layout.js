import React, { Component } from 'react';
import Aux from '../Aux/Aux';
import './layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
class Layout extends Component {
  state = {
    showsidedrawer: false,
  }
  sideDrawerClosedHandler = () => {
    this.setState({ showsidedrawer: false });
  }
  drawerToggleClickedHandler = () => {
    this.setState((prevState) => {
      return { showsidedrawer: !prevState.showsidedrawer }
    });
  }
  render() {
    return (
      <Aux>
        <Toolbar drawerToggleClicked={this.drawerToggleClickedHandler}/>
        <SideDrawer show={this.state.showsidedrawer} closed={this.sideDrawerClosedHandler}></SideDrawer>
        <main className="content">{this.props.children}</main>
      </Aux>
    );
  }
}
export default Layout;