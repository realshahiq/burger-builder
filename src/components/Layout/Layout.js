import React from 'react';
import Aux from '../../hoc/Aux';
import './layout.css';
const layout = (props) => {
  return (
  <Aux>
    <div>Toolbar , SideDrawer and Backdrop</div>
    <main className="content">{props.children}</main>
  </Aux>
  );
}
export default layout;