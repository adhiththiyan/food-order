import { useState } from "react";
import "./App.css"
import Cart from "./components/cart/Cart";
import Header from './components/layout/Header';
import Meals from './components/meals/Meals';
import CartProvider from "./store/CartProvider";


function App() {

  const [cartIsShown, setCartIsShown] = useState(false)

  const showCartHandler = () => {
    setCartIsShown(true)
  }
  const hideCartHandler = () => {
    setCartIsShown(false)
  }
  return (
    <CartProvider>
      <div className='App'>
        {cartIsShown && <Cart onClose={hideCartHandler} />}
        <Header onShowCart={showCartHandler} />
        <main>
          <Meals />
        </main>
      </div>
    </CartProvider>
  );
}

export default App;
