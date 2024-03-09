import { useEffect, useMemo, useState } from 'react';
import './App.css';
import Card from './component/card/Card';
import Cart from './component/cart/Cart';

const { getData } = require('./db/db');

const foods = getData();

function App() {
  const [cartItems, setCartItems] = useState([]);

  const [webApp, setWebApp] = useState(null);

  useEffect(() => {
    const app = window.Telegram.WebApp;
    if (app) {
      app.ready();
      setWebApp(app);
    }
  }, []);

  const value = useMemo(() => {
    return webApp
      ? {
          webApp,
          unsafeData: webApp.initDataUnsafe,
          user: webApp.initDataUnsafe.user,
        }
      : {};
  }, [webApp]);

  const addItem = (food) => {
    const existingItem = cartItems.find((x) => x.id === food.id);
    if (existingItem) {
      setCartItems(
        cartItems.map((x) =>
          x.id === food.id
            ? { ...existingItem, quantity: existingItem.quantity + 1 }
            : x
        )
      );
    } else {
      setCartItems([...cartItems, { ...food, quantity: 1 }]);
    }
  };

  const removeItem = (food) => {
    const existingItem = cartItems.find((x) => x.id === food.id);

    if (existingItem.quantity === 1) {
      setCartItems(cartItems.filter((x) => x.id !== food.id));
    } else {
      setCartItems(
        cartItems.map((x) =>
          x.id === food.id
            ? { ...existingItem, quantity: existingItem.quantity - 1 }
            : x
        )
      );
    }
  };

  const onCheckout = () => {
    webApp.MainButton.text = 'Pay :)';
    webApp.MainButton.show();
  };

  return (
    <>
      <h1 className="heading">Welcome {value.user?.username}</h1>
      <Cart cartItems={cartItems} onCheckout={onCheckout} />
      <div className="card_container">
        {foods.map((food) => {
          return (
            <Card
              food={food}
              key={food.id}
              onAdd={addItem}
              onRemove={removeItem}
            />
          );
        })}
      </div>
    </>
  );
}

export default App;
