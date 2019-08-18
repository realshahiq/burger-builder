import axios from '../../axios-orders';

export const setLoading = () => {
    return {
        type:'ORDER',
        value: true
    }
}
export const placeOrder = (order) => {
    return dispatch => {
        axios.post('/orders.json', order).then(response => {
            dispatch(setLoading());
        }).catch(error => {
        })
    }
}