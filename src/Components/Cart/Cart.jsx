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
    const data = {products: cartItems, totalPrice};
    tg.sendData(JSON.stringify(data));
  }, [totalPrice, cartItems]);

  useEffect(() => {
    tg.onEvent('mainButtonClicked', onSendData);
    return () => {
      tg.offEvent('mainButtonClicked', onSendData);
    }
  }, [onSendData]);

  return (
    <div className="cart__container">
      {cartItems.length === 0 ? "Корзина пуста" : ""}<br/> 
      <span style={{marginLeft: '5px'}}> Общая сумма: {totalPrice.toFixed(2)}РУБ</span>
      <Button
        title={`${cartItems.length === 0 ? "Пусто" : "Готово"}`}
        type={"checkout"}
        disable={cartItems.length === 0 ? true : false}
        onClick={onCheckout}
      />
    </div>
  );
};

export default Cart;
