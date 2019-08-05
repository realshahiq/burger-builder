import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../../UI/Button/Button'; 
import './CheckoutSummary.css'
const checkoutSummary = (props) => {
    return (
        <div className="CheckoutSummary">
            <h1>Hope it tastes well!</h1>
            <div style={{ width: '300px', height: '300px', margin: 'auto' }}>
                <Burger ingredients={props.ingredients} />
                <Button clicked class="Danger">CANCEL</Button>
                <Button clicked class="Success">Success</Button>
            </div>
        </div>
    )
}

export default checkoutSummary;