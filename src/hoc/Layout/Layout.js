import React, { Component } from 'react';
import Aux from '../Aux/Aux';
import './layout.css';
import { connect } from 'react-redux';
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
        <Toolbar authenticate={this.props.authenticated} drawerToggleClicked={this.drawerToggleClickedHandler} />
        <SideDrawer show={this.state.showsidedrawer} closed={this.sideDrawerClosedHandler}></SideDrawer>
        <main className="content">{this.props.children}</main>
      </Aux>
    );
  }
}
const mapStateToProps = state => {
  return {
    authenticated: state.auth.token
  }
}

export default connect(mapStateToProps)(Layout);