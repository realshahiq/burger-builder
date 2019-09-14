import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Logout/Logout';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionCreatorAuth from './store/actions/auth';
class App extends Component {
  componentDidMount() {
    this.props.onCheckAuthState();
  }
  render() {
    let routes = '';
    if (this.props.isAuthenticated) {
      routes = <Switch>
        <Route path="/checkout" component={Checkout} />
        <Route path="/" exact component={BurgerBuilder} />
        <Route path="/orders" exact component={Orders} />
        <Route path="/logout" component={Logout} />
        <Route path="/auth" exact component={Auth} />
        <Redirect to='/' />
      </Switch>
    } else {
      routes = <Switch>
        <Route path="/" exact component={BurgerBuilder} />
        <Route path="/auth" exact component={Auth} />
        <Redirect to='/' />
      </Switch>
    }
    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onCheckAuthState: () => dispatch(actionCreatorAuth.checkAuthState())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
