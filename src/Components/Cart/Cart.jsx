import React, { useCallback, useEffect } from "react";
import "./Cart.css";
import Button from "../Button/Button";

const tg = window.Telegram.WebApp;

const Cart = ({ cartItems, onCheckout}) => {
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const onSendData = useCallback(() => {
    const data = {totalPrice};
    tg.sendData(JSON.stringify(data));
  }, [totalPrice]);

  useEffect(() => {
    tg.onEvent('mainButtonClicked', onSendData);
    return () => {
      tg.offEvent('mainButtonClicked', onSendData);
    }
  }, [onSendData]);

  return (
    <div className="cart__container">
      {cartItems.length === 0 ? "No items in cart" : ""}
      <br /> <span>Total Price: ${totalPrice.toFixed(2)}</span>
      <Button
        title={`${cartItems.length === 0 ? "Order !" : "Checkout"}`}
        type={"checkout"}
        disable={cartItems.length === 0 ? true : false}
        onClick={onCheckout}
      />
    </div>
  );
};

export default Cart;
