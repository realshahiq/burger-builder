import React, { Component } from 'react';
import Modal from '../../UI/Modal/Modal';
import Aux from '../Aux/Aux';
const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null
    }
    componentWillMount() {
      axios.interceptors.request.use(req => {
       this.reqInterceptors = this.setState({ error: null });
        return req;
      })
      this.resInterceptors = axios.interceptors.response.use(res => res, (error) => {
        this.setState({ error: "Network Error" });
      });
    }
    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptors);
      axios.interceptors.response.eject(this.resInterceptors);
    }
    errorHandler = () => {
      this.setState({ error: null });

    }
    render() {
      return (
        <Aux>
          <Modal
            show={this.state.error}
            cancelled={this.errorHandler}>
            {this.state.error ? this.state.error : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      )
    }
  }
}
export default withErrorHandler;