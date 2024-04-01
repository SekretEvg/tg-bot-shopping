import { useState, useEffect } from "react";
import "./App.css";
import Card from "./Components/Card/Card";
import Cart from "./Components/Cart/Cart";
import { getData } from "./db/db";

const foods = getData();

const tg = window.Telegram.WebApp;

function App() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    tg.ready();
  }, []);

  const onAdd = (food) => {
    const exist = cartItems.find((x) => x.id === food.id);
    if (exist) {
      setCartItems(
        cartItems.map((item) =>
          item.id === food.id
            ? { ...exist, quantity: exist.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...food, quantity: 1 }]);
    }
  };

  const onRemove = (food) => {
    const exist = cartItems.find((x) => x.id === food.id);
    if (exist.quantity === 1) {
      setCartItems(cartItems.filter((item) => item.id !== food.id));
    } else {
      setCartItems(
        cartItems.map((item) =>
          item.id === food.id
            ? { ...exist, quantity: exist.quantity - 1 }
            : item
        )
      );
    }
  };

  const onCheckout = () => {
    tg.MainButton.text = 'Отправить';
    tg.MainButton.show();
  };

  return (
    <>
      <h1 className="heading">Сделай заказ в Софич38</h1>
      <h2 className="heading">У меня все по триста</h2>
      <Cart cartItems={cartItems} onCheckout={onCheckout} />
      <div className="cards__container">
        {foods.map((food) => (
          <Card key={food.id} food={food} onAdd={onAdd} onRemove={onRemove} />
        ))}
      </div>
    </>
  );
}

export default App;
