import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import Spinner from '../../UI/Spinner/Spinner';
class Orders extends Component {
  state = {
    orders: [],
    loading: true
  }
  componentDidMount() {
    axios.get("/orders.json").then(response => {
      const fetchOrder = [];
      for (let key in response.data) {
        fetchOrder.push(response.data[key]);
      }
      this.setState({ orders: fetchOrder });
      this.setState({ loading: false });
    }).catch(error => {
      this.setState({ loading: false });
    })
  }
  render() {
    let orders = <Spinner />
    if (!this.state.loading)
       orders = this.state.orders.map((order, index) => {
        return <Order key={index} ingredients={order.ingredients} price={parseFloat(order.price).toFixed(2)} />
      })
    return (
      <div style={{padding:"20px"}}>
        {orders}
      </div>
    )
  }
}
export default WithErrorHandler(Orders, axios);