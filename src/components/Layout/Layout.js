import React from 'react';
import Aux from '../../hoc/Aux';
import './layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
const layout = (props) => {
  return (
  <Aux>
    <div>Toolbar , SideDrawer and Backdrop</div>
    <Toolbar></Toolbar>
    <SideDrawer></SideDrawer>
    <main className="content">{props.children}</main>
  </Aux>
  );
}
export default layout;