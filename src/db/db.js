import pizzaImg from "../images/pizza.png";
import burgerImg from "../images/burger.png";
import cocaImg from "../images/coca.png";
import saladImg from "../images/salad.png";
import waterImg from "../images/water.png";
import iceCreamImg from "../images/icecream.png";
import kebabImg from "../images/kebab.png";

export const getData = () => {
  return [
    { id: 1, title: "Пицца", price: 300, image: pizzaImg },
    { id: 2, title: "Бургер", price: 300, image: burgerImg },
    { id: 3, title: "Кола", price: 300, image: cocaImg },
    { id: 4, title: "Шашлык", price: 300, image: kebabImg },
    { id: 5, title: "Салат", price: 300, image: saladImg },
    { id: 6, title: "Вода из Байкала", price: 300, image: waterImg },
    { id: 7, title: "Мороженное", price: 300, image: iceCreamImg },
  ];
};
