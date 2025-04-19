import { useState } from 'react';

function CartApp() {
  const [cartItems, setCartItems] = useState([]);
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');

  const addToCart = () => {
    if (productName && productPrice) {
      setCartItems([...cartItems, {
        id: Date.now(),
        name: productName,
        price: parseFloat(productPrice),
        quantity: 1
      }]);
      setProductName('');
      setProductPrice('');
    }
  };

  const updateQuantity = (id, newQuantity) => {
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div>
      <div>
        <input
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          placeholder="Termék neve"
        />
        <input
          type="number"
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
          placeholder="Ár"
        />
        <button onClick={addToCart}>Kosárba</button>
      </div>
      <ul>
        {cartItems.map(item => (
          <li key={item.id}>
            {item.name} - {item.price} Ft
            <input
              type="number"
              value={item.quantity}
              onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
              min="1"
            />
          </li>
        ))}
      </ul>
      <div>Összesen: {total} Ft</div>
    </div>
  );
}
export default CartApp;