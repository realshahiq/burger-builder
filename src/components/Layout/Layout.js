import React from 'react';
import Aux from '../../hoc/Aux';
import './layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
const layout = (props) => {
  return (
  <Aux>
    <div>Toolbar , SideDrawer and Backdrop</div>
    <Toolbar></Toolbar>
    <main className="content">{props.children}</main>
  </Aux>
  );
}
export default layout;