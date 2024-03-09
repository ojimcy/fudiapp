import React from 'react';
import './cart.css';
import Button from '../button/Button';

function Cart({ cartItems, onCheckout }) {
  const totalPrice = cartItems?.reduce((a, c) => a + c.price * c.quantity, 0);
  return (
    <div className="cart_container">
      <span>
        {cartItems?.length === 0 ? (
          'No items in cart '
        ) : (
          <span className="">Total Price: ${totalPrice?.toFixed(2)}</span>
        )}
      </span>

      <Button
        title={`${cartItems?.length === 0 ? 'Order!' : 'Checkout'}`}
        type={'checkout'}
        disable={cartItems?.length === 0 ? 'disable' : 'enable'}
        onClick={onCheckout}
      />
    </div>
  );
}

export default Cart;
